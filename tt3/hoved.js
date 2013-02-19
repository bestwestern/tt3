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
    instans.readxml("XML/" + filenames[1] + ".xml");
    for(var i = 0; i < filenames.length; i++) {
        instans.readxml("XML/" + filenames[i] + ".xml");
        var sol1 = new solution.Sol();
        sol1.udregn();
    }
    var sol1 = new solution.Sol();
    sol1.udregn();
};
