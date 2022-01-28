export interface IWatchEvent {
    // 0 free , may be used by guard -1 not working site
    //-1 banned , not active
    siteId: number;
    guardId: number;
    beginDate: Date;
    endDate: Date;
    name: string;
    background: string;
    textColor:string
}