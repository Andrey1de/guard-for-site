import { Component, Input, OnInit } from '@angular/core';
import { IDayAxis } from '../../interfaces/day-axis.model';
import { GlobalsService } from 'src/app/services/globals.service';
import { MS_IN_DAY } from '../arena';
import { IGanttCharRow } from './igantt-chart-row.model';
import { WatchEvent } from '../../base/watch-event';
//import { HEB_DAYS } from 'src/app/base/time-helper';


const HEB_DAYS = [
      'א' + '\'',
      'ב'+ '\'',
      'ג'+ '\'',
      'ד'+ '\'',
      'ה'+ '\'',
      'ו'+ '\'',
      'שבת',
      
    ];


@Component({
  selector: 'app-gantt-chart-control',
  templateUrl: './gantt-chart-control.component.html',
  styleUrls: ['./gantt-chart-control.component.scss']
})
export class GanttChartControlComponent implements OnInit {
  @Input() rows: IGanttCharRow[] =[];
  @Input() beginDate: Date = this.g.beginDate;
  @Input() endDate: Date = this.g.endDate;
  readonly nDays: number;
  readonly chartLengthMs: number;
  readonly chartBeginMs: number;
  dayAxis: IDayAxis[];
  colourPallete = ['#7C4DFF',
                  '#81c784',
                  '#e53935',
                  '#FF8A80',
                  '#303F9F',
                  '#40C4FF',
                  '#006064',
                  '#FF8A65']

  constructor(readonly g : GlobalsService) { 
  
    this.nDays = this.g.nDays;
    this.chartLengthMs = this.nDays * MS_IN_DAY;
    this.chartBeginMs = this.g.beginDate.getTime();
    this.dayAxis = this.getAxisDays(this.beginDate, this.nDays);
 
  }

  async ngOnInit() {
   
   
    this.rows = await this.g.createSitePlanEvents();
    console.dir(this.rows);
     
  }
  getAxisDays(beginDate: Date, nDays: number): IDayAxis[] {
   
    let dayAxisArr: IDayAxis[] = new Array<IDayAxis>();
    const _dayLenPc = +(100 / this.nDays).toFixed(2);
 
    for (let index = 0, dayMs = beginDate.getTime();
      index < this.g.nDays; index++,dayMs +=  MS_IN_DAY) {
      let day = new Date(dayMs);
      let dow = HEB_DAYS[day.getDay()];
      const _dayName = dow + ' ' + day.getDate();
      dayAxisArr.push({ dayName: _dayName, dayLenPc: _dayLenPc } as IDayAxis);
      
    }
    return dayAxisArr;
  }
   
  evDurationPc(event: WatchEvent): string {
   
    const durPc = 100 * (event.lengthMs / this.chartLengthMs);
     return durPc.toFixed(2);

  }

  evOffsetPc(event: WatchEvent): string {
    // debugger;
    let offsPc = 100 * (event.beginMs - this.chartBeginMs) / this.chartLengthMs;
   
     return offsPc.toFixed(2);
  }

  private ni = -1;

  getColour(idx: number): string {
    // if(this.rows.length < rowIndex) {
    //   return '#64b5f6';
    // }
    this.ni = (++this.ni) % this.colourPallete.length;
    return this.colourPallete[this.ni];
  }

}

