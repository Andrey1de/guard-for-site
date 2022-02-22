import { Component, OnInit } from '@angular/core';
import { TimeHelper } from './base/time-helper';
import { IWatchCsv, saveCsvFile$ } from './interfaces/iwatch-csv';
import { Globals } from './services/globals.service';
import { WatchService } from './services/watch.service';
import { ISiteWatchesRow } from './ui/isite-watches-row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'guard-for-site';
  model: any;
  rows: ISiteWatchesRow[] = [];
  strDate!: string;

  constructor(readonly W: WatchService) {
    this.rows = [];
    this.strDate = TimeHelper.dateToString(new Date(), false);

    this.initGlobal();
    //this.createYearPlan();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  arrWatchCsv: IWatchCsv[] = [];
  createCsvArray() {
    debugger;
    this.arrWatchCsv = [];
    this.arrWatchCsv = this.W.create2022Csv('2022-02-01', 366 - 58);
  }

  async saveCsvFile() {
    await saveCsvFile$(this.arrWatchCsv, 'iwatch-csv.csv');
  }
  // async createPlan(
  //   strBegin: string,
  //   nDays: number
  // ): Promise<ISiteWatchesRow[]> {
  //   const arr = []; //(this.rows = await this.W.createSiteWatchPlan(
  //   //   new Date(strBegin),
  //   //   nDays
  //   // ));
  //   return arr;
  // }

  async initGlobal() {
    // debugger;
    // this.rows = await this.G.createSitePlanEvents();
  }

  // async callPlan() {
  //   let strOut = [];
  //   const arr = await this.createPlan('2022-02-01', 30);
  //   arr.forEach((site) => {
  //     site.watches.forEach((w) => strOut.push(w.toCsvString()));
  //   });

  //   debugger;
  // }
  go() {
    debugger;
    Globals.setFrame(new Date('2022-02-01'), 4);

    // const obj = {
    //   a: 22,
    //   b: 'stringB',
    //   arr: [1, 2, 3, 4],
    // };
    // download_json_using_blob('rr.json', JSON.stringify(obj, null, 2));
    //this.rows = await Globals.createSitePlanEvents();
  }
}
var download_json_using_blob = function (fileName: string, content: any) {
  var csvData = new Blob([content], { type: 'application/json' });
  // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //   // for IE
  //   window.navigator.msSaveOrOpenBlob(csvData, file_name);
  // } else {
  // for Non-IE (chrome, firefox etc.)
  var a: any = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  var csvUrl = URL.createObjectURL(csvData);
  a.href = csvUrl;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
  // }
};

