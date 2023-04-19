import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { ReadActivityComponent } from './read-activity/read-activity.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';

const routes: Routes = [
  {
  path: '',
  component: ActivityComponent,
  children: [
    {
      path: '',
      redirectTo: 'read',
      pathMatch: 'full'
    },
    {
      path: 'create',
      component: CreateActivityComponent
    },
    {
      path: 'read',
      component:ReadActivityComponent
    },
    {
      path: 'update/:id',
      component: UpdateActivityComponent
    },
    {
      path: 'detail/:id',
      component: DetailActivityComponent
    }
  ]
}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
