import { IBegEnd } from "../interfaces/ibegin-end";

export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
export const MS_IN_WEEK = MS_IN_DAY * 7;
export const HEB_DAYS = [
      'א',
      'ב',
      'ג',
      'ד',
      'ה',
      'ו',
      'שבת',
      
    ];
    
export class TimeHelper {
  static getMidnight(date: Date): Date{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  static castBegEnd(begEnd1: IBegEnd, begEnd2: IBegEnd) : IBegEnd | undefined {
    const begMs: number = Math.max(begEnd1.beginDate.getTime(),
        begEnd2.beginDate.getTime());
  const endMs: number = Math.min(begEnd1.endDate.getTime(),
    begEnd2.endDate.getTime());
    if (begMs >= endMs) return undefined;
    return { beginDate: new Date(begMs), endDate: new Date(endMs) };

// ---------[          ]------------------------
// ---------------[          ]------------------------
// ---------------[    ]------------------------

    
  }
  static getHebMonthName(date: Date): string {
    const options : Intl.DateTimeFormatOptions= { month: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  static getHebDayName(date: Date): string {
 //   const options : Intl.DateTimeFormatOptions= { month: 'short' };
    return HEB_DAYS[date.getDay()] + '\'';
  }
  static toString(date: Date) {
    const f2 = (n: number) => '0' + n;
    return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
    
  }
}