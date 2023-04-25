import { TemplateLiteral } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterComponent } from './cluster/cluster.component';
import { DashboardComponent } from './dashboard.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      },
      {
        path: '',
        component: TemplateComponent
      },
      {
        path: 'cluster',
        component: ClusterComponent
      },
      {
        path: 'recomendacion',
        component: RecomendacionesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
