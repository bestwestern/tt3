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
        }
        Sol.prototype.udregncon = function (hardcon) {
            var constrarr = hardcon ? hardconstraints : softconstraints;
            for(var c = 0, lencon = constrarr.length; c < lencon; c++) {
                var constr = constrarr[c];
                var constrafvigelser = [];
                var samlconstrafvigelse = 0;
                var constrstraf = 0;
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
        Sol.prototype.tildeltidtilevent = function (tidmangelindex, tidindex) {
            var event = tidmangler[tidmangelindex].aevent;
            var eventindex = event.index;
            var durationindex = tidmangler[tidmangelindex].durationindex;
            var gltid = this.tidmangeltildelinger[tidmangelindex];
            for(var i = durationindex; i < event.eventresmangler.length; i = i + event.duration) {
                var tildeltres = resourcer[this.resmangeltildelinger[event.eventresmangler[i].index]];
                if(tildeltres !== undefined) {
                    if(gltid !== undefined) {
                        this.fratagresourcetileventtiltid(tildeltres.index, durationindex, tidindex, eventindex);
                    }
                    this.tildelresourcetileventtiltid(tildeltres.index, durationindex, tidindex, eventindex);
                }
            }
            this.tidmangeltildelinger[tidmangelindex] = tidindex;
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
