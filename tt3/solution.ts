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
            for (var i = 0; i < antalevents; i++) {//tildel preassigned res p� events med preassigned tider
                var thisevent = events[i];
                if (thisevent.preasigntime) {
                    for (var durationindex = 0; durationindex < thisevent.duration; durationindex++)

                        for (var j = 0; j < thisevent.eventresourcer.length; j++) {
                            var resindex = thisevent.eventresourcer[j].index;
                            this.restiltid[resindex].tider[thisevent.preasigntime.index + durationindex].durationindex.push(durationindex);
                            this.restiltid[resindex].tider[thisevent.preasigntime.index + durationindex].eventindex.push(thisevent.index);

                        }
                }
            }
        }

        udregncon(hardcon: bool) {//frisk udregning (uden gemte tidligere v�rdier) b�r m�ske ikke lave prefertimes hvis hardcon? - opdel udregn i hard og soft
            var constrarr: instans.Constraint[] = hardcon ? hardconstraints : softconstraints;
            var typeopsummering = {};

            for (var c = 0, lencon = constrarr.length; c < lencon; c++) {
                var constr = constrarr[c];
                var constrafvigelser: number[] = [];
                var samlconstrafvigelse = 0;
                var constrstraf = 0;
                var type = "";

                if (constr instanceof instans.AssignResourceConstraint) {
                    type = "AssignResourceConstraint";
                    var constr: instans.AssignResouceConstraint = <instans.AssignTimeConstraint> constr;
                    var resmngler = constr.appliestoresmangler;
                    for (var i = 0; i < resmngler.length; i++) {
                        var eventafvigelse = 0;
                        if (this.resmangeltildelinger[resmngler[i].index] == null) {
                            if (resmngler[i].aevent.preasigntime)
                                eventafvigelse += resmngler[i].aevent.duration;
                            else
                                eventafvigelse++;
                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }
                if (constr instanceof instans.AssignTimeConstraint) {
                    type = "AssignTimeConstraint";

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

                if (constr instanceof instans.DistributeSplitEventsConstraint) {
                    type = "DistributeSplitEventsConstraint";

                    var constr: instans.DistributeSplitEventsConstraint = <instans.DistributeSplitEventsConstraint>constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = this.getdistributespliteventafvigelse(constr.appliestoev[i], <instans.SplitEventsConstraint> constr);
                        if (eventafvigelse > 0)
                            constrafvigelser.push(eventafvigelse);
                    }
                }

                if (constr instanceof instans.AvoidClashesConstraint) {
                    var constr: instans.PreferTimesConstraint = <instans.AvoidClashesConstraint> constr;
                    type = "AvoidClashesConstraint";
                    for (var i = 0; i < constr.appliestores.length; i++) {
                        var resafvigelse = 0;
                        var resindex = constr.appliestores[i].index;
                        for (var tidindex = 0; tidindex < antaltider; tidindex++)
                            if (this.restiltid[resindex].tider[tidindex].durationindex.length > 1) {
                                resafvigelse += this.restiltid[resindex].tider[tidindex].durationindex.length - 1;

                            }



                        constrafvigelser.push(resafvigelse);
                    }
                }
                if (constr instanceof instans.SplitEventsConstraint) {
                    type = "SplitEventsConstraint";

                    var constr: instans.SplitEventsConstraint = <instans.SplitEventsConstraint>constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = this.getspliteventafvigelse(constr.appliestoev[i], <instans.SplitEventsConstraint> constr);
                        if (eventafvigelse > 0)
                            constrafvigelser.push(eventafvigelse);
                    }
                }
                if (constr instanceof instans.SpreadEventsConstraint) {
                    type = "SpreadEventsConstraint";
                    var constr: instans.SpreadEventsConstraint = <instans.SpreadEventsConstraint>constr;
                    var starttider: number[] = [];
                    for (var i = 0; i < antaltimegroups; i++)
                        starttider.push(0);
                    var antaltimegroups = (<instans.SpreadEventsConstraint>constr).timegroupminimum.length;
                    for (var i = 0, antaleventgrsicon = constr.appliestoevgrou.length; i < antaleventgrsicon; i++) {
                        var evgr = constr.appliestoevgrou[i];
                        for (var j = 0; j < antaltimegroups; j++)
                            starttider[j] = 0;
                        for (var j = 0; j < evgr.events.length; j++) {
                            var assignedtider: instans.Time[] = [];
                            var ev = evgr.events[j];
                            var evafvigelser = [];
                            if (ev.preasigntime)
                                assignedtider.push(ev.preasigntime);
                            else {
                                var durations = this.getdurations(ev);
                                for (var k = 0; k < durations.length; k = k + 2) {
                                    /* var tm = ev.eventtidmangler[durations[k]].index;
                                     var tld = this.tidmangeltildelinger[tm];
                                     var tid = timer[tld];*/
                                    assignedtider.push(timer[this.tidmangeltildelinger[ev.eventtidmangler[durations[k]].index]])
                                }
                            }
                            for (var k = 0; k < assignedtider.length; k++) {
                                var time = assignedtider[k];
                                for (var l = 0; l < time.timegroups.length; l++) {
                                    var grindex = constr.timegroups.indexOf(time.timegroups[l]);
                                    if (grindex > -1)
                                        starttider[grindex]++;
                                }
                            }
                            for (var k = 0; k < antaltimegroups; k++) {
                                var ant = starttider[k];
                                if (ant < (<instans.SpreadEventsConstraint> constr).timegroupminimum[k])
                                    constrafvigelser.push((<instans.SpreadEventsConstraint> constr).timegroupminimum[k] - ant);
                                else
                                    if (ant > (<instans.SpreadEventsConstraint> constr).timegroupmaximum[k])
                                        constrafvigelser.push(ant - (<instans.SpreadEventsConstraint> constr).timegroupmaximum[k]);
                            }
                        }
                    }
                }
                if (constr instanceof instans.PreferTimesConstraint) {
                    type = "PreferTimesConstraint";
                    var conduration = constr.duration;
                    var constr: instans.PreferTimesConstraint = <instans.PreferTimesConstraint> constr;
                    for (var i = 0, antaleventsicon = constr.appliestoev.length; i < antaleventsicon; i++) {
                        var eventafvigelse = 0;
                        var thisevent = constr.appliestoev[i];
                        var startogslut = this.getdurations(thisevent);
                        for (var k = 0; k < startogslut.length; k = k + 2) {
                            var tjek = true;
                            if ("duration" in constr)
                                tjek = startogslut[k + 1] - startogslut[k] + 1 == constr["duration"];//rigtig l�ngde?
                            if (tjek) {
                                var tidmangelindex = thisevent.eventtidmangler[startogslut[k]].index;
                                var tildelttid = this.tidmangeltildelinger[tidmangelindex];
                                //     var tildelttid = this.tidmangeltildelinger[eventtidmngler[thisevent.eventtidmangler[k].index]];
                                if (tildelttid != null)
                                    if (constr.timer.indexOf(timer[tildelttid]) < 0)
                                        eventafvigelse = eventafvigelse + startogslut[k + 1] - startogslut[k] + 1;
                            }

                        }
                        constrafvigelser.push(eventafvigelse);
                    }
                }



                if (constrafvigelser.length > 0) {

                    var li = document.createElement("li");
                    samlconstrafvigelse = constr.costfunction(constrafvigelser) * constr.weight;

                    li.appendChild(document.createTextNode(constr.id + ':' + samlconstrafvigelse.toString() + ':' + constrafvigelser.toString()));
                    var conliste = hardcon ? document.getElementById("hardcon") : document.getElementById("softcon");
                    conliste.insertBefore(li, conliste.firstChild);
                    if (!(type in typeopsummering))
                        typeopsummering[type] = samlconstrafvigelse;
                    else
                        typeopsummering[type] += samlconstrafvigelse;


                    //                    appendChild(li);
                }
            }
            assert(true, '-----------');
            for (var prop in typeopsummering)
                assert(true, prop + " " + typeopsummering[prop])
        }
        getdurations(thisevent: instans.AEvent) {
            var startogslut: number[] = [];
            var igang = true;
            var searchindex = 0;
            var totalduration = thisevent.eventtidmangler.length;
            while (igang) {
                if (this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex].index] != null) {
                    startogslut.push(searchindex);
                    var instansigang = true;
                    while (instansigang) {
                        if (searchindex + 2 > totalduration) {
                            instansigang = false;
                            igang = false;
                        }
                        else {
                            if (this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex + 1].index] != null) {
                                if (this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex].index] + 1 ==
                                    this.tidmangeltildelinger[thisevent.eventtidmangler[searchindex + 1].index]) {
                                    var resourcerens = false;//nb imgen resmangler
                                    for (var k = searchindex + 1; k < thisevent.eventresmangler.length; k += thisevent.duration) {
                                        var denneres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k].index];
                                        var forrigeres = vistsol.resmangeltildelinger[thisevent.eventresmangler[k - 1].index];
                                        if (denneres == forrigeres)
                                            resourcerens = true;
                                        else {
                                            resourcerens = false;
                                            k = thisevent.eventresmangler.length;
                                        }
                                    }
                                    if (resourcerens || thisevent.eventresmangler.length == 0)
                                        searchindex++;
                                    else
                                        instansigang = false;
                                }
                                else
                                    instansigang = false;
                            }
                            else
                                instansigang = false;
                        }
                    }
                    startogslut.push(searchindex++);
                }
                else {
                    if (searchindex + 2 > totalduration) {
                        igang = false;
                    }
                    else
                        searchindex++;
                }
            }
            return startogslut;
        }
        getspliteventafvigelse(thisevent: instans.AEvent, con: instans.SplitEventsConstraint) {
            var mindur = con.minimumduration;
            var minam = con.minimumamount;
            var tmp = thisevent.id;
            var maxdur = con.maximumduration;
            var maxam = con.maximumamount;
            var startogslut = this.getdurations(thisevent);

            var afvigelser = 0;

            if (startogslut.length > 0) {

                //    var str = thisevent.name;
                for (var i = 0; i < startogslut.length; i = i + 2) {
                    var len = startogslut[i + 1] - startogslut[i] + 1;
                    //      str += " l�ngde:" + len.toString();
                    if (len < mindur)
                        afvigelser++;
                    if (len > maxdur)
                        afvigelser++

                }
                var ant = startogslut.length / 2;
                if (ant > maxam)
                    afvigelser += ant - maxam;
                if (ant < minam)
                    afvigelser += minam - ant;
                //      str += " antal:" + ant.toString();
                // alert(str);
            }
            return afvigelser;
        }
        getdistributespliteventafvigelse(thisevent: instans.AEvent, con: instans.SplitEventsConstraint) {
            var min = con.minimum;
            var tmp = thisevent.id;
            var max = con.maximum;
            var dur = con.duration;
            var startogslut = this.getdurations(thisevent);
            if (startogslut.length > 0) {
                // var str = thisevent.name;
                var antalmedrigtigduration = 0;
                for (var i = 0; i < startogslut.length; i = i + 2)
                    if (startogslut[i + 1] - startogslut[i] + 1 == dur)
                        antalmedrigtigduration++

            }
            if (antalmedrigtigduration > max)
                return antalmedrigtigduration - max;
            if (antalmedrigtigduration < min)
                return min - antalmedrigtigduration;
            return 0;
        }
        randomtidtildel(antal: number) {
            for (var i = 0; i < antal; i++) {
                var tidmangelindex = Math.floor(Math.random() * tidmangler.length);
                var tidindex = Math.floor(Math.random() * antaltider);
                this.tildeltidtilevent(tidmangelindex, tidindex);
            }
        }
        randontildelres(antal: number) {
            for (var i = 0; i < antal; i++) {
                var resmangelindex = Math.floor(Math.random() * resmangler.length);
                if (this.resmangeltildelinger[resmangelindex] == undefined) {
                    var typ = resmangler[resmangelindex].resourcetype;
                    var grr = Math.floor(Math.random() * typ.resourcegroups.length);
                    var r = typ.resourcegroups[grr].resourcer;
                    var rr = Math.floor(Math.random() * r.length);
                    var resindex = r[rr].index;
                    vistsol.resmangeltildelinger[resmangelindex] = resindex;
                }
                else
                    var her = 3;
            }
        }
        tildeltidtilevent(tidmangelindex: number, tidindex: number) {
            var event = tidmangler[tidmangelindex].aevent;
            var eventindex = event.index;
            var durationindex = tidmangler[tidmangelindex].durationindex;
            if (this.tidmangeltildelinger[tidmangelindex] != undefined)
                var gltid = this.tidmangeltildelinger[tidmangelindex];
            for (var i = durationindex; i < event.eventresmangler.length; i = i + event.duration) {
                if (this.resmangeltildelinger[event.eventresmangler[i].index] !== undefined) {
                    var resindex = this.resmangeltildelinger[event.eventresmangler[i].index];
                    if (gltid !== undefined)
                        this.fratagresourcetileventtiltid(resindex, durationindex, gltid, eventindex);
                    if (tidindex > -1)
                        this.tildelresourcetileventtiltid(resindex, durationindex, tidindex, eventindex);

                }


            }
            for (var j = 0; j < event.eventresourcer.length; j++) {//preassignede   
                var resindex = event.eventresourcer[j].index;
                if (gltid !== undefined)
                    this.fratagresourcetileventtiltid(resindex, durationindex, gltid, eventindex);
                if (tidindex > -1)
                    this.tildelresourcetileventtiltid(resindex, durationindex, tidindex, eventindex);
            }
            if (tidindex > -1)
                this.tidmangeltildelinger[tidmangelindex] = tidindex;
            else
                this.tidmangeltildelinger[tidmangelindex] = null;
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


