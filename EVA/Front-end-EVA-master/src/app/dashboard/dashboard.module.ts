import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TemplateComponent } from './template/template.component';
import { NgChartsModule } from 'ng2-charts';
import { ClusterComponent } from './cluster/cluster.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import  { NgxPaginationModule }  from  'ngx-pagination'


@NgModule({
  declarations: [
    DashboardComponent,
    TemplateComponent,
    ClusterComponent,
    RecomendacionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule,
    NgChartsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
