import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTES } from '../../constantes';
import { PaginationDTO } from '../../../model/paginationDTO';
import { FormGroup, FormControl } from '@angular/forms';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { FiltroDTO } from '../../../model/filtroDTO';
import { ProveedorService } from '../../../servicios/proveedor/proveedor.service';
import { CommonService } from '../../../servicios/common.service';

declare var M: any;

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  pagination: PaginationDTO;
  response:any[] = [];
  formCtrl: FormGroup;
  txt: any;
  path: any;
  filtroActivo: boolean= false;
  totalProveedores: number=0;
  cantActualProveedores: number=0;
  listaProveedores: any;
  totalItems: number = 0;

  constructor( public router:Router,
    public service: ProveedorService,
    public commonSrv: CommonService) {
    this.pagination = {
      page: 1,
      pageSize: 6
    };
    this.commonSrv.apagado = true;
    this.commonSrv.titulo = CONSTANTES.PROVEEDOR.nombre
    this.formCtrl = new FormGroup({
      buscador: new FormControl()
    });
    this.txt = PROPERTIES;
    this.path = CONSTANTES;
   }

  ngOnInit(): void {
    M.updateTextFields();
    var elems = document.getElementById('buscador_id');
    M.CharacterCounter.init(elems);
    this.getListarProveedores(this.pagination.pageSize, 0);
  }

  crearNuevoProveedor() {
    this.commonSrv.proveedorSeleccionado = undefined;
    this.router.navigate( [CONSTANTES.CREAR_PROVEEDOR.route] );
  }

  buscarAccion(e:any) {
    if (e.keyCode === 13) {
      if (this.getBuscador.value && this.getBuscador.value.trim() != '') {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.filtroActivo = true;
        this.buscador(this.pagination.pageSize, 0);
      }
    }
  }

  get getBuscador(): any {
    return this.formCtrl.get('buscador');
  }

  focusEvent(id: string, clasIn: string, clasOut: string) {
    let elem = document.getElementById(id);
    if (elem) {
      elem.classList.remove(clasOut);
      elem.classList.add(clasIn);
    }
  }

  blurEvent(id: string, clasIn: string, clasOut: string) {
    let elem = document.getElementById(id);
    if (elem) {
      elem.classList.remove(clasOut);
      elem.classList.add(clasIn);
    }
    var elems = document.getElementById('buscador_id');
    M.CharacterCounter.init(elems);
  }

  buscador(cantidad:number, origen:number) {
    let filtro:FiltroDTO = {valor: this.getBuscador.value.trim()};
        this.service.buscarListaProveedores(filtro, cantidad, origen).subscribe(
          respuesta => {
              this.listaProveedores = respuesta.data?.lista;
              this.totalProveedores = respuesta.data?.totalRegistros;
              this.cantActualProveedores = respuesta.data?.cantActualRegistros;
          },
          error => {
            if(error && error.status != 403) {
              //console.log(error.error.mensaje)
              this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
            }
          }
        )
  }

  limpiarFiltro() {
    this.filtroActivo = false;
    this.getBuscador.reset();
    this.getListarProveedores(this.pagination.pageSize, 0);
  }

  getListarProveedores(cantidad:number, origen:number) {
    this.service.getListaProveedores(cantidad, origen).subscribe(
      respuesta => {
        if(respuesta.success)
        this.listaProveedores = respuesta.data?.lista;
        this.totalProveedores = respuesta.data?.totalRegistros;
        this.cantActualProveedores = respuesta.data?.cantActualRegistros;
      },
      error => {
        if(error && error.status != 403) {
          //console.log(error.error.mensaje)
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
    if (this.filtroActivo) {
      this.buscador(this.pagination.pageSize, (this.pagination.page -1) * this.cantActualProveedores);
    } else  {
      this.getListarProveedores(this.pagination.pageSize, (this.pagination.page -1) * this.cantActualProveedores);
    }
  }

  modificarProveedor(idProveedor: any) {
     this.commonSrv.setProveedorSeleccionado = idProveedor;
     this.router.navigate([CONSTANTES.EDITAR_PROVEEDOR.route]);
  }

}
