export interface IWatchEvent {
    // 0 free , may be used by guard -1 not working site
    //-1 banned , not active
    id:number;
    siteId: number;
    guardId: number;
    beginDate: Date;
    lengthH:number;
    endDate?: Date;
    name: string;
    background: string;
    textColor:string
}
