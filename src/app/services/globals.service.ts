import { MOKGuardsJSon } from '../data/json/guards.data';
import { MokSitesJSon } from '../data/json/sites.data';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
//export

export class GlobalsService {
  static _Global: GlobalsService;
  static get Global(): GlobalsService {
    return GlobalsService.Global;
  }

  readonly mapSiteJson: Map<number, ISiteJson> = new Map<number, ISiteJson>();
  readonly mapGuardJson: Map<number, IGuardJson> = new Map<
    number,
    IGuardJson
  >();

  private iSites: ISiteJson[] = []; //MokSitesJSon;
  private iGuards: IGuardJson[] = []; //MOKGuardsJSon;
  public Direction : string = 'ltr';

  constructor() {
    GlobalsService._Global = this;
    this.setStaticData();
  }
  getSite(siteId: number): ISiteJson {
    return (
      this.mapSiteJson.get(siteId) ||
      ({
        siteId: siteId,
        name: 'SITE ERROR',
        address: '',
        watchStrArr: [],
      } as ISiteJson)
    );
  }

  getGuard(guardId: number): IGuardJson {
    return (
      this.mapGuardJson.get(guardId) ||
      ({
        guardId: guardId,
        manager: '--',
        name: 'GUARD ERROR',
        background: 'red',
        textColor: 'white',
      } as IGuardJson)
    );
  }

  setStaticData() {
    this.iSites = MokSitesJSon;
    this.iGuards = MOKGuardsJSon;

    if (this.mapGuardJson.size == 0 && this.iGuards.length > 0) {
      this.iGuards.forEach((g) => this.mapGuardJson.set(g.guardId, g));
    }
    if (this.mapSiteJson.size == 0 && this.iGuards.length > 0) {
      this.iSites.forEach((g) => this.mapSiteJson.set(g.siteId, g));
    }
  }

  setFrame(date: Date, nDays: number) {
    this._beginDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this._nDays = nDays | 0;
  }

  private _beginDate: Date = new Date();
  get beginDate(): Date {
    return this._beginDate;
  }

  private _nDays: number = 7;
  public get nDays(): number {
    return this._nDays;
  }
  get lengthMs(): number {
    return this.nDays * MS_IN_DAY;
  }

  get endDate(): Date {
    return new Date(this.beginDate.getTime() + this.nDays * MS_IN_DAY);
  }
  castOffset(offsMs: number) {
    return offsMs < 0
      ? 0
      : offsMs <= this.nDays * MS_IN_DAY
      ? offsMs
      : this._nDays * MS_IN_DAY;
  }
  hrs2FramePerc(hr: number) {
    return this.ms2FramePerc(hr * MS_IN_HOUR);
  }

  ms2FramePerc(ms: number): string {
    const perc = (100 * ms) / (this._nDays * MS_IN_DAY);
    // debugger;
    return perc.toFixed(2);
  }

  date2FramePerc(date: Date): string {
    const offsMs = this.castOffset(date.getTime() - this._beginDate.getTime());
    return this.ms2FramePerc(offsMs);
  }
}
export const Globals = new GlobalsService();
