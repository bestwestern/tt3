/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
var timer;
var solevents;
var tidsgrupper;
var resourcetyper;
var resourcegrupper;
var resourcer;
var eventgrupper;
var events;
var hardconstraints;
var softconstraints;
window.onload = function () {
    /* if (typeof (Worker) !== "undefined")
    alert('worker virker');
    else
    alert('not');*/
    var filenames = [
        "test", 
        "NetherlandsKottenpark2009", 
        "ArtificialORLibrary-hdtt6", 
        "ArtificialSudoku4x4", 
        "AustraliaBGHS98", 
        "AustraliaSAHS96", 
        "BrazilInstance1", 
        "BrazilInstance4", 
        "DenmarkHasserisGymnasium2012", 
        "EnglandStPaul", 
        "GreeceHighSchool1", 
        "FinlandCollege", 
        "FinlandSecondarySchool", 
        "NetherlandsGEPRO", 
        "SouthAfricaLewitt2009", 
        "SpainSchool"
    ];
    instans.readxml("XML/" + filenames[0] + ".xml");
    /*  for (var i = 0; i < filenames.length; i++) {
    instans.readxml("XML/" + filenames[i] + ".xml");
    alert(filenames[i] + ':' + events.length.toString());
    }*/
    var sol1 = new solution.Sol();
    sol1.udregn();
    //alert(sol1.solevents.length.toString());
    //  var k = new Course('jk', null);
    };
//@ sourceMappingURL=hoved.js.map
