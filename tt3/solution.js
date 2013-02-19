var solution;
(function (solution) {
    var SolResource = (function () {
        function SolResource(mangel) {
            this.mangel = mangel;
        }
        return SolResource;
    })();
    solution.SolResource = SolResource;    
    var Sol = (function () {
        function Sol() {
            this.solevents = [];
            this.softcosts = {
            };
            this.hardcosts = {
            };
            for(var i = 0, len = events.length; i < len; i++) {
                for(var j = 0, eventlen = events[i].duration; j < eventlen; j++) {
                    var curevent = events[i];
                    this.solevents.push(new SolEvent(curevent));
                }
            }
        }
        Sol.prototype.udregn = function () {
            var hardafv = 0;
            for(var c = 0, lencon = hardconstraints.length; c < lencon; c++) {
                var constr = hardconstraints[c];
                var constrafvigelser = [];
                var constrstraf = 0;
                if(constr instanceof instans.AssignTimeConstraint) {
                    //     var constr: instans.AssignTimeConstraint = <instans.AssignTimeConstraint> constr;
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var even = constr.appliestoev[i];
                        var eventafvigelse = 0;
                        for(var j = 0, eventdura = even.duration; j < eventdura; j++) {
                            if(!even.solevent[j].sTime != undefined) {
                                eventafvigelse++;
                            }
                        }
                        if(eventafvigelse > 0) {
                            constrafvigelser.push(eventafvigelse);
                        }
                    }
                } else if(constr instanceof instans.AssignResourceConstraint) {
                    for(var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var even = constr.appliestoev[i];
                        var eventafvigelse = 0;
                        for(var j = 0, eventdura = even.duration; j < eventdura; j++) {
                            var soleven = even.solevent[j];
                            for(var k = 0, eventmangllen = soleven.resourcer.length; k < eventmangllen; k++) {
                                if(soleven.resourcer[k].resourceref == null) {
                                    if(soleven.resourcer[k].mangel.role == constr.role) {
                                        eventafvigelse++;
                                    }
                                } else {
                                    alert('jk');
                                }
                            }
                        }
                        if(eventafvigelse > 0) {
                            constrafvigelser.push(eventafvigelse);
                        }
                    }
                }
                hardafv += constr.costfunction(constrafvigelser) * constr.weight;
                //       alert(hardafv.toString());
                            }
        };
        return Sol;
    })();
    solution.Sol = Sol;    
    var SolEvent = (function () {
        function SolEvent(sEvent, sTime, sResourcer) {
            if (typeof sResourcer === "undefined") { sResourcer = []; }
            this.sEvent = sEvent;
            this.sTime = sTime;
            this.resourcer = [];
            for(var i = 0, len = sEvent.eventmangler.length; i < len; i++) {
                this.resourcer.push(new SolResource(sEvent.eventmangler[i]));
            }
            sEvent.solevent.push(this);
        }
        return SolEvent;
    })();
    solution.SolEvent = SolEvent;    
})(solution || (solution = {}));
//@ sourceMappingURL=solution.js.map
