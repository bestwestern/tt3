var timer;
var sol1;
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
    for(var i = 0; i < filenames.length; i++) {
        instans.readxml("XML/" + filenames[i] + ".xml");
        $('#content').html(lavtablerowhtml(sol1));
        alert('html lavet?');
    }
};
function lavtablerowhtml(solin) {
    var htmltxt = "<table><thead><tr><td>Event</td><td>Time</td></tr></thead>";
    var roles = [];
    var restypedropdown = {
    };
    var antalevents = events.length;
    var tiddrop = " <option value='EJVALGT'> Not chosen </option> ";
    for(var i = 0, len = timer.length; i < len; i++) {
        tiddrop += "<option value='" + timer[i].index + "'>" + timer[i].name + "</option>";
    }
    tiddrop += "</select>";
    for(var i = 0; i < antalevents; i++) {
        var ievent = events[i];
        var antalmngler = ievent.eventresmangler.length;
        for(var durationindex = 0; durationindex < ievent.duration; durationindex++) {
            if(ievent.duration > 1 && ievent.eventresmangler.length > 0) {
                var her = 4;
                ;
            }
            var navn = ievent.name;
            var tooltip = "";
            if(ievent.duration > 1) {
                navn += " (" + (durationindex + 1) + "/" + ievent.duration + ")";
            }
            for(var j = 0, len = ievent.eventresourcer.length; j < len; j++) {
                tooltip += ievent.eventresourcer[j].name + ", ";
            }
            if(tooltip.length > 9999999999999990) {
                htmltxt += "<tr title='" + tooltip.substr(0, tooltip.length - 2) + "'><td>";
            } else {
                htmltxt += "<tr><td>";
            }
            if(ievent.preasigntime) {
                var valgttid = timer[ievent.preasigntime.index + durationindex];
                htmltxt += navn + "</td><td>Time:" + valgttid.name + "</td>";
            } else {
                var tiddropi = tiddrop;
                htmltxt += navn + "</td><td>Time:<select>" + tiddropi + "</td>";
            }
            for(var mnglindex = durationindex; mnglindex < antalmngler; mnglindex = mnglindex + ievent.duration) {
                var colrole = ievent.eventresmangler[mnglindex].role;
                var restype = ievent.eventresmangler[mnglindex].resourcetype.id;
                if(restypedropdown[restype] === undefined) {
                    var resids = [];
                    var selecthtml = "<option value='EJVALGT'>Not chosen</option>";
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
                htmltxt += "<td> " + colrole + ":<select>" + drop + "</td>";
            }
        }
    }
    return htmltxt + "</table>";
}
