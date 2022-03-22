import { Component, OnInit } from '@angular/core';
import { PROPERTIES } from 'src/environments/mensaje.properties';
import { CommonService } from '../../servicios/common.service';
import { CONSTANTES } from '../constantes';


declare var M:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  texto: any;
  path: any;
  interval: any;
  constructor(
    public common: CommonService
  ) {
    this.texto = PROPERTIES;
    this.common.apagado = true;
    this.common.titulo = CONSTANTES.DASHBOARD.route;
  }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {draggable: false});

  }
}
