import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { RouterModule } from '@angular/router'
import {MatDialogModule } from '@angular/material/dialog' ;'@material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgMultiSelectDropDownModule.forRoot(),
    UiSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgMultiSelectDropDownModule,
    UiSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class SharedModuleModule { }
