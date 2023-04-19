import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '.././shared-module/shared-module.module'
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReadProfileComponent } from './read-profile/read-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ReadProfileSchoolComponent } from './read-profile-school/read-profile-school.component';
import { UpdateProfileSchoolComponent } from './update-profile-school/update-profile-school.component';
import { PasswordComponent } from './password/password.component';
import { HomeComponent } from './home/home.component';
import  { NgxPaginationModule }  from  'ngx-pagination'


@NgModule({
  declarations: [
    ProfileComponent,
    ReadProfileComponent,
    UpdateProfileComponent,
    ReadProfileSchoolComponent,
    UpdateProfileSchoolComponent,
    PasswordComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class ProfileModule { }
