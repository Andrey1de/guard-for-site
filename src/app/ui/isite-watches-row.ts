import { WatchEvent } from "../base/watch-event";

export interface ISiteWatchesRow {
  siteId: number;
  name: string;
  watches: WatchEvent[];
}
