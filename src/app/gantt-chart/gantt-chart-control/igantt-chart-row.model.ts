import { WatchEvent } from "src/app/base/watch-event";
import { IMileStone } from "src/app/interfaces/imilestone";

export interface IGanttCharRow {
    siteId: number;
    name: string;
    events: WatchEvent[];
    mileStones: IMileStone[];
}