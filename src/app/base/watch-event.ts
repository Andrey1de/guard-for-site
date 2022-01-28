import { IWatchEvent } from "src/app/interfaces/iwatch-event";

export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;




export class WatchEvent implements IWatchEvent{
    readonly siteId !: number;
    readonly beginDate!: Date;
    readonly endDate!: Date;
    readonly beginMs: number;
    readonly lengthMs: number;
    readonly lengthH: number;
    guardId: number = 0; // may be asserted to real guide, -1 not working site
    get active(): boolean { return this.guardId >= 0;}
    // readonly offsetPc: string = '0%';
    // readonly durationPc: string = '0%';
    background: string = 'grey';
    textColor: string = 'black';
    note: string = '';

    constructor( siteId: number,
                 beginDate: Date,
                 endDate: Date,
                public name: string,
                guardId : number = 0 ) {
        this.siteId = siteId;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.guardId = guardId;

        this.beginMs = this.beginDate.getTime();
        const endMs = this.endDate.getTime();
        this.lengthMs = endMs - this.beginMs;
        this.lengthH = this.lengthMs / MS_IN_HOUR;
       //const arenaLengthMs = MS_IN_HOUR * Arena.lengthH;
        // this.offsetPc = (100 * lenghMs / arenaLengthMs).toFixed(2) + '%'; 
        // this.durationPc = (100 * beginMs / arenaLengthMs* ).toFixed(2) + '%'; 
    
    }
   
    setGuard(guard: any) {
        if (!!guard.guardId) {
            this.guardId = guard.guardId || this.guardId;
            this.background = guard.background || this.background;
            this.textColor = guard.textColor || this.textColor;
            this.name = guard.name || this.name;
            this.note = guard.note || this.note;
           
        }
    }
        // Actualy we retrieve from DB
    static fromIGanttWatchEvent(event: IWatchEvent) : WatchEvent {
        const ret = new WatchEvent(event.siteId, event.beginDate, event.endDate, event.name,
            event.guardId);
        return ret;
    }

     
    static fromOtrezok(siteId: number, beginDate: Date, lengthH: number,
                        name: string, guardId: number = 0): WatchEvent {
        let endDate = new Date(beginDate.getTime() + lengthH * MS_IN_HOUR);
        
        return new WatchEvent(siteId, beginDate, endDate, name,guardId);
    }

   
    //"-06:00+12"
    static fromTemplateString(siteId: number,
            midNight: Date, templStr: string )
        : WatchEvent | undefined {
        let retWatch: WatchEvent | undefined;
        try {
            //"-06:00+12;18:00+12"
            const b = templStr[0];
            let active = (b >= '0' && b <= '9') || b == '+';
            if (!active) templStr = templStr.substring(1);
            const arr = templStr.split(/[:+]+/);
 
            if (arr.length >= 3) {
                 const begRet = new Date(midNight.getFullYear(),
                    midNight.getMonth(), midNight.getDate(),
                     +arr[0], +arr[1]);
                
                const lengthH = +arr[2];
                const endRet = new Date(begRet.getTime() + lengthH * MS_IN_HOUR);
                
             
                retWatch = new WatchEvent(siteId, begRet, endRet, '', (active) ? 0 : -1);
                retWatch.textColor = (active) ? 'black' : 'white';
                retWatch.background = (active) ? 'cyan' :'black';
                retWatch.name = (active) ?
                    'הגדר' :
                    'לא פעיל'
                    ;
                retWatch.name = lengthH + ' ' + retWatch.name;
         
            }
      
           
        } catch (error) {
            return undefined;
        }
    	return retWatch;
        
    }

}