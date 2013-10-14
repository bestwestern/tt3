/// <reference path="solution.ts" />
/// <reference path="hoved.ts" />
module instans {
    function sum(afvigelser: number[]) {
        var s = 0;
        for (var i = 0, len = afvigelser.length; i < len; i++)
            s += afvigelser[i];
        return s;
    }
    function squaresum(afvigelser: number[]) {
        var s = 0;
        for (var i = 0, len = afvigelser.length; i < len; i++)
            s += afvigelser[i];
        return s * s;
    }
    function sumsquares(afvigelser: number[]) {
        var s = 0;
        for (var i = 0, len = afvigelser.length; i < len; i++)
            s += afvigelser[i] * afvigelser[i];
        return s;
    }
    function returnercostfunction(navn: string) {
        switch (navn.toLocaleLowerCase()) {
            case "sum":
                return sum;
                break;
            case "squaresum":
                return squaresum;
                break;
            case "sumsquares":
                return sumsquares;
                break;
            default:
                alert(navn + ' linje 25 mangler!');
                break;
        }
    }
    export interface Constraint {//behøver ikke slette de ekstra appliesto - bliver ikke anvendt fordi de ikke er i construct
        id: string; name: string; weight: number; appliestoevgrou: EventGroup[]; appliestoev: AEvent[]; appliestoresgrou: ResourceGroup[];
        appliestores: Resource[]; role: string; timer: Time[]; timegroups: TimeGroup[]; minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        minimum: number;
        maximum: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        costfunction: (afv: number[]) => number;
        //costfunction
    }
    export class AvoidClashesConstraint implements Constraint {
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        minimum: number;
        maximum: number;
        appliestoresmangler: ResMangel[];
        duration: number;

        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        timegroups: TimeGroup[];
        appliestores: Resource[];
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class AvoidSplitAssignmentsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        arraymedarrayafresmangler: any[];
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string, public role: string) {
            this.appliestoevgrou = [];
            this.arraymedarrayafresmangler = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class AvoidUnavailableTimesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        arraymedarrayafresmangler: any[];
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.timegroups = [];
            this.timer = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class AssignResourceConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;

        //    appliestoma: Mangel[];
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string, public role: string) {
            this.appliestoevgrou = [];
            this.appliestoresmangler = [];
            this.appliestoev = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }

    export class AssignTimeConstraint implements Constraint {
        appliestoevgrou: EventGroup[]; appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timegroups: TimeGroup[];
        timer: Time[];
        appliestores: Resource[];
        role: string;
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;

        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class DistributeSplitEventsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        role: string;
        timer: Time[];
        timegroups: TimeGroup[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;

        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.costfunction = returnercostfunction(costfunction);
            this.appliestoevgrou = [];
            this.appliestoev = [];

        }

    }

    export class LimitBusyTimesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.timegroups = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class LimitIdleTimesConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.timegroups = [];
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }
    export class LimitWorkloadConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }

    export class LinkEventsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresmangler: ResMangel[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        timegroups: TimeGroup[];
        timer: Time[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        duration: number;
        minimum: number;
        maximum: number;
        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoevgrou = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }

    export class PreferResourcesConstraint implements Constraint {
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;

        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        timegroups: TimeGroup[];
        appliestores: Resource[];
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string, public role: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.appliestoresgrou = [];
            this.appliestores = [];
            this.appliestoresmangler = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }





    export class PreferTimesConstraint implements Constraint {
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;

        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        timer: Time[];
        appliestores: Resource[];
        timegroups: TimeGroup[];

        role: string;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number,
            costfunction: string) {
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.timegroups = [];
            this.timer = [];
            this.costfunction = returnercostfunction(costfunction);
        }
    }

    export class SplitEventsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        role: string;
        timer: Time[];
        timegroups: TimeGroup[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.costfunction = returnercostfunction(costfunction);
            this.appliestoevgrou = [];
            this.appliestoev = [];

        }

    }
    export class SpreadEventsConstraint implements Constraint {
        appliestoevgrou: EventGroup[];
        appliestoev: AEvent[];
        appliestoresgrou: ResourceGroup[];
        appliestores: Resource[];
        role: string;
        timer: Time[];
        timegroups: TimeGroup[];
        minimumduration: number;
        maximumduration: number;
        minimumamount: number;
        maximumamount: number;
        appliestoresmangler: ResMangel[];
        duration: number;
        minimum: number;
        maximum: number;
        timegroupminimum: number[];//timegroupminimum[i]  minimum tilhørende timegroup i
        timegroupmaximum: number[];//timegroupmaximum[i]  maxixmum tilhørende timegroup i
        costfunction: (afv: number[]) => number;
        constructor(public id: string, public name: string, public weight: number, costfunction: string) {
            this.costfunction = returnercostfunction(costfunction);
            this.appliestoevgrou = [];
            this.timegroups = [];
            this.timegroupmaximum = [];
            this.timegroupminimum = [];
        }

    }



    /*  export class SpreadEventsConstraint implements Constraint {
          appliestoevgrou: EventGroup[];
          appliestoev: AEvent[];
          appliestoresgrou: ResourceGroup[];
          appliestores: Resource[];
          timegroups: TimeGroup[];
          role: string;
          costfunction: (afv: number[]) => number;
          timer: Time[];
          minimumduration: number;
          maximumduration: number;
          minimumamount: number;
          maximumamount: number;
          appliestoresmangler: ResMangel[];
          duration: number;
          minimum: number;
          maximum: number;
  
          constructor(public id: string, public name: string, public weight: number, costfunction: string) {
              this.appliestoevgrou = [];
              this.timegroups = [];
              this.timer = [];
              this.appliestoev = [];
              switch (costfunction.toLowerCase()) {
                  case "sum":
                      this.costfunction = sum;
                      break;
                  default:
                      alert('costfunction mangler!' + costfunction);
                      break;
              }
          }
      }*/


    export class Entity {
        constructor(public id: string, public name: string) {
            if (id === undefined || name === undefined)
                alert('Fejl ved indlæsning af ' + id + ',' + name);
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
        eventresourcer: Resource[];//preassignede
        eventresworkloads: number[];//preassignede resourcer workloads - dvs skal have så mange index som ovenstående
        eventresmangler: ResMangel[];//hvis 3 mangler (mangel 1 er lokale) og duration er 4, 
        //så vil resmangel [4],[5],[6],[7] være lokalemanglerne for de 4 durationindex
        //NB! Hvis preassignedtime så vil der ikke være en mangel for hver duration!
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
            this.eventresworkloads = [];
        }
    }
    export class TidMangel {
        index: number;
        constructor(public aevent: AEvent, public durationindex: number) {
            if (aevent === null || durationindex === null)
                alert('fejl ved indlæsningh af tidmangel ');
            this.index = tidmangler.length;
            tidmangler.push(this);
        }

    }
    export class ResMangel {
        index: number;
        constructor(public role: string, public resourcetype: ResourceType, public aevent: AEvent,
            public durationindex: number, public workload?: number) {
            if (role === null || resourcetype === null)
                alert('fejl ved indlæsningh af mangel ' + role + ',' + resourcetype.name);
            this.index = resmangler.length;
            resmangler.push(this);


            /*  if (duration >1) {
                  alert('bingo');
              }*/
        }
    }
    export function readinstance(nobj: Object) {//bør lave tjek på resgroup om array eller ej
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
            var nytime = new Time(curtime["Name"], curtime["Id"]);
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
                    if (k["Reference"]) {//hvis der findes reference så er der flere og de bliver loopet
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
        antaltider = timer.length;
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
        antalresourcer = resourcer.length;
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
            if (curev["Workload"] == null)
                var wl = null;
            else
                wl = Number(curev["Workload"]);
            var nyev = new AEvent(curev["Id"], curev["Name"], Number(curev["Duration"]), wl, preassigntime);
            if (!preassigntime) {
                for (var i = 0; i < nyev.duration; i++)
                    nyev.eventtidmangler.push(new TidMangel(nyev, i));
            }
            else
                var hje = 3;
            for (var key2 in curev["Course"]) {
                var evg = curev["Course"][key2];
                if (evgruppeid.indexOf(evg) > -1) {
                    var evgr = eventgrupper[evgruppeid.indexOf(evg)];
                    nyev.eventeventgrupper.push(evgr);
                    evgr.events.push(nyev);
                }
                else
                    alert('fejl ved indlæsning af event ' + curev["Name"]);
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
                        alert('fejl3 ved indlæsning af evengroups for event ' + curev["Name"]);
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
            if (preassigntime && nyev.eventresourcer.length > 0 && nyev.eventresmangler.length > 0) {
                var her = 2;
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
            assert(true, 'kunne ikke læse ' + url);
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
                var wl = thisres["Workload"];
                nyev.eventresworkloads.push(wl);
            }
            else
                alert('fejl5 ved indlæsning af resource for ');
        }
        else {
            if ("Role" in thisres && "ResourceType" in thisres) {
                var curtype = resourcetyper[typeid.indexOf(thisres["ResourceType"]["Reference"])];
                if (curtype) {
                    if (thisres["Workload"] == null)
                        var wl = null;
                    else
                        wl = Number(thisres["Workload"]);
                    if (nyev.preasigntime)
                        nyev.eventresmangler.push(new ResMangel(thisres["Role"], curtype, nyev, null, wl));
                    else
                        for (var i = 0, len = nyev.duration; i < len; i++)
                            nyev.eventresmangler.push(new ResMangel(thisres["Role"], curtype, nyev, i, wl));
                }
                else
                    alert('fejlx v res event');
            }
            else {
                //var fddfdfsk = nobj["jk"]["jk"];
                alert('fejl v res event');
            }
        }

    }
    function lavcon(constraint: Object, type: string, evgruppeid: string[], evid: string[], resid: string[], resgrupid: string[], tidid: string[], tidgrupid: string[]) {
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
            case "AvoidUnavailableTimesConstraint":
                var nycon = new AvoidUnavailableTimesConstraint(id, na, we, co);
                break;
            case "AvoidClashesConstraint":
                var nycon = new AvoidClashesConstraint(id, na, we, co);
                break;
            case "AvoidSplitAssignmentsConstraint":
                var nycon = new AvoidSplitAssignmentsConstraint(id, na, we, co, ro);
                break;

            case "DistributeSplitEventsConstraint":
                var nycon = new DistributeSplitEventsConstraint(id, na, we, co);
                break;
            case "LimitBusyTimesConstraint":
                var nycon = new LimitBusyTimesConstraint(id, na, we, co);
                break;
            case "LimitIdleTimesConstraint":
                var nycon = new LimitIdleTimesConstraint(id, na, we, co);
                break;
            case "LimitWorkloadConstraint":
                var nycon = new LimitWorkloadConstraint(id, na, we, co);
                break;

            case "LinkEventsConstraint":
                var nycon = new LinkEventsConstraint(id, na, we, co);
                break;
            case "PreferTimesConstraint":
                var nycon = new PreferTimesConstraint(id, na, we, co);
                break;
            case "SpreadEventsConstraint":
                var nycon = new SpreadEventsConstraint(id, na, we, co);
                break;
            case "PreferResourcesConstraint":
                var nycon = new PreferResourcesConstraint(id, na, we, co, ro);
                break;
            case "SplitEventsConstraint":
                var nycon = new SplitEventsConstraint(id, na, we, co);
                break;
            case "DistributeSplitEventsConstraint":
                assert(na, true);
                break;



            default:

                // alert constraint ikke understøttet    var fddfdfsk = constraint["jk"]["jk"];
                break;

        }
        if (nycon) {
            if ("MinimumAmount" in constraint)
                nycon.minimumamount = constraint["MinimumAmount"];
            if ("MinimumDuration" in constraint)
                nycon.minimumduration = constraint["MinimumDuration"];
            if ("MaximumDuration" in constraint)
                nycon.maximumduration = constraint["MaximumDuration"];
            if ("Minimum" in constraint)
                nycon.minimum = constraint["Minimum"];
            if ("Maximum" in constraint)
                nycon.maximum = constraint["Maximum"];
            if ("MaximumAmount" in constraint)
                nycon.maximumamount = constraint["MaximumAmount"];
            if ("Duration" in constraint)
                nycon.duration = constraint["Duration"];

            if (constraint["AppliesTo"]["Events"]) {
                var appliesto = constraint["AppliesTo"];
                //       if ("EventGroups" in appliesto) //if array
                if (appliesto["Events"]["Event"] instanceof Array)
                    for (var key in appliesto["Events"]["Event"])
                        nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"][key]["Reference"])]);
                else
                    nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"]["Reference"])]);
            }
            if (constraint["AppliesTo"]["EventGroups"]) {
                var appliesto = constraint["AppliesTo"];
                if (appliesto["EventGroups"]["EventGroup"] instanceof Array)
                    for (var key in appliesto["EventGroups"]["EventGroup"]) {
                        var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"][key]["Reference"])];
                        nycon.appliestoevgrou.push(gr);
                        if (nycon.appliestoev)//spreadevents har appliestoevgr men ikke appliestoev
                            for (var i = 0, len = gr.events.length; i < len; i++)
                                if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                                    nycon.appliestoev.push(gr.events[i]);
                    }
                else {
                    var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"]["Reference"])];
                    nycon.appliestoevgrou.push(gr);
                    if (nycon.appliestoev)//spreadevents har appliestoevgr men ikke appliestoev
                        for (var i = 0, len = gr.events.length; i < len; i++)
                            if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                                nycon.appliestoev.push(gr.events[i]);
                }
            }

            if (constraint["Times"]) {
                var t = constraint["Times"]["Time"];
                if (t)
                    if (t instanceof Array)
                        for (var key in t)
                            nycon.timer.push(timer[tidid.indexOf(t[key]["Reference"])]);
                    else
                        nycon.timer.push(timer[tidid.indexOf(t["Reference"])]);
                else
                    var her = 4;//ingen tid i denne constraint - kan slettes??
            }
            if (constraint["TimeGroups"]) {
                var tg = constraint["TimeGroups"]["TimeGroup"];
                if (tg instanceof Array) {
                    for (var key in tg) {
                        var tgr = tidsgrupper[tidgrupid.indexOf(tg[key]["Reference"])];
                        nycon.timegroups.push(tgr);
                        if ("Minimum" in tg[key]) {
                            (<SpreadEventsConstraint>nycon).timegroupminimum.push(tg[key]["Minimum"]);
                            (<SpreadEventsConstraint>nycon).timegroupmaximum.push(tg[key]["Maximum"]);
                        }
                        if (nycon.timer)//nødvendig fordi spreadevents (o.a.) har timegroups men ikke timer
                            for (var i = 0, len = tgr.timer.length; i < len; i++)
                                if (nycon.timer.indexOf(tgr.timer[i]) == -1)
                                    nycon.timer.push(tgr.timer[i]);
                    }
                }
                else {
                    if ("Minimum" in tg) {
                        (<SpreadEventsConstraint>nycon).timegroupminimum.push(tg["Minimum"]);
                        (<SpreadEventsConstraint>nycon).timegroupmaximum.push(tg["Maximum"]);
                    }
                    var tgr = tidsgrupper[tidgrupid.indexOf(tg["Reference"])];
                    nycon.timegroups.push(tgr);
                    if (nycon.timer)//nødvendig fordi spreadevents har timegroups men ikke timer
                        for (var i = 0, len = tgr.timer.length; i < len; i++)
                            if (nycon.timer.indexOf(tgr.timer[i]) == -1)
                                nycon.timer.push(tgr.timer[i]);
                }
            }

            if (constraint["Resources"] || constraint["AppliesTo"]["Resources"]) {
                if (constraint["Resources"])
                    var appliesto = constraint["Resources"]["Resource"];
                else
                    var appliesto = constraint["AppliesTo"]["Resources"]["Resource"];
                if (appliesto instanceof Array)
                    for (var key in appliesto)
                        nycon.appliestores.push(resourcer[resid.indexOf(appliesto[key]["Reference"])]);//VIRKER DETTE??
                else
                    nycon.appliestores.push(resourcer[resid.indexOf(appliesto["Reference"])]);


                //implemter
            }
            if (constraint["AppliesTo"]["ResourceGroups"] || constraint["ResourceGroups"]) {
                if (constraint["ResourceGroups"])
                    var appliesto = constraint["ResourceGroups"];
                else
                    var appliesto = constraint["AppliesTo"]["ResourceGroups"];
                if (appliesto["ResourceGroup"] instanceof Array)
                    for (var key in appliesto["ResourceGroup"]) {
                        var rgr: ResourceGroup = resourcegrupper[resgrupid.indexOf(appliesto["ResourceGroup"][key]["Reference"])];
                        nycon.appliestoresgrou.push(rgr);
                        for (var i = 0, len = rgr.resourcer.length; i < len; i++)
                            if (nycon.appliestores.indexOf(rgr.resourcer[i]) == -1)
                                nycon.appliestores.push(rgr.resourcer[i]);
                    }
                else {
                    var rgr: ResourceGroup = resourcegrupper[resgrupid.indexOf(appliesto["ResourceGroup"]["Reference"])];
                    nycon.appliestoresgrou.push(rgr);
                    for (var i = 0, len = rgr.resourcer.length; i < len; i++)
                        if (nycon.appliestores.indexOf(rgr.resourcer[i]) == -1)
                            nycon.appliestores.push(rgr.resourcer[i]);
                }
            }
            switch (type) {
                case "AssignResourceConstraint":
                    var apptoev = nycon.appliestoev;
                    for (var i = 0; i < apptoev.length; i++) {
                        var thiseventmangler = apptoev[i].eventresmangler;
                        for (var j = 0; j < thiseventmangler.length; j++)
                            if (thiseventmangler[j].role == nycon.role)
                                nycon.appliestoresmangler.push(thiseventmangler[j]);
                    }
                    break;
                case "PreferResourcesConstraint":
                    var apptoev = nycon.appliestoev;
                    for (var i = 0; i < apptoev.length; i++) {
                        var thiseventmangler = apptoev[i].eventresmangler;
                        for (var j = 0; j < thiseventmangler.length; j++)
                            if (thiseventmangler[j].role == nycon.role)
                                nycon.appliestoresmangler.push(thiseventmangler[j]);
                    }
                    break;

                case "AvoidSplitAssignmentsConstraint":
                    var apptoevgrs = nycon.appliestoevgrou;
                    for (var k = 0; k < apptoevgrs.length; k++) {
                        var apptoevgr = apptoevgrs[k];
                        var tmp = [];
                        for (var l = 0; l < apptoevgr.events.length; l++) {
                            var apptoev = apptoevgr.events;
                            for (var i = 0; i < apptoev.length; i++) {
                                var thiseventmangler = apptoev[i].eventresmangler;
                                for (var j = 0; j < thiseventmangler.length; j++)
                                    if (thiseventmangler[j].role == nycon.role)
                                        tmp.push(thiseventmangler[j]);
                            }
                        }
                        (<AvoidSplitAssignmentsConstraint>nycon).arraymedarrayafresmangler.push(tmp);
                    }
                    break;


            }
            if (ha)// if (nycon =prefertimes - angiv de mulige tider i eventsene
                hardconstraints.push(nycon);
            else
                softconstraints.push(nycon);
        }
    }
}