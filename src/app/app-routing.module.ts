import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTANTES } from './componentes/constantes';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuardService } from './servicios/login/auth-guard.service';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DatosUsuarioComponent } from './componentes/usuario/datos-usuario/datos-usuario.component';

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
    path: '**', pathMatch: 'full', redirectTo: CONSTANTES.LOGIN.route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
