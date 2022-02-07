import { IBegEnd } from '../interfaces/ibegin-end';
import { IWatchEvent } from '../interfaces/iwatch-event';

export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
export const MS_IN_WEEK = MS_IN_DAY * 7;
export const HEB_DAYS = [
  'א' + "'",
  'ב' + "'",
  'ג' + "'",
  'ד' + "'",
  'ה' + "'",
  'ו' + "'",
  'שבת',
];

export class TimeHelper {
  static getMidnight(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  static castBegEnd(begEnd1: IBegEnd, begEnd2: IBegEnd): IBegEnd | undefined {
    const begMs: number = Math.max(
      begEnd1.beginDate.getTime(),
      begEnd2.beginDate.getTime()
    );
    const endMs: number = Math.min(
      begEnd1.endDate.getTime(),
      begEnd2.endDate.getTime()
    );
    if (begMs >= endMs) return undefined;
    return { beginDate: new Date(begMs), endDate: new Date(endMs) };

    // ---------[          ]------------------------
    // ---------------[          ]------------------------
    // ---------------[    ]------------------------
  }
  static getHebMonthName(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return new Intl.DateTimeFormat('he-IL', options).format(date);
  }
  static getHebDayName(date: Date): string {
    //   const options : Intl.DateTimeFormatOptions= { month: 'short' };
    return HEB_DAYS[date.getDay()];
  }
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
export function dateToString(date: Date, isTime: boolean = false): string {
  let str = `${date.getFullYear()}-${p2(date.getMonth() + 1)}-${p2(
    date.getDate()
  )}`;
  if (isTime) {
    //|| date.getHours() != 0 || date.getMinutes() != 0) {
    str += 'T' + getTimeStr(date);
  }
  return str;
}
function getTimeStr(date: Date) {
  return `${p2(date.getHours())}:${p2(date.getMinutes())}`;
}
/*
(d)date://days 2022/1/1 00:00 ? 220102
(b)beginH: 650;// CantiHour 650
(l)length 800; // 800
(s)(site): 20
(g):(guardId): -1;

*/

//220102,20;06:30;8;-1
function toCSVString(ev: IWatchEvent): string {
  // const d = dateToString(ev.beginDate).split('T');
  const date = ev.beginDate;
  let d = date.getFullYear() % 100;
  d = d * 100 + date.getMonth();
  d = d * 100 + date.getDate();
  let s = ('000' + (ev.siteId)).slice(-4);
  let str = `${d},${s},${getTimeStr(date)},${ev.lengthH},${ev.guardId}`;
  return str;
}

export function getMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}
