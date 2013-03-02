/// <reference path="solution.ts" />
/// <reference path="instans.ts" />
/// <reference path="jquery.d.ts" />
/*TODO: 
test ved indsættelse af event i appliestoevent, som allerede findes i en gruppe i appliestogroup
Lav resource angivelse og: test ved angivelse af resource i preferresource (ikke resourcegr)
lav preassigned kolonne
bør solutionevent pege på forældreevent*/
var timer: instans.Time[];
var vistsol: solution.Sol;
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
var xmlDoc: any;
var xmlinstans;
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
    "SpainSchool",
    "ItalyInstance1"
    ];
    /*  for (var i = 0; i < filenames.length; i++) {
          events = [];
          instans.readxml("XML/" + filenames[i] + ".xml");
          vistsol = new solution.Sol();
          if (events.length > 0)
              $('#content').html(lavtablerowhtml(vistsol));
          assert(true, events.length.toString());
      }*/
    instans.readxml("XML/" + filenames[16] + ".xml");
    // vistsol = new solution.Sol();
    // $('#content').html(lavtablerowhtml(vistsol));
    // vistsol.udregnhard();
    lavxml();

}
function lavxml() {
    /* console.log('node ' + i.toString() + ':' + xmlDoc.childNodes[i].nodeName);
     var thisnode = xmlDoc.childNodes[i];
     for (var j = 0, len2 = thisnode.childNodes.length; j < len2; j++) {
         var thisnode2 = thisnode.childNodes[j];
         console.log('undernode ' + j.toString() + ':' + thisnode2.nodeName);
         for (var k = 0, len3 = thisnode2.childNodes.length; k < len3; k++) {
             console.log('undernode2 ' + k.toString() + ':' + thisnode2.childNodes[k].nodeName);
 
         }
     }*/

    var serializer = new XMLSerializer();
    var y = xmlDoc.getElementsByTagName("Instances")[0];
    xmlDoc.documentElement.removeChild(y);
    var solgroup = xmlDoc.createElement("SolutionGroup");
    solgroup.setAttribute("Id", "Runessol");

    var solref = xmlDoc.createElement("Solution");
    solref.setAttribute("Reference", xmlinstans);
    addnode("Events", solref);

    var metadata = xmlDoc.createElement("MetaData");

    addnode("Contributor", metadata, "run@sdu.dk");
    addnode("Date", metadata, new Date().toDateString());
    addnode("Description", metadata, "Speciale");



    solgroup.appendChild(metadata);
    solgroup.appendChild(solref);

    /*  var metadata_contr = xmlDoc.createElement("Contributor");
    var metadata_contr_txt = xmlDoc.createTextNode("Contri");

    metadata_contr.appendChild(metadata_contr_txt);
    metadata.appendChild(metadata_contr);

    x = metadata_contr.childNodes[0];
    console.log(x.nodeName);
    x.nodeValue = "contr";
    console.log(x.nodeValue);*/


    xmlDoc.documentElement.appendChild(solgroup);
    window.open('data:text/xml,' + serializer.serializeToString(xmlDoc));
}

