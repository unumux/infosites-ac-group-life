//  variables                     
let employee_annual_salary = 56516; 
let employee_age = 21;              
let spouse_age = 21;                
let employee_life_coverage = 0;     
let spouse_life_coverage = 0;       
let child_life_coverage = 0;        
let employee_add_coverage = 0;      
let spouse_add_coverage = 0;        
let child_add_coverage = 0; 
//let employee_tobacco_YN = true; 
//let spouse_tobacco_YN = true;   

let eeRatesPer = 10000;
let spRatesPer = 5000;
let chRatesPer = 2000;

let eeLifeMin = 10000;
let eeLifeMax = 500000;
let eeLifeInc = 10000;
let eeEOImax  = 100000;
let eeXSalaryMax = 5;

let spLifeMin = 5000;
let spLifeMax = 500000;
let spLifeInc = 5000;
let spEOImax  = 25000;
let spMaxOfEE = 50; // 100 or 50 (percent)
let spTOB_YN = true;
let spUseEErates_YN = false;

let chLifeMin = 2000;
let chLifeMax = 10000;
let chLifeInc = 2000;
let chMaxOfEE = 50; // 100 or 50 (percent)
let chLIFEblock_YN = true; // toggle display of ch Life in calc grid
let chADDblock_YN = true;  // toggle display of ch Life in calc grid


let ageReduction =  [
                     { min: 70, max: 74,  percent: .65 }, 
                     { min: 75, max: 79,  percent: .50 }, 
                     { min: 80, max: 999, percent: .30 },
                    ];
var modalRates = 12;   // modal for given rates (monthly=12; semi-monthly=24; biweekly=26; weekly=52)
var modalDisplay = 12; // modal to convert and display premium as (overridded by modal dropdown, if enabled)
var useModalDropdown = false;

var TOB_YN = true; // toggle display of tobacco questions
var ADD_YN = true;  // toggle display of AD&D questions
var spDisplayAll_YN = true; // toggle display of entire spouse section
var spLIFEblock_YN = true; // toggle display of sp Life in calc grid
var spADDblock_YN = true;  // toggle display of sp ADD in calc grid
var chDisplayAll_YN = true; // toggle display of entire spouse section


function getrate(age){
    var ra = new Array(); // 0=eeLife; 1=eeLifeTobacco; 2=eeADD; 3=spLife; 4=spLifeTobacco; 5=spADD; 6=chLife; 7=chADD
    ra[2] = .34;  // ee ADD rate
    ra[5] = .35;  // sp ADD rate
    ra[7] = .36;  // ch ADD rate
    ra[6] = .74;  // ch [Life] rate
                                //	 eeLife      eeTob       spLife      spTob
        if (age <= 24){              ra[0]=0.10; ra[1]=0.15; ra[3]=0.12; ra[4]=0.22;}
        if (age >= 25 && age <= 29){ ra[0]=0.20; ra[1]=0.25; ra[3]=0.22; ra[4]=0.32;}
        if (age >= 30 && age <= 34){ ra[0]=0.30; ra[1]=0.35; ra[3]=0.32; ra[4]=0.42;}
        if (age >= 35 && age <= 39){ ra[0]=0.40; ra[1]=0.45; ra[3]=0.42; ra[4]=0.52;}
        if (age >= 40 && age <= 44){ ra[0]=0.50; ra[1]=0.55; ra[3]=0.52; ra[4]=0.62;}
        if (age >= 45 && age <= 49){ ra[0]=0.60; ra[1]=0.65; ra[3]=0.62; ra[4]=0.72;}
        if (age >= 50 && age <= 54){ ra[0]=0.70; ra[1]=0.75; ra[3]=0.72; ra[4]=0.82;}
        if (age >= 55 && age <= 59){ ra[0]=0.80; ra[1]=0.85; ra[3]=0.82; ra[4]=0.92;}
        if (age >= 60 && age <= 64){ ra[0]=0.90; ra[1]=0.95; ra[3]=0.92; ra[4]=1.02;}
        if (age >= 65 && age <= 69){ ra[0]=1.10; ra[1]=1.05; ra[3]=1.02; ra[4]=1.12;}
        if (age >= 70 && age <= 74){ ra[0]=1.20; ra[1]=1.15; ra[3]=1.12; ra[4]=1.22;}
        if (age >= 75 ){             ra[0]=1.30; ra[1]=1.25; ra[3]=1.22; ra[4]=1.32;}
        
    return ra;
}// end getrate() function


function initializeLifeCalculator(){
    if (!TOB_YN)        { $('.life-calc-employee-tobacco-block, .life-calc-spouse-tobacco-block').addClass('hideme');}
    if (!ADD_YN)        { $('.life-calc-employee-add-block, .life-calc-spouse-add-block, .life-calc-child-add-block').addClass('hideme'); }
    if (!spDisplayAll_YN && chDisplayAll_YN){ // hide spouse but not child 
        $('.life-calc-employee-col').addClass('col-width-50 add-border-right');
        $('.life-calc-spouse-col').addClass('hideme');
        $('.life-calc-child-col').addClass('col-width-50');
    }
    if (!spLIFEblock_YN){ $('.life-calc-spouse-life-block').addClass('hiddenme'); }
    if (!spADDblock_YN) { $('.life-calc-spouse-add-block').addClass('hiddenme'); }
    if (!chDisplayAll_YN && spDisplayAll_YN){ // hide child but not spouse
        $('.life-calc-employee-col').addClass('col-width-50');
        $('.life-calc-spouse-col').addClass('col-width-50');
        $('.life-calc-child-col').addClass('hideme');
    }
    if (!chDisplayAll_YN && !spDisplayAll_YN){ // hide child AND spouse
        $('.life-calc-employee-col').addClass('col-width-100');
        $('.life-calc-spouse-col').addClass('hideme');
        $('.life-calc-child-col').addClass('hideme');
    }

    
                    populateDD($('#life-calc-life-employee-coverage'), eeLifeMin, eeLifeMax, eeLifeInc, eeEOImax)
    if (ADD_YN){ populateDD($('#life-calc-add-employee-coverage'), eeLifeMin, eeLifeMax, eeLifeInc) }

                    populateDD($('#life-calc-life-spouse-coverage'), spLifeMin, spLifeMax, spLifeInc, spEOImax)
    if (ADD_YN){ populateDD($('#life-calc-add-spouse-coverage'), spLifeMin, spLifeMax, spLifeInc) }

                    populateDD($('#life-calc-life-child-coverage'), chLifeMin, chLifeMax, chLifeInc)
    if (ADD_YN){ populateDD($('#life-calc-add-child-coverage'), chLifeMin, chLifeMax, chLifeInc) }

    
    function populateDD(target, min, max, inc, eoimax){
        if(isNaN(eoimax)){ eoimax=9999999; }
        target.html(''); // clear the select
        target.append($('<option>', { value : 0 }).text('None'));
        for (var i=min; i <= max; i=i+inc){
            if (i<=eoimax){ 
                target.append('<option value="'+i+'">'+myFormatCurrency(i,1)+'</option>');
            }
            else{ 
                target.append('<option value="'+i+'">'+myFormatCurrency(i,1)+ "*"+'</option>');			  
            }
        }
    }// end populateDD()

    if (useModalDropdown){
        $('#modalDD').removeClass('hideme');
        $('#modalNormalDesc').addClass('hideme');
        modalDisplay = document.getElementById("modalDD").value;
    }
    

    calc();
}// end initializeLifeCalculator


function calc(){
    var ageReductionTriggered_YN = false;

    $('.calc-box-eoi').addClass('hideme') // reset to hidden
    var eoi_triggered_YN = false;

    // clean all inputs
    employee_annual_salary = input2Number( $('#life-calc-annual-salary').val() )
    employee_age = input2Number( $('#life-calc-employee-age').val() )
    employee_life_coverage = input2Number( $('#life-calc-life-employee-coverage').val() )
    employee_add_coverage = input2Number( $('#life-calc-add-employee-coverage').val() )
    spouse_age = input2Number( $('#life-calc-spouse-age').val() )
    spouse_life_coverage = input2Number( $('#life-calc-life-spouse-coverage').val() )
    spouse_add_coverage = input2Number( $('#life-calc-add-spouse-coverage').val() )
    child_life_coverage = input2Number( $('#life-calc-life-child-coverage').val() )
    child_add_coverage = input2Number( $('#life-calc-add-child-coverage').val() )

    // apply age reduction
    var myAgeReductionPercent = getAgeReductionPercent(employee_age, ageReduction)

    function getAgeReductionPercent(age, thearray){
        var percent = 1.00; // not reduced yet
        if (age > 999){ age = 999 } // just for error control
        thearray.forEach(function(item, index, array) {
            if(age >= item.min && age <= item.max){
                percent = item.percent;
                ageReductionTriggered_YN = true;
            }
        });
        return percent;
    }// end getAgeReductionPercent

    employee_life_coverage = employee_life_coverage * myAgeReductionPercent;
    employee_add_coverage = employee_add_coverage * myAgeReductionPercent;
    spouse_life_coverage = spouse_life_coverage * myAgeReductionPercent;
    spouse_add_coverage = spouse_add_coverage * myAgeReductionPercent;

    if (ageReductionTriggered_YN){
        $('.life-calc-age-reduced-box').removeClass('hideme')
        $('.life-calc-age-reduced-percent-display').html(myAgeReductionPercent*100 + '%')
        $('#life-calc-employee-age-reduced-life-coverage-display').html(myFormatCurrency(employee_life_coverage,1))
        $('#life-calc-employee-age-reduced-add-coverage-display').html(myFormatCurrency(employee_add_coverage,1))
        $('#life-calc-spouse-age-reduced-life-coverage-display').html(myFormatCurrency(spouse_life_coverage,1))
        $('#life-calc-spouse-age-reduced-add-coverage-display').html(myFormatCurrency(spouse_add_coverage,1))
    }
    else{
        $('.life-calc-age-reduced-box').addClass('hideme')
    }

    // *** Employee ***
    rates = getrate(employee_age);
    var eeliferate      = rates[0];
    var eetobliferate   = rates[1];  
    var eeaddrate       = rates[2];
    
    if ( $('#life-calc-employee-tobaccoYN').is(':checked') ){
        eeliferate = eetobliferate;
    }

    // add 5x sal cap
    var eeXsal = eeXSalaryMax*employee_annual_salary/eeLifeInc;eeXsal=Math.ceil(eeXsal);eeXsal=eeXsal*eeLifeInc;
    if (employee_life_coverage>eeXsal){
        alert('Employee Life coverage maximum cap applied.\n('+eeXSalaryMax+'x Salary rounds to '+myFormatCurrency(eeXsal,1)+')');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-life-employee-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=eeXsal){
                myselect.selectedIndex=i;
            }
        }
    }
    employee_life_coverage=input2Number( $('#life-calc-life-employee-coverage').val() )

    if (employee_add_coverage>eeXsal){
        alert('Employee AD&D coverage maximum cap applied.\n('+eeXSalaryMax+'x Salary rounds to '+myFormatCurrency(eeXsal,1)+')');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-add-employee-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=eeXsal){
                myselect.selectedIndex=i;
            }
        }
    }
    employee_add_coverage=input2Number( $('#life-calc-add-employee-coverage').val() )

    if (employee_life_coverage >= eeEOImax){
        eoi_triggered_YN = true;
    }

    var eeLIFEprem = employee_life_coverage/eeRatesPer*eeliferate*modalRates/modalDisplay;
    var eeADDprem = employee_add_coverage/eeRatesPer*eeaddrate*modalRates/modalDisplay;

    $('#life-calc-life-employee-coverage-display').html( myFormatCurrency(eeLIFEprem,2));
    $('#life-calc-add-employee-coverage-display').html( myFormatCurrency(eeADDprem,2));



    // *** Spouse ***
    rates = getrate(spouse_age);
    var spliferate      = rates[3];
    var sptobliferate   = rates[4];  
    var spaddrate       = rates[5];
    
    if ( $('#life-calc-spouse-tobaccoYN').is(':checked') ){
        spliferate = sptobliferate;
    }

    var eeFactor = spMaxOfEE/100; // convert to decimal equavalent for easy percentage multiplication
    if (spouse_life_coverage > employee_life_coverage*eeFactor){
        alert('Spouse Life coverage can not exceed ' + spMaxOfEE + '% (' + myFormatCurrency(employee_life_coverage*eeFactor,1) + ') of employee Life coverage.');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-life-spouse-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=employee_life_coverage*eeFactor){
                myselect.selectedIndex=i;
            }
        }
    }
    spouse_life_coverage=input2Number( $('#life-calc-life-spouse-coverage').val() )

    if (spouse_add_coverage > employee_add_coverage*eeFactor){
        alert('Spouse AD&D coverage can not exceed ' + spMaxOfEE + '% (' + myFormatCurrency(employee_add_coverage*eeFactor,1) + ') of employee AD&D coverage.');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-add-spouse-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=employee_add_coverage*eeFactor){
                myselect.selectedIndex=i;
            }
        }
    }
    spouse_add_coverage=input2Number( $('#life-calc-add-spouse-coverage').val() )

    if (spouse_life_coverage >= spEOImax){
        eoi_triggered_YN = true;
    }

    var spLIFEprem = spouse_life_coverage/spRatesPer*spliferate*modalRates/modalDisplay;
    var spADDprem = spouse_add_coverage/spRatesPer*spaddrate*modalRates/modalDisplay;

    $('#life-calc-life-spouse-coverage-display').html( myFormatCurrency(spLIFEprem,2));
    $('#life-calc-add-spouse-coverage-display').html( myFormatCurrency(spADDprem,2));


    // *** Child ***
    var chliferate      = rates[6]; 
    var chaddrate       = rates[7];

    var eeFactor = chMaxOfEE/100; // convert to decimal equavalent for easy percentage multiplication
    if (child_life_coverage > employee_life_coverage*eeFactor){
        alert('Child Life coverage can not exceed ' + chMaxOfEE + '% (' + myFormatCurrency(employee_life_coverage*eeFactor,1) + ') of employee Life coverage.');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-life-child-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=employee_life_coverage*eeFactor){
                myselect.selectedIndex=i;
            }
        }
    }
    child_life_coverage=input2Number( $('#life-calc-life-child-coverage').val() )

    if (child_add_coverage > employee_add_coverage*eeFactor){
        alert('Child AD&D coverage can not exceed ' + chMaxOfEE + '% (' + myFormatCurrency(employee_add_coverage*eeFactor,1) + ') of employee AD&D coverage.');
        // loop through the select to select the closest value
        var myselect=document.getElementById("life-calc-add-child-coverage");
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].value<=employee_add_coverage*eeFactor){
                myselect.selectedIndex=i;
            }
        }
    }
    child_add_coverage=input2Number( $('#life-calc-add-child-coverage').val() )

    var chLIFEprem = child_life_coverage/chRatesPer*chliferate*modalRates/modalDisplay;
    var chADDprem = child_add_coverage/chRatesPer*chaddrate*modalRates/modalDisplay;

    $('#life-calc-life-child-coverage-display').html( myFormatCurrency(chLIFEprem,2));
    $('#life-calc-add-child-coverage-display').html( myFormatCurrency(chADDprem,2));


    // *** total ***
    var totalPremium = eeLIFEprem + eeADDprem + spLIFEprem + spADDprem + chLIFEprem + chADDprem;
    $('#life-calc-total-premium-display').html( myFormatCurrency(totalPremium,2));

    // eoi
    if (eoi_triggered_YN){
        $('.calc-box-eoi').removeClass('hideme')
    }

} // end calc()




