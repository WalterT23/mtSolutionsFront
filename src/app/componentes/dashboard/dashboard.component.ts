import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PROPERTIES } from 'src/environments/mensaje.properties';
import { CONSTANTES } from '../constantes';
import { AuthService } from '../../servicios/login/auth.service';
import { CommonService } from '../../servicios/common.service';


declare var M:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  texto: any;
  path: any;
  interval: any;
  carouse: any;
  constructor(
    public router:Router,
    public auth: AuthService
  ) { 
    this.texto = PROPERTIES;
    this.path = CONSTANTES;
  }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
    var elems2 = document.querySelectorAll('.carousel');
    this.carouse =  M.Carousel.init(elems, {fullWidth: true});
    /*this.interval = setInterval(() => {
      this.carouse.next();
    }, 1500);*/
  }

  ngOnDestroy(): void {
    //clearInterval(this.interval)
  }

  logOut() {
    this.auth.logOut();
    this.auth.clearToken();
  }

  menuUsuario() {
    this.router.navigate( [CONSTANTES.USUARIO.route] );
  } 

}
