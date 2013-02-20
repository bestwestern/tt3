/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="jquery.d.ts" />

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


class ViewModel {
    solevents: KnockoutObservableArray;
    tidnavne: string[];
    tidids: string[];
    constructor(sol: solution.Sol) {
        this.solevents = ko.observableArray();
        for (var i = 0, len = sol.solevents.length; i < len; i++)
            this.solevents.push(new kosolevent(sol.solevents[i]));
        this.tidnavne = [];
        this.tidids = [];
        for (var i = 0, len = timer.length; i < len; i++) {
            this.tidnavne.push(timer[i].name);
            this.tidids.push(timer[i].id);
        }
    }
}
class kosolevent {
    navn: KnockoutObservableString;
    //  tider: kotidvalg;
    constructor(inevent: solution.SolEvent) {
        this.navn = ko.observable(inevent.sEvent.name);
        //  this.tider = new kotidvalg;
    }
}
class koresourcevalg {
    navn: KnockoutObservableArray;
    id: KnockoutObservableArray;
    constructor(inresliste: instans.Resource[]) {
    }
}
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
    instans.readxml("XML/" + filenames[1] + ".xml");
    /*for (var i = 0; i < filenames.length; i++) {
        instans.readxml("XML/" + filenames[i] + ".xml");
        var sol1: solution.Sol = new solution.Sol();         
        sol1.udregn();
    }*/
    var sol1: solution.Sol = new solution.Sol();

    alert('starter binding');
    ko.applyBindings(new ViewModel(sol1));
    alert(' slutter binding');

    //alert(sol1.solevents.length.toString());

    //  var k = new Course('jk', null);

}
/*TODO: 
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)


*/