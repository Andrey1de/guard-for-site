import { IWatchEvent } from '../interfaces/iwatch-event';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { Globals, MS_IN_HOUR, MS_IN_DAY } from '../services/globals.service';
import { dateToString, TimeHelper } from './time-helper';

export class WatchEvent {
  private static _idS = 0;

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
    readonly id: number = -1
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
    this.id = id > 0 ? id : (WatchEvent._idS = WatchEvent._idS + 2);
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

  // static fromOtrezok(
  //   siteId: number,
  //   beginDate: Date,
  //   lengthH: number,
  //   name: string,
  //   guardId: number = 0
  // ): WatchEvent {
  //   let endDate = new Date(beginDate.getTime() + lengthH * MS_IN_HOUR);

  //   return new WatchEvent(siteId, beginDate, endDate, name, guardId);
  // }

  //"-06:00+12"
  static fromTemplateString(
    siteId: number,
    midNight: Date,
    templStr: string
  ): WatchEvent | undefined {
    let retWatch: WatchEvent | undefined;
    try {
      //"-06:00+12;18:00+12"
      const b = templStr[0];
      let active = (b >= '0' && b <= '9') || b == '+';
      if (!active) templStr = templStr.substring(1);
      const arr = templStr.split(/[:+]+/);

      if (arr.length >= 3) {
        const begRet = new Date(
          midNight.getFullYear(),
          midNight.getMonth(),
          midNight.getDate(),
          +arr[0],
          +arr[1]
        );

        const lengthH = +arr[2];

        retWatch = new WatchEvent(siteId, active ? 0 : -1, begRet, lengthH);
      }
    } catch (error) {
      return undefined;
    }
    return retWatch;
  }
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
