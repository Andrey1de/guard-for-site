export interface IWatchEvent {
    // 0 free , may be used by guard -1 not working site
    //-1 banned , not active
    id:number;//min from 2022/1/1 00:00
    siteId: number;
    guardId: number;
    beginDate: Date;
    lengthH:number;
    endDate?: Date;
    name: string;
    background: string;
    textColor:string
}
//220102;6:30;8;20;-1




