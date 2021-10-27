import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';
import { Location } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-gestionar-proveedor',
  templateUrl: './gestionar-proveedor.component.html',
  styleUrls: ['./gestionar-proveedor.component.css']
})
export class GestionarProveedorComponent implements OnInit {

  txt: any;
  path: any;
  location: Location;
  formCtrl: FormGroup;
  titulo: string = '';

  constructor(private router: Router,
    location: Location,
    private commonSrv: CommonService) {
      this.txt = PROPERTIES;
      this.path = CONSTANTES;
      this.commonSrv.apagado = true;
      this.formCtrl = new FormGroup({
        nombreProveedor: new FormControl(undefined, [Validators.required]),
        rucProveedor: new FormControl(undefined, [Validators.required]),
        direccion: new FormControl(undefined, [Validators.required]),
        telefono: new FormControl(undefined, [Validators.required]),
        correo: new FormControl(undefined, [Validators.required])
      });
      this.location = location;
     }

  ngOnInit(): void {
    let aux = this.location.path().search(CONSTANTES.CREAR_USUARIO.route);
    if (aux !== -1) {
      this.titulo = this.txt.tituloNuevoProveedor;
    } else {
      this.titulo = this.txt.tituloEditarProveedor;
    }
  }


  irAProveedores() {
    this.router.navigate([CONSTANTES.PROVEEDOR.route]);
  }
}
