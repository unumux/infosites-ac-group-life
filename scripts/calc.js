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

function getrate(age){
    var ra = new Array(); // 0=eeLife; 1=eeLifeTobacco; 2=eeADD; 3=spLife; 4=spLifeTobacco; 5=spADD; 6=chLife; 7=chADD
    ra[2] = .0;  // ee ADD rate
    ra[5] = .0;  // sp ADD rate
    ra[7] = .0;  // ch ADD rate
    ra[6] = .0;  // ch [Life] rate
                                //	 eeLife     eeTob      spLife     spTob
        if (age <= 24){              ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 25 && age <= 29){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 30 && age <= 34){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 35 && age <= 39){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 40 && age <= 44){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 45 && age <= 49){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 50 && age <= 54){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 55 && age <= 59){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 60 && age <= 64){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 65 && age <= 69){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 70 && age <= 74){ ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        if (age >= 75 ){             ra[0]=0.0; ra[1]=0.0; ra[3]=0.0; ra[4]=0.0;}
        
    return ra;
}// end getrate() function

function calc(){

    
    var eeRatesPer = 10000;
    var spRatesPer = 5000;
    var chRatesPer = 2000;
    
    var eeLifeMin = 10000;
    var eeLifeMax = 500000;
    var eeLifeInc = 10000;
    var eeEOImax  = 100000;
    
    
    var spLifeMin = 5000;
    var spLifeMax = 500000;
    var spLifeInc = 5000;
    var spEOImax  = 25000;
    var spMaxOfEE = 100; // 100 or 50 (percent)
    var spTOB_YN = false;
    var spUseEErates_YN = false;
    
    
    
    var chLifeMin = 2000;
    var chLifeMax = 10000;
    var chLifeInc = 2000;
    var chMaxOfEE = 100; // 100 or 50 (percent)
    var chLIFEblock_YN = true; // toggle display of ch Life in calc grid
    var chADDblock_YN = true;  // toggle display of ch Life in calc grid
    
    var ar1Min = 70;
    var ar1Max = 74;
    var ar1per = .65; // percentage of coverage reduction1
        var ar2Min = 75;
        var ar2Max = 999;
        var ar2per = .50; // percentage of coverage reduction2
    var ar3Min = 999;
    var ar3Max = 999;
    var ar3per = .30; // percentage of coverage reduction3 (update #moreThanThreeReductions if adding another)
    
    var modalRates = 12;   // modal for given rates (monthly=12; semi-monthly=24; biweekly=26; weekly=52)
    var modalDisplay = 12; // modal to convert and display premium as (overridded by modal dropdown, if enabled)


    


    


    // clean all inputs
    employee_annual_salary = input2Number( $('#life-calc-annual-salary').val() )
    employee_age = input2Number( $('#life-calc-employee-age').val() )
    spouse_age = input2Number( $('#life-calc-spouse-age').val() )
    employee_life_coverage = input2Number( $('#life-calc-life-employee-coverage').val() )

        //document.getElementById("spLIFEblock").style.display = "block";}
    //else{                 document.getElementById("spLIFEblock").style.display = "none";}
    
    /*if (spADDblock_YN){   document.getElementById("spADDblock").style.display = "block";}
    else{                 document.getElementById("spADDblock").style.display = "none";}
    
    if (chLIFEblock_YN){  document.getElementById("chLIFEblock").style.display = "block";}
    else{                 document.getElementById("chLIFEblock").style.display = "none";}
    
    if (chADDblock_YN){   document.getElementById("chADDblock").style.display = "block";}
    else{                 document.getElementById("chADDblock").style.display = "none";}
        */

    // *** Employee ***
    rates = getrate(employee_age);
    var eeliferate = rates[0];
    var eetobliferate = rates[1];
    var eeaddrate = rates[2];
    //console.log("salary input = " + employee_annual_salary_input)
    //console.log("formats to " + myFormatCurrency(employee_annual_salary_input, 1))
} // end calc()

function initializeLifeCalculator(){
    var TOB_YN = false; // toggle display of tobacco questions
    var ADD_YN = true;  // toggle display of AD&D questions
    var spDisplayAll_YN = true; // toggle display of entire spouse section
    var spLIFEblock_YN = true; // toggle display of sp Life in calc grid
    var spADDblock_YN = true;  // toggle display of sp ADD in calc grid
    var chDisplayAll_YN = true; // toggle display of entire spouse section

    var eeLifeMin = 10000;
    var eeLifeMax = 500000;
    var eeLifeInc = 10000;
    var eeEOImax  = 100000;

    var spLifeMin = 5000;
    var spLifeMax = 500000;
    var spLifeInc = 5000;
    var spEOImax  = 25000;

    var chLifeMin = 2000;
    var chLifeMax = 10000;
    var chLifeInc = 2000;

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
    

    calc();
}// end initializeLifeCalculator


$(document).ready(function() {
    initializeLifeCalculator();
});


$( "#life-calc-annual-salary" ).change(function() {
    calc();
});


function input2Number(x){
    //console.log('input2Number x: ' + x)
    if (x === undefined) {return x;}
    if(x.length == 0){
        x = 0;
    }
    else{
        x = x.replace(/\D/g,'')*1;
    }
    return x
}

function getPayPeriodDesc(x){
    if(x==1){return "Annual"}
    if(x==12){return "Monthly"}
    if(x==24){return "Semi-Monthly"}
    if(x==26){return "Bi-Weekly"}
    if(x==52){return "Weekly"}
    else{return x+"thly"}
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