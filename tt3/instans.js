var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var instans;
(function (instans) {
    function sum(afvigelser) {
        var s = 0;
        for(var i = 0, len = afvigelser.length; i < len; i++) {
            s += afvigelser[i];
        }
        return s;
    }
    var AvoidClashesConstraint = (function () {
        function AvoidClashesConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestoresgrou = [];
            this.appliestores = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
        }
        return AvoidClashesConstraint;
    })();
    instans.AvoidClashesConstraint = AvoidClashesConstraint;    
    var AssignResourceConstraint = (function () {
        function AssignResourceConstraint(id, name, weight, costfunction, role) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.role = role;
            this.appliestoevgrou = [];
            this.appliestoresmangler = [];
            this.appliestoev = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
        }
        return AssignResourceConstraint;
    })();
    instans.AssignResourceConstraint = AssignResourceConstraint;    
    var AssignTimeConstraint = (function () {
        function AssignTimeConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestoevgrou = [];
            this.appliestoev = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
        }
        return AssignTimeConstraint;
    })();
    instans.AssignTimeConstraint = AssignTimeConstraint;    
    var DistributeSplitEventsConstraint = (function () {
        function DistributeSplitEventsConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
            this.appliestoevgrou = [];
            this.appliestoev = [];
        }
        return DistributeSplitEventsConstraint;
    })();
    instans.DistributeSplitEventsConstraint = DistributeSplitEventsConstraint;    
    var PreferResourcesConstraint = (function () {
        function PreferResourcesConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.appliestoresgrou = [];
            this.appliestores = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
        }
        return PreferResourcesConstraint;
    })();
    instans.PreferResourcesConstraint = PreferResourcesConstraint;    
    var PreferTimesConstraint = (function () {
        function PreferTimesConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestoevgrou = [];
            this.appliestoev = [];
            this.timegroups = [];
            this.timer = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
        }
        return PreferTimesConstraint;
    })();
    instans.PreferTimesConstraint = PreferTimesConstraint;    
    var SplitEventsConstraint = (function () {
        function SplitEventsConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
            this.appliestoevgrou = [];
            this.appliestoev = [];
        }
        return SplitEventsConstraint;
    })();
    instans.SplitEventsConstraint = SplitEventsConstraint;    
    var SpreadEventsConstraint = (function () {
        function SpreadEventsConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
                    break;
                default:
                    alert('costfunction mangler!' + costfunction);
                    break;
            }
            this.appliestoevgrou = [];
            this.timegroups = [];
            this.timegroupmaximum = [];
            this.timegroupminimum = [];
        }
        return SpreadEventsConstraint;
    })();
    instans.SpreadEventsConstraint = SpreadEventsConstraint;    
    var Entity = (function () {
        function Entity(id, name) {
            this.id = id;
            this.name = name;
            if(id === undefined || name === undefined) {
                alert('Fejl ved indlæsning af ' + id + ',' + name);
            }
        }
        return Entity;
    })();
    instans.Entity = Entity;    
    var Time = (function (_super) {
        __extends(Time, _super);
        function Time(name, id) {
                _super.call(this, id, name);
            this.timegroups = [];
            this.index = timer.length;
        }
        return Time;
    })(Entity);
    instans.Time = Time;    
    var TimeGroup = (function (_super) {
        __extends(TimeGroup, _super);
        function TimeGroup(name, id) {
                _super.call(this, id, name);
            this.timer = [];
        }
        return TimeGroup;
    })(Entity);
    instans.TimeGroup = TimeGroup;    
    var Week = (function (_super) {
        __extends(Week, _super);
        function Week(name, id) {
                _super.call(this, id, name);
            this.timer = [];
        }
        return Week;
    })(TimeGroup);
    instans.Week = Week;    
    var Day = (function (_super) {
        __extends(Day, _super);
        function Day(name, id) {
                _super.call(this, id, name);
            this.timer = [];
        }
        return Day;
    })(TimeGroup);
    instans.Day = Day;    
    var EventGroup = (function (_super) {
        __extends(EventGroup, _super);
        function EventGroup(name, id) {
                _super.call(this, id, name);
            this.events = [];
        }
        return EventGroup;
    })(Entity);
    instans.EventGroup = EventGroup;    
    var Course = (function (_super) {
        __extends(Course, _super);
        function Course(name, id) {
                _super.call(this, id, name);
        }
        return Course;
    })(EventGroup);
    instans.Course = Course;    
    var ResourceType = (function (_super) {
        __extends(ResourceType, _super);
        function ResourceType(name, id) {
                _super.call(this, id, name);
            this.resourcegroups = [];
        }
        return ResourceType;
    })(Entity);
    instans.ResourceType = ResourceType;    
    var ResourceGroup = (function (_super) {
        __extends(ResourceGroup, _super);
        function ResourceGroup(name, id, resourcetype) {
                _super.call(this, id, name);
            this.resourcetype = resourcetype;
            this.resourcer = [];
        }
        return ResourceGroup;
    })(Entity);
    instans.ResourceGroup = ResourceGroup;    
    var Resource = (function (_super) {
        __extends(Resource, _super);
        function Resource(name, id, resourcetype) {
                _super.call(this, id, name);
            this.resourcetype = resourcetype;
            this.resourcegroups = [];
            this.index = resourcer.length;
        }
        return Resource;
    })(Entity);
    instans.Resource = Resource;    
    var AEvent = (function () {
        function AEvent(id, name, duration, workload, preasigntime) {
            this.id = id;
            this.name = name;
            this.duration = duration;
            this.workload = workload;
            this.preasigntime = preasigntime;
            this.eventeventgrupper = [];
            this.eventresourcegrupper = [];
            this.eventresourcer = [];
            this.eventresmangler = [];
            this.eventtidmangler = [];
            this.index = events.length;
        }
        return AEvent;
    })();
    instans.AEvent = AEvent;    
    var TidMangel = (function () {
        function TidMangel(aevent, durationindex) {
            this.aevent = aevent;
            this.durationindex = durationindex;
            if(aevent === null || durationindex === null) {
                alert('fejl ved indlæsningh af tidmangel ');
            }
            this.index = tidmangler.length;
            tidmangler.push(this);
        }
        return TidMangel;
    })();
    instans.TidMangel = TidMangel;    
    var ResMangel = (function () {
        function ResMangel(role, resourcetype, aevent, durationindex, workload) {
            this.role = role;
            this.resourcetype = resourcetype;
            this.aevent = aevent;
            this.durationindex = durationindex;
            this.workload = workload;
            if(role === null || resourcetype === null) {
                alert('fejl ved indlæsningh af mangel ' + role + ',' + resourcetype.name);
            }
            this.index = resmangler.length;
            resmangler.push(this);
        }
        return ResMangel;
    })();
    instans.ResMangel = ResMangel;    
    function readinstance(nobj) {
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
        var k, kk;
        var tidgruppeid = [];
        var resid = [];
        var tidid = [];
        var times = nobj["Instances"]["Instance"]["Times"];
        var grps = times["TimeGroups"];
        xmlinstans = nobj["Instances"]["Instance"]["Id"];
        if("Week" in grps) {
            var tmp = grps["Week"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new Week(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new Week(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        if("Day" in grps) {
            var tmp = grps["Day"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new Day(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new Day(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        if("TimeGroup" in grps) {
            var tmp = grps["TimeGroup"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new TimeGroup(tmp[key]["Id"], tmp[key]["Name"]));
                    tidgruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new TimeGroup(tmp["Id"], tmp["Name"]));
                tidgruppeid.push(tmp["Id"]);
            }
        }
        grps = null;
        tmp = times["Time"];
        for(var key in tmp) {
            var curtime = tmp[key];
            var nytime = new Time(curtime["Id"], curtime["Name"]);
            if(curtime["Week"]) {
                var tmg = tidsgrupper[tidgruppeid.indexOf(curtime["Week"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if(curtime["Day"]) {
                var tmg = tidsgrupper[tidgruppeid.indexOf(curtime["Day"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if(curtime["TimeGroups"]) {
                var tmpg = curtime["TimeGroups"]["TimeGroup"];
                for(var key in tmpg) {
                    var k = tmpg[key];
                    if(k["Reference"]) {
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
        var restypeid = [];
        var resgrupid = [];
        if(res["ResourceTypes"]) {
            tmp = res["ResourceTypes"]["ResourceType"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    resourcetyper.push(new ResourceType(tmp[key]["Name"], tmp[key]["Id"]));
                    restypeid.push(tmp[key]["Id"]);
                }
            } else {
                resourcetyper.push(new ResourceType(tmp["Name"], tmp["Id"]));
                restypeid.push(tmp["Id"]);
            }
        }
        if(res["ResourceGroups"]) {
            tmp = res["ResourceGroups"]["ResourceGroup"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    var curgr = tmp[key];
                    var restyp = resourcetyper[restypeid.indexOf(curgr["ResourceType"]["Reference"])];
                    var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                    resourcegrupper.push(resgr);
                    restyp.resourcegroups.push(resgr);
                    resgrupid.push(curgr["Id"]);
                }
            } else {
                var curgr = tmp;
                var restyp = resourcetyper[restypeid.indexOf(curgr["ResourceType"]["Reference"])];
                var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                resourcegrupper.push(resgr);
                restyp.resourcegroups.push(resgr);
                resgrupid.push(curgr["Id"]);
            }
        }
        tmp = res["Resource"];
        for(var key in tmp) {
            var curres = tmp[key];
            var nyres = new Resource(curres["Name"], curres["Id"], resourcetyper[restypeid.indexOf(curres["ResourceType"]["Reference"])]);
            for(var key2 in curres["ResourceGroups"]["ResourceGroup"]) {
                k = curres["ResourceGroups"]["ResourceGroup"][key2];
                if(resgr = resourcegrupper[resgrupid.indexOf(k)]) {
                    if(resgr === undefined) {
                        alert('fejl ved ' + curres["Id"]);
                    } else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }
                } else {
                    var resgr = resourcegrupper[resgrupid.indexOf(k["Reference"])];
                    if(resgr === undefined) {
                        alert('fejl ved ' + curres["Id"]);
                    } else {
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
        var evgruppeid = [];
        if(ev["EventGroups"]) {
            var evgru = ev["EventGroups"]["Course"];
            if(evgru) {
                if(evgru instanceof Array) {
                    for(var key in evgru) {
                        eventgrupper.push(new Course(evgru[key]["Name"], evgru[key]["Id"]));
                        evgruppeid.push(evgru[key]["Id"]);
                    }
                } else {
                    eventgrupper.push(new Course(evgru["Name"], evgru["Id"]));
                    evgruppeid.push(evgru["Id"]);
                }
            }
            evgru = ev["EventGroups"]["EventGroup"];
            if(evgru) {
                if(evgru instanceof Array) {
                    for(var key in evgru) {
                        eventgrupper.push(new EventGroup(evgru[key]["Name"], evgru[key]["Id"]));
                        evgruppeid.push(evgru[key]["Id"]);
                    }
                } else {
                    eventgrupper.push(new EventGroup(evgru["Name"], evgru["Id"]));
                    evgruppeid.push(evgru["Id"]);
                }
            }
        }
        ev = ev["Event"];
        var evid = [];
        for(var key in ev) {
            var curev = ev[key];
            var preassigntime = null;
            if(curev["Time"]) {
                var timeref = curev["Time"]["Reference"];
                for(var i = 0, len = timer.length; i < len; i++) {
                    if(timer[i].id == timeref) {
                        preassigntime = timer[i];
                        i = len;
                    }
                }
                if(!preassigntime) {
                    alert('Preassigned tid ikke fundet for ' + curev["Name"]);
                }
            }
            var nyev = new AEvent(curev["Id"], curev["Name"], Number(curev["Duration"]), curev["Workload"], preassigntime);
            if(!preassigntime) {
                for(var i = 0; i < nyev.duration; i++) {
                    nyev.eventtidmangler.push(new TidMangel(nyev, i));
                }
            } else {
                var hje = 3;
            }
            for(var key2 in curev["Course"]) {
                var evg = curev["Course"][key2];
                if(evgruppeid.indexOf(evg) > -1) {
                    var evgr = eventgrupper[evgruppeid.indexOf(evg)];
                    nyev.eventeventgrupper.push(evgr);
                    evgr.events.push(nyev);
                } else {
                    alert('fejl ved indlæsning af event ' + curev["Name"]);
                }
            }
            if(curev["EventGroups"]) {
                evgru = curev["EventGroups"];
                if(evgru["EventGroup"]) {
                    evgru = evgru["EventGroup"];
                }
                for(var key in evgru) {
                    var k = evgru[key];
                    var kk = evgruppeid.indexOf(k["Reference"]);
                    if(kk == -1) {
                        kk = evgruppeid.indexOf(k);
                    }
                    if(kk == -1) {
                        alert('fejl3 ved indlæsning af evengroups for event ' + curev["Name"]);
                    } else {
                        var evgr = eventgrupper[kk];
                        nyev.eventeventgrupper.push(evgr);
                        evgr.events.push(nyev);
                    }
                }
            }
            if("Resources" in curev) {
                if(curev["Resources"]["Resource"]) {
                    if(curev["Resources"]["Resource"] instanceof Array) {
                        for(var i = 0, len = curev["Resources"]["Resource"].length; i < len; i++) {
                            lavres(curev["Resources"]["Resource"][i], resid, nyev, restypeid);
                        }
                    } else {
                        lavres(curev["Resources"]["Resource"], resid, nyev, restypeid);
                    }
                }
            }
            if(preassigntime && nyev.eventresourcer.length > 0 && nyev.eventresmangler.length > 0) {
                var her = 2;
            }
            events.push(nyev);
            evid.push(nyev.id);
        }
        antalevents = events.length;
        var con = nobj["Instances"]["Instance"]["Constraints"];
        for(var key in con) {
            if(con[key] instanceof Array) {
                for(var i = 0, len = con[key].length; i < len; i++) {
                    lavcon(con[key][i], key, evgruppeid, evid, resid, resgrupid, tidid, tidgruppeid);
                }
            } else {
                lavcon(con[key], key, evgruppeid, evid, resid, resgrupid, tidid, tidgruppeid);
            }
        }
    }
    instans.readinstance = readinstance;
    function readxml(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);
        xmlDoc = xmlhttp.responseXML;
        var bingo = -1;
        for(var i = 0, len = xmlDoc.childNodes.length; i < len; i++) {
            if(xmlDoc.childNodes[i].nodeName === 'HighSchoolTimetableArchive') {
                bingo = i;
                i = len;
            }
        }
        if(bingo > -1) {
            xmlinstans = xmlDoc.childNodes[bingo].childNodes[0].nodeValue;
            readinstance(XML2jsobj(xmlDoc.childNodes[bingo]));
        } else {
            assert(true, 'kunne ikke læse ' + url);
        }
        function XML2jsobj(node) {
            var data = {
            };
            function Add(name, value) {
                if(data[name]) {
                    if(data[name].constructor != Array) {
                        data[name] = [
                            data[name]
                        ];
                    }
                    data[name][data[name].length] = value;
                } else {
                    data[name] = value;
                }
            }
            ;
            var c, cn;
            for(c = 0; cn = node.attributes[c]; c++) {
                Add(cn.name, cn.value);
            }
            for(c = 0; cn = node.childNodes[c]; c++) {
                if(cn.nodeType == 1) {
                    if(cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
                        Add(cn.nodeName, cn.firstChild.nodeValue);
                    } else {
                        Add(cn.nodeName, XML2jsobj(cn));
                    }
                }
            }
            return data;
        }
    }
    instans.readxml = readxml;
    function lavres(thisres, resid, nyev, typeid) {
        if("Reference" in thisres) {
            var curres = resourcer[resid.indexOf(thisres["Reference"])];
            if(curres) {
                nyev.eventresourcer.push(curres);
                if(!curres.preass) {
                    curres.preass = [];
                }
                curres.preass.push(nyev);
            } else {
                alert('fejl5 ved indlæsning af resource for ');
            }
        } else {
            if("Role" in thisres && "ResourceType" in thisres) {
                var curtype = resourcetyper[typeid.indexOf(thisres["ResourceType"]["Reference"])];
                if(curtype) {
                    if(nyev.preasigntime) {
                        nyev.eventresmangler.push(new ResMangel(thisres["Role"], curtype, nyev, null, thisres["Workload"]));
                    } else {
                        for(var i = 0, len = nyev.duration; i < len; i++) {
                            nyev.eventresmangler.push(new ResMangel(thisres["Role"], curtype, nyev, i, thisres["Workload"]));
                        }
                    }
                } else {
                    alert('fejlx v res event');
                }
            } else {
                alert('fejl v res event');
            }
        }
    }
    function lavcon(constraint, type, evgruppeid, evid, resid, resgrupid, tidid, tidgrupid) {
        var na = constraint["Name"];
        var id = constraint["Id"];
        var we = constraint["Weight"];
        var ha = constraint["Required"] == "true";
        var co = constraint["CostFunction"];
        var ro = constraint["Role"];
        var nycon;
        switch(type) {
            case "AssignResourceConstraint":
                var nycon = new AssignResourceConstraint(id, na, we, co, ro);
                break;
            case "AssignTimeConstraint":
                var nycon = new AssignTimeConstraint(id, na, we, co);
                break;
            case "DistributeSplitEventsConstraint":
                var nycon = new DistributeSplitEventsConstraint(id, na, we, co);
                break;
            case "LimitBusyTimesConstraint":
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
            case "SplitEventsConstraint":
                var nycon = new SplitEventsConstraint(id, na, we, co);
                break;
            case "DistributeSplitEventsConstraint":
                assert(na, true);
                break;
            case "AvoidClashesConstraint":
                var nycon = new AvoidClashesConstraint(id, na, we, co);
                break;
            default:
                break;
        }
        if(nycon) {
            if("MinimumAmount" in constraint) {
                nycon.minimumamount = constraint["MinimumAmount"];
            }
            if("MinimumDuration" in constraint) {
                nycon.minimumduration = constraint["MinimumDuration"];
            }
            if("MaximumDuration" in constraint) {
                nycon.maximumduration = constraint["MaximumDuration"];
            }
            if("Minimum" in constraint) {
                nycon.minimum = constraint["Minimum"];
            }
            if("Maximum" in constraint) {
                nycon.maximum = constraint["Maximum"];
            }
            if("MaximumAmount" in constraint) {
                nycon.maximumamount = constraint["MaximumAmount"];
            }
            if("Duration" in constraint) {
                nycon.duration = constraint["Duration"];
            }
            if(constraint["AppliesTo"]["Events"]) {
                var appliesto = constraint["AppliesTo"];
                if(appliesto["Events"]["Event"] instanceof Array) {
                    for(var key in appliesto["Events"]["Event"]) {
                        nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"][key]["Reference"])]);
                    }
                } else {
                    nycon.appliestoev.push(events[evid.indexOf(appliesto["Events"]["Event"]["Reference"])]);
                }
            }
            if(constraint["AppliesTo"]["EventGroups"]) {
                var appliesto = constraint["AppliesTo"];
                if(appliesto["EventGroups"]["EventGroup"] instanceof Array) {
                    for(var key in appliesto["EventGroups"]["EventGroup"]) {
                        var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"][key]["Reference"])];
                        nycon.appliestoevgrou.push(gr);
                        if(nycon.appliestoev) {
                            for(var i = 0, len = gr.events.length; i < len; i++) {
                                if(nycon.appliestoev.indexOf(gr.events[i]) == -1) {
                                    nycon.appliestoev.push(gr.events[i]);
                                }
                            }
                        }
                    }
                } else {
                    var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"]["Reference"])];
                    nycon.appliestoevgrou.push(gr);
                    if(nycon.appliestoev) {
                        for(var i = 0, len = gr.events.length; i < len; i++) {
                            if(nycon.appliestoev.indexOf(gr.events[i]) == -1) {
                                nycon.appliestoev.push(gr.events[i]);
                            }
                        }
                    }
                }
            }
            if(constraint["Times"]) {
                var t = constraint["Times"]["Time"];
                if(t instanceof Array) {
                    for(var key in t) {
                        nycon.timer.push(timer[tidid.indexOf(t[key]["Reference"])]);
                    }
                } else {
                    nycon.timer.push(timer[tidid.indexOf(t["Reference"])]);
                }
            }
            if(constraint["TimeGroups"]) {
                var tg = constraint["TimeGroups"]["TimeGroup"];
                if(tg instanceof Array) {
                    for(var key in tg) {
                        var tgr = tidsgrupper[tidgrupid.indexOf(tg[key]["Reference"])];
                        nycon.timegroups.push(tgr);
                        if("Minimum" in tg[key]) {
                            (nycon).timegroupminimum.push(tg[key]["Minimum"]);
                            (nycon).timegroupmaximum.push(tg[key]["Maximum"]);
                        }
                        if(nycon.timer) {
                            for(var i = 0, len = tgr.timer.length; i < len; i++) {
                                if(nycon.timer.indexOf(tgr.timer[i]) == -1) {
                                    nycon.timer.push(tgr.timer[i]);
                                }
                            }
                        }
                    }
                } else {
                    if("Minimum" in tg) {
                        (nycon).timegroupminimum.push(tg["Minimum"]);
                        (nycon).timegroupmaximum.push(tg["Maximum"]);
                    }
                    var tgr = tidsgrupper[tidgrupid.indexOf(tg["Reference"])];
                    nycon.timegroups.push(tgr);
                    if(nycon.timer) {
                        for(var i = 0, len = tgr.timer.length; i < len; i++) {
                            if(nycon.timer.indexOf(tgr.timer[i]) == -1) {
                                nycon.timer.push(tgr.timer[i]);
                            }
                        }
                    }
                }
            }
            if(constraint["Resource"]) {
                alert('nu skal resource under lavconstraints kodes!');
            }
            if(constraint["AppliesTo"]["ResourceGroups"] || constraint["ResourceGroups"]) {
                if(constraint["ResourceGroups"]) {
                    var appliesto = constraint["ResourceGroups"];
                } else {
                    var appliesto = constraint["AppliesTo"]["ResourceGroups"];
                }
                if(appliesto["ResourceGroup"] instanceof Array) {
                    for(var key in appliesto["ResourceGroup"]) {
                        var rgr = resourcegrupper[resgrupid.indexOf(appliesto["ResourceGroup"][key]["Reference"])];
                        nycon.appliestoresgrou.push(rgr);
                        for(var i = 0, len = rgr.resourcer.length; i < len; i++) {
                            if(nycon.appliestores.indexOf(rgr.resourcer[i]) == -1) {
                                nycon.appliestores.push(rgr.resourcer[i]);
                            }
                        }
                    }
                } else {
                    var egr = resourcegrupper[resgrupid.indexOf(appliesto["ResourceGroup"]["Reference"])];
                    nycon.appliestoresgrou.push(egr);
                }
            }
            switch(type) {
                case "AssignResourceConstraint":
                    var apptoev = nycon.appliestoev;
                    for(var i = 0; i < apptoev.length; i++) {
                        var thiseventmangler = apptoev[i].eventresmangler;
                        for(var j = 0; j < thiseventmangler.length; j++) {
                            if(thiseventmangler[j].role == nycon.role) {
                                nycon.appliestoresmangler.push(thiseventmangler[j]);
                            }
                        }
                    }
                    nycon.appliestoresmangler.push;
                    break;
            }
            if(ha) {
                hardconstraints.push(nycon);
            } else {
                softconstraints.push(nycon);
            }
        }
    }
})(instans || (instans = {}));
