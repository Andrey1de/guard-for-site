export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
export class Arena {
  static beginDate: Date = new Date('2021-01-02');
  static lengthH = 24 & 7;
  static get endDate(): Date {
    return new Date(Arena.beginDate.getTime() + Arena.lengthH * MS_IN_HOUR);
  }
  private static  p2(p: number): string {
    const str: string = p.toString();
    return (str.length < 2) ? '0' + str : str;
  }
  static dateToString(date: Date, withHours: boolean = false): string {
    let str = `${date.getFullYear()}-${Arena.p2(date.getMonth() + 1)}-${Arena.p2(date.getDate())}`;
    return (withHours) ? str + ` ${Arena.p2(date.getHours())}:${Arena.p2(date.getMinutes())}` : str;

  }

}