var timer;
var vistsol;
var tidsgrupper;
var resourcetyper;
var resourcegrupper;
var resourcer;
var eventgrupper;
var events;
var antalevents;
var antalresourcer;
var antaltider;
var hardconstraints;
var softconstraints;
var resmangler;
var tidmangler;
var counter = 0;
var xmlDoc;
var xmlinstans;
window.onload = function () {
    "use strict";
    var test = [];
    test[3] = [
        5
    ];
    var filenames = [
        "DenmarkSmallSchool", 
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
        "SpainSchool", 
        "ItalyInstance1"
    ];
    var alle = 0;
    if(alle) {
        for(var i = 0; i < filenames.length; i++) {
            events = [];
            instans.readxml("XML/" + filenames[i] + ".xml");
        }
    }
    var filnavn = filenames[5];
    instans.readxml("XML/" + filnavn + ".xml");
    vistsol = new solution.Sol();
    $('#content').html(lavtablerowhtml(vistsol));
};
function genberegn() {
    vistsol.udregncon(true);
    vistsol.udregncon(false);
    $('#content').html(lavtablerowhtml(vistsol));
}
function randomtid() {
    var antal = $('#antalrandomtid').val();
    $('#randomresbutton').remove();
    vistsol.randomtidtildel(antal);
}
function randomres() {
    var antal = $('#antalrandomtid').val();
    vistsol.randontildelres(antal);
}
function tildeltid0() {
    var nyvisning = false;
    for(var i = 0; i < events.length; i++) {
        var thisevent = events[i];
        if(!thisevent.preasigntime) {
            for(var j = 0; j < thisevent.duration; j++) {
                var tildtid = timer[vistsol.tidmangeltildelinger[thisevent.eventtidmangler[j].index]];
                if(!tildtid) {
                    vistsol.tildeltidtilevent(thisevent.eventtidmangler[j].index, 0);
                    nyvisning = true;
                }
            }
        }
    }
    if(nyvisning) {
        $('#content').html(lavtablerowhtml(vistsol));
        vistsol.udregncon(true);
        vistsol.udregncon(false);
    }
}
function lavxml() {
    tildeltid0();
    var serializer = new XMLSerializer();
    var y = xmlDoc.getElementsByTagName("Instances")[0];
    var solgroupndoe = xmlDoc.getElementsByTagName("SolutionGroups")[0];
    var solgroup = xmlDoc.createElement("SolutionGroup");
    solgroup.setAttribute("Id", "Runessol" + Math.random() * 1000);
    var solref = xmlDoc.createElement("Solution");
    solref.setAttribute("Reference", xmlinstans);
    var eventsnode = addnode("Events", solref);
    for(var i = 0; i < antalevents; i++) {
        var thisevent = events[i];
        if(i == 50) {
            var her = 4;
        }
        for(var j = 0; j < thisevent.duration; j++) {
            if(thisevent.preasigntime) {
                if(j == 0) {
                    var ev = addnode("Event", eventsnode);
                    ev.setAttribute("Reference", thisevent.id);
                    addnode("Duration", ev, thisevent.duration.toString());
                    var tin = addnode("Time", ev);
                    tin.setAttribute("Reference", timer[thisevent.preasigntime.index].id);
                    var reses = addnode("Resources", ev);
                    for(var k = 0; k < thisevent.eventresmangler.length; k++) {
                        var tilres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k].index];
                        if(tilres) {
                            var nyres = addnode("Resource", reses);
                            nyres.setAttribute("Reference", resourcer[tilres].id);
                            addnode("Role", nyres, thisevent.eventresmangler[k].role);
                        }
                    }
                }
            } else {
                var nysolevent = true;
                if(j > 0) {
                    var dennetid = vistsol.tidmangeltildelinger[thisevent.eventtidmangler[j].index];
                    var forrigetid = vistsol.tidmangeltildelinger[thisevent.eventtidmangler[j - 1].index];
                    if(dennetid == forrigetid + 1) {
                        var resourcerens = true;
                        for(var k = j; k < thisevent.eventresmangler.length; k += thisevent.duration) {
                            var denneres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k].index];
                            var forrigeres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k - 1].index];
                            if(denneres != forrigeres) {
                                resourcerens = false;
                            }
                        }
                        if(resourcerens) {
                            ev.childNodes[0].childNodes[0].nodeValue = Number(ev.childNodes[0].childNodes[0].nodeValue) + 1;
                            nysolevent = false;
                        }
                    }
                }
                if(nysolevent) {
                    var ev = addnode("Event", eventsnode);
                    ev.setAttribute("Reference", thisevent.id);
                    addnode("Duration", ev, "1");
                    var tin = addnode("Time", ev);
                    var tildtid = vistsol.tidmangeltildelinger[thisevent.eventtidmangler[j].index];
                    tin.setAttribute("Reference", timer[tildtid].id);
                    var reses = addnode("Resources", ev);
                    for(var k = j; k < thisevent.eventresmangler.length; k += thisevent.duration) {
                        var tilres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k].index];
                        if(tilres != undefined) {
                            var nyres = addnode("Resource", reses);
                            nyres.setAttribute("Reference", resourcer[tilres].id);
                            addnode("Role", nyres, thisevent.eventresmangler[k].role);
                        }
                    }
                }
            }
        }
    }
    var metadata = xmlDoc.createElement("MetaData");
    addnode("Contributor", metadata, "run@sdu.dk");
    addnode("Date", metadata, new Date().toDateString());
    addnode("Description", metadata, "Speciale");
    solgroup.appendChild(metadata);
    solgroup.appendChild(solref);
    solgroupndoe.appendChild(solgroup);
    window.open('data:text/xml,' + serializer.serializeToString(xmlDoc));
}
function addnode(navn, parent, txt) {
    var ch = xmlDoc.createElement(navn);
    if(txt) {
        var tx = xmlDoc.createTextNode("ch");
        tx.nodeValue = txt;
        ch.appendChild(tx);
    }
    parent.appendChild(ch);
    return ch;
}
function choicemade(tidangivet, mangelindex, dropdown) {
    var eventindex = dropdown.getAttribute('data-eventindex');
    var durationindex = dropdown.getAttribute('data-durationindex');
    var tidmangelindex = dropdown.getAttribute('data-tidmangelindex');
    if(tidangivet) {
        var nyval = Number(dropdown.options[dropdown.selectedIndex].value);
        if(isNaN(nyval)) {
            nyval = -1;
        }
        vistsol.tildeltidtilevent(mangelindex, nyval);
    } else {
        var nyval = Number(dropdown.options[dropdown.selectedIndex].value);
        var oldval = vistsol.resmangeltildelinger[mangelindex];
        if(tidmangelindex < 0) {
            var tidindex = tidmangelindex * (-1) - 1;
        } else {
            var tidindex = vistsol.tidmangeltildelinger[tidmangelindex];
        }
        if(tidindex != null) {
            if(tidmangelindex < 0) {
                for(var tidadder = 0; tidadder < events[eventindex].duration; tidadder++) {
                    if(oldval !== undefined) {
                        vistsol.fratagresourcetileventtiltid(oldval, durationindex, tidindex + tidadder, eventindex);
                    }
                    if(!isNaN(nyval)) {
                        vistsol.tildelresourcetileventtiltid(nyval, durationindex, tidindex + tidadder, eventindex);
                    }
                }
            } else {
                if(oldval !== undefined) {
                    vistsol.fratagresourcetileventtiltid(oldval, durationindex, tidindex, eventindex);
                }
                if(!isNaN(nyval)) {
                    vistsol.tildelresourcetileventtiltid(nyval, durationindex, tidindex, eventindex);
                }
            }
        }
        if(isNaN(nyval)) {
            vistsol.resmangeltildelinger[mangelindex] = null;
        } else {
            vistsol.resmangeltildelinger[mangelindex] = nyval;
        }
    }
    $('#content').html(lavtablerowhtml(vistsol));
    vistsol.udregncon(true);
    vistsol.udregncon(false);
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
    var roles = [];
    var restypedropdown = {
    };
    var antalevents = events.length;
    var tiddrop = " <option> Not chosen</option> ";
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
            if(ievent.preasigntime) {
                if(durationindex == 0) {
                    if(ievent.duration > 1) {
                        navn += " (" + ievent.duration + ")";
                    }
                    for(var j = 0, len = ievent.eventresourcer.length; j < len; j++) {
                        tooltip += ievent.eventresourcer[j].name + ", ";
                    }
                    if(tooltip.length > 0) {
                        htmltxt += "<tr title='" + tooltip.substr(0, tooltip.length - 2) + "'><td>";
                    } else {
                        htmltxt += "<tr><td>";
                    }
                    var valgttid = timer[ievent.preasigntime.index + durationindex];
                    htmltxt += navn + "</td><td>Time:" + valgttid.name + "</td>";
                }
            } else {
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
                var tiddropi = tiddrop;
                var tidvalg = solin.tidmangeltildelinger[ievent.eventtidmangler[durationindex].index];
                if(tidvalg > -2) {
                    tiddropi = tiddropi.replace("'" + tidvalg + "'", "'" + tidvalg + "' selected");
                }
                htmltxt += navn + "</td><td>Time:<select  data-eventindex=" + ievent.index + "  data-durationindex=" + durationindex + "  data-tidmangelindex=" + ievent.eventtidmangler[durationindex].index + "   onchange='choicemade(true," + ievent.eventtidmangler[durationindex].index + ",this)'>" + tiddropi + "</td>";
            }
            var fra = durationindex;
            var countplusser = ievent.duration;
            if(ievent.preasigntime) {
                if(durationindex == 0) {
                    countplusser = 1;
                } else {
                    fra = antalmngler;
                }
            }
            for(var mnglindex = fra; mnglindex < antalmngler; mnglindex = mnglindex + countplusser) {
                var colrole = ievent.eventresmangler[mnglindex].role;
                var restype = ievent.eventresmangler[mnglindex].resourcetype.id;
                if(restypedropdown[restype] === undefined) {
                    var resids = [];
                    var selecthtml = "<option>Not chosen</option>";
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
                var resvalg = solin.resmangeltildelinger[ievent.eventresmangler[mnglindex].index];
                if(resvalg > -2) {
                    drop = drop.replace("'" + resvalg + "'", "'" + resvalg + "' selected");
                }
                if(ievent.eventtidmangler[durationindex] != undefined) {
                    var tidmangelindex = ievent.eventtidmangler[durationindex].index;
                } else {
                    var tidmangelindex = -(ievent.preasigntime.index + durationindex) - 1;
                }
                htmltxt += "<td> " + colrole + ":<select data-eventindex=" + ievent.index + "  data-durationindex=" + durationindex + "  data-tidmangelindex=" + tidmangelindex + " onchange='choicemade(false," + ievent.eventresmangler[mnglindex].index + ",this)'>>" + drop + "</td>";
            }
        }
    }
    return htmltxt + "</table>";
}
//@ sourceMappingURL=hoved.js.map
