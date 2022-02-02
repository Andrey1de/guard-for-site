import { Component } from '@angular/core';
import { IGanttSiteRow } from './gantt-chart/gantt-control/igantt-site-row.model';
import { Globals } from './services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guard-for-site';
  rows: IGanttSiteRow[] = [];
  constructor() {
    this.rows = [];
    this.initGlobal();
  }

  async initGlobal() {
    Globals.setFrame(new Date('2022-01-02'), 7);
    // debugger;
    // this.rows = await this.G.createSitePlanEvents();
  }
}


