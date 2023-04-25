import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AggrementRoutingModule } from './aggrement-routing.module';
import { AggrementComponent } from './aggrement.component';
import { UpdateAggreComponent } from './update-aggre/update-aggre.component';
import { ReadAggreComponent } from './read-aggre/read-aggre.component';
import { CreateAggreComponent } from './create-aggre/create-aggre.component';
import  { NgxPaginationModule }  from  'ngx-pagination';
import { DetailAggreComponent } from './detail-aggre/detail-aggre.component'


@NgModule({
  declarations: [
    AggrementComponent,
    UpdateAggreComponent,
    ReadAggreComponent,
    CreateAggreComponent,
    DetailAggreComponent
  ],
  imports: [
    CommonModule,
    AggrementRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class AggrementModule { }
