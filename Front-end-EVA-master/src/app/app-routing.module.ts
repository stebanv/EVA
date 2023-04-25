import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityGuard } from './guards/activity.guard';
import { AggrementGuard } from './guards/aggrement.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { SchoolGuard } from './guards/school.guard';
import { StudentGuard } from './guards/student.guard';
import { TestGuard } from './guards/test.guard';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'layout',
    component: LayoutComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'test',
    canActivate: [TestGuard],
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule)
   },
   {
    path: 'profile',
    canActivate: [TestGuard],
    loadChildren: () => import('./profile/profile.module').then((m)=> m.ProfileModule)
   },
   {
    path: 'aggrement',
    canActivate: [AggrementGuard],
    loadChildren: () => import('./aggrement/aggrement.module').then((m) => m.AggrementModule)
   },
   {
    path: 'eactivity',
    canActivate: [ActivityGuard],
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
   },
   {
    path: 'school',
    canActivate: [SchoolGuard],
    loadChildren: () => import('./school/school.module').then(m => m.SchoolModule)
   },
   {
    path: 'student',
    canActivate: [StudentGuard],
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
   },
   {
    path: 'dashboard',
    canActivate:[DashboardGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
   },
   {
    path: 'admin',
    canActivate:[SchoolGuard],
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
   },
   {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
