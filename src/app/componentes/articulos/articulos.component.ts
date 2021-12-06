import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationDTO } from '../../model/paginationDTO';
import { CommonService } from '../../servicios/common.service';
import { PROPERTIES } from '../../../environments/mensaje.properties';
import { CONSTANTES } from '../constantes';
import { FiltroDTO } from '../../model/filtroDTO';
import { ArticuloService } from '../../servicios/articulo/articulo.service';

declare var M: any;

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  pagination: PaginationDTO;
  formCtrl: FormGroup;
  txt: any;
  path: any;
  filtroActivo: boolean= false;
  total: number=0;
  cantActual: number=0;
  lista: any;

  constructor(
    public router:Router,
    public commonSrv: CommonService,
    private service: ArticuloService
    ) {
      this.pagination = {
        page: 1,
        pageSize: 6
      };
      this.commonSrv.apagado = true;
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
    this.getListar(this.pagination.pageSize, 0);
  }

  crearNuevoArticulo() {
    this.commonSrv.articuloSeleccionado = undefined;
    this.router.navigate( [CONSTANTES.CREAR_ARTICULO.route] );
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
        this.service.buscarListaArticulo(filtro, cantidad, origen).subscribe(
          respuesta => {
              this.lista = respuesta.data?.lista;
              this.total = respuesta.data?.totalRegistros;
              this.cantActual = respuesta.data?.cantActualRegistros;
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
    this.getListar(this.pagination.pageSize, 0);
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
    if (this.filtroActivo) {
      this.buscador(this.pagination.pageSize, (this.pagination.page -1) * this.cantActual);
    } else  {
      this.getListar(this.pagination.pageSize, (this.pagination.page -1) * this.cantActual);
    }
  }

  modificar(id: any) {
     this.commonSrv.setArticuloSeleccionado = id;
     this.router.navigate([CONSTANTES.EDITAR_ARTICULO.route]);
  }

  getListar(cantidad:number, origen:number) {
    this.service.getListaArticulo(cantidad, origen).subscribe(
      respuesta => {
        if(respuesta.success)
        this.lista = respuesta.data?.lista;
        this.total = respuesta.data?.totalRegistros;
        this.cantActual = respuesta.data?.cantActualRegistros;
      },
      error => {
        if(error && error.status != 403) {
          //console.log(error.error.mensaje)
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }


}
