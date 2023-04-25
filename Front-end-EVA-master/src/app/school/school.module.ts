import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import  { NgxPaginationModule }  from  'ngx-pagination'
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';
import { ReadSchoolComponent } from './read-school/read-school.component';


@NgModule({
  declarations: [
    SchoolComponent,
    CreateSchoolComponent,
    UpdateSchoolComponent,
    ReadSchoolComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,

  ]
})
export class SchoolModule { }