$(document).ready(function() {
    initializeLifeCalculator();
});


$( ".activates-calc" ).change(function() {
    calc();
});



function input2Number(x){
    if (x === undefined) {return x;}
    if(x.length == 0){
        x = 0;
    }
    else{
        x = x.replace(/\D/g,'')*1;
    }
    return x
}

function myFormatCurrency(num, options) {
    // Defaults to showing cents with normal rounding on the cent. 
    // myFormatCurrency(1000.021) -> "$1,000.02"

    // options = 1    Don't show the cents 
    // myFormatCurrency(1000.021, 1) -> "$1,000"

    // options = 2    Show the cents with cent rounding up the next whole cent 
    // myFormatCurrency(1000.021, 2) -> "$1,000.03"

    if (typeof options  === 'undefined') { centsYN = 1; roundUpYN  = 0; }  // default to 0 if omitted
    if (options == 1){ centsYN = 0; roundUpYN  = 0; }
    if (options == 2){ centsYN = 1; roundUpYN  = 1; }
    if (options < 1 || options > 2){ centsYN = 1; roundUpYN  = 0; } // default settings

    if(isNaN(num))
        num = "0";
    var numOrig = num;
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    num = Math.floor(num/100).toString();

    var realcents = (numOrig % 1)
    var cents = realcents * 100;
        cents = Math.round10(cents, -2); // new addition to better handle JavaScript floating number handling

    var centsNormalRound = Math.round(cents);
    var centsRoundedUp = Math.ceil(cents);
    if (roundUpYN === 1){ cents = centsRoundedUp }
    else                { cents = centsNormalRound}
    if(cents<10){
        cents = "0" + cents; // make it two digits
    }

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
    if (centsYN==0){
        return (((sign)?'':'-') + '$' + num );
    }
    if (centsYN==1){
        return (((sign)?'':'-') + '$' + num + '.' + cents);
    }

    
    
}// end myFormatCurrency function

