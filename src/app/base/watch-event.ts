import { IWatchEvent } from '../interfaces/iwatch-event';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { Globals, MS_IN_HOUR, MS_IN_DAY } from '../services/globals.service';
import { dateToString, TimeHelper } from './time-helper';

export class WatchEvent {
  private static _idS = 10000;

  //readonly siteId!: number;

  //readonly beginDate!: Date;
  readonly endDate!: Date;
  readonly beginMs!: number;
  readonly lengthMs!: number;

  readonly offsetPerc!: string;

  readonly lengthPerc!: string;
  notes: string = '';

  readonly Guard!: IGuardJson;
  readonly Site!: ISiteJson;
  readonly guardBackground: string = 'white';
  readonly guardTextColor: string = 'black';

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
    this.lengthMs = this.lengthH * MS_IN_HOUR;
    this.endDate = new Date(this.beginMs + this.lengthMs);

    this.offsetPerc = Globals.ms2FramePerc(
      this.beginMs - Globals.beginDate.getTime()
    );
    this.lengthPerc = Globals.hrs2FramePerc(this.lengthH);
    this.guardBackground = this.getPlanBackground();
    this.guardTextColor = this.Guard.textColor;
    this.id = id >= 0 ? id : (WatchEvent._idS = WatchEvent._idS + 2);
  }

  private getPlanBackground(): string {
    if (!this.active) return 'black';
    if (this.guardId == 0) {
      const hr = this.beginDate.getHours();
      if (hr < 10) return 'rgba(0, 255, 255, 0.2)'; //SkyBlue
      if (hr < 17) return 'rgba(255, 255, 0, 0.6)'; //Sun;
      return 'rgba(0, 0, 255,0.4)'; //Night sky
    }
    return this.Guard.background;
    //251, 172, 19
  }

  get numWatch() {
    const hr = this.beginDate.getHours();
    if (hr < 10) return 1; //SkyBlue
    if (hr < 17) return 2; //Sun;
    return 3;
  }

  private getTextColor(): string {
    if (!this.active) return 'white';
    if (this.guardId == 0) {
      // const hr = this.beginDate.getHours();
      // if (hr < 10) return 'rgba(0, 255, 255, 0.2)'; //SkyBlue
      // if (hr < 17) return 'rgba(255, 255, 0, 0.6)'; //Sun;
      // return 'rgba(0, 0, 255,0.4)'; //Night sky
      return 'navy';
    }
    return this.Guard.textColor;
    //251, 172, 19
  }
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
    return this.dateToString(this.beginDate, true);
  }
  get endString() {
    return this.dateToString(this.endDate, true);
  }
  dateToString(date: Date, isTime: boolean = false): string {
    let str = `${p2(date.getDate())}`;
    if (isTime) {
      //|| date.getHours() != 0 || date.getMinutes() != 0) {
      str += `.${p2(date.getHours())}:${p2(date.getMinutes())}`;
    }
    return str;
  }
  // siteId: number; // "2";
  // guardId: number; // "101";
  // begin: Date; // new Date(beginS * 1000) from 2022-01-01
  // end?: Date;
  // lengthH: number;
  //  id,siteId,begin,lengthH,guardId
  // 1,-1,2022-01-02 14:30,8.0
  // 0,1,-1,2022-01-02 14:30,8.0,2022-01-02 22:30
  toCsvString() {
    const beginDate = this.dateToString(this.beginDate, true);
    const { id, siteId, lengthH, guardId } = this;
    return `${id},${siteId},${beginDate},${lengthH.toFixed(2)},${guardId}`;
  }

 
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
