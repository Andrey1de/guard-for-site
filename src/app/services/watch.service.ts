import { Injectable } from '@angular/core';
import { TimeHelper } from '../base/time-helper';
import { WatchEvent } from '../base/watch-event';
import { ISiteJson } from '../interfaces/isite-json';
import { daySiteWatchesCsv, IWatchCsv } from '../interfaces/iwatch-csv';
import { ISiteWatchesRow } from '../ui/isite-watches-row';
//import { IGanttSiteRow } from '../ui/isite-watches-row';
import { Globals, MS_IN_DAY, MS_IN_HOUR } from './globals.service';

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  public get beginDate(): Date {
    return Globals.beginDate;
  }
  public get nDays(): number {
    return Globals.nDays;
  }

  get endDate(): Date {
    return Globals.endDate;
  }

  readonly mapSiteWatches: Map<number, ISiteWatchesRow> = new Map<
    number,
    ISiteWatchesRow
  >();

  constructor() {}

  //ATN To read firmware data - site and guards with transferring them to map

  setFrame(midnight: Date, nDays: number) {
    //TBD if this G;obal set is Need?
    Globals.setFrame(midnight, nDays);
  }
  create2022Csv(beginDateStr: string, nDays: number = 100): IWatchCsv[] {
    let midnight = TimeHelper.getMidnight(new Date(beginDateStr));
    let arr: IWatchCsv[] = [];

    const sites = [...Globals.mapSiteJson.values()];
    for (let nDay = 0; nDay < nDays; nDay++, midnight) {
      for (const site of sites) {
        const arr1 = daySiteWatchesCsv(midnight, site);
        if (arr1.length > 0) {
          arr = [...arr, ...arr1];
        }
      }
      midnight = TimeHelper.addDays(midnight, 1);
    }
    return arr;
  }

  async createSiteWatchPlan(
    day: Date,
    nDays: number
  ): Promise<ISiteWatchesRow[]> {
    this.setFrame(day, nDays);
    this.mapSiteWatches.clear();
    const iSitesArr = [...Globals.mapSiteJson.values()];

    iSitesArr.forEach((iSite) => {
      const row = this.createOneSiteWatchPlan(
        this.beginDate,
        this.nDays,
        iSite
      );
      if (!!row) {
        this.mapSiteWatches.set(iSite.siteId, row);
      }
    });
    return [...this.mapSiteWatches.values()];
  }

  protected createOneSiteWatchPlan(
    midnight: Date,
    nDays: number,
    iSite: ISiteJson
  ): ISiteWatchesRow | undefined {
    let arr: WatchEvent[] = [];
    const watchPlan: number[][] = iSite.watchPlan;
    if (!Array.isArray(watchPlan) || watchPlan.length !== 7) {
      return undefined;
    }

    let midnightMs = midnight.getTime();
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
          let begtDbl = absNext;
          let guardId = nextDbl > 0 ? 0 : -1;
          nextDbl = nWatch < nMax ? planArr[nWatch] : planArrNext[0];
          absNext = Math.abs(nextDbl);
          let lengthH = absNext - begtDbl;
          if (lengthH < 0) lengthH += 24;
          const beginDate = new Date(midnightMs + begtDbl * MS_IN_HOUR);
          const watchEvent = new WatchEvent(
            iSite.siteId,
            guardId,
            beginDate,
            lengthH,
            -1 // to generate
          );

          arr.push(watchEvent);
        }
      }
    }
    return {
      siteId: iSite.siteId,
      name: iSite.name,
      watches: arr,
      mileStones: [],
    } as ISiteWatchesRow;
  }
  // evDurationPc(event: WatchEvent): string {
  //   const durPc = Globals.ms2FramePerc(event.lengthMs); //100 * (event.lengthMs / this.chartLengthMs);
  //   // return durPc.toFixed(2);
  //   return '10'; //.toString();
  // }

  // evOffsetPc(event: WatchEvent): string {
  //   // debugger;
  //   let offsPc = Globals.ms2OffsetPerc(event.beginMs);
  //   console.log(offsPc, event.beginMs, Globals.beginDateMs);
  //   //   (100 * (event.beginMs - this.chartBeginMs)) / this.chartLengthMs;

  //   return offsPc;
  // }

  // createDayWatchPlan(midnight: Date ,iSite: ISiteJson): IGanttSiteRow {
  //     let arr: WatchEvent[] = [];
  //     const watchStrArr: string[] = iSite.watchStrArr;
  //     let dayBeginMs = midnight.getTime();
  //     let dow = midnight.getDay();
  //     const siteId = iSite.siteId;

  //     const templStr = watchStrArr[dow];
  //     const arrTemplStrs = templStr.split(';');
  //     arrTemplStrs.forEach((templ) => {
  //       const w = WatchEvent.fromTemplateString(siteId, midnight, templ);
  //       if (!!w) arr.push(w);
  //     });

  //     return {
  //       siteId: iSite.siteId,
  //       name: iSite.name,
  //       watches: arr,
  //       mileStones: [],
  //     } as IGanttSiteRow;
  //   }
}

function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}
export function dateToString(date: Date): string {
  let str = `${date.getFullYear()}-${p2(date.getMonth() + 1)}-${p2(
    date.getDate()
  )}`;
  if (date.getHours() != 0 || date.getMinutes() != 0) {
    str += ` ${p2(date.getHours())}:${p2(date.getMinutes())}`;
  }
  return str;
}
