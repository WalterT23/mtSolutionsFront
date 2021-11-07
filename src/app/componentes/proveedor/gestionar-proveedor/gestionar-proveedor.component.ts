import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';
import { Location } from '@angular/common';
import { ProveedorService } from '../../../servicios/proveedor/proveedor.service';
import { Subscription } from 'rxjs';

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
  isNuevo:boolean = false;
  desabilitarBtn: boolean = true;
  tituloBloqueo:string = '';
  observableData: Subscription;
  ACTIVO="ACTIVO";
  INACTIVO="INACTIVO";

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
        correo: new FormControl(undefined, [Validators.required]),
        estado: new FormControl(undefined)
      });
      this.location = location;
      this.observableData = new Subscription();

    this.observableData.add( this.getEstado.valueChanges.subscribe((x:any) => {
      if (x) {
        this.tituloBloqueo = this.ACTIVO
      } else {
        this.tituloBloqueo = this.INACTIVO
      }
    }));
     }

  ngOnInit(): void {
    let aux = this.location.path().search(CONSTANTES.CREAR_PROVEEDOR.route);
    if (aux !== -1) {
      this.titulo = this.txt.tituloNuevoProveedor;
      this.isNuevo = true;
    } else {
      this.titulo = this.txt.tituloEditarProveedor;
      this.isNuevo = false;
      setTimeout(() => {
        this.formCtrl.valueChanges.subscribe(newStado => {
            this.desabilitarBtn = false;
        })
      }, 500);
      if (this.commonSrv.getProveedorSeleccionado) {
        this.obtenerProveedor();
      }
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

  get getEstado(): any {
    return this.formCtrl.get('estado');
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
          idProveedor: this.commonSrv.getProveedorSeleccionado?this.commonSrv.getProveedorSeleccionado:null,
          nombre: this.getNombreProveedor.value.trim(),
          ruc: this.getRucProveedor.value.trim(),
          direccion: this.getDireccion.value.trim(),
          telefono: this.getTelefono.value.trim(),
          correo: this.getCorreo.value.trim(),
          estado: this.getEstado.value==undefined?null:(this.getEstado.value==this.ACTIVO?true:false)
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

  obtenerProveedor() {
    let filtro = {idProveedor:this.commonSrv.getProveedorSeleccionado};
    this.service.obtenerProveedor(filtro).subscribe(
      respuesta => {
          this.cargarProveedor(respuesta?.data);
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }

  cargarProveedor(usu: any) {
    this.getNombreProveedor.setValue(usu?.nombre);
    this.getRucProveedor.setValue(usu?.ruc);
    this.getDireccion.setValue(usu?.direccion);
    this.getTelefono.setValue(usu?.telefono);
    this.getCorreo.setValue(usu?.correo);
    this.getEstado.setValue(usu?.estado?this.ACTIVO:this.INACTIVO);
  }

  limpiarObjetos() {
    this.getNombreProveedor.reset();
    this.getRucProveedor.reset();
    this.getDireccion.reset();
    this.getCorreo.reset();
    this.getTelefono.reset();
  }
}
