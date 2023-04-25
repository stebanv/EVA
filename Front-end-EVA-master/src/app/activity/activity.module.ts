import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { ReadActivityComponent } from './read-activity/read-activity.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import  { NgxPaginationModule }  from  'ngx-pagination'
import {MatDialogModule} from '@angular/material/dialog';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';


@NgModule({
  declarations: [
    ActivityComponent,
    ReadActivityComponent,
    CreateActivityComponent,
    UpdateActivityComponent,
    DetailActivityComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,
    MatDialogModule
  ]
})
export class ActivityModule { }
