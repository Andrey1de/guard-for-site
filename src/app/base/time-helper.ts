import { IBegEnd } from '../interfaces/ibegin-end';
import { DayPart } from '../services/globals.service';
//import { IWatchEvent } from '../interfaces/iwatch-event';
export const Begin2022 = new Date('2022-01-01');
export const BeginMs2022 = Begin2022.getTime();

export const MS_IN_H5 = 5 * 60 * 1000;
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
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
  static msToId(ms: number): number {
    return ((ms - BeginMs2022) / MS_IN_H5) | 0;
  }
  static idToMS(h5: number): number {
    return BeginMs2022 + h5 * MS_IN_H5; // h5 ((ms - BeginMs2022) / MS_IN_H5) | 0;
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
  //With

  static dateToString(date: Date, isTime: boolean = false): string {
    let str = `${p2(date.getFullYear())}-${p2(date.getMonth() + 1)}-${p2(
      date.getDate()
    )}`;
    if (isTime) {
      //|| date.getHours() != 0 || date.getMinutes() != 0) {
      str += ` .${TimeHelper.getTimeStr(date)}`;
    }
    return str;
  }

  static addDays(date: Date, nDays: number): Date {
    return new Date(date.getTime() + nDays * MS_IN_DAY);
  }
  static addHours(date: Date, nHours: number): Date {
    return new Date(date.getTime() + nHours * MS_IN_HOUR);
  }

  static getTimeStr(date: Date) {
    return `${p2(date.getHours())}:${p2(date.getMinutes())}`;
  }
  static timeToNumber(date: Date): string {
    let min = date.getMinutes();
    let str: string =
      min == 0
        ? date.getHours().toString()
        : (date.getHours() + min / 60).toFixed(2);

    return str;
  }

  static getDayPart(date: Date): DayPart {
    const hr = date.getHours();
    if (hr < 10) return DayPart.Morning; //SkyBlue
    if (hr < 17) return DayPart.Noon; //Sun;
    return DayPart.Night;
  }

  //220102,20;06:30;8;-1
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
