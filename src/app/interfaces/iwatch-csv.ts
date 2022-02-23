import { TimeHelper } from '../base/time-helper';
//import { WatchEvent } from "../base/watch-event";
import { MS_IN_DAY, MS_IN_HOUR } from '../services/globals.service';
//import { ISiteWatchesRow } from "../ui/isite-watches-row";
import { ISiteJson } from './isite-json';

export interface IWatchCsv {
  id: number;
  siteId: number;
  date: string;
  beginH: number; //to 2 dec
  lengthH: number; // t
  guardId: number;
  beginDate?: Date;
}

export function csv2IWatchCsv(csvStr: string): IWatchCsv | undefined {
  const fix2 = (a: any): number => ((+a * 100) | 0) / 100;
  if (csvStr.length < 15 || (csvStr[0] < '0' && csvStr[0] > '9'))
    return undefined;
  const arr = csvStr.split(',');

  let [_siteId, _date, _beginH, _lengthH, _guardId] = arr;
  const beginH = fix2(_beginH);
  const midnight = new Date(_date);
  const ms = midnight.getTime() + beginH * MS_IN_HOUR;
  const id = TimeHelper.msToId(ms);

  return {
    id: id,
    siteId: +_siteId,
    date: _date,
    beginH: beginH, //fix 2
    lengthH: fix2(_lengthH), //fix/2
    guardId: +_guardId,
    beginDate: new Date(ms),
  } as IWatchCsv;
}
export function toCsvString(w: IWatchCsv): string {
  const str = `${w.siteId},${w.date},${w.beginH},${w.lengthH},${w.guardId}`;
  return str;
}

export function packArrayToString(csvArr: IWatchCsv[]): string {
  let strBlob: string = 'siteId,date,beginH,lengthH,guardId\r\n';
  for (const csv of csvArr) {
    strBlob += toCsvString(csv) + '\r\n';
  }
  return strBlob;
}

export async function saveCsvFile$(
  csvArr: IWatchCsv[],
  flieName: string = 'iwatch.csv'
) {
  const strBlob = packArrayToString(csvArr);
  const a = document.createElement('a');
  const blob = new Blob([strBlob], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = flieName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}
export async function saveJsonFile$(
  jsonObject: any,
  flieName: string = 'iwatch.json'
) {
  debugger;
  const strBlob = JSON.stringify(jsonObject, null, 2);
  const a = document.createElement('a');
  const blob = new Blob([strBlob], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = flieName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export function daySiteWatchesCsv(
  midnight: Date,
  iSite: ISiteJson
): IWatchCsv[] {
  let arr: IWatchCsv[] = [];
  const nDays = 1;

  const watchPlan: number[][] = iSite.watchPlan;
  if (!Array.isArray(watchPlan) || watchPlan.length !== 7) {
    return arr;
  }
  midnight = TimeHelper.getMidnight(midnight);
  let midnightMs = midnight.getTime();
  const midnightStr = TimeHelper.dateToString(midnight);

  // const siteId = iSite.siteId;

  for (
    let nDay = 0, dow = midnight.getDay();
    nDay < nDays;
    nDay++, dow = ++dow % 7, midnightMs += MS_IN_DAY
  ) {
    //let dowNext = (dow + 1) % 7;
    const planArr: number[] = watchPlan[dow];
    const planArrNext: number[] = watchPlan[(dow + 1) % 7];
    //Number of watches must been at least 2 !!!!

    if (planArr.length > 1) {
      const nMax = planArr.length;
      let nextDbl = planArr[0];
      let absNext = Math.abs(nextDbl);

      for (let nWatch = 1; nWatch <= nMax; nWatch++) {
        let _begtDbl = absNext;
        let _guardId = nextDbl > 0 ? 0 : -1;
        nextDbl = nWatch < nMax ? planArr[nWatch] : planArrNext[0];
        absNext = Math.abs(nextDbl);
        let _lengthH = absNext - _begtDbl;
        if (_lengthH < 0) _lengthH += 24;
        const ms = midnightMs + _begtDbl * MS_IN_HOUR;
        const beginDate = new Date(ms);
        const id = TimeHelper.msToId(ms);
        const watchCsv = {
          id: id,
          siteId: iSite.siteId,
          date: midnightStr,
          beginH: _begtDbl, //to 2 dec
          lengthH: _lengthH, // t
          guardId: _guardId,
          beginDate: beginDate,
        } as IWatchCsv;
        arr.push(watchCsv);
      }
    }
  }
  return arr;
}
// evDurationPc(event: WatchEvent): string {
