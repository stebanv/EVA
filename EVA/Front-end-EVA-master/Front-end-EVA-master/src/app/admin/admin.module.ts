import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { StudentRoutingModule } from '../student/student-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentsComponent } from './students/students.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AggreComponent } from './aggre/aggre.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    ActivitiesComponent,
    AggreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
