import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoTestComponent } from './do-test/do-test.component';
import { ResultComponent } from './result/result.component';
import { TestComponent } from './test.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: '',
        redirectTo: 'doTest',
        pathMatch: 'full'
      },
      {
        path: 'doTest',
        component: DoTestComponent
      },
      {
        path: 'result',
        component: ResultComponent
      },
      {
        path: 'admin',
        component: ViewTestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
