import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { TimeHelper } from 'src/app/base/time-helper';
import { IDayAxis } from 'src/app/interfaces/day-axis.model';
import { Globals, MS_IN_DAY } from 'src/app/services/globals.service';
import { WatchService } from 'src/app/services/watch.service';
import { ISiteWatchesRow } from '../isite-watches-row';

@Component({
  selector: 'app-site-watches',
  templateUrl: './site-watches.component.html',
  styleUrls: ['./site-watches.component.scss'],
})
export class SiteWatchesComponent implements OnInit, AfterViewInit {
  @Input() rows: ISiteWatchesRow[] = []; //Don't forget to
  @Input() beginDate: Date = Globals.beginDate;
  @Input() endDate: Date = Globals.endDate;
  @Input() isHebrew: boolean = true;
  //@ViewChild('dayAxis') dayAxisRef!: ElementRef;
  readonly nDays: number;
  readonly chartLengthMs: number;
  readonly chartBeginMs: number;
  readonly leftTopTitle!: string;
  readonly titleLenPc: string = '20.0';
  readonly gridLinesPcArr: string[] = [];
  dayAxis: IDayAxis[];
  constructor(private elRef: ElementRef, readonly W: WatchService) {
    this.nDays = Globals.nDays;
    this.chartLengthMs = Globals.nDays * MS_IN_DAY;
    this.chartBeginMs = Globals.beginDate.getTime();
    this.dayAxis = this.getAxisDays(this.beginDate, this.nDays);
    this.leftTopTitle =
      TimeHelper.getHebMonthName(Globals.beginDate) +
      ' ' +
      Globals.beginDate.getFullYear();
    this.gridLinesPcArr = this.createGidArr();
  }
  createGidArr(): string[] {
    let arr: string[] = [];
    for (let index = 1; index < this.nDays; index++) {
      const beg = (100 * index) / this.nDays;
      arr.push(beg.toFixed(2));
    }
    return arr;
  }
  direction(): string {
    return this.isHebrew ? 'rtl' : 'ltr';
  }
  localAlign(): string {
    return this.isHebrew ? 'right' : 'left';
  }
  onWatchClick($event: any, watch: any) {}
  async ngOnInit() {
    //debugger;
    this.rows = await this.W.createSiteWatchPlan(this.beginDate, this.nDays);
    console.dir(this.rows);
  }

  getAxisDays(beginDate: Date, nDays: number): IDayAxis[] {
    let dayAxisArr: IDayAxis[] = new Array<IDayAxis>();
    const titleLen: number = +this.titleLenPc;
    const _dayLenPc = +((100.0 - titleLen) / this.nDays).toFixed(2);

    for (
      let index = 0, dayMs = beginDate.getTime();
      index < nDays;
      index++, dayMs += MS_IN_DAY
    ) {
      let day = new Date(dayMs);
      let dow = TimeHelper.getHebDayName(day);
      const _dayName = dow + ' ' + day.getDate();
      dayAxisArr.push({ dayName: _dayName, dayLenPc: _dayLenPc } as IDayAxis);
    }
    return dayAxisArr;
  }

  ngAfterViewInit(): void {
    this.updateAxisRowSize();
    // const native = this.elRef.nativeElement; //.querySelector('.row-events');
    //('.row-axis');

    //this.widthAxisRow = elRef?.offsetWidth | 0;

    //console.log('this.widthRow=' + this.widthAxisRow);
  }
  widthAxisRow: number = 0;
  leftAxisRow: number = 0;

  @HostListener('window:resize', ['$event']) onResize(event: any): boolean {
    this.updateAxisRowSize();
    return true;
  }
  updateAxisRowSize() {
    const elRef1 = this.elRef.nativeElement.querySelector('.row-axis');
    // debugger;
    if (!!elRef1) {
      this.widthAxisRow = elRef1?.offsetWidth | 0;
      this.leftAxisRow = elRef1?.offsetLeft | 0;
      console.dir('this.widthAxisRow=' + this.widthAxisRow);
    }
  }
}
