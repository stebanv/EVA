import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { AdminComponent } from './admin.component';
import { AdminModule } from './admin.module';
import { AggreComponent } from './aggre/aggre.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent ,
    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'activities',
        component: ActivitiesComponent
      },
      {
        path: 'aggre',
        component: AggreComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
