import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTANTES } from './componentes/constantes';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuardService } from './servicios/login/auth-guard.service';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DatosUsuarioComponent } from './componentes/usuario/datos-usuario/datos-usuario.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { DatosRolComponent } from './componentes/roles/datos-rol/datos-rol.component';
import { ProveedoresComponent } from './componentes/proveedor/proveedores/proveedores.component';
import { GestionarProveedorComponent } from './componentes/proveedor/gestionar-proveedor/gestionar-proveedor.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';

const routes: Routes = [
  {
    path: "", pathMatch: 'full', redirectTo: CONSTANTES.LOGIN.route
  },
  {
    path: CONSTANTES.LOGIN.route, component: LoginComponent
  },
  {
    path: CONSTANTES.DASHBOARD.route,
    canActivate: [AuthGuardService],
    component: DashboardComponent,
    data: {paramComponent: CONSTANTES.DASHBOARD}
  },
  {
    path: CONSTANTES.USUARIO.route,
    canActivate: [AuthGuardService],
    component: UsuarioComponent,
    data: {paramComponent: CONSTANTES.USUARIO}
  },
  {
    path: CONSTANTES.CREAR_USUARIO.route,
    canActivate: [AuthGuardService],
    component: DatosUsuarioComponent,
    data: {paramComponent: CONSTANTES.CREAR_USUARIO}
  },
  {
    path: CONSTANTES.EDITAR_USUARIO.route,
    canActivate: [AuthGuardService],
    component: DatosUsuarioComponent,
    data: {paramComponent: CONSTANTES.EDITAR_USUARIO}
  },
  {
    path: CONSTANTES.ROLES.route,
    canActivate: [AuthGuardService],
    component: RolesComponent,
    data: {paramComponent: CONSTANTES.ROLES}
  },
  {
    path: CONSTANTES.CREAR_ROL.route,
    canActivate: [AuthGuardService],
    component: DatosRolComponent,
    data: {paramComponent: CONSTANTES.CREAR_ROL}
  },
  {
    path: CONSTANTES.EDITAR_ROL.route,
    canActivate: [AuthGuardService],
    component: DatosRolComponent,
    data: {paramComponent: CONSTANTES.EDITAR_ROL}
  },
  {
    path: CONSTANTES.PROVEEDOR.route,
    canActivate: [AuthGuardService],
    component: ProveedoresComponent,
    data: {paramComponent: CONSTANTES.PROVEEDOR}
  },
  {
    path: CONSTANTES.CREAR_PROVEEDOR.route,
    canActivate: [AuthGuardService],
    component: GestionarProveedorComponent,
    data: {paramComponent: CONSTANTES.CREAR_PROVEEDOR}
  },
  {
    path: CONSTANTES.CLIENTES.route,
    canActivate: [AuthGuardService],
    component: ClientesComponent/* ,
    data: {paramComponent: CONSTANTES.EDITAR_ROL} */
  },
  {
    path: CONSTANTES.EDITAR_PROVEEDOR.route,
    canActivate: [AuthGuardService],
    component: GestionarProveedorComponent,
    data: {paramComponent: CONSTANTES.EDITAR_PROVEEDOR}
  },
  {
    path: CONSTANTES.ARTICULOS.route,
    canActivate: [AuthGuardService],
    component: ArticulosComponent,
    data: {paramComponent: CONSTANTES.ARTICULOS}
  },
  {
    path: '**', pathMatch: 'full', redirectTo: CONSTANTES.LOGIN.route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
