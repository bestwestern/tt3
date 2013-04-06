﻿var solution;
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
            for(var c = 0, lencon = constrarr.length; c < lencon; c++) {
                var constr = constrarr[c];
                var constrafvigelser = [];
                var samlconstrafvigelse = 0;
                var constrstraf = 0;
                if(constr instanceof instans.AssignResourceConstraint) {
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventresmangler = constr.appliestoev[i].eventresmangler;
                        for(var j = 0; j < eventresmangler.length; j++) {
                            if(this.resmangeltildelinger[eventresmangler[j].index] == null) {
                                eventafvigelse++;
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constr instanceof instans.AssignTimeConstraint) {
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
                if(constr instanceof instans.AvoidClashesConstraint) {
                    var constr = constr;
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
                if(constr instanceof instans.SplitEventsConstraint) {
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = this.getspliteventafvigelse(constr.appliestoev[i], constr);
                        if(eventafvigelse > 0) {
                            constrafvigelser.push(eventafvigelse);
                        }
                    }
                }
                if(constr instanceof instans.PreferTimesConstraint) {
                    var constr = constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventtidmngler = constr.appliestoev[i].eventtidmangler;
                        for(var j = 0; j < eventtidmngler.length; j++) {
                            var tildelttid = this.tidmangeltildelinger[eventtidmngler[j].index];
                            if(tildelttid != null) {
                                if(constr.timer.indexOf(timer[tildelttid]) < 0) {
                                    eventafvigelse++;
                                }
                            }
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if(constrafvigelser.length > 0) {
                    var li = document.createElement("li");
                    samlconstrafvigelse = constr.costfunction(constrafvigelser) * constr.weight;
                    li.appendChild(document.createTextNode(constr.name + ':' + samlconstrafvigelse.toString() + ':' + constrafvigelser.toString()));
                    var conliste = hardcon ? document.getElementById("hardcon") : document.getElementById("softcon");
                    conliste.insertBefore(li, conliste.firstChild);
                }
            }
            if(constrafvigelser) {
                for(var i = 0; i < constrafvigelser.length; i++) {
                }
            }
        };
        Sol.prototype.getspliteventafvigelse = function (event, con) {
            var mindur = con.minimumduration;
            var minam = con.minimumamount;
            var maxdur = con.maximumduration;
            var maxam = con.maximumamount;
            var igang = true;
            var searchindex = 0;
            var totalduration = event.eventtidmangler.length;
            var startogslut = [];
            while(igang) {
                if(this.tidmangeltildelinger[event.eventtidmangler[searchindex].index] != null) {
                    startogslut.push(searchindex);
                    var instansigang = true;
                    while(instansigang) {
                        if(searchindex + 2 > totalduration) {
                            instansigang = false;
                            igang = false;
                        } else {
                            if(this.tidmangeltildelinger[event.eventtidmangler[searchindex + 1].index] != null) {
                                if(this.tidmangeltildelinger[event.eventtidmangler[searchindex].index] + 1 == this.tidmangeltildelinger[event.eventtidmangler[searchindex + 1].index]) {
                                    searchindex++;
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
            var afvigelser = 0;
            if(startogslut.length > 0) {
                var str = event.name;
                for(var i = 0; i < startogslut.length; i = i + 2) {
                    var len = startogslut[i + 1] - startogslut[i] + 1;
                    str += " længde:" + len.toString();
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
                str += " antal:" + ant.toString();
            }
            return afvigelser;
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
                for(var j = 0; j < event.eventresourcer.length; j++) {
                    var resindex = event.eventresourcer[j].index;
                    if(gltid !== undefined) {
                        this.fratagresourcetileventtiltid(resindex, durationindex, gltid, eventindex);
                    }
                    if(tidindex > -1) {
                        this.tildelresourcetileventtiltid(resindex, durationindex, tidindex, eventindex);
                    }
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
