/// <reference path="solution.ts" />
/// <reference path="hoved.ts" />

module instans {
    export interface Constraint {
        id: string;
        name: string;
        weight: number;
        costfunction: string;
        appliestogre: EventGroup[];
        appliestoev: AEvent[];
        //costfunction
    }
    export class AssignResourceConstraint implements Constraint {
        appliestogre: EventGroup[];
        appliestoev: AEvent[];
        constructor(public id: string, public name: string, public weight: number, public costfunction: string, public role: string) {
            this.appliestogre = [];
            this.appliestoev = [];
        }
    }

    export class AssignTimeConstraint implements Constraint {
        appliestogre: EventGroup[];
        appliestoev: AEvent[];
        constructor(public id: string, public name: string, public weight: number, public costfunction: string) {
            this.appliestogre = [];
            this.appliestoev = [];
        }
    }

    class PreferTimesConstraint implements Constraint {
        appliestogre: EventGroup[];
        appliestoev: AEvent[];
        constructor(public id: string, public name: string, public weight: number, public costfunction: string) {
            this.appliestogre = [];
            this.appliestoev = [];
        }
    }
    class SpreadEventsConstraint implements Constraint {
        appliestogre: EventGroup[];
        appliestoev: AEvent[];

        constructor(public id: string, public name: string, public weight: number, public costfunction: string) {
            this.appliestogre = [];
            this.appliestoev = null;
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
        constructor(name: string, id: string) {
            super(id, name);
            this.timegroups = [];
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
        constructor(name: string, id: string) { super(id, name) }
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
        resourcegroups: ResourceGroup[];
        constructor(name: string, id: string, public resourcetype: ResourceType) {
            super(id, name);
            this.resourcegroups = [];
        }
    }
    export class AEvent {
        eventresourcer: Resource[];
        eventmangler: Mangel[];
        eventresourcegrupper: ResourceGroup[];
        eventeventgrupper: EventGroup[];
        constructor(public id: string, public name: string, public duration: number, public workload?: number,
            public time?: Time) {
            this.eventeventgrupper = [];
            this.eventresourcegrupper = [];
            this.eventresourcer = [];
            this.eventmangler = [];
        }
    }
    export class Mangel {
        constructor(public role: string, public resourcetype: ResourceType, public workload?: number) {
            if (role === null || resourcetype === null)
                alert('fejl ved indl�sning af mangel ' + role + ',' + resourcetype.name);
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
        var k, kk: any;
        var gruppeid: string[] = [];
        var resid: string[] = [];
        var times = nobj["Instances"]["Instance"]["Times"];
        var grps = times["TimeGroups"];
        if ("Week" in grps) {
            var tmp = grps["Week"]
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new Week(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new Week(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        if ("Day" in grps) {
            var tmp = grps["Day"];
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new Day(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new Day(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        if ("TimeGroup" in grps) {
            var tmp = grps["TimeGroup"]
            if (tmp instanceof Array)
                for (var key in tmp) {
                    tidsgrupper.push(new TimeGroup(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            else {
                tidsgrupper.push(new TimeGroup(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        grps = null;
        tmp = times["Time"];
        for (var key in tmp) {
            var curtime = tmp[key];
            var nytime = new Time(curtime["Id"], curtime["Name"]);
            if (curtime["Week"]) {
                var tmg = tidsgrupper[gruppeid.indexOf(curtime["Week"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);

            }
            if (curtime["Day"]) {
                var tmg = tidsgrupper[gruppeid.indexOf(curtime["Day"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if (curtime["TimeGroups"]) {
                var tmpg = curtime["TimeGroups"]["TimeGroup"];
                for (var key in tmpg) {
                    var k = tmpg[key];
                    if (k["Reference"]) {
                        k = k["Reference"];
                        //  alert('Timegroup reference!' + nytime.id);
                    }
                    var tmg = tidsgrupper[gruppeid.indexOf(k)];
                    nytime.timegroups.push(tmg);
                    tmg.timer.push(nytime);
                }
            }
            timer.push(nytime);
        }

        var res = nobj["Instances"]["Instance"]["Resources"];
        var typeid: string[] = [];
        var grupid: string[] = [];
        if (res["ResourceTypes"]) {
            tmp = res["ResourceTypes"]["ResourceType"];
            for (var key in tmp) {
                resourcetyper.push(new ResourceType(tmp[key]["Name"], tmp[key]["Id"]));
                typeid.push(tmp[key]["Id"]);
            }
        }
        if (res["ResourceGroups"]) {
            tmp = res["ResourceGroups"]["ResourceGroup"];
            for (var key in tmp) {
                var curgr = tmp[key];
                var restyp = resourcetyper[typeid.indexOf(curgr["ResourceType"]["Reference"])];
                var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                resourcegrupper.push(resgr);
                restyp.resourcegroups.push(resgr);
                grupid.push(curgr["Id"]);
            }
        }
        tmp = res["Resource"];
        for (var key in tmp) {
            var curres = tmp[key];
            var nyres = new Resource(curres["Name"], curres["Id"],
                resourcetyper[typeid.indexOf(curres["ResourceType"]["Reference"])]);
            for (var key2 in curres["ResourceGroups"]["ResourceGroup"]) {
                k = curres["ResourceGroups"]["ResourceGroup"][key2];
                if (resgr = resourcegrupper[grupid.indexOf(k)]) {

                    if (resgr === null)
                        alert('fejl ved ' + curres["Id"]);
                    else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }

                }
                    /*   if (k instanceof Array)
                           for (var key3 in k) {
                               alert('arr' + nyres.name);
                               var resgr = resourcegrupper[grupid.indexOf(k[key3])];
                               if (resgr === null)
                                   alert('fejl ved ' + curres["Id"]);
                               else {
                                   resgr.resourcer.push(nyres);
                                   nyres.resourcegroups.push(resgr);
                               }
                           }*/
                else {
                    var resgr = resourcegrupper[grupid.indexOf(k["Reference"])];
                    if (resgr === null)
                        alert('fejl ved ' + curres["Id"]);
                    else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }
                }
            }
            resourcer.push(nyres);
            resid.push(nyres.id);
            /* resourcegrupper.push(new ResourceGroup(curgr["Id"], curgr["Name"],
                resourcetyper[typeid.indexOf(curgr["ResourceType"]["Reference"])]));*/

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
            var nyev = new AEvent(curev["Id"], curev["Name"], curev["Duration"]);
            for (var key2 in curev["Course"]) {
                var evg = curev["Course"][key2];
                if (evgruppeid.indexOf(evg) > -1)
                    nyev.eventeventgrupper.push(eventgrupper[evgruppeid.indexOf(evg)]);
                else
                    alert('fejl ved indl�sning af event ' + curev["Name"]);
                //            nyev.eventeventgrupper.push(eventgrupper[evgruppeid.indexOf(curev[key2])]);
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
                    else
                        nyev.eventeventgrupper.push(eventgrupper[kk]);
                }
            }
            if ("Resources" in curev) {
                if (curev["Resources"]["Resource"])
                    if (curev["Resources"]["Resource"] instanceof Array)
                        for (var i = 0, len = curev["Resources"]["Resource"].length; i < len; i++)
                            lavres(curev["Resources"]["Resource"][i], resid, nyev, typeid)
                    else
                        lavres(curev["Resources"]["Resource"], resid, nyev, typeid);


            }
            events.push(nyev);
            evid.push(nyev.id);

        }
        var con = nobj["Instances"]["Instance"]["Constraints"];
        for (var key in con)
            if (con[key] instanceof Array)
                for (var i = 0, len = con[key].length; i < len; i++)
                    lavcon(con[key][i], key, evgruppeid, evid)
            else
                lavcon(con[key], key, evgruppeid, evid)
    }
    export function readxml(url) {



        var xmlhttp;
        if (XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        var xmlDoc = xmlhttp.responseXML;
        var data;
        for (var i = 0; i < xmlDoc.childNodes.length; i++)
            if (xmlDoc.childNodes[i].baseName === 'HighSchoolTimetableArchive') {
                data = XML2jsobj(xmlDoc.childNodes[i]);
                readinstance(data);
                break;
            }


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
            if (curres)
                nyev.eventresourcer.push(curres);
            else
                alert('fejl5 ved indl�sning af resource for ');
        }
        else {
            if ("Role" in thisres && "ResourceType" in thisres) {
                var curtype = resourcetyper[typeid.indexOf(thisres["ResourceType"]["Reference"])];
                if (curtype)
                    nyev.eventmangler.push(new Mangel(thisres["Role"], curtype, thisres["Workload"]));
                else
                    alert('fejlx v res event');
            }
            else {
                //var fddfdfsk = nobj["jk"]["jk"];
                alert('fejl v res event');
            }
        }

    }
    function lavcon(constraint: Object, type: string, evgruppeid: string[], evid: string[]) {
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
                        nycon.appliestogre.push(eventgrupper[evid.indexOf(appliesto["Events"]["Event"][key]["Reference"])]);
                else
                    nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"]["Reference"])]);
            }
            if (constraint["AppliesTo"]["EventGroups"]) {
                var appliesto = constraint["AppliesTo"];
                // if ("EventGroups" in appliesto) //if array
                if (appliesto["EventGroups"]["EventGroup"] instanceof Array)
                    for (var key in appliesto["EventGroups"]["EventGroup"])
                        nycon.appliestogre.push(eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"][key]["Reference"])]);
                else
                    nycon.appliestogre.push(eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"]["Reference"])]);
            }
            if (ha)
                hardconstraints.push(nycon);
            else
                softconstraints.push(nycon);
        }
    }
}