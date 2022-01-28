import {  Injectable } from '@angular/core';
import { WatchEvent as WatchEvent } from '../base/watch-event';
import { MOKGuardsJSon } from '../data/json/guards.data';
import { MokSitesJSon } from '../data/json/sites.data';
import { IGanttCharRow } from '../gantt-chart/gantt-chart-control/igantt-chart-row.model';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
//export 

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private isites: ISiteJson[] = [];
  private iguards: IGuardJson[] = [];
  readonly siteEventsMap: Map<number, IGanttCharRow> =
    new Map<number, IGanttCharRow>();


  async createSitePlanEvents(): Promise<IGanttCharRow[]> {
    this.isites = MokSitesJSon;
    this.iguards = MOKGuardsJSon;

    this.siteEventsMap.clear();

    this.isites.forEach(isite => {
      const row = this.createWatchPlan(isite);
      this.siteEventsMap.set(isite.siteId, row);
    })
    return [...this.siteEventsMap.values()];

  }
  
  static _Global: GlobalsService;
  static get Global(): GlobalsService { return GlobalsService.Global; }
  
  constructor() {
    GlobalsService._Global = this;
  }

  setGlobals(midnight: string, nDays: number) {
    const date = new Date(midnight);

    this._beginDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    
  }
  
  private _beginDate: Date = new Date();
  public get beginDate(): Date {
    return this._beginDate;
  }
  
  
  
  private _nDays: number = 7;
  public get nDays(): number {
    return this._nDays;
  }

  

  get endDate(): Date {
    return new Date(this.beginDate.getTime() + this.nDays * MS_IN_DAY);
  }
  private p2(p: number): string {
    const str: string = p.toString();
    return (str.length < 2) ? '0' + str : str;
  }
  dateToString(date: Date, withHours: boolean = false): string {
    let str = `${date.getFullYear()}-${this.p2(date.getMonth() + 1)}-${this.p2(date.getDate())}`;
    return (withHours) ? str + ` ${this.p2(date.getHours())}:${this.p2(date.getMinutes())}` : str;

  }
  getMidnight(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }

  createWatchPlan(iSite: ISiteJson): IGanttCharRow {
    let arr: WatchEvent[] = [];
    //  this.q15plan.fill(0); //
    const watchStrArr: string[] = iSite.watchStrArr;
    let dayBeginMs = this.beginDate.getTime();
    let dow = this.beginDate.getDay();
    const siteId = iSite.siteId;

    for (let index = 0; index < this.nDays; index++, dayBeginMs += MS_IN_DAY) {
      const midnight = new Date(dayBeginMs);
      const dow = midnight.getDay();
      //debugger;
      const templStr = watchStrArr[dow];
      const arrTepplStrs = templStr.split(';');
      arrTepplStrs.forEach(templ => {
        const w = WatchEvent.fromTemplateString(siteId, midnight, templ);
        if (!!w)
          arr.push(w);
      });
   
    }
    return {
      siteId: iSite.siteId,
      name: iSite.name,
      events: arr,
      mileStones: []
    } as IGanttCharRow;
  }
}
///////////////////////////////////////////////////////////////////////
function p2(p: number): string {
  const str:string =  p.toString();
  return (str.length < 2) ? '0' + str : str;
}
export function  dateToString(date: Date) : string {
  let str = `${date.getFullYear()}-${p2(date.getMonth() + 1)}-${p2(date.getDate())}`
  if (date.getHours() != 0 || date.getMinutes() != 0) {
    str += ` ${p2(date.getHours())}:${p2(date.getMinutes())}`;
  }
  return str;
}

