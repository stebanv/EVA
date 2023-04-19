import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditAuthComponent } from './edit-auth/edit-auth.component';
import { ReadStudentComponent } from './read-student/read-student.component';
import { StudentComponent } from './student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent ,
    children: [
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateStudentComponent
      },
      {
        path: 'read',
        component: ReadStudentComponent
      },
      {
        path: 'update/:id',
        component: UpdateStudentComponent
      },
      {
        path: 'edit-auth',
        component: EditAuthComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
