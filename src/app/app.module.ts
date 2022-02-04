import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttControlComponent } from './gantt-chart/gantt-control/gantt-control.component';
import { SiteWatchesComponent } from './ui/site-watches/site-watches.component';


@NgModule({
  declarations: [
    AppComponent,
    GanttControlComponent,
    SiteWatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

