import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CommonService } from './servicios/common.service';
import { PROPERTIES } from '../environments/mensaje.properties';
import { CONSTANTES } from './componentes/constantes';
import { Router } from '@angular/router';
import { AuthService } from './servicios/login/auth.service';

declare var M: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'Mi tienda';
  texto: any;
  path: any;
  constructor(public common:CommonService,
    public router:Router, public auth: AuthService){

    this.texto = PROPERTIES;
    this.path = CONSTANTES;


  }
  ngAfterViewChecked(): void {

    //collapsible
    setTimeout(() => {
      var elemsc = document.querySelectorAll('.collapsible');
      M.Collapsible.init(elemsc, {});
    }, 0);

  }

  menuPrincipal() {
    this.router.navigate( [CONSTANTES.DASHBOARD.route] );
  }

  menuUsuario() {
    this.router.navigate( [CONSTANTES.USUARIO.route] );
  }

  menuRoles() {
    this.router.navigate([CONSTANTES.ROLES.route]);
  }

  logOut() {
    this.common.apagado = true;
    this.common.remover();
    this.auth.logOut();
    this.auth.clearToken();
  }

  menuProveedor() {
    this.router.navigate( [CONSTANTES.PROVEEDOR.route]);
  }
}


