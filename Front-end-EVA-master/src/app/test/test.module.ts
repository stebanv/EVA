import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { DoTestComponent } from './do-test/do-test.component';
import { ResultComponent } from './result/result.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  declarations: [
    TestComponent,
    DoTestComponent,
    ResultComponent,
    ViewTestComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModuleModule,
    UiSwitchModule
  ]
})
export class TestModule { }
