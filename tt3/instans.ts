/// <reference path="solution.ts" />
/// <reference path="hoved.ts" />

module instans {
    function sum(afvigelser: number[]) {
        var s = 0;
        for (var i = 0, len = afvigelser.length; i < len; i++)
            s += afvigelser[i];
        return s;
    }
    export interface Constraint {//beh�ver ikke slette de ekstra appliesto - bliver ikke anvendt fordi de ikke er i construct
        id: string;
        name: string;
        weight: number;
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        role: string;
        timer: Time[];
        timegroups: TimeGroup[];
        costfunction: (afv: number[]) => number;
        //costfunction
    }
    export class AssignResourceConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        //    appliestoma: Mangel[];
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string, public role: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            //   this.appliestoma = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;

            }
        }
    }

    export class AssignTimeConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timegroups: TimeGroup[];
        timer: Time[];
        appliestores: Resource[];
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;

            }
        }
    }

    export class PreferResourcesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        timegroups: TimeGroup[];
        appliestores: Resource[];
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.appliestoresgrou = [];
            this.appliestores = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
    }

    export class AvoidClashesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        timegroups: TimeGroup[];
        appliestores: Resource[];
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.appliestoresgrou = [];
            this.appliestores = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
    }


    
    export class PreferTimesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        appliestores: Resource[];
        timegroups: TimeGroup[];

        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.timegroups = [];
            this.timer = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;

            }
        }
    }
    export class SpreadEventsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        role: string;
        costfunction: (afv: number[]) => number;
        timer: Time[];

        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.appliestoevgrou = [];
            this.timegroups = [];
            this.timer = [];
            this.appliestoev = [];
            switch (costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;

            }
        }
    }


    export class Entity {
        constructor(public id: string, public name: string) {
            if (id === undefined || name === undefined)
                alert('Fejl ved indl�sning af ' + id + ',' + name);
        }
    }
    export class Time extends Entity {
        timegroups: TimeGroup[];
        index: number;
        constructor(name: string, id: string) {
            super(id, name);
            this.timegroups = [];
            this.index = timer.length;
        }
    }

    export class TimeGroup extends Entity {
        timer: Time[];
        constructor(name: string, id: string) { super(id, name); this.timer = []; }
    }
    export class Week extends TimeGroup {
        timer: Time[];
        constructor(name: string, id: string) { super(id, name); this.timer = []; }
    }
    export class Day extends TimeGroup {

        timer: Time[];
        constructor(name: string, id: string) { super(id, name); this.timer = []; }
    }

    export class EventGroup extends Entity {
        events: AEvent[];
        constructor(name: string, id: string) { super(id, name); this.events = []; }
    }
    export class Course extends EventGroup {
        constructor(name: string, id: string) { super(id, name) }
    }
    export class ResourceType extends Entity {
        resourcegroups: ResourceGroup[];
        constructor(name: string, id: string) {
            super(id, name);
            this.resourcegroups = [];
        }
    }
    export class ResourceGroup extends Entity {
        resourcer: Resource[];
        constructor(name: string, id: string, public resourcetype: ResourceType) { super(id, name); this.resourcer = []; }
    }
    export class Resource extends Entity {
        index: number;
        resourcegroups: ResourceGroup[];
        preass: AEvent[];
        constructor(name: string, id: string, public resourcetype: ResourceType) {
            super(id, name);
            this.resourcegroups = [];
            this.index = resourcer.length;
        }
    }
    export class AEvent {
        index: number;
        eventresourcer: Resource[];
        eventresmangler: ResMangel[];
        eventtidmangler: TidMangel[];
        eventresourcegrupper: ResourceGroup[];
        eventeventgrupper: EventGroup[];
        muligetider: Time[];
        constructor(public id: string, public name: string, public duration: number, public workload?: number,
            public preasigntime?: Time) {
            this.eventeventgrupper = [];
            this.eventresourcegrupper = [];
            this.eventresourcer = [];
            this.eventresmangler = [];
            this.eventtidmangler = [];
            this.index = events.length;
            /*  if (duration >1) {
                  alert('bingo');
              }*/
        }
    }
    export class TidMangel {
        index: number;
        constructor(public aevent: AEvent, public durationindex: number) {
            if (aevent === null || durationindex === null)
                alert('fejl ved indl�sningh af tidmangel ');
            this.index = tidmangler.length;
            tidmangler.push(this);
        }

    }
    export class ResMangel {
        index: number;
        constructor(public role: string, public resourcetype: ResourceType, public aevent: AEvent,
            public durationindex: number, public workload?: number) {
            if (role === null || resourcetype === null)
                alert('fejl ved indl�sningh af mangel ' + role + ',' + resourcetype.name);
            this.index = resmangler.length;
            resmangler.push(this);
        }
    }
    export function readinstance(nobj: Object) {//b�r lave tjek p� resgroup om array eller ej
        hardconstraints = [];
        softconstraints = [];
        timer = [];
        tidsgrupper = [];
        events = [];
        resourcegrupper = [];
        resourcetyper = [];
        resourcer = [];
        eventgrupper = [];
        resmangler = [];
        tidmangler = [];

        var k, kk: any;
        var tidgruppeid: string[] = [];
        var resid: string[] = [];
        var tidid: string[] = [];
        var times = nobj["Instances"]["Instance"]["Times"];
        var grps = times["TimeGroups"];
        xmlinstans = nobj["Instances"]["Instance"]["Id"];
        if ("Week" in grps) {
            var tmp = grps["Week"]
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new Week(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new Week(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        if ("Day" in grps) {
            var tmp = grps["Day"];
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new Day(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new Day(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        if ("TimeGroup" in grps) {
            var tmp = grps["TimeGroup"]
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new TimeGroup(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new TimeGroup(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        grps = null;
        tmp = times["Time"];
        for (var key in tmp) {
            var curtime = tmp[key];
            var nytime = new Time(curtime["Id"], curtime["Name"]);
            if (curtime["Week"]) {
                var tmg = tidsgrupper[tidgruppeid.indexOf(curtime["Week"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);

            }
            if (curtime["Day"]) {
                var tmg = tidsgrupper[tidgruppeid.indexOf(curtime["Day"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if (curtime["TimeGroups"]) {
                var tmpg = curtime["TimeGroups"]["TimeGroup"];
                for (var key in tmpg) {
                    var k = tmpg[key];
                    if (k["Reference"]) {//hvis der findes reference s� er der flere og de bliver loopet
                        //hvis ikke er tidsgruppen k
                        k = k["Reference"];
                    }
                    var tmg = tidsgrupper[tidgruppeid.indexOf(k)];
                    nytime.timegroups.push(tmg);
                    tmg.timer.push(nytime);
                }
            }
            timer.push(nytime);
            tidid.push(nytime.id);
        }

        var res = nobj["Instances"]["Instance"]["Resources"];
        var restypeid: string[] = [];
        var resgrupid: string[] = [];
        if (res["ResourceTypes"]) {
            tmp = res["ResourceTypes"]["ResourceType"];
            if (tmp instanceof Array)
                for (var key in tmp) {
                    resourcetyper.push(new ResourceType(tmp[key]["Name"], tmp[key]["Id"]));
                    restypeid.push(tmp[key]["Id"]);
                }
            else {
                resourcetyper.push(new ResourceType(tmp["Name"], tmp["Id"]));
                restypeid.push(tmp["Id"]);
            }

        }
        if (res["ResourceGroups"]) {
            tmp = res["ResourceGroups"]["ResourceGroup"];
            if (tmp instanceof Array)
                for (var key in tmp) {
                    var curgr = tmp[key];
                    var restyp = resourcetyper[restypeid.indexOf(curgr["ResourceType"]["Reference"])];
                    var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                    resourcegrupper.push(resgr);
                    restyp.resourcegroups.push(resgr);
                    resgrupid.push(curgr["Id"]);
                }
            else {
                var curgr = tmp;
                var restyp = resourcetyper[restypeid.indexOf(curgr["ResourceType"]["Reference"])];
                var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                resourcegrupper.push(resgr);
                restyp.resourcegroups.push(resgr);
                resgrupid.push(curgr["Id"]);
            }
        }
        tmp = res["Resource"];
        for (var key in tmp) {//vil fejl ved kun 1 resource
            var curres = tmp[key];
            var nyres = new Resource(curres["Name"], curres["Id"],
                resourcetyper[restypeid.indexOf(curres["ResourceType"]["Reference"])]);
            for (var key2 in curres["ResourceGroups"]["ResourceGroup"]) {
                k = curres["ResourceGroups"]["ResourceGroup"][key2];
                if (resgr = resourcegrupper[resgrupid.indexOf(k)]) {
                    if (resgr === undefined)
                        alert('fejl ved ' + curres["Id"]);
                    else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }

                }
                else {
                    var resgr = resourcegrupper[resgrupid.indexOf(k["Reference"])];
                    if (resgr === undefined)
                        alert('fejl ved ' + curres["Id"]);
                    else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }
                }
            }
            resourcer.push(nyres);
            resid.push(nyres.id);
        }
        var ev = nobj["Instances"]["Instance"]["Events"];
        var evgruppeid: string[] = [];
        if (ev["EventGroups"]) {
            var evgru = ev["EventGroups"]["Course"];
            if (evgru)
                if (evgru instanceof Array)
                    for (var key in evgru) {
                        eventgrupper.push(new Course(evgru[key]["Name"], evgru[key]["Id"]));
                        evgruppeid.push(evgru[key]["Id"]);
                    }
                else {
                    eventgrupper.push(new Course(evgru["Name"], evgru["Id"]));
                    evgruppeid.push(evgru["Id"]);
                }
            evgru = ev["EventGroups"]["EventGroup"];
            if (evgru)
                if (evgru instanceof Array)
                    for (var key in evgru) {
                        eventgrupper.push(new EventGroup(evgru[key]["Name"], evgru[key]["Id"]));
                        evgruppeid.push(evgru[key]["Id"]);
                    }
                else {
                    eventgrupper.push(new EventGroup(evgru["Name"], evgru["Id"]));
                    evgruppeid.push(evgru["Id"]);
                }
        }
        ev = ev["Event"];
        var evid: string[] = [];
        for (var key in ev) {
            var curev = ev[key];
            var preassigntime = null;
            if (curev["Time"]) {
                var timeref = curev["Time"]["Reference"];
                for (var i = 0, len = timer.length; i < len; i++) {
                    if (timer[i].id == timeref) {
                        preassigntime = timer[i];
                        i = len;
                    }
                }
                if (!preassigntime)
                    alert('Preassigned tid ikke fundet for ' + curev["Name"]);
            }

            var nyev = new AEvent(curev["Id"], curev["Name"], Number(curev["Duration"]), curev["Workload"], preassigntime);
            if (!preassigntime) {
                for (var i = 0; i < nyev.duration; i++)
                    nyev.eventtidmangler.push(new TidMangel(nyev, i));
            }
            for (var key2 in curev["Course"]) {
                var evg = curev["Course"][key2];
                if (evgruppeid.indexOf(evg) > -1) {
                    var evgr = eventgrupper[evgruppeid.indexOf(evg)];
                    nyev.eventeventgrupper.push(evgr);
                    evgr.events.push(nyev);
                }
                else
                    alert('fejl ved indl�sning af event ' + curev["Name"]);
            }
            if (curev["EventGroups"]) {
                evgru = curev["EventGroups"];
                if (evgru["EventGroup"]) {
                    evgru = evgru["EventGroup"];
                }
                for (var key in evgru) {
                    var k = evgru[key];
                    var kk = evgruppeid.indexOf(k["Reference"]);
                    if (kk == -1)
                        kk = evgruppeid.indexOf(k);
                    if (kk == -1)
                        alert('fejl3 ved indl�sning af evengroups for event ' + curev["Name"]);
                    else {
                        var evgr = eventgrupper[kk];
                        nyev.eventeventgrupper.push(evgr);
                        evgr.events.push(nyev);
                    }
                }
            }
            if ("Resources" in curev) {
                if (curev["Resources"]["Resource"])
                    if (curev["Resources"]["Resource"] instanceof Array)
                        for (var i = 0, len = curev["Resources"]["Resource"].length; i < len; i++)
                            lavres(curev["Resources"]["Resource"][i], resid, nyev, restypeid)
                    else
                        lavres(curev["Resources"]["Resource"], resid, nyev, restypeid);


            }
            events.push(nyev);
            evid.push(nyev.id);

        }
        antalevents = events.length;
        var con = nobj["Instances"]["Instance"]["Constraints"];
        for (var key in con)
            if (con[key] instanceof Array)
                for (var i = 0, len = con[key].length; i < len; i++)
                    lavcon(con[key][i], key, evgruppeid, evid, resid, resgrupid, tidid, tidgruppeid)
            else
                lavcon(con[key], key, evgruppeid, evid, resid, resgrupid, tidid, tidgruppeid)
    }
    export function readxml(url) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);
        xmlDoc = xmlhttp.responseXML;

        /* console.log(url);
        console.log(xmlDoc.childNodes[0].nodeName);*/
        var bingo = -1;
        for (var i = 0, len = xmlDoc.childNodes.length; i < len; i++)
            if (xmlDoc.childNodes[i].nodeName === 'HighSchoolTimetableArchive') {
                bingo = i;
                i = len;
            }
        if (bingo > -1) {
            xmlinstans = xmlDoc.childNodes[bingo].childNodes[0].nodeValue;
            readinstance(XML2jsobj(xmlDoc.childNodes[bingo]));
        }
        else
            assert(true, 'kunne ikke l�se ' + url);
        /* else {
             for (var i = 0; i <2; i++)
                 assert(true, i + xmlDoc.childNodes[i].nodeName)
         }*/
        //alert(xmlDoc.childNodes[0].baseName);
        /*     for (var i = 0; i < xmlDoc.childNodes.length; i++) {
                 if (xmlDoc.childNodes[i].baseName === 'HighSchoolTimetableArchive') {
                     data = XML2jsobj(xmlDoc.childNodes[i]);
                     readinstance(data);
                     i = xmlDoc.childNodes.length;
        
                 }
             }*/

        function XML2jsobj(node) {
            var data = {};
            // append a value
            function Add(name, value) {
                if (data[name]) {
                    if (data[name].constructor != Array) {
                        data[name] = [data[name]];
                    }
                    data[name][data[name].length] = value;
                }
                else {
                    data[name] = value;
                }
            };

            // element attributes
            var c, cn;
            for (c = 0; cn = node.attributes[c]; c++) {
                Add(cn.name, cn.value);
            }

            // child elements
            for (c = 0; cn = node.childNodes[c]; c++) {
                if (cn.nodeType == 1) {
                    if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
                        // text value
                        Add(cn.nodeName, cn.firstChild.nodeValue);
                    }
                    else {
                        // sub-object
                        Add(cn.nodeName, XML2jsobj(cn));
                    }
                }
            }

            return data;
        }
    }
    function lavres(thisres: Object, resid: string[], nyev: AEvent, typeid: string[]) {
        if ("Reference" in thisres) {
            var curres = resourcer[resid.indexOf(thisres["Reference"])];
            if (curres) {
                nyev.eventresourcer.push(curres);
                if (!curres.preass)
                    curres.preass = [];
                curres.preass.push(nyev);
            }
            else
                alert('fejl5 ved indl�sning af resource for ');
        }
        else {
            if ("Role" in thisres && "ResourceType" in thisres) {
                var curtype = resourcetyper[typeid.indexOf(thisres["ResourceType"]["Reference"])];
                if (curtype)
                    for (var i = 0, len = nyev.duration; i < len; i++)
                        nyev.eventresmangler.push(new ResMangel(thisres["Role"], curtype, nyev, i, thisres["Workload"]));
                else
                    alert('fejlx v res event');
            }
            else {
                //var fddfdfsk = nobj["jk"]["jk"];
                alert('fejl v res event');
            }
        }

    }
    function lavcon(constraint: Object, type: string, evgruppeid: string[], evid: string[], resid: string[], grupid: string[], tidid: string[], tidgrupid: string[]) {
        //var nycon: Constraint;
        var na = constraint["Name"];
        var id = constraint["Id"];
        var we = constraint["Weight"];
        var ha = constraint["Required"] == "true";
        var co = constraint["CostFunction"];
        var ro = constraint["Role"];
        var nycon: Constraint;
        switch (type) {
            case "AssignResourceConstraint":
                var nycon = new AssignResourceConstraint(id, na, we, co, ro);
                break;
            case "AssignTimeConstraint":
                var nycon = new AssignTimeConstraint(id, na, we, co);
                break;
            case "LimitBusyTimesConstraint"://MANFLWE
                break;
            case "PreferTimesConstraint":
                var nycon = new PreferTimesConstraint(id, na, we, co);
                break;
            case "SpreadEventsConstraint":
                var nycon = new SpreadEventsConstraint(id, na, we, co);
                break;
            case "PreferResourcesConstraint":
                var nycon = new PreferResourcesConstraint(id, na, we, co);
                break;

            case "DistributeSplitEventsConstraint":
                assert(na, true);
                break;
            case "AvoidClashesConstraint":
                var nycon = new AvoidClashesConstraint(id, na, we, co);
                break;
            default:

                // alert constraint ikke underst�ttet    var fddfdfsk = constraint["jk"]["jk"];
                break;

        }
        if (nycon) {
            if (constraint["AppliesTo"]["Events"]) {
                var appliesto = constraint["AppliesTo"];
                //       if ("EventGroups" in appliesto) //if array
                if (appliesto["Events"]["Event"] instanceof Array)
                    for (var key in appliesto["Events"]["Event"])
                        nycon.appliestoevgrou.push(eventgrupper[evid.indexOf(appliesto["Events"]["Event"][key]["Reference"])]);
                else
                    nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"]["Reference"])]);
            }
            if (constraint["AppliesTo"]["EventGroups"]) {
                var appliesto = constraint["AppliesTo"];
                if (appliesto["EventGroups"]["EventGroup"] instanceof Array)
                    for (var key in appliesto["EventGroups"]["EventGroup"]) {
                        var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"][key]["Reference"])];
                        nycon.appliestoevgrou.push(gr);
                        for (var i = 0, len = gr.events.length; i < len; i++)
                            if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                                nycon.appliestoev.push(gr.events[i]);
                    }
                else {
                    var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"]["Reference"])];
                    nycon.appliestoevgrou.push(gr);
                    for (var i = 0, len = gr.events.length; i < len; i++)
                        if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                            nycon.appliestoev.push(gr.events[i]);
                }
            }
            if (constraint["Times"]) {
                var t = constraint["Times"]["Time"];
                if (t instanceof Array)
                    for (var key in t)
                        nycon.timer.push(timer[tidid.indexOf(t[key]["Reference"])]);
                else
                    nycon.timer.push(timer[tidid.indexOf(t["Reference"])]);
            }
            if (constraint["TimeGroups"]) {
                var tg = constraint["TimeGroups"]["TimeGroup"];
                if (tg instanceof Array) {
                    for (var key in tg) {
                        var tgr = tidsgrupper[tidgrupid.indexOf(tg[key]["Reference"])];
                        nycon.timegroups.push(tgr);
                        for (var i = 0, len = tgr.timer.length; i < len; i++)
                            if (nycon.timer.indexOf(tgr.timer[i]) == -1)
                                nycon.timer.push(tgr.timer[i]);
                    }
                }
                else {
                    var tgr = tidsgrupper[tidgrupid.indexOf(tg["Reference"])];
                    nycon.timegroups.push(tgr);
                    for (var i = 0, len = tgr.timer.length; i < len; i++)
                        if (nycon.timer.indexOf(tgr.timer[i]) == -1)
                            nycon.timer.push(tgr.timer[i]);
                }
            }

            if (constraint["Resource"]) {
                //implemter
            }
            if (constraint["ResourceGroups"]) {
                var appliesto = constraint["ResourceGroups"];
                if (appliesto["ResourceGroup"] instanceof Array)
                    for (var key in appliesto["ResourceGroup"]) {
                        var egr: ResourceGroup = resourcegrupper[grupid.indexOf(appliesto["ResourceGroup"][key]["Reference"])];
                        nycon.appliestoresgrou.push(egr);
                        /*                        for (var i = 0, len = gr.events.length; i < len; i++)
                                                    if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                                                        nycon.appliestoev.push(gr.events[i]);*/
                    }
                else {
                    var egr: ResourceGroup = resourcegrupper[grupid.indexOf(appliesto["ResourceGroup"]["Reference"])];
                    nycon.appliestoresgrou.push(egr);
                }
            }
            /*              }
                        }
                        /*if (nycon instanceof AssignResourceConstraint) {
                            var ac: AssignResourceConstraint = <AssignResourceConstraint> nycon;
                            for (var i = 0, len = ac.appliestoev.length; i < len; i++) {
                                var ev = ac.appliestoev[i];
                                for (var j = 0; j < ev.eventmangler.length; j++) {
                                    var evma = ev.eventmangler[j];
                                    if (evma.role==ro)
                                        ac.appliestoma.push(evma);
                                    }
                            }
                            nycon = ac;
                            }*/
            if (ha)// if (nycon =prefertimes - angiv de mulige tider i eventsene
                hardconstraints.push(nycon);
            else
                softconstraints.push(nycon);
        }
    }
}