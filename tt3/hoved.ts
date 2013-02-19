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
  //  instans.readxml("XML/" + filenames[6] + ".xml");
    for (var i = 0; i < filenames.length; i++) {
        instans.readxml("XML/" + filenames[i] + ".xml");
        alert(filenames[i] + ':' + events.length.toString());
    }
    var sol1: solution.Sol = new solution.Sol();
    sol1.udregn();
    //alert(sol1.solevents.length.toString());

    //  var k = new Course('jk', null);

}