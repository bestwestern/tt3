/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="jquery.d.ts" />
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
var ViewModel = (function () {
    function ViewModel(sol) {
        this.solevents = ko.observableArray();
        for(var i = 0, len = sol.solevents.length; i < len; i++) {
            this.solevents.push(new kosolevent(sol.solevents[i]));
        }
        this.tidnavne = [];
        this.tidids = [];
        for(var i = 0, len = timer.length; i < len; i++) {
            this.tidnavne.push(timer[i].name);
            this.tidids.push(timer[i].id);
        }
    }
    return ViewModel;
})();
var kosolevent = (function () {
    //  tider: kotidvalg;
    function kosolevent(inevent) {
        this.navn = ko.observable(inevent.sEvent.name);
        //  this.tider = new kotidvalg;
            }
    return kosolevent;
})();
var koresourcevalg = (function () {
    function koresourcevalg(inresliste) {
    }
    return koresourcevalg;
})();
/*class kotidvalg {
navne: KnockoutObservableArray;
ids: KnockoutObservableArray;
valgttid: KnockoutObservableString;
constructor() {
this.navne = ko.observableArray();
this.ids = ko.observableArray();
for (var i = 0, len = timer.length; i < len; i++) {

this.navne.push(timer[i].name);
this.ids.push(timer[i].id);
}
}
}*/
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
    instans.readxml("XML/" + filenames[1] + ".xml");
    /*for (var i = 0; i < filenames.length; i++) {
    instans.readxml("XML/" + filenames[i] + ".xml");
    var sol1: solution.Sol = new solution.Sol();
    sol1.udregn();
    }*/
    var sol1 = new solution.Sol();
    alert('starter binding');
    ko.applyBindings(new ViewModel(sol1));
    alert(' slutter binding');
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
