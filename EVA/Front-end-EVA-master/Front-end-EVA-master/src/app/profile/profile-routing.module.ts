import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile.component';
import { ReadProfileSchoolComponent } from './read-profile-school/read-profile-school.component';
import { ReadProfileComponent } from './read-profile/read-profile.component';
import { UpdateProfileSchoolComponent } from './update-profile-school/update-profile-school.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'read',
        component: ReadProfileComponent
      },
      {
        path: 'update/:id',
        component: UpdateProfileComponent
      },
      {
        path: 'read-school/:id',
        component: ReadProfileSchoolComponent
      },
      {
        path: 'update-school/:id',
        component: UpdateProfileSchoolComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
