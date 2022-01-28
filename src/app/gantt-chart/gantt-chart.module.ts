import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttControlComponent } from './gantt-chart-control/gantt-chart-control.component';



@NgModule({
  declarations: [GanttControlComponent],
  imports: [
    CommonModule
  ],
  exports: [GanttControlComponent]
})
export class GanttChartModule { }
