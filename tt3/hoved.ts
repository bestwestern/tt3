/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
var timer: instans.Time[];
var solevents: solution.SolEvent[];
var tidsgrupper: instans.TimeGroup[];
var resourcetyper: instans.ResourceType[];
var resourcegrupper: instans.ResourceGroup[];
var resourcer: instans.Resource[];
var eventgrupper: instans.EventGroup[];
var events: instans.AEvent[];
var hardconstraints: instans.Constraint[];
var softconstraints: instans.Constraint[];




window.onload = () => {
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
    var sol1: solution.Sol = new solution.Sol();
    sol1.udregn();

    var lillea = "lidt ændret";
    alert(lillea);
    //alert(sol1.solevents.length.toString());

    //  var k = new Course('jk', null);

}
/*TODO: 
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)


*/