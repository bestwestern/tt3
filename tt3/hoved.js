/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
/// <reference path="jquery.d.ts" />
/*TODO:
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)
lav preassigned kolonne
bør solutionevent pege på forældreevent*/
var timer;
var vistsol;
var tidsgrupper;
var resourcetyper;
var resourcegrupper;
var resourcer;
var eventgrupper;
var events;
var hardconstraints;
var softconstraints;
var resmangler;
var tidmangler;
var counter = 0;
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
    instans.readxml("XML/" + filenames[4] + ".xml");
    vistsol = new solution.Sol();
    $('#content').html(lavtablerowhtml(vistsol));
    /*
    for (var i = 0; i < filenames.length; i++) {
    events = [];
    instans.readxml("XML/" + filenames[i] + ".xml");
    if (events.length > 0)
    $('#content').html(lavtablerowhtml(sol1));
    assert(true, events.length.toString());
    }
    */
    };
function choicemade(tidangivet, mangelindex, dropdown) {
    if(tidangivet) {
        var arr = vistsol.tidtildelinger;
    } else {
        var arr = vistsol.restildelinger;
    }
    arr[mangelindex] = Number(dropdown.options[dropdown.selectedIndex].value);
    lavtablerowhtml(vistsol);
}
function assert(value, desc) {
    var resultsList = document.getElementById("results");
    if(!resultsList) {
        resultsList = document.createElement('ul');
        document.getElementsByTagName('body')[0].appendChild(resultsList);
        resultsList.setAttribute('id', 'results');
    }
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    resultsList.appendChild(li);
}
function lavtablerowhtml(solin) {
    var htmltxt = "<table><thead><tr><td>Event</td><td>Time</td></tr></thead>";
    //  var solevents = solin.solevents;
    var roles = [];
    var restypedropdown = {
    };
    var antalevents = events.length;
    var tiddrop = " <option value='-1'> Not chosen </option> ";
    for(var i = 0, len = timer.length; i < len; i++) {
        tiddrop += "<option value='" + timer[i].index + "'>" + timer[i].name + "</option>";
    }
    tiddrop += "</select>";
    for(var i = 0; i < antalevents; i++) {
        var ievent = events[i];
        var antalmngler = ievent.eventresmangler.length;
        for(var durationindex = 0; durationindex < ievent.duration; durationindex++) {
            var navn = ievent.name;
            var tooltip = "";
            if(ievent.duration > 1) {
                navn += " (" + (durationindex + 1) + "/" + ievent.duration + ")";
            }
            for(var j = 0, len = ievent.eventresourcer.length; j < len; j++) {
                tooltip += ievent.eventresourcer[j].name + ", ";
            }
            if(tooltip.length > 0) {
                htmltxt += "<tr title='" + tooltip.substr(0, tooltip.length - 2) + "'><td>";
            } else {
                htmltxt += "<tr><td>";
            }
            if(ievent.preasigntime) {
                var valgttid = timer[ievent.preasigntime.index + durationindex];
                htmltxt += navn + "</td><td>Time:" + valgttid.name + "</td>";
            } else {
                var tiddropi = tiddrop;
                var tidvalg = solin.tidtildelinger[ievent.eventtidmangler[durationindex].index];
                if(tidvalg > -2) {
                    tiddropi = tiddropi.replace("'" + tidvalg + "'", "'" + tidvalg + "' selected");
                }
                htmltxt += navn + "</td><td>Time:<select onchange='choicemade(true," + ievent.eventtidmangler[durationindex].index + ",this)'>" + tiddropi + "</td>";
            }
            for(var mnglindex = durationindex; mnglindex < antalmngler; mnglindex = mnglindex + ievent.duration) {
                var colrole = ievent.eventresmangler[mnglindex].role;
                var restype = ievent.eventresmangler[mnglindex].resourcetype.id;
                if(restypedropdown[restype] === undefined) {
                    var resids = [];
                    var selecthtml = "<option value='-1'>Not chosen</option>";//style = 'background-color: blue'
                    
                    var resgrs = ievent.eventresmangler[mnglindex].resourcetype.resourcegroups;
                    for(var l = 0, antgr = resgrs.length; l < antgr; l++) {
                        var resgr = resgrs[l].resourcer;
                        for(var m = 0, antres = resgr.length; m < antres; m++) {
                            if(resids.indexOf(resgr[m].index) == -1) {
                                var resindexd = resgr[m].index;
                                resids.push(resindexd);
                                selecthtml += "<option value='" + resindexd + "'>" + resgr[m].name + "</option>";
                            }
                        }
                    }
                    selecthtml += "</select>";
                    restypedropdown[restype] = selecthtml;
                }
                var drop = restypedropdown[restype];
                var resvalg = solin.restildelinger[ievent.eventresmangler[durationindex].index];
                if(resvalg > -2) {
                    drop = drop.replace("'" + resvalg + "'", "'" + resvalg + "' selected");
                }
                htmltxt += "<td> " + colrole + ":<select onchange='choicemade(false," + ievent.eventresmangler[durationindex].index + ",this)'>>" + drop + "</td>";
            }
        }
    }
    return htmltxt + "</table>";
}
//@ sourceMappingURL=hoved.js.map
