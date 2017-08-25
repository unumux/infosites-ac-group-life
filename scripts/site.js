// Main JS should go here!
// Include scripts using Browserify by doing:
// var $ = require("jquery");


document.querySelector('.willow-page-header__content-open').addEventListener("click", function( event ) {
    document.querySelector('.willow-page-header').dataset.contentOpen = true; 
}, false);

document.querySelector('.willow-page-header__content-close').addEventListener("click", function( event ) {
    document.querySelector('.willow-page-header').dataset.contentOpen = false;
}, false);