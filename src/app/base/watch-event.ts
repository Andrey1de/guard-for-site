//import { IWatchEvent } from '../interfaces/iwatch-event';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { csv2IWatchCsv, IWatchCsv } from '../interfaces/iwatch-csv';
import {
  Globals,
  MS_IN_HOUR,
  MS_IN_DAY,
  DayPart
} from '../services/globals.service';
import { TimeHelper as TH } from './time-helper';
//import { resourceUsage } from 'process';
//100101,1,2022-01-02,14.5,8,-1
// export const MORNING = 0;
// export const NOON = 1;
// export const EVENING = 2;


export class WatchEvent {
  //implements IWatchEvent
  private static _idS = 10000;
  next: WatchEvent | undefined = undefined;

  //readonly siteId!: number;

  //readonly beginDate!: Date;
  readonly midnight!: Date;
  readonly midnightString!: string;
  readonly endDate!: Date;
  readonly beginMs!: number;
  readonly dayOfFrame!: number; // 0 ... 6
  readonly lengthMs!: number;
  readonly beginH!: number; //bein from modnight

  readonly offsetPerc!: string;

  readonly lengthPerc!: string;
  notes: string = '';

  readonly Guard!: IGuardJson;
  readonly Site!: ISiteJson;
  readonly guardBackground: string = 'white';
  readonly guardTextColor: string = 'black';
  readonly partOfDay!: DayPart ;
  get active(): boolean {
    return this.guardId >= 0;
  }
  // readonly offsetPc: string = '0%';
  // readonly durationPc: string = '0%';

  constructor(
    readonly siteId: number,
    readonly guardId: number,
    readonly beginDate: Date,
    readonly lengthH: number,
    readonly id: number = 0
  ) {
    this.Guard = Globals.getGuard(guardId);
    this.Site = Globals.getSite(siteId);
    this.beginMs = this.beginDate.getTime();
    this.midnight = TH.getMidnight(this.beginDate);
    this.midnightString = TH.dateToString(this.midnight);
    this.beginH = (this.beginMs - this.midnight.getTime()) / MS_IN_HOUR;
    this.dayOfFrame = Math.round(
      (this.beginMs - Globals.beginDate.getDate()) / MS_IN_DAY
    );

    this.lengthMs = this.lengthH * MS_IN_HOUR;
    this.endDate = new Date(this.beginMs + this.lengthMs);

    this.offsetPerc = Globals.ms2FramePerc(
      this.beginMs - Globals.beginDate.getTime()
    );
    this.lengthPerc = Globals.hrs2FramePerc(this.lengthH);
    this.guardBackground = this.getPlanBackground();
    this.guardTextColor = this.Guard.textColor;
    this.id = id >= 0 ? id : (WatchEvent._idS = WatchEvent._idS + 2);

    // get partOfDay(): number {
     this.partOfDay = TH.getDayPart(this.beginDate)
 
  }

  private getPlanBackground(): string {
    if (!this.active) return 'black';
    if (this.guardId == 0) {
      switch (this.partOfDay) {
        case DayPart.Morning:
          return 'rgba(0, 255, 255, 0.2)'; //SkyBlue
        case DayPart.Noon:
          return 'rgba(255, 255, 0, 0.6)'; //Sun;
        default:
          return 'rgba(0, 0, 255,0.4)'; //Night sky
      }
       
    }
    return this.Guard.background;
    //251, 172, 19
  }


  // private getTextColor(): string {
  //   if (!this.active) return 'white';
  //   if (this.guardId == 0) {
  //     // const hr = this.beginDate.getHours();
  //     // if (hr < 10) return 'rgba(0, 255, 255, 0.2)'; //SkyBlue
  //     // if (hr < 17) return 'rgba(255, 255, 0, 0.6)'; //Sun;
  //     // return 'rgba(0, 0, 255,0.4)'; //Night sky
  //     return 'navy';
  //   }
  //   return this.Guard.textColor;
  //   //251, 172, 19
  // }
  // Actualy we retrieve from DB
  static fromWatchEvent(event: WatchEvent): WatchEvent {
    const ret = new WatchEvent(
      event.siteId,
      event.guardId,
      event.beginDate,
      event.lengthH,
      event.id
    );
    return ret;
  }
  get beginString() {
    return TH.dateToString(this.beginDate, true);
  }
  get endString() {
    return TH.dateToString(this.endDate, true);
  }

  // siteId: number; // "2";
  // guardId: number; // "101";
  // begin: Date; // new Date(beginS * 1000) from 2022-01-01
  // end?: Date;
  // lengthH: number;
  // id,siteId,date,beginH,lengthH,guardId
  // 100100,1,2022-01-02,6.5,8,-1
  // 100101,1,2022-01-02,14.5,8,-1
  toCsvString() {
    const date = TH.dateToString(this.beginDate, false);
    const beginH = TH.timeToNumber(this.beginDate);
    const { id, siteId, lengthH, guardId } = this;
    // id,siteId,date,beginH,lengthH,guardId
    return `${id},${siteId},${date},${beginH},${+lengthH},${guardId}`;
  }

  static getCsvHeader(): string {
    return `id,siteId,date,beginH,lengthH,guardId`;
  }

  static formCsvString(
    csvStr: string,
    fromDate: string = '',
    toDate: string = ''
  ): WatchEvent | undefined {
    let watchRet: WatchEvent | undefined;
    let iCsv: IWatchCsv | undefined = csv2IWatchCsv(csvStr);
    if (
      iCsv &&
      (!fromDate || iCsv.date >= fromDate) &&
      (!toDate || iCsv.date < toDate)
    ) {
      watchRet = new WatchEvent(
        iCsv.siteId,
        iCsv.guardId,
        new Date(iCsv.date),
        iCsv.lengthH,
        iCsv.id
      );
    }

    return watchRet;
  }
  // by site by time
  static sorter(ev1: WatchEvent, ev2: WatchEvent) {
    let del = ev1.siteId - ev2.siteId;
    if (del == 0) {
      del = ev1.beginMs - ev2.beginMs;
      if (del == 0) return 0;
    }

    return del < 0 ? -1 : +1;
  }
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
