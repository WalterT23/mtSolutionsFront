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
import { ProveedoresComponent } from './componentes/proveedor/proveedores/proveedores.component';
import { GestionarProveedorComponent } from './componentes/proveedor/gestionar-proveedor/gestionar-proveedor.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CrearClientesComponent } from './componentes/clientes/crear-clientes/crear-clientes.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { GestionarArticuloComponent } from './componentes/articulos/gestionar-articulo/gestionar-articulo.component';
import { MilesPipe } from './pipes/miles.pipe';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MilesPipe,
    DashboardComponent,
    LoginComponent,
    UsuarioComponent,
    DatosUsuarioComponent,
    ControlAcceso,
    RolesComponent,
    DatosRolComponent,
    ProveedoresComponent,
    GestionarProveedorComponent,
    ClientesComponent,
    CrearClientesComponent,
    ArticulosComponent,
    GestionarArticuloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,

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
