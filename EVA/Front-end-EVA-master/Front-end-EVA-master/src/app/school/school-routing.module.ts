import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { ReadSchoolComponent } from './read-school/read-school.component';
import { SchoolComponent } from './school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateSchoolComponent
      },
      {
        path: 'read',
        component: ReadSchoolComponent
      },
      {
        path: 'update/:id',
        component: UpdateSchoolComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
