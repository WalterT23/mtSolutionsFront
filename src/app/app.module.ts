import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/login/login.component';
import { RequestInterceptor } from './request-interceptor';
import { AuthGuardService } from './servicios/login/auth-guard.service';
import { AuthService } from './servicios/login/auth.service';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DatosUsuarioComponent } from './componentes/usuario/datos-usuario/datos-usuario.component';
import localePy from '@angular/common/locales/es-PY';
import { registerLocaleData } from '@angular/common';
import { ControlAcceso } from './utils/control-accesso';
import { RolesComponent } from './componentes/roles/roles.component';
import { DatosRolComponent } from './componentes/roles/datos-rol/datos-rol.component';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UsuarioComponent,
    DatosUsuarioComponent,
    ControlAcceso,
    RolesComponent,
    DatosRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
