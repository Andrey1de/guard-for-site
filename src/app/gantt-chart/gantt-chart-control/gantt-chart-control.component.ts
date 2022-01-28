import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { IDayAxis } from '../../interfaces/day-axis.model';
import { GlobalsService } from 'src/app/services/globals.service';
import { MS_IN_DAY } from '../arena';
import { IGanttCharRow } from './igantt-chart-row.model';
import { WatchEvent } from '../../base/watch-event';
import { TimeHelper } from 'src/app/base/time-helper';
//import { HEB_DAYS } from 'src/app/base/time-helper';

const HEB_DAYS = [
  'א' + "'",
  'ב' + "'",
  'ג' + "'",
  'ד' + "'",
  'ה' + "'",
  'ו' + "'",
  'שבת',
];

@Component({
  selector: 'app-gantt-chart-control',
  templateUrl: './gantt-chart-control.component.html',
  styleUrls: ['./gantt-chart-control.component.scss'],
})
export class GanttControlComponent implements OnInit, AfterViewInit {
  @Input() rows: IGanttCharRow[] = [];
  @Input() beginDate: Date = this.g.beginDate;
  @Input() endDate: Date = this.g.endDate;
  //@ViewChild('dayAxis') dayAxisRef!: ElementRef;
  readonly nDays: number;
  readonly chartLengthMs: number;
  readonly chartBeginMs: number;
  readonly leftTopTitle!: string;
  dayAxis: IDayAxis[];
  colourPallete = [
    '#7C4DFF',
    '#81c784',
    '#e53935',
    '#FF8A80',
    '#303F9F',
    '#40C4FF',
    '#006064',
    '#FF8A65',
  ];

  constructor(private elRef: ElementRef, readonly g: GlobalsService) {
    this.nDays = this.g.nDays;
    this.chartLengthMs = this.nDays * MS_IN_DAY;
    this.chartBeginMs = this.g.beginDate.getTime();
    this.dayAxis = this.getAxisDays(this.beginDate, this.nDays);
    this.leftTopTitle =
      TimeHelper.getHebMonthName(this.g.beginDate) +
      ' ' +
      this.g.beginDate.getFullYear();
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
    this.rows = await this.g.createSitePlanEvents();
    console.dir(this.rows);
  }

  getAxisDays(beginDate: Date, nDays: number): IDayAxis[] {
    let dayAxisArr: IDayAxis[] = new Array<IDayAxis>();
    const _dayLenPc = +(100 / this.nDays).toFixed(2);

    for (
      let index = 0, dayMs = beginDate.getTime();
      index < this.g.nDays;
      index++, dayMs += MS_IN_DAY
    ) {
      let day = new Date(dayMs);
      let dow = HEB_DAYS[day.getDay()];
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
      'leftAxisRow=',this.leftAxisRow|0,
      'X',
      (e.clientX ) | 0,
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
    this.ni = ++this.ni % this.colourPallete.length;
    return this.colourPallete[this.ni];
  }
}
