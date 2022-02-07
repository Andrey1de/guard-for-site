import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttControlComponent } from './gantt-chart/gantt-control/gantt-control.component';
import { SiteWatchesComponent } from './ui/site-watches/site-watches.component';
import { GuardWatchesComponent } from './ui/guard-watches/guard-watches.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    GanttControlComponent,
    SiteWatchesComponent,
    GuardWatchesComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule ,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

