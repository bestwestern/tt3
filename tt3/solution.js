/// <reference path="instans.ts" />
/// <reference path="hoved.ts" />
var solution;
(function (solution) {
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
            for(var i = 0, len = hardconstraints.length; i < len; i++) {
                var constr = hardconstraints[i];
                if(constr instanceof instans.AssignTimeConstraint) {
                    for(var i = 0, len = constr.appliestogre.length; i < len; i++) {
                        var eve = constr.appliestogre[i];
                        alert(eve.id);
                    }
                }
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
            this.resourcerole = {
            };
        }
        return SolEvent;
    })();
    solution.SolEvent = SolEvent;    
})(solution || (solution = {}));
//@ sourceMappingURL=solution.js.map
