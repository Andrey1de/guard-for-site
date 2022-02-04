import { Component } from '@angular/core';
import { Globals } from './services/globals.service';
import { WatchService } from './services/watch.service';
import { ISiteWatchesRow } from './ui/isite-watches-row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guard-for-site';
  rows: ISiteWatchesRow[] = [];
  constructor(readonly W: WatchService) {
    this.rows = [];
    this.initGlobal();
    //this.createYearPlan();
  }

  async createYearPlan() {
    const arr = (this.rows = await this.W.createSiteWatchPlan(
      new Date('2022-01-01'),
      366
    ));
  }

  async initGlobal() {
    Globals.setFrame(new Date('2022-01-02'), 4);
    // debugger;
    // this.rows = await this.G.createSitePlanEvents();
  }
}
