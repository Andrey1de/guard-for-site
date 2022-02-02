import { WatchEvent } from 'src/app/base/watch-event';
import { IMileStone } from 'src/app/interfaces/imilestone';

export interface IGanttSiteRow {
  siteId: number;
  name: string;
  watches: WatchEvent[];
  mileStones: IMileStone[];
}
