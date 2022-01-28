import { Component } from '@angular/core';
import { IGanttCharRow } from './gantt-chart/gantt-chart-control/igantt-chart-row.model';
import { GlobalsService } from './services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guard-for-site';
  rows: IGanttCharRow[] = [];
  constructor(readonly G: GlobalsService) {
    
    this.rows = [];
    this.initGlobal();

    
  
  }

  async initGlobal()  {
    this.G.setGlobals('2022-01-02', 7);
   // debugger;
   // this.rows = await this.G.createSitePlanEvents();
   
   
  }
}


  //[
      // {
      //   name: 'Sprint plan', events: [
      //     { name: 'Design sprint', startDate: new Date('2022-01-02 14:30'), endDate: new Date('2022-01-03 22:00') } as IWatchEvent,
      //     { name: 'Sprint 1', startDate: new Date('2022-01-04'), endDate: new Date('2022-01-05') } as IWatchEvent,
      //     { name: 'Design sprint', startDate: new Date('2022-01-05'), endDate: new Date('2022-01-06') } as IWatchEvent,
      //     { name: 'Sprint 2', startDate: new Date('2022-01-06'), endDate: new Date('2022-01-08') } as IWatchEvent

      //   ],
      //   mileStones: [
      //     { name: 'Feature complete', date: new Date('2022-01-15') } as IMileStone]
      // } as IGanttCharRow
    //   ,
    //   {
    //     name: 'Market activation', events: [
    //       { name: 'Market activity', startDate: new Date('2022-01-15'), endDate: new Date('2022-01-28') } as IWatchEvent
    //     ],
    //     mileStones: [{ name: 'Funding round complete', date: new Date('2022-01-28') } as IMileStone]
    //   } as IGanttCharRow,
    //   {
    //     name: 'Google ads campaign', events: [
    //       { name: 'Busy period', startDate: new Date('2022-01-02'), endDate: new Date('2022-01-15') } as IWatchEvent
    //     ]
    //   } as IGanttCharRow,
    //   {
    //     name: 'Client feedback', events: [
    //       { name: 'Manual collection', startDate: new Date('2022-01-15'), endDate: new Date('2022-01-30') } as IWatchEvent
    //     ]
    //   } as IGanttCharRow,
    //   {
    //     name: 'Implementation window', events: [
    //       { name: 'Busy period', startDate: new Date('2022-01-15'), endDate: new Date('2022-01-30') } as IWatchEvent
    //     ]
    //   } as IGanttCharRow

    // ]