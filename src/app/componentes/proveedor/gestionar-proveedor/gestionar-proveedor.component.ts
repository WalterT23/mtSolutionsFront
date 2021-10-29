import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';
import { Location } from '@angular/common';
import { ProveedorService } from '../../../servicios/proveedor/proveedor.service';

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
    private service: ProveedorService,
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

  get getNombreProveedor(): any {
    return this.formCtrl.get('nombreProveedor');
  }

  get getRucProveedor(): any {
    return this.formCtrl.get('rucProveedor');
  }

  get getDireccion(): any {
    return this.formCtrl.get('direccion');
  }

  get getTelefono(): any {
    return this.formCtrl.get('telefono');
  }

  get getCorreo(): any {
    return this.formCtrl.get('correo');
  }


  irAProveedores() {
    this.router.navigate([CONSTANTES.PROVEEDOR.route]);
  }

  crearProveedor() {
    if ((!this.getNombreProveedor.value || this.getNombreProveedor.value?.trim() == ' ') ||
          (!this.getRucProveedor.value || this.getRucProveedor.value?.trim() == ' ') ||
          (!this.getDireccion.value && this.getDireccion.value?.trim() == ' ') ||
          (!this.getCorreo.value && this.getCorreo.value?.trim() == ' ') ||
          (!this.getTelefono.value && this.getTelefono.value?.trim() == ' ')) {
          this.commonSrv.showMsg2(this.txt.alerta, 'info', 5000);
      } else {
        let obj= {
          nombre: this.getNombreProveedor.value.trim(),
          ruc: this.getRucProveedor.value.trim(),
          direccion: this.getDireccion.value.trim(),
          telefono: this.getTelefono.value.trim(),
          correo: this.getCorreo.value.trim()
        }
        this.service.crearProveedor(obj).subscribe(
          respuesta => {
              this.commonSrv.showMsg2(respuesta?.data, "success", 5000);
              setTimeout(() => {
                this.limpiarObjetos();
              }, 300);
          },
          error => {
            if(error && error.status != 403) {
              this.commonSrv.showMsg2(error.error.message, "error",5000);
            }
          }
        )
      }
  }

  limpiarObjetos() {
    this.getNombreProveedor.reset();
    this.getRucProveedor.reset();
    this.getDireccion.reset();
    this.getCorreo.reset();
    this.getTelefono.reset();
  }
}
