/// <reference path="instans.ts" />
/// <reference path="hoved.ts" />

module solution {
    export class Sol {
        solevents: SolEvent[];

        hardcosts: any;
        softcosts: any;
        constructor() {
            this.solevents = [];
            this.softcosts = {};
            this.hardcosts = {};
            for (var i = 0, len = events.length; i < len; i++)
                for (var j = 0, eventlen = events[i].duration; j < eventlen; j++) {
                    var curevent = events[i];
                    this.solevents.push(new SolEvent(curevent));

                }
        }
        udregn() {
            for (var i = 0, len = hardconstraints.length; i < len; i++) {
                var c = hardconstraints[i];

                if (c instanceof instans.AssignTimeConstraint) {
                    alert('h');
                }
            }
        }
    }
    export class SolEvent {
        resourcerole: any;
        constructor(public sEvent: instans.AEvent,
            public sTime?: instans.Time, sResourcer?: instans.Resource[] = []) {
            this.resourcerole = {};
        }
    }


}
