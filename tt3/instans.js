var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="solution.ts" />
/// <reference path="hoved.ts" />
var instans;
(function (instans) {
    function sum(afvigelser) {
        var s = 0;
        for(var i = 0, len = afvigelser.length; i < len; i++) {
            s += afvigelser[i];
        }
        return s;
    }
    //costfunction
    var AssignResourceConstraint = (function () {
        function AssignResourceConstraint(id, name, weight, costfunction, role) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.role = role;
            this.appliestogre = [];
            this.appliestoev = [];
            //   this.appliestoma = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
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
            this.appliestogre = [];
            this.appliestoev = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
        return AssignTimeConstraint;
    })();
    instans.AssignTimeConstraint = AssignTimeConstraint;    
    var PreferResourcesConstraint = (function () {
        function PreferResourcesConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestogre = [];
            this.appliestoev = [];
            this.appliestogrr = [];
            this.appliestores = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
        return PreferResourcesConstraint;
    })();    
    var PreferTimesConstraint = (function () {
        function PreferTimesConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestogre = [];
            this.appliestoev = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
        return PreferTimesConstraint;
    })();    
    var SpreadEventsConstraint = (function () {
        function SpreadEventsConstraint(id, name, weight, costfunction) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.appliestogre = [];
            this.appliestoev = [];
            switch(costfunction.toLowerCase()) {
                case "sum":
                    this.costfunction = sum;
            }
        }
        return SpreadEventsConstraint;
    })();    
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
            this.solevent = [];
            this.eventeventgrupper = [];
            this.eventresourcegrupper = [];
            this.eventresourcer = [];
            this.eventmangler = [];
            /*  if (duration >1) {
            alert('bingo');
            }*/
                    }
        return AEvent;
    })();
    instans.AEvent = AEvent;    
    var Mangel = (function () {
        function Mangel(role, resourcetype, workload) {
            this.role = role;
            this.resourcetype = resourcetype;
            this.workload = workload;
            if(role === null || resourcetype === null) {
                alert('fejl ved indlæsningh af mangel ' + role + ',' + resourcetype.name);
            }
        }
        return Mangel;
    })();
    instans.Mangel = Mangel;    
    function readinstance(nobj) {
        //bør lave tjek på resgroup om array eller ej
        hardconstraints = [];
        softconstraints = [];
        timer = [];
        tidsgrupper = [];
        events = [];
        resourcegrupper = [];
        resourcetyper = [];
        resourcer = [];
        eventgrupper = [];
        var k, kk;
        var gruppeid = [];
        var resid = [];
        var times = nobj["Instances"]["Instance"]["Times"];
        var grps = times["TimeGroups"];
        if("Week" in grps) {
            var tmp = grps["Week"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new Week(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new Week(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        if("Day" in grps) {
            var tmp = grps["Day"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new Day(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new Day(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        if("TimeGroup" in grps) {
            var tmp = grps["TimeGroup"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    tidsgrupper.push(new TimeGroup(tmp[key]["Id"], tmp[key]["Name"]));
                    gruppeid.push(tmp[key]["Id"]);
                }
            } else {
                tidsgrupper.push(new TimeGroup(tmp["Id"], tmp["Name"]));
                gruppeid.push(tmp["Id"]);
            }
        }
        grps = null;
        tmp = times["Time"];
        for(var key in tmp) {
            var curtime = tmp[key];
            var nytime = new Time(curtime["Id"], curtime["Name"]);
            if(curtime["Week"]) {
                var tmg = tidsgrupper[gruppeid.indexOf(curtime["Week"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if(curtime["Day"]) {
                var tmg = tidsgrupper[gruppeid.indexOf(curtime["Day"]["Reference"])];
                nytime.timegroups.push(tmg);
                tmg.timer.push(nytime);
            }
            if(curtime["TimeGroups"]) {
                var tmpg = curtime["TimeGroups"]["TimeGroup"];
                for(var key in tmpg) {
                    var k = tmpg[key];
                    if(k["Reference"]) {
                        //hvis der findes reference så er der flere og de bliver loopet
                        //hvis ikke er tidsgruppen k
                        k = k["Reference"];
                    }
                    var tmg = tidsgrupper[gruppeid.indexOf(k)];
                    nytime.timegroups.push(tmg);
                    tmg.timer.push(nytime);
                }
            }
            timer.push(nytime);
        }
        var res = nobj["Instances"]["Instance"]["Resources"];
        var typeid = [];
        var grupid = [];
        if(res["ResourceTypes"]) {
            tmp = res["ResourceTypes"]["ResourceType"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    resourcetyper.push(new ResourceType(tmp[key]["Name"], tmp[key]["Id"]));
                    typeid.push(tmp[key]["Id"]);
                }
            } else {
                resourcetyper.push(new ResourceType(tmp["Name"], tmp["Id"]));
                typeid.push(tmp["Id"]);
            }
        }
        if(res["ResourceGroups"]) {
            tmp = res["ResourceGroups"]["ResourceGroup"];
            if(tmp instanceof Array) {
                for(var key in tmp) {
                    var curgr = tmp[key];
                    var restyp = resourcetyper[typeid.indexOf(curgr["ResourceType"]["Reference"])];
                    var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                    resourcegrupper.push(resgr);
                    restyp.resourcegroups.push(resgr);
                    grupid.push(curgr["Id"]);
                }
            } else {
                var curgr = tmp;
                var restyp = resourcetyper[typeid.indexOf(curgr["ResourceType"]["Reference"])];
                var resgr = new ResourceGroup(curgr["Id"], curgr["Name"], restyp);
                resourcegrupper.push(resgr);
                restyp.resourcegroups.push(resgr);
                grupid.push(curgr["Id"]);
            }
        }
        tmp = res["Resource"];
        for(var key in tmp) {
            //vil fejl ved kun 1 resource
            var curres = tmp[key];
            var nyres = new Resource(curres["Name"], curres["Id"], resourcetyper[typeid.indexOf(curres["ResourceType"]["Reference"])]);
            for(var key2 in curres["ResourceGroups"]["ResourceGroup"]) {
                k = curres["ResourceGroups"]["ResourceGroup"][key2];
                if(resgr = resourcegrupper[grupid.indexOf(k)]) {
                    if(resgr === undefined) {
                        alert('fejl ved ' + curres["Id"]);
                    } else {
                        resgr.resourcer.push(nyres);
                        nyres.resourcegroups.push(resgr);
                    }
                } else {
                    var resgr = resourcegrupper[grupid.indexOf(k["Reference"])];
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
            /* resourcegrupper.push(new ResourceGroup(curgr["Id"], curgr["Name"],
            resourcetyper[typeid.indexOf(curgr["ResourceType"]["Reference"])]));*/
                    }
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
            var nyev = new AEvent(curev["Id"], curev["Name"], curev["Duration"]);
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
                            lavres(curev["Resources"]["Resource"][i], resid, nyev, typeid);
                        }
                    } else {
                        lavres(curev["Resources"]["Resource"], resid, nyev, typeid);
                    }
                }
            }
            events.push(nyev);
            evid.push(nyev.id);
        }
        var con = nobj["Instances"]["Instance"]["Constraints"];
        for(var key in con) {
            if(con[key] instanceof Array) {
                for(var i = 0, len = con[key].length; i < len; i++) {
                    lavcon(con[key][i], key, evgruppeid, evid, resid, grupid);
                }
            } else {
                lavcon(con[key], key, evgruppeid, evid, resid, grupid);
            }
        }
    }
    instans.readinstance = readinstance;
    function readxml(url) {
        var xmlhttp;
        if(XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        var xmlDoc = xmlhttp.responseXML;
        var data;
        for(var i = 0; i < xmlDoc.childNodes.length; i++) {
            if(xmlDoc.childNodes[i].baseName === 'HighSchoolTimetableArchive') {
                data = XML2jsobj(xmlDoc.childNodes[i]);
                readinstance(data);
                break;
            }
        }
        function XML2jsobj(node) {
            var data = {
            };
            // append a value
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
            // element attributes
                        var c, cn;
            for(c = 0; cn = node.attributes[c]; c++) {
                Add(cn.name, cn.value);
            }
            // child elements
            for(c = 0; cn = node.childNodes[c]; c++) {
                if(cn.nodeType == 1) {
                    if(cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
                        // text value
                        Add(cn.nodeName, cn.firstChild.nodeValue);
                    } else {
                        // sub-object
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
            } else {
                alert('fejl5 ved indlæsning af resource for ');
            }
        } else {
            if("Role" in thisres && "ResourceType" in thisres) {
                var curtype = resourcetyper[typeid.indexOf(thisres["ResourceType"]["Reference"])];
                if(curtype) {
                    nyev.eventmangler.push(new Mangel(thisres["Role"], curtype, thisres["Workload"]));
                } else {
                    alert('fejlx v res event');
                }
            } else {
                //var fddfdfsk = nobj["jk"]["jk"];
                alert('fejl v res event');
            }
        }
    }
    function lavcon(constraint, type, evgruppeid, evid, resid, grupid) {
        //var nycon: Constraint;
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
            case "LimitBusyTimesConstraint":
                //MANFLWE
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
            default:
                // alert constraint ikke understøttet    var fddfdfsk = constraint["jk"]["jk"];
                break;
        }
        if(nycon) {
            if(constraint["AppliesTo"]["Events"]) {
                var appliesto = constraint["AppliesTo"];
                //       if ("EventGroups" in appliesto) //if array
                if(appliesto["Events"]["Event"] instanceof Array) {
                    for(var key in appliesto["Events"]["Event"]) {
                        nycon.appliestogre.push(eventgrupper[evid.indexOf(appliesto["Events"]["Event"][key]["Reference"])]);
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
                        nycon.appliestogre.push(gr);
                        for(var i = 0, len = gr.events.length; i < len; i++) {
                            if(nycon.appliestoev.indexOf(gr.events[i]) == -1) {
                                nycon.appliestoev.push(gr.events[i]);
                            }
                        }
                    }
                } else {
                    var gr = eventgrupper[evgruppeid.indexOf(appliesto["EventGroups"]["EventGroup"]["Reference"])];
                    nycon.appliestogre.push(gr);
                    for(var i = 0, len = gr.events.length; i < len; i++) {
                        if(nycon.appliestoev.indexOf(gr.events[i]) == -1) {
                            nycon.appliestoev.push(gr.events[i]);
                        }
                    }
                }
            }
            if(constraint["Resource"]) {
            }
            if(constraint["ResourceGroups"]) {
                var appliesto = constraint["ResourceGroups"];
                if(appliesto["ResourceGroup"] instanceof Array) {
                    for(var key in appliesto["ResourceGroup"]) {
                        var egr = resourcegrupper[grupid.indexOf(appliesto["ResourceGroup"][key]["Reference"])];
                        nycon.appliestogrr.push(egr);
                        /*                        for (var i = 0, len = gr.events.length; i < len; i++)
                        if (nycon.appliestoev.indexOf(gr.events[i]) == -1)
                        nycon.appliestoev.push(gr.events[i]);*/
                                            }
                } else {
                    var egr = resourcegrupper[grupid.indexOf(appliesto["ResourceGroup"]["Reference"])];
                    nycon.appliestogrr.push(egr);
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
            if(ha) {
                hardconstraints.push(nycon);
            } else {
                softconstraints.push(nycon);
            }
        }
    }
})(instans || (instans = {}));
//@ sourceMappingURL=instans.js.map
