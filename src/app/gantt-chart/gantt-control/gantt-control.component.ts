import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { IDayAxis } from '../../interfaces/day-axis.model';
import { Globals, MS_IN_DAY} from 'src/app/services/globals.service';
import { IGanttSiteRow } from './igantt-site-row.model';
import { WatchEvent } from '../../base/watch-event';
import { TimeHelper } from 'src/app/base/time-helper';
import { WatchService } from 'src/app/services/watch.service';




@Component({
  selector: 'app-gantt-control',
  templateUrl: './gantt-control.component.html',
  styleUrls: ['./gantt-control.component.scss'],
})
export class GanttControlComponent implements OnInit, AfterViewInit {
  @Input() rows: IGanttSiteRow[] = [];
  @Input() beginDate: Date = Globals.beginDate;
  @Input() endDate: Date = Globals.endDate;
  //@ViewChild('dayAxis') dayAxisRef!: ElementRef;
  readonly nDays: number;
  readonly chartLengthMs: number;
  readonly chartBeginMs: number;
  readonly leftTopTitle!: string;
  dayAxis: IDayAxis[];
 
  constructor(
    private elRef: ElementRef,
    readonly W: WatchService
  ) {
    this.nDays = Globals.nDays;
    this.chartLengthMs = Globals.nDays * MS_IN_DAY;
    this.chartBeginMs = Globals.beginDate.getTime();
    this.dayAxis = this.getAxisDays(this.beginDate, this.nDays);
    this.leftTopTitle =
      TimeHelper.getHebMonthName(Globals.beginDate) +
      ' ' +
      Globals.beginDate.getFullYear();
  }
  widthAxisRow: number = 0;
  leftAxisRow: number = 0;
  // rowAxisRef:
  updateAxisRowSize() {
    const elRef1 = this.elRef.nativeElement.querySelector('.row-axis');
    // debugger;
    if (!!elRef1) {
      this.widthAxisRow = elRef1?.offsetWidth | 0;
      this.leftAxisRow = elRef1?.offsetLeft | 0;
      console.dir('this.widthAxisRow=' + this.widthAxisRow);
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event: any): boolean {
    this.updateAxisRowSize();
    return true;
  }
  ngAfterViewInit(): void {
    this.updateAxisRowSize();
    // const native = this.elRef.nativeElement; //.querySelector('.row-events');
    //('.row-axis');

    //this.widthAxisRow = elRef?.offsetWidth | 0;

    //console.log('this.widthRow=' + this.widthAxisRow);
  }

  async ngOnInit() {
    debugger;
    this.rows = await this.W.createSiteWatchPlan(this.beginDate,this.nDays);
    console.dir(this.rows);
  }

  getAxisDays(beginDate: Date, nDays: number): IDayAxis[] {
    let dayAxisArr: IDayAxis[] = new Array<IDayAxis>();
    const _dayLenPc = +(100 / this.nDays).toFixed(2);

    for (
      let index = 0, dayMs = beginDate.getTime();
      index < Globals.nDays;
      index++, dayMs += MS_IN_DAY
    ) {
      let day = new Date(dayMs);
      let dow = TimeHelper.getHebDayName(day);
      const _dayName = dow + ' ' + day.getDate();
      dayAxisArr.push({ dayName: _dayName, dayLenPc: _dayLenPc } as IDayAxis);
    }
    return dayAxisArr;
  }
  fix2(num: number) {
    //const ret = (num * 100) | 0;
    return num | 0;
  }
  onRowClick(e: any) {
    const rect = e.target.getBoundingClientRect();

    const width7 = this.fix2((rect.right - rect.left) * this.nDays);
    console.log(
      //'rect.right=',// rect.right | 0,
      'leftAxisRow=',
      this.leftAxisRow | 0,
      'X',
      e.clientX | 0,
      'widthN',
      width7,
      // 'left', rect.left | 0,
      'widthAxisRow',
      this.widthAxisRow | 0
    );
    // console.log(
    //   'del',
    //   ((100 * (e.clientX - rect.left)) / (rect.right - rect.left)).toFixed(2),
    //   'Bouding  L=' + (rect.left | 0),
    //   'R=' + (rect.right | 0),
    //   'T = ' + (rect.top | 0),
    //   'B:' + (rect.bottom | 0)
    // );
    // console.dir(e);
  }
  onWatchClick(e: any, event: WatchEvent) {
    // console.dir(e);
    console.dir(event);
    //console.log('On Watch X', e.clientX, 'Y', e.clientY);
    // clientX: 300,
    // clientY: 500
    e.preventDefault();
  }
  evDurationPc(event: WatchEvent): string {
    const durPc = 100 * (event.lengthMs / this.chartLengthMs);
    return durPc.toFixed(2);
  }

  evOffsetPc(event: WatchEvent): string {
    // debugger;
    let offsPc =
      (100 * (event.beginMs - this.chartBeginMs)) / this.chartLengthMs;

    return offsPc.toFixed(2);
  }

  private ni = -1;

  getColour(idx: number): string {
    // if(this.rows.length < rowIndex) {
    //   return '#64b5f6';
    // }
    this.ni = ++this.ni % gColourPallete.length;
    return gColourPallete[this.ni];
  }
}


 const gColourPallete = [
   '#7C4DFF',
   '#81c784',
   '#e53935',
   '#FF8A80',
   '#303F9F',
   '#40C4FF',
   '#006064',
   '#FF8A65',
 ];
