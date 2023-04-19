import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggrementComponent } from './aggrement.component';
import { CreateAggreComponent } from './create-aggre/create-aggre.component';
import { DetailAggreComponent } from './detail-aggre/detail-aggre.component';
import { ReadAggreComponent } from './read-aggre/read-aggre.component';
import { UpdateAggreComponent } from './update-aggre/update-aggre.component';

const routes: Routes = [
  {
    path: '',
    component: AggrementComponent,
    children: [
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateAggreComponent
      },
      {
        path: 'read',
        component: ReadAggreComponent
      },
      {
        path: 'update/:id',
        component: UpdateAggreComponent
      }
      ,
      {
        path: 'detail/:id',
        component: DetailAggreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrementRoutingModule { }
