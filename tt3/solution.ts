/// <reference path="instans.ts" /> 
/// <reference path="hoved.ts" />
declare var x;

module solution {
    export class tildeling {
        durationindex: number[];
        eventindex: number[];
        constructor() {
            this.durationindex = [];
            this.eventindex = [];
        }
    }
    export class restider {
        tider: tildeling[];//tider[tidindex]
        constructor() {
            this.tider = [];
            for (var i = 0; i < antaltider; i++)
                this.tider.push(new tildeling());
        }
    }
    export class Sol {
        tidmangeltildelinger: number[];//tidmangeltildelinger[i]=tidindex for tiden givet til tidmangel i
        resmangeltildelinger: number[];//resmangeltildelinger[i]=resindex for res givet til resmangel i
        restiltid: restider[];//restider[resindex]
        hardcosts: number[];
        softcosts: number[];
        constructor() {
            this.resmangeltildelinger = [];
            this.tidmangeltildelinger = [];
            this.restiltid = [];
            for (var i = 0; i < antalresourcer; i++)
                this.restiltid[i] = new restider();
        }
        udregncon(hardcon: bool) {//frisk udregning (uden gemte tidligere v�rdier) b�r m�ske ikke lave prefertimes hvis hardcon? - opdel udregn i hard og soft
            var constrarr: instans.Constraint[] = hardcon ? hardconstraints : softconstraints;
            for (var c = 0, lencon = constrarr.length; c < lencon; c++) {
                var constr = constrarr[c];
                var constrafvigelser: number[] = [];
                var samlconstrafvigelse = 0;
                var constrstraf = 0;
                if (constr instanceof instans.AssignTimeConstraint) {
                    var constr: instans.AssignTimeConstraint = <instans.AssignTimeConstraint> constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventtidmngler = constr.appliestoev[i].eventtidmangler;
                        for (var j = 0; j < eventtidmngler.length; j++) {
                            if (this.tidmangeltildelinger[eventtidmngler[j].index] == null)
                                eventafvigelse++;
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if (constr instanceof instans.AssignResourceConstraint) {
                    var constr: instans.AssignResouceConstraint = <instans.AssignTimeConstraint> constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventresmangler = constr.appliestoev[i].eventresmangler
                        for (var j = 0; j < eventresmangler.length; j++) {
                            if (this.resmangeltildelinger[eventresmangler[j].index] == null)
                                eventafvigelse++;
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if (constr instanceof instans.PreferTimesConstraint) {
                    var constr: instans.PreferTimesConstraint = <instans.PreferTimesConstraint> constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var eventtidmngler = constr.appliestoev[i].eventtidmangler;
                        for (var j = 0; j < eventtidmngler.length; j++) {
                            var tildelttid = this.tidmangeltildelinger[eventtidmngler[j].index];
                            if (tildelttid != null)
                                if (constr.timer.indexOf(timer[tildelttid]) < 0)
                                    eventafvigelse++;
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }




                if (constrafvigelser.length > 0) {
                    var li = document.createElement("li");
                    samlconstrafvigelse = constr.costfunction(constrafvigelser) * constr.weight;
                    li.appendChild(document.createTextNode(constr.name + ':' + samlconstrafvigelse.toString() + ':' + constrafvigelser.toString()));
                    var conliste = hardcon ? document.getElementById("hardcon") : document.getElementById("softcon");
                    conliste.insertBefore(li, conliste.firstChild);
                    //                    appendChild(li);
                }
            }
            if (constrafvigelser)
                for (var i = 0; i < constrafvigelser.length; i++) {
                }
        }

        fratagresourcetileventtiltid(resindex: number, durationindex: number, tidindex: number, eventindex: number) {
            var tmp = this.restiltid[resindex].tider[tidindex];
            var fundet = -1;
            for (var i = 0; i < tmp.durationindex.length; i++) {
                if (tmp.durationindex[i] == durationindex && tmp.eventindex[i] == eventindex)
                    fundet = i;
            }
            if (fundet > -1) {
                tmp.eventindex.splice(fundet, 1);
                tmp.durationindex.splice(fundet, 1);
            }
        }
        tildelresourcetileventtiltid(resindex: number, durationindex: number, tidindex: number, eventindex: number) {
            var tmp = this.restiltid[resindex].tider[tidindex];
            tmp.eventindex.push(eventindex);
            tmp.durationindex.push(durationindex);
        }

    }
}
/*  var hardafv = 0;
  for (var c = 0, lencon = hardconstraints.length; c < lencon; c++) {
      var constr = hardconstraints[c];
      var constrafvigelser: number[] = [];
      var constrstraf = 0;
      if (constr instanceof instans.AssignTimeConstraint) {
     //     var constr: instans.AssignTimeConstraint = <instans.AssignTimeConstraint> constr;
          for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
              var even = constr.appliestoev[i];
              var eventafvigelse = 0;
              for (var j = 0, eventdura = even.duration; j < eventdura; j++)
                  if (!even.solevent[j].sTime != undefined)
                      eventafvigelse++;
              if (eventafvigelse > 0)
                  constrafvigelser.push(eventafvigelse);
          }

      }
      else
          if (constr instanceof instans.AssignResourceConstraint) {
              for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                  var even = constr.appliestoev[i];
                  var eventafvigelse = 0;
                  for (var j = 0, eventdura = even.duration; j < eventdura; j++) {
                      var soleven = even.solevent[j];
                      for (var k = 0, eventmangllen = soleven.resourcer.length; k < eventmangllen; k++) {
                          if (soleven.resourcer[k].resourceref == null) {
                              if (soleven.resourcer[k].mangel.role == constr.role) {
                                  eventafvigelse++;
                              }
                          }
                          else {
                             // alert('jk');
                          }
                      }
                  }
                  if (eventafvigelse > 0)
                      constrafvigelser.push(eventafvigelse);
              }

          }
      hardafv += constr.costfunction(constrafvigelser)*constr.weight;
//       alert(hardafv.toString());
  }*/
/* export class SolEvent {
     resourcer: SolResource[];
     
     constructor(public sEvent: instans.AEvent, public durationindeks: number,
         public sTime?: instans.Time,  sResourcer?: instans.Resource[] = []) {
         this.resourcer = [];
         for (var i = 0, len = sEvent.eventmangler.length; i < len; i++)
             this.resourcer.push(new SolResource(sEvent.eventmangler[i]));
         sEvent.solevent.push(this);
     }
 }*/


