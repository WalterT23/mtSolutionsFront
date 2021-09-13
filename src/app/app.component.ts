import { Component } from '@angular/core';
import { CommonService } from './servicios/common.service';
import { PROPERTIES } from '../environments/mensaje.properties';
import { CONSTANTES } from './componentes/constantes';
import { Router } from '@angular/router';
import { AuthService } from './servicios/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi tienda';
  texto: any;
  path: any;
  constructor(public common:CommonService,
    public router:Router, public auth: AuthService){

    this.texto = PROPERTIES;
    this.path = CONSTANTES;

  }

  menuPrincipal() {
    this.router.navigate( [CONSTANTES.DASHBOARD.route] );
  }

  menuUsuario() {
    this.router.navigate( [CONSTANTES.USUARIO.route] );
  }

  logOut() {
    this.common.apagado = true;
    this.auth.logOut();
    this.auth.clearToken();
  }
}


