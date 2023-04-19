import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModuleModule } from './shared-module/shared-module.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import  { NgxPaginationModule }  from  'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { InicioComponent } from './pages/inicio/inicio.component';
// import { ChangeBgDirective } from './changeBg';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    InicioComponent,
    // ChangeBgDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    UiSwitchModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
