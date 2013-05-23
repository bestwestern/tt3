var solution;
(function (solution) {
    var tildeling = (function () {
        function tildeling() {
            this.durationindex = [];
            this.eventindex = [];
        }
        return tildeling;
    })();
    solution.tildeling = tildeling;    
    var restider = (function () {
        function restider() {
            this.tider = [];
            for(var i = 0; i < antaltider; i++) {
                this.tider.push(new tildeling());
            }
        }
        return restider;
    })();
    solution.restider = restider;    
    var Sol = (function () {
        function Sol() {
            this.resmangeltildelinger = [];
            this.tidmangeltildelinger = [];
            this.restiltid = [];
            for(var i = 0; i < antalresourcer; i++) {
                this.restiltid[i] = new restider();
            }
            for(var i = 0; i < antalevents; i++) {
                var thisevent = events[i];
                if(thisevent.preasigntime) {
                    for(var durationindex = 0; durationindex < thisevent.duration; durationindex++) {
                        for(var j = 0; j < thisevent.eventresourcer.length; j++) {
                            var resindex = thisevent.eventresourcer[j].index;
                            this.restiltid[resindex].tider[thisevent.preasigntime.index + durationindex].durationindex.push(durationindex);
                            this.restiltid[resindex].tider[thisevent.preasigntime.index + durationindex].eventindex.push(thisevent.index);
                        }
                    }
                }
            }
        }
        Sol.prototype.udregncon = function (hardcon) {
            var constrarr = hardcon ? hardconstraints : softconstraints;
            var typeopsummering = {
            };
            for(var c = 0, lencon = constrarr.length; c < lencon; c++) {
                var constr = constrarr[c];
                var constrafvigelser = [];
                var samlconstrafvigelse = 0;
                var constrstraf = 0;
                var type = "";
                if(constr instanceof instans.AssignResourceConstraint) {
                    type = "AssignResourceConstraint";
                    var constr = constr;
                    var resmngler = constr.appliestoresmangler;
                    for(var i = 0; i < resmngler.length; i++) {
                        var eventafvigelse = 0;
                        if(this.resmangeltildelinger[resmngler[i].index] == null) {
                            if(resmngler[i].aevent.preasigntime) {
                                eventafvigelse += resmngler[i].aevent.duration;
                            } else {
                                eventafvigelse++;
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constr instanceof instans.AssignTimeConstraint) {
                    type = "AssignTimeConstraint";
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventtidmngler = constr.appliestoev[i].eventtidmangler;
                        for(var j = 0; j < eventtidmngler.length; j++) {
                            if(this.tidmangeltildelinger[eventtidmngler[j].index] == null) {
                                eventafvigelse++;
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constr instanceof instans.AvoidSplitAssignmentsConstraint) {
                    type = "AvoidSplitAssignmentsConstraint";
                    var constr = constr;
                    var arrmedarrmedmangler = (constr).arraymedarrayafresmangler;
                    for(var i = 0; i < arrmedarrmedmangler.length; i++) {
                        var mnglarr = arrmedarrmedmangler[i];
                        var restilarr = [];
                        for(var j = 0; j < mnglarr.length; j++) {
                            var resind = this.resmangeltildelinger[mnglarr[j].index];
                            if(resind != undefined) {
                                if(restilarr.indexOf(resind) == -1) {
                                    restilarr.push(resind);
                                }
                            } else {
                                var her = 3;
                            }
                        }
                        if(restilarr.length > 1) {
                            constrafvigelser.push(restilarr.length - 1);
                        }
                    }
                }
                if(constr instanceof instans.AvoidClashesConstraint) {
                    var constr = constr;
                    type = "AvoidClashesConstraint";
                    for(var i = 0; i < constr.appliestores.length; i++) {
                        var resafvigelse = 0;
                        var resindex = constr.appliestores[i].index;
                        for(var tidindex = 0; tidindex < antaltider; tidindex++) {
                            if(this.restiltid[resindex].tider[tidindex].durationindex.length > 1) {
                                resafvigelse += this.restiltid[resindex].tider[tidindex].durationindex.length - 1;
                            }
                        }
                        constrafvigelser.push(resafvigelse);
                    }
                }
                if(constr instanceof instans.DistributeSplitEventsConstraint) {
                    type = "DistributeSplitEventsConstraint";
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = this.getdistributespliteventafvigelse(constr.appliestoev[i], constr);
                        if(eventafvigelse > 0) {
                            constrafvigelser.push(eventafvigelse);
                        }
                    }
                }
                if(constr instanceof instans.AvoidUnavailableTimesConstraint) {
                    type = "AvoidUnavailableTimesConstraint";
                    var ctimer = constr.timer;
                    var anttimer = ctimer.length;
                    var constr = constr;
                    for(var i = 0; i < constr.appliestores.length; i++) {
                        var thisres = constr.appliestores[i];
                        var resafv = 0;
                        var thisrestiltid = this.restiltid[thisres.index];
                        for(var j = 0; j < anttimer; j++) {
                            if(thisrestiltid.tider[ctimer[j].index].eventindex.length > 0) {
                                resafv++;
                            }
                        }
                        if(resafv) {
                            constrafvigelser.push(resafv);
                        }
                    }
                }
                if(constr instanceof instans.LimitBusyTimesConstraint) {
                    type = "LimitBusyTimesConstraint";
                    var ctimegroups = constr.timegroups;
                    var antgr = ctimegroups.length;
                    var max = constr.maximum;
                    var min = constr.minimum;
                    var constr = constr;
                    for(var i = 0; i < constr.appliestores.length; i++) {
                        var thisres = constr.appliestores[i];
                        var thisrestiltid = this.restiltid[thisres.index];
                        for(var j = 0; j < antgr; j++) {
                            var tgload = 0;
                            var tgtimer = ctimegroups[j].timer;
                            for(var k = 0; k < tgtimer.length; k++) {
                                if(thisrestiltid.tider[tgtimer[k].index].eventindex.length > 0) {
                                    tgload++;
                                }
                            }
                            if(tgload > max) {
                                constrafvigelser.push(tgload - max);
                            } else if(tgload < min) {
                                constrafvigelser.push(min - tgload);
                            }
                        }
                    }
                }
                if(constr instanceof instans.LimitWorkloadConstraint) {
                    type = "LimitWorkloadConstraint ";
                    var constr = constr;
                    var max = constr.maximum;
                    var min = constr.minimum;
                    for(var i = 0; i < constr.appliestores.length; i++) {
                        var thisres = constr.appliestores[i];
                        var reswl = 0;
                        var thisrestiltid = this.restiltid[thisres.index];
                        for(var j = 0; j < antaltider; j++) {
                            var thistildel = thisrestiltid.tider[j];
                            for(var k = 0; k < thistildel.eventindex.length; k++) {
                                reswl += events[thistildel.eventindex[k]].workload || 1;
                            }
                        }
                        if(reswl > max) {
                            constrafvigelser.push(reswl - max);
                        } else if(reswl < min) {
                            constrafvigelser.push(min - reswl);
                        }
                    }
                }
                if(constr instanceof instans.LinkEventsConstraint) {
                    type = "LinkEventsConstraint ";
                    var constr = constr;
                    var evgrs = constr.appliestoevgrou;
                    for(var i = 0; i < evgrs.length; i++) {
                        var evgr = evgrs[i];
                        var evdur = evgr.events[0].duration;
                        var alletider = [];
                        var arrmedarraymedtiderforevents = [];
                        for(var j = 0; j < evgr.events.length; j++) {
                            var thisev = evgr.events[j];
                            var thiseventstider = [];
                            var thiseventmangler = thisev.eventtidmangler;
                            for(var k = 0; k < thiseventmangler.length; k++) {
                                var thistidindex = this.tidmangeltildelinger[thiseventmangler[k].index];
                                if(thistidindex != null) {
                                    if(thiseventstider.indexOf(thistidindex) == -1) {
                                        thiseventstider.push(thistidindex);
                                    }
                                    if(alletider.indexOf(thistidindex) == -1) {
                                        alletider.push(thistidindex);
                                    }
                                }
                            }
                            arrmedarraymedtiderforevents.push(thiseventstider);
                        }
                        var afv = 0;
                        for(var j = 0; j < alletider.length; j++) {
                            var thistid = alletider[j];
                            for(var k = 0; k < arrmedarraymedtiderforevents.length; k++) {
                                if(arrmedarraymedtiderforevents[k].indexOf(thistid) == -1) {
                                    k = arrmedarraymedtiderforevents.length + 1;
                                }
                            }
                            if(k > arrmedarraymedtiderforevents.length) {
                                afv++;
                            }
                        }
                        if(afv) {
                            constrafvigelser.push(afv);
                        }
                    }
                }
                if(constr instanceof instans.SplitEventsConstraint) {
                    type = "SplitEventsConstraint";
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = this.getspliteventafvigelse(constr.appliestoev[i], constr);
                        if(eventafvigelse > 0) {
                            constrafvigelser.push(eventafvigelse);
                        }
                    }
                }
                if(constr instanceof instans.PreferResourcesConstraint) {
                    type = "PreferResourcesConstraint";
                    var constr = constr;
                    var resmngler = constr.appliestoresmangler;
                    for(var i = 0; i < resmngler.length; i++) {
                        var eventafvigelse = 0;
                        var resind = this.resmangeltildelinger[resmngler[i].index];
                        if(resind != undefined) {
                            if(constr.appliestores.indexOf(resourcer[resind]) < 0) {
                                if(resmngler[i].aevent.preasigntime) {
                                    eventafvigelse += resmngler[i].aevent.duration;
                                } else {
                                    eventafvigelse++;
                                }
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constr instanceof instans.PreferTimesConstraint) {
                    type = "PreferTimesConstraint";
                    var conduration = constr.duration;
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var thisevent = constr.appliestoev[i];
                        var startogslut = this.getdurations(thisevent);
                        for(var k = 0; k < startogslut.length; k = k + 2) {
                            var tjek = true;
                            if("duration" in constr) {
                                tjek = startogslut[k + 1] - startogslut[k] + 1 == constr["duration"];
                            }
                            if(tjek) {
                                var tidmangelindex = thisevent.eventtidmangler[startogslut[k]].index;
                                var tildelttid = this.tidmangeltildelinger[tidmangelindex];
                                if(tildelttid != null) {
                                    if(constr.timer.indexOf(timer[tildelttid]) < 0) {
                                        eventafvigelse = eventafvigelse + startogslut[k + 1] - startogslut[k] + 1;
                                    }
                                }
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constr instanceof instans.SpreadEventsConstraint) {
                    type = "SpreadEventsConstraint";
                    var spreadarr = [];
                    var constr = constr;
                    var starttider = [];
                    for(var i = 0; i < antaltimegroups; i++) {
                        starttider.push(0);
                    }
                    var antaltimegroups = (constr).timegroupminimum.length;
                    for(var i = 0, antaleventgrsicon = constr.appliestoevgrou.length; i < antaleventgrsicon; i++) {
                        var evgr = constr.appliestoevgrou[i];
                        for(var j = 0; j < antaltimegroups; j++) {
                            starttider[j] = 0;
                        }
                        var assignedtider = [];
                        for(var j = 0; j < evgr.events.length; j++) {
                            var ev = evgr.events[j];
                            var evafvigelser = [];
                            if(ev.preasigntime) {
                                assignedtider.push(ev.preasigntime);
                            } else {
                                var durations = this.getdurations(ev);
                                for(var k = 0; k < durations.length; k = k + 2) {
                                    assignedtider.push(timer[this.tidmangeltildelinger[ev.eventtidmangler[durations[k]].index]]);
                                }
                            }
                        }
                        for(var k = 0; k < assignedtider.length; k++) {
                            var time = assignedtider[k];
                            for(var l = 0; l < time.timegroups.length; l++) {
                                var grindex = constr.timegroups.indexOf(time.timegroups[l]);
                                if(grindex > -1) {
                                    starttider[grindex]++;
                                }
                            }
                        }
                        for(var k = 0; k < antaltimegroups; k++) {
                            var ant = starttider[k];
                            var f = 0;
                            if(ant < (constr).timegroupminimum[k]) {
                                constrafvigelser.push((constr).timegroupminimum[k] - ant);
                                f = 1;
                            } else if(ant > (constr).timegroupmaximum[k]) {
                                constrafvigelser.push(ant - (constr).timegroupmaximum[k]);
                                f = 1;
                            }
                            if(f) {
                                spreadarr.push(evgr.id + ":" + constrafvigelser[constrafvigelser.length - 1]);
                            }
                        }
                    }
                }
                if(constrafvigelser.length > 0) {
                    var li = document.createElement("li");
                    samlconstrafvigelse = constr.costfunction(constrafvigelser) * constr.weight;
                    li.appendChild(document.createTextNode(constr.id + ':' + samlconstrafvigelse.toString() + ':' + constrafvigelser.toString()));
                    var conliste = hardcon ? document.getElementById("hardcon") : document.getElementById("softcon");
                    conliste.insertBefore(li, conliste.firstChild);
                    if(!(type in typeopsummering)) {
                        typeopsummering[type] = samlconstrafvigelse;
                    } else {
                        typeopsummering[type] += samlconstrafvigelse;
                    }
                }
            }
            assert(true, '-----------');
            for(var prop in typeopsummering) {
                assert(true, prop + " " + typeopsummering[prop]);
            }
            for(var i = 0; i < spreadarr.length; i++) {
                assert(true, spreadarr[i]);
            }
        };
        Sol.prototype.getdurations = function (thisevent) {
            var startogslut = [];
            var igang = true;
            var searchindex = 0;
            var totalduration = thisevent.eventtidmangler.length;
            while(igang) {
                if(this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex].index] != null) {
                    startogslut.push(searchindex);
                    var instansigang = true;
                    while(instansigang) {
                        if(searchindex + 2 > totalduration) {
                            instansigang = false;
                            igang = false;
                        } else {
                            if(this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex + 1].index] != null) {
                                if(this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex].index] + 1 == this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex + 1].index]) {
                                    var resourcerens = false;
                                    for(var k = searchindex + 1; k < thisevent.eventresmangler.length; k += thisevent.duration) {
                                        var denneres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k].index];
                                        var forrigeres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k - 1].index];
                                        if(denneres == forrigeres) {
                                            resourcerens = true;
                                        } else {
                                            resourcerens = false;
                                            k = thisevent.eventresmangler.length;
                                        }
                                    }
                                    if(resourcerens || thisevent.eventresmangler.length == 0) {
                                        searchindex++;
                                    } else {
                                        instansigang = false;
                                    }
                                } else {
                                    instansigang = false;
                                }
                            } else {
                                instansigang = false;
                            }
                        }
                    }
                    startogslut.push(searchindex++);
                } else {
                    if(searchindex + 2 > totalduration) {
                        igang = false;
                    } else {
                        searchindex++;
                    }
                }
            }
            return startogslut;
        };
        Sol.prototype.getspliteventafvigelse = function (thisevent, con) {
            var mindur = con.minimumduration;
            var minam = con.minimumamount;
            var tmp = thisevent.id;
            var maxdur = con.maximumduration;
            var maxam = con.maximumamount;
            var startogslut = this.getdurations(thisevent);
            var afvigelser = 0;
            if(startogslut.length > 0) {
                for(var i = 0; i < startogslut.length; i = i + 2) {
                    var len = startogslut[i + 1] - startogslut[i] + 1;
                    if(len < mindur) {
                        afvigelser++;
                    }
                    if(len > maxdur) {
                        afvigelser++;
                    }
                }
                var ant = startogslut.length / 2;
                if(ant > maxam) {
                    afvigelser += ant - maxam;
                }
                if(ant < minam) {
                    afvigelser += minam - ant;
                }
            }
            return afvigelser;
        };
        Sol.prototype.getdistributespliteventafvigelse = function (thisevent, con) {
            var min = con.minimum;
            var tmp = thisevent.id;
            var max = con.maximum;
            var dur = con.duration;
            var startogslut = this.getdurations(thisevent);
            if(startogslut.length > 0) {
                var antalmedrigtigduration = 0;
                for(var i = 0; i < startogslut.length; i = i + 2) {
                    if(startogslut[i + 1] - startogslut[i] + 1 == dur) {
                        antalmedrigtigduration++;
                    }
                }
            }
            if(antalmedrigtigduration > max) {
                return antalmedrigtigduration - max;
            }
            if(antalmedrigtigduration < min) {
                return min - antalmedrigtigduration;
            }
            return 0;
        };
        Sol.prototype.randomtidtildel = function (antal) {
            for(var i = 0; i < antal; i++) {
                var tidmangelindex = Math.floor(Math.random() * tidmangler.length);
                var tidindex = Math.floor(Math.random() * antaltider);
                this.tildeltidtilevent(tidmangelindex, tidindex);
            }
        };
        Sol.prototype.randontildelres = function (antal) {
            for(var i = 0; i < antal; i++) {
                var resmangelindex = Math.floor(Math.random() * resmangler.length);
                if(this.resmangeltildelinger[resmangelindex] == undefined) {
                    var typ = resmangler[resmangelindex].resourcetype;
                    var grr = Math.floor(Math.random() * typ.resourcegroups.length);
                    var r = typ.resourcegroups[grr].resourcer;
                    var rr = Math.floor(Math.random() * r.length);
                    var resindex = r[rr].index;
                    vistsol.resmangeltildelinger[resmangelindex] = resindex;
                    if(resmangler[resmangelindex].aevent.preasigntime) {
                        var ev = resmangler[resmangelindex].aevent;
                        for(var tidadder = 0; tidadder < ev.duration; tidadder++) {
                            vistsol.tildelresourcetileventtiltid(resindex, 0, ev.preasigntime.index + tidadder, ev.index);
                        }
                    }
                } else {
                    var her = 3;
                }
            }
        };
        Sol.prototype.tildeltidtilevent = function (tidmangelindex, tidindex) {
            var event = tidmangler[tidmangelindex].aevent;
            var eventindex = event.index;
            var durationindex = tidmangler[tidmangelindex].durationindex;
            if(this.tidmangeltildelinger[tidmangelindex] != undefined) {
                var gltid = this.tidmangeltildelinger[tidmangelindex];
            }
            for(var i = durationindex; i < event.eventresmangler.length; i = i + event.duration) {
                if(this.resmangeltildelinger[event.eventresmangler[i].index] !== undefined) {
                    var resindex = this.resmangeltildelinger[event.eventresmangler[i].index];
                    if(gltid !== undefined) {
                        this.fratagresourcetileventtiltid(resindex, durationindex, gltid, eventindex);
                    }
                    if(tidindex > -1) {
                        this.tildelresourcetileventtiltid(resindex, durationindex, tidindex, eventindex);
                    }
                }
            }
            for(var j = 0; j < event.eventresourcer.length; j++) {
                var resindex = event.eventresourcer[j].index;
                if(gltid !== undefined) {
                    this.fratagresourcetileventtiltid(resindex, durationindex, gltid, eventindex);
                }
                if(tidindex > -1) {
                    this.tildelresourcetileventtiltid(resindex, durationindex, tidindex, eventindex);
                }
            }
            if(tidindex > -1) {
                this.tidmangeltildelinger[tidmangelindex] = tidindex;
            } else {
                this.tidmangeltildelinger[tidmangelindex] = null;
            }
        };
        Sol.prototype.fratagresourcetileventtiltid = function (resindex, durationindex, tidindex, eventindex) {
            var tmp = this.restiltid[resindex].tider[tidindex];
            var fundet = -1;
            for(var i = 0; i < tmp.durationindex.length; i++) {
                if(tmp.durationindex[i] == durationindex && tmp.eventindex[i] == eventindex) {
                    fundet = i;
                }
            }
            if(fundet > -1) {
                tmp.eventindex.splice(fundet, 1);
                tmp.durationindex.splice(fundet, 1);
            }
        };
        Sol.prototype.tildelresourcetileventtiltid = function (resindex, durationindex, tidindex, eventindex) {
            var tmp = this.restiltid[resindex].tider[tidindex];
            tmp.eventindex.push(eventindex);
            tmp.durationindex.push(durationindex);
        };
        return Sol;
    })();
    solution.Sol = Sol;    
})(solution || (solution = {}));
