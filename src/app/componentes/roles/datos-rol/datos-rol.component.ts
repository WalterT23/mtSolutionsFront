import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from '../../../servicios/roles/rol.service';
import { CommonService } from '../../../servicios/common.service';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { Location } from '@angular/common';
import { PaginationDTO } from '../../../model/paginationDTO';
import { Subscription } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-datos-rol',
  templateUrl: './datos-rol.component.html',
  styleUrls: ['./datos-rol.component.css']
})
export class DatosRolComponent implements OnInit, OnDestroy {
  txt: any;
  path: any;
  formCtrl: FormGroup;
  listaFuncionalidades: any[] = [];
  location: Location;
  titulo: string = '';
  pagination: PaginationDTO;
  observableData: Subscription;

  constructor(public router:Router,
    public service: UsuarioService,
    public rolService: RolService,
    private commonSrv: CommonService,
    location: Location) {
      this.txt = PROPERTIES;
      this.path = CONSTANTES;
      this.commonSrv.apagado = true;
      this.location = location;
      this.formCtrl = new FormGroup({
        titulo: new FormControl(undefined),
        descripcion: new FormControl(undefined),
        items: new FormArray([])
      });
      this.pagination = {
        page: 1,
        pageSize: 4
      }
      this.observableData = new Subscription();
     }

  ngOnInit(): void {
    let aux = this.location.path().search(CONSTANTES.CREAR_ROL.route);
    if (aux !== -1) {
      this.titulo = this.txt.tituloNuevoRol;
    } else {
      this.titulo = this.txt.tituloVerRpñ;
      if (this.commonSrv.getRolSeleccionado) {
        this.obtenerRol();
      }
    }
    M.updateTextFields();

    this.obtenerFuncionalidades();
  }

  ngOnDestroy(): void {
    this.observableData.unsubscribe();
  }

  get getTitulo(): any {
    return this.formCtrl.get('titulo');
  }

  get getDescripcion(): any {
    return this.formCtrl.get('descripcion');
  }

  get getItems(): FormArray {
    return <FormArray>this.formCtrl.get("items");
  }


  irAROL() {
    this.router.navigate([CONSTANTES.ROLES.route]);
  }

  obtenerRol() {

  }

  obtenerFuncionalidades() {
    this.service.getListaFuncionalidades().subscribe(
      respuesta => {
          this.listaFuncionalidades=respuesta.data?.lista;
          this.loadItems();
          //this.perfilLoanding = false;
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
          //this.perfilLoanding = false;
        }
      }
    )
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
  }

  loadItems() {
    this.getItems.clear();
    let control: FormGroup;
    if (this.listaFuncionalidades && this.listaFuncionalidades.length) {
      let c = -1;
      this.listaFuncionalidades.forEach( x => {
        control = new FormGroup({
          ii: new FormControl(c=c+1),
          activo: new FormControl(false),
          id: new FormControl(x.id),
          nombre: new FormControl(x.nombre),
          descripcion: new FormControl(x.descripcion)
        });
        this.getItems.push(control);
      });
      /*if (this.getItems.value) {
        this.getItems.controls.forEach(e=> {
          this.observableData.add( e.valueChanges.subscribe((x:any) => {
               let obj;
                    obj = {
                      idFuncion:x.id,
                      activo: x.activo,
                      idRol: '',
                      idPerfil: ''
                    }
            }))
        })
      }*/
    }
  }

  crearRol() {
    let obj = {
      nombre: this.getTitulo.value,
      descripcion: this.getDescripcion.value,
      perfiles: this.getItems.value
    }

    this.rolService.createRol(obj).subscribe(
      respuesta => {
          this.commonSrv.showMsg2(respuesta.data, "succes");
          setTimeout(() => {
            this.irAROL()
          }, 300);
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )

  }

}
