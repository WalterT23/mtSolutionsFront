import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';
import { CommonService } from '../../../servicios/common.service';
import { NavigationExtras, Router } from '@angular/router';
import { PaginationDTO } from '../../../model/paginationDTO';
import { ParametroService } from '../../../servicios/parametros/parametro.service';
import { FiltroDTO } from '../../../model/filtroDTO';
import { Subscription } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit, OnDestroy {

  txt: any;
  path: any;
  formCtrl: FormGroup;
  filtroActivo: boolean= false;
  pagination: PaginationDTO;
  total:number=0;
  cantActual: number=0;
  dataSelect: Array<any> = [];
  listaHelper:any;
  lista:any;
  observableData: Subscription;


  constructor(public router:Router, private commonSrv: CommonService,
    public service: ParametroService) {
    this.txt = PROPERTIES.parametros;
    this.path = CONSTANTES;
    this.commonSrv.apagado = true;
    this.commonSrv.titulo = CONSTANTES.PARAMETROS.nombre;
    this.formCtrl = new FormGroup({
      buscador: new FormControl(),
      selector: new FormControl()
    });
    this.pagination = {
      page: 1,
      pageSize: 8
    }
    this.obtenerHelpers();
    this.observableData = new Subscription();
   }

  ngOnDestroy(): void {
    this.observableData.unsubscribe();
  }

  ngOnInit(): void {
    let obj= [
      {id: 1, nombre: 'Familia Articulo'},
      {id: 2, nombre: 'Grupo Articulo'}
    ]
    this.dataSelect = obj;
    this.observableData.add(this.getSelector.valueChanges.subscribe((x:any) => {
     if (x) {
       this.obtenerClave();
     }
    }));
  }

  cargarForm(obj: any) {
    this.getSelector.setValue(obj);
    this.obtenerClave();
  }

  get getBuscador(): any {
    return this.formCtrl.get('buscador');
  }


  get getSelector(): any {
    return this.formCtrl.get('selector');
  }

  crearNuevoParametro() {
    this.commonSrv.setParametroSeleccionado= this.getSelector.value;
    this.router.navigate([CONSTANTES.CREAR_PARAMETROS.route]);
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

  obtenerHelpers() {
    this.service.getHelper().subscribe(
      respuesta => {
          this.listaHelper = respuesta?.data?.lista;
          this.total = respuesta?.data?.totalRegistros;
          this.cantActual = respuesta?.data?.cantActualRegistros;
          this.getSelector.value = this.listaHelper!=null?this.cantActual>0?this.listaHelper[0]:null:null;
          setTimeout(() => {
            this.obtenerClave();
          }, 100);

      },
      error => {
        if(error && error.status != 403) {
          //console.log(error.error.mensaje)
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }

  obtenerClave() {
    let filtro: FiltroDTO = {
      valor: this.getSelector.value?.clave
    }
    this.service.getClaves(filtro).subscribe(
      respuesta => {
          this.lista = respuesta?.data?.lista;
          this.total = respuesta?.data?.totalRegistros;
          this.cantActual = respuesta?.data?.cantActualRegistros;
      },
      error => {
        if(error && error.status != 403) {
          //console.log(error.error.mensaje)
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }

  buscador(cantidad:number, origen:number) {
    let filtro: FiltroDTO = {
      valor: this.getSelector.value?.clave,
      valor2: this.getBuscador.value
    }
    this.service.getClaves(filtro).subscribe(
      respuesta => {
          this.lista = respuesta?.data?.lista;
          this.total = respuesta?.data?.totalRegistros;
          this.cantActual = respuesta?.data?.cantActualRegistros;
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
    //this.obtenerClave();
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
  }
}
