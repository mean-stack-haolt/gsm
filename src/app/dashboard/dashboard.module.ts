import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MultilangsModule } from '../multilangs/multilangs.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MultilangsModule
  ]
})
export class DashboardModule { }