function addnode(navn: string, parent: any, txt?: string, ) {
    var ch = xmlDoc.createElement(navn);
    if (txt) {
        var tx = xmlDoc.createTextNode("ch");
        tx.nodeValue = txt;
        ch.appendChild(tx);
    }
   /* else
        tx = xmlDoc.createElement(navn);*/
    
    parent.appendChild(ch);
}
function choicemade(tidangivet: bool, mangelindex: number, dropdown) {
    if (tidangivet)
        var arr = vistsol.tidtildelinger;
    else
        var arr = vistsol.restildelinger;
    var nyval = Number(dropdown.options[dropdown.selectedIndex].value);

    if (isNaN(nyval))
        arr[mangelindex] = null;
    else
        arr[mangelindex] = nyval;
    lavtablerowhtml(vistsol);
    vistsol.udregnhard();
}
function assert(value, desc) {
    var resultsList = document.getElementById("results");
    if (!resultsList) {
        resultsList = document.createElement('ul');
        document.getElementsByTagName('body')[0].appendChild(resultsList);
        resultsList.setAttribute('id', 'results');
    }
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    resultsList.appendChild(li);
}
function lavtablerowhtml(solin: solution.Sol) {
    var htmltxt = "<table><thead><tr><td>Event</td><td>Time</td></tr></thead>";
    //  var solevents = solin.solevents;
    var roles: string[] = [];
    var restypedropdown = {};
    var antalevents = events.length;

    var tiddrop = " <option> Not chosen</option> ";
    for (var i = 0, len = timer.length; i < len; i++)
        tiddrop += "<option value='" + timer[i].index + "'>" + timer[i].name + "</option>";
    tiddrop += "</select>";
    for (var i = 0; i < antalevents; i++) {
        var ievent = events[i];
        var antalmngler = ievent.eventresmangler.length;
        for (var durationindex = 0; durationindex < ievent.duration; durationindex++) {
            var navn = ievent.name;
            var tooltip = "";
            if (ievent.duration > 1)
                navn += " (" + (durationindex + 1) + "/" + ievent.duration + ")";
            for (var j = 0, len = ievent.eventresourcer.length; j < len; j++)
                tooltip += ievent.eventresourcer[j].name + ", ";
            if (tooltip.length > 0)
                htmltxt += "<tr title='" + tooltip.substr(0, tooltip.length - 2) + "'><td>";
            else
                htmltxt += "<tr><td>";
            if (ievent.preasigntime) {
                var valgttid = timer[ievent.preasigntime.index + durationindex];
                htmltxt += navn + "</td><td>Time:" + valgttid.name + "</td>";
            }
            else {
                var tiddropi = tiddrop;
                var tidvalg = solin.tidtildelinger[ievent.eventtidmangler[durationindex].index];
                if (tidvalg > -2)
                    tiddropi = tiddropi.replace("'" + tidvalg + "'", "'" + tidvalg + "' selected");
                htmltxt += navn + "</td><td>Time:<select onchange='choicemade(true," +
                    ievent.eventtidmangler[durationindex].index + ",this)'>" + tiddropi + "</td>";
            }
            for (var mnglindex = durationindex; mnglindex < antalmngler ; mnglindex = mnglindex + ievent.duration) {
                var colrole = ievent.eventresmangler[mnglindex].role;
                var restype = ievent.eventresmangler[mnglindex].resourcetype.id;
                if (restypedropdown[restype] === undefined) {
                    var resids: number[] = [];
                    var selecthtml = "<option>Not chosen</option>"; //style = 'background-color: blue'
                    var resgrs = ievent.eventresmangler[mnglindex].resourcetype.resourcegroups;
                    for (var l = 0, antgr = resgrs.length; l < antgr; l++) {
                        var resgr = resgrs[l].resourcer;
                        for (var m = 0, antres = resgr.length; m < antres; m++)
                            if (resids.indexOf(resgr[m].index) == -1) {
                                var resindexd = resgr[m].index;
                                resids.push(resindexd);
                                selecthtml += "<option value='" + resindexd + "'>" + resgr[m].name + "</option>";
                            }
                    }
                    selecthtml += "</select>";
                    restypedropdown[restype] = selecthtml;
                }
                var drop: string = restypedropdown[restype];
                var resvalg = solin.restildelinger[ievent.eventresmangler[durationindex].index];
                if (resvalg > -2)
                    drop = drop.replace("'" + resvalg + "'", "'" + resvalg + "' selected");
                htmltxt += "<td> " + colrole + ":<select onchange='choicemade(false," +
                   ievent.eventresmangler[durationindex].index + ",this)'>>" + drop + "</td>"
            }
        }
    }
    return htmltxt + "</table>";

}