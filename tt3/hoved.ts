/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
/// <reference path="jquery.d.ts" />
/*TODO: 
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)
lav preassigned kolonne
bør solutionevent pege på forældreevent*/
var timer: instans.Time[];
var sol1: solution.Sol;
var tidsgrupper: instans.TimeGroup[];
var resourcetyper: instans.ResourceType[];
var resourcegrupper: instans.ResourceGroup[];
var resourcer: instans.Resource[];
var eventgrupper: instans.EventGroup[];
var events: instans.AEvent[];
var hardconstraints: instans.Constraint[];
var softconstraints: instans.Constraint[];
var resmangler: instans.ResMangel[];
var tidmangler: instans.TidMangel[];
var counter = 0;
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
    instans.readxml(filenames[4] + ".xml");
    for (var i = 0; i < filenames.length; i++) {
        //   instans.readxml("XML/" + filenames[i] + ".xml");
        /*  var sol1: solution.Sol = new solution.Sol();
          $('#content').html(lavtablerowhtml(sol1));*/

        //          sol1.udregn();
    }
 
    sol1 = new solution.Sol();
    // sol1.solevents[1].resourcer[0].resourceref = resourcer[190];
    sol1.udregn();
    $('#content').html(lavtablerowhtml(sol1));
    //alert(sol1.solevents.length.toString());

    //  var k = new Course('jk', null);

}
/*function resvalg(selection, rolle, soleventindex) {
    var solevent = sol1.solevents[soleventindex];
    for (var i = 0, len = solevent.resourcer.length; i < len; i++)
        if (solevent.resourcer[i].mangel.role == rolle)
    break;*/
/* var j = Number(selection.options[selection.selectedIndex].value);
 var valgtres = resourcer[j];

 for (var j = 0, len = resourcer.length; j < len; j++)
     if (resourcer[j].id == selid)
         break;*/
// solevent.resourcer[i].resourceref = resourcer[selection.options[selection.selectedIndex].value];
//$('#content').html(lavtablerowhtml(sol1));

//}

function lavtablerowhtml(solin: solution.Sol) {
    var htmltxt = "<table><thead><tr><td>Event</td><td>Time</td></tr></thead>";
    //  var solevents = solin.solevents;
    var roles: string[] = [];
    var restypedropdown = {};
    var antalevents = events.length;

    var tiddrop = " <option value='EJVALGT'> Not chosen </option> ";
    for (var i = 0, len = timer.length; i < len; i++)
        tiddrop += "<option value='" + timer[i].index + "'>" + timer[i].name + "</option>";
    tiddrop += "</select>";
    /*  for (var i = 0; i < antalevents; i++) {//optimer
          var mngl = events[i].eventresmangler;
          for (var j = 0, antrollerievmangler = mngl.length / events[i].duration;
              j < antrollerievmangler; j++) {
              if (roles.indexOf(mngl[j].role) == -1) {
                  roles.push(mngl[j].role);
                  htmltxt += "<td>" + mngl[j].role + "</td>";
              }
          }
      }*/
    for (var i = 0; i < antalevents; i++) {
        var ievent = events[i];
        var antalmngler = ievent.eventresmangler.length;
        for (var durationindex = 0; durationindex < ievent.duration; durationindex++) {


            if (ievent.duration > 1 && ievent.eventresmangler.length > 0) {
                var her = 4;;
            }

            var navn = ievent.name;
            var tooltip = "";
            if (ievent.duration > 1)
                navn += " (" + (durationindex + 1) + "/" + ievent.duration + ")";
            for (var j = 0, len = ievent.eventresourcer.length; j < len; j++)
                tooltip += ievent.eventresourcer[j].name + ", ";
            if (tooltip.length > 9999999999999990)
                htmltxt += "<tr title='" + tooltip.substr(0, tooltip.length - 2) + "'><td>";
            else
                htmltxt += "<tr><td>";
            if (ievent.preasigntime) {
                var valgttid = timer[ievent.preasigntime.index + durationindex];
                htmltxt += navn + "</td><td>Time:" + valgttid.name + "</td>";
            }
            else {
                var tiddropi = tiddrop;
                htmltxt +=  navn + "</td><td>Time:<select>" + tiddropi + "</td>";
            }
         /*   if (ievent.eventresourcer.length > 0) {
                htmltxt += " (";
                for (var j = 0, len = ievent.eventresourcer.length; j < len; j++)
                    htmltxt += ievent.eventresourcer[j].name + "|";
                htmltxt = htmltxt.substr(0, htmltxt.length - 1) + ")";
            }*/
            for (var mnglindex = durationindex; mnglindex < antalmngler ; mnglindex = mnglindex + ievent.duration) {
                var colrole = ievent.eventresmangler[mnglindex].role;
                var restype = ievent.eventresmangler[mnglindex].resourcetype.id;
                if (restypedropdown[restype] === undefined) {
                    var resids: number[] = [];
                    var selecthtml = "<option value='EJVALGT'>Not chosen</option>"; //style = 'background-color: blue'
                    var resgrs = ievent.eventresmangler[mnglindex].resourcetype.resourcegroups;
                    for (var l = 0, antgr = resgrs.length; l < antgr; l++) {
                        var resgr = resgrs[l].resourcer;
                        for (var m = 0, antres = resgr.length; m < antres; m++) {
                            if (resids.indexOf(resgr[m].index) == -1) {
                                var resindexd = resgr[m].index;
                                resids.push(resindexd);
                                selecthtml += "<option value='" + resindexd + "'>" + resgr[m].name + "</option>";
                            }
                        }
                    }
                    selecthtml += "</select>";
                    restypedropdown[restype] = selecthtml;


                }
                var drop: string = restypedropdown[restype];
                //tjek om resource angivet
                /*       for (var n = 0, antalsolresmngl = solevent.resourcer.length; n < antalsolresmngl; n++) {
                           if (solevent.resourcer[n].mangel == ievent.eventmangler[k]) {
                               if (solevent.resourcer[n].resourceref != undefined) {
                                   drop = drop.replace("'" +solevent.resourcer[n].resourceref.index + "'>",
                               "'" +solevent.resourcer[n].resourceref.index + "' selected>")*/


                htmltxt += "<td> " + colrole + ":<select>" + drop + "</td>"
            }
        }
    }
    return htmltxt + "</table>";

}
/*     if (colroleinevent) {
         var restype = ievent.eventmangler[k].resourcetype.id;
         if (restypedropdown[restype] === undefined) {
             var resids: number[] = [];
             var selecthtml = "<option value='EJVALGT'>Not chosen</option>";
             var resgrs = ievent.eventmangler[k].resourcetype.resourcegroups;
             for (var l = 0, antgr = resgrs.length; l < antgr; l++) {
                 var resgr = resgrs[l].resourcer;
                 for (var m = 0, antres = resgr.length; m < antres; m++) {
                     if (resids.indexOf(resgr[m].index) == -1) {
                         var resindexd = resgr[m].index;
                         resids.push(resindexd);
                         selecthtml += "<option value='" + resindexd + "'>" + resgr[m].name + "</option>";
                     }
                     selecthtml += "</select>";
                     restypedropdown[restype] = selecthtml;
                 }
                 var drop: string = restypedropdown[restype];
                 //tjek om resource angivet
                 /*       for (var n = 0, antalsolresmngl = solevent.resourcer.length; n < antalsolresmngl; n++) {
                            if (solevent.resourcer[n].mangel == ievent.eventmangler[k]) {
                                if (solevent.resourcer[n].resourceref != undefined) {
                                    drop = drop.replace("'" +solevent.resourcer[n].resourceref.index + "'>",
                                "'" +solevent.resourcer[n].resourceref.index + "' selected>")
        }
        }
        else { }
        }

              /*   htmltxt += "<td> <select onchange='resvalg(this,\"" + colrole + "\",\"" + i + "\")'>" + drop + "</td>";
             }
else
         htmltxt += "<td></td>";
         }
         htmltxt += "</tr>";
     }
 }*/
