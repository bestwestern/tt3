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
    instans.readxml("XML/" + filenames[3] + ".xml");
    /*     for (var i = 0; i < filenames.length; i++) {
    instans.readxml("XML/" + filenames[i] + ".xml");
    var sol1: solution.Sol = new solution.Sol();
    sol1.udregn();
    }*/
    var sol1 = new solution.Sol();
    sol1.udregn();
    var lillea = "lidt ændret";
    alert(lillea);
    //alert(sol1.solevents.length.toString());
    //  var k = new Course('jk', null);
    };
/*TODO:
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)


*/
/*TODO:
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)


*/
//@ sourceMappingURL=hoved.js.map
