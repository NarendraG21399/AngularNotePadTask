import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotePadRoutingModule } from './dashboard-routing.module';
import { CreateNotePadComponent } from './create-note-pad/create-note-pad.component';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [HomeComponent, CreateNotePadComponent],
  imports: [
    CommonModule,
    CreateNotePadRoutingModule,
    ShareModule
  ]
})
export class DashboardModule { }