// https://stackoverflow.com/questions/42109818/reliable-js-rounding-numbers-with-tofixed2-of-a-3-decimal-number
// Closure
(function() {
/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
    Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
    };
}
// Decimal floor
if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
    return decimalAdjust('floor', value, exp);
    };
}
// Decimal ceil
if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
    return decimalAdjust('ceil', value, exp);
    };
}
})();



// need calc begin
$( ".activates-need-calc" ).change(function() {
    needCalc();
});
$( "#calc-life-need-salary" ).change(function() {
    var incoming = input2Number( $('#calc-life-need-salary').val() );
    var outgoing = myFormatCurrency(incoming,1);
    $('#life-calc-annual-salary').val( outgoing );
    initializeLifeCalculator();
});
$( "#life-calc-annual-salary" ).change(function() {
    var incoming = input2Number( $('#life-calc-annual-salary').val() );
    var outgoing = myFormatCurrency(incoming,1);
    $('#calc-life-need-salary').val( outgoing );
    needCalc();
});

function needCalc(){
    var needDebt1 = input2Number( $('#calc-life-need-debt1').val() );   $('#calc-life-need-debt1').val( myFormatCurrency(needDebt1 ,1) );
    var needDebt2 = input2Number( $('#calc-life-need-debt2').val() );   $('#calc-life-need-debt2').val( myFormatCurrency(needDebt2 ,1) );
    var needDebt3 = input2Number( $('#calc-life-need-debt3').val() );   $('#calc-life-need-debt3').val( myFormatCurrency(needDebt3 ,1) );
    var needDebt4 = input2Number( $('#calc-life-need-debt4').val() );   $('#calc-life-need-debt4').val( myFormatCurrency(needDebt4 ,1) );
    var needSalary = input2Number( $('#calc-life-need-salary').val() ); $('#calc-life-need-salary').val( myFormatCurrency(needSalary ,1) );
    var needYears = input2Number( $('#calc-life-need-years').val() );   $('#calc-life-need-years').val( needYears );

    var needTotal = needDebt1 + needDebt2 + needDebt3 + needDebt4 + (needSalary*needYears)
    $('.calc-life-need-recommended-amount').html( myFormatCurrency(needTotal,1));
}
// need calc end
