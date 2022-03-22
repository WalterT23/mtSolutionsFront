import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';

declare var M: any;
@Component({
  selector: 'app-datos-parametros',
  templateUrl: './datos-parametros.component.html',
  styleUrls: ['./datos-parametros.component.css']
})
export class DatosParametrosComponent implements OnInit {

  txt: any;
  path: any;
  formCtrl: FormGroup;
  titulo: string = '';
  datoSeleccionado: any;

  constructor(public router:Router, private commonSrv: CommonService) {
    this.txt = PROPERTIES.parametros;
    this.path = CONSTANTES;
    this.commonSrv.apagado = true;
    this.datoSeleccionado = this.commonSrv.getParametroSeleccionado;
    this.commonSrv.titulo = CONSTANTES.CREAR_PARAMETROS.nombre + this.datoSeleccionado?.valor;
    this.formCtrl = new FormGroup({
      buscador: new FormControl(),
      selector: new FormControl()
    });
  }

  ngOnInit(): void { }

  get getBuscador(): any {
    return this.formCtrl.get('buscador');
  }


  get getSelector(): any {
    return this.formCtrl.get('selector');
  }

  irAParametros() {
    this.router.navigate([CONSTANTES.PARAMETROS.route]);
  }

}
