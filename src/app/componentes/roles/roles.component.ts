import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { CommonService } from '../../servicios/common.service';
import { PROPERTIES } from '../../../environments/mensaje.properties';
import { CONSTANTES } from '../constantes';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RolDTO } from '../usuario/datos-usuario/datos-usuario.component';
import { PaginationDTO } from 'src/app/model/paginationDTO';
import { Subscription } from 'rxjs';
import { RolService } from '../../servicios/roles/rol.service';

declare var M: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {
  txt: any;
  path: any;
  dataSelect: Array<RolDTO> = [];
  rol:any;
  listaFuncionalidades: any[] = [];
  formCtrl: FormGroup;
  pagination: PaginationDTO;
  observableData: Subscription;

  constructor(public router:Router,
    public service: UsuarioService,
    public rolService: RolService,
    private commonSrv: CommonService) {
      this.txt = PROPERTIES;
      this.path = CONSTANTES;
      this.commonSrv.apagado = true;
      this.formCtrl = new FormGroup({
        rolSeleccion: new FormControl(undefined),
        items: new FormArray([])
      });
      this.pagination = {
        page: 1,
        pageSize: 6
      }
      this.observableData = new Subscription();
    }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerFuncionalidades();
  }

  ngOnDestroy(): void {
    this.observableData.unsubscribe();
  }

  get getRolSeleccion(): any {
    return this.formCtrl.get('rolSeleccion');
  }

  get getItems(): FormArray {
    return <FormArray>this.formCtrl.get("items");
  }

  obtenerRoles() {
    this.service.getListaRoles().subscribe(
      respuesta => {
          this.cargarSelect(respuesta.data?.lista);
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }

  cargarSelect(lista: Array<any>) {
    //let obj: RolDTO;
    //this.dataSelect = new Array<RolDTO>();
    this.dataSelect = lista;

    if (lista) {
      setTimeout(() => {
        this.getRolSeleccion.setValue(this.dataSelect[0].id);
        this.rol = this.dataSelect[0];
        this.loadItems()
      }, 100);
    }

  }

  obtenerFuncionalidades() {
    this.service.getListaFuncionalidades().subscribe(
      respuesta => {
          this.listaFuncionalidades=respuesta.data?.lista;
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
      if (this.getItems.value) {
        this.getItems.controls.forEach(e=> {
          this.rol?.perfiles.forEach((z:any) => {
            if (z) {
              z.funcionalidades.forEach((element:any) => {
                if (e?.get('id')?.value == element?.id) {
                  e.get('activo')?.setValue(true);
                }
              });
            }
          })
        })
        this.getItems.controls.forEach(e=> {
          this.observableData.add( e.valueChanges.subscribe((x:any) => {
            this.rol?.perfiles.forEach((el:any) => {
              if (el?.funcionalidades) {
                let obj;
                el.funcionalidades.forEach((al:any) => {
                  if(al?.id == x.id) {
                    obj = {
                      idFuncion:x.id,
                      activo: x.activo,
                      idRol: this.rol.id,
                      idPerfil: el.id
                    }
                    this.actualizarRol(obj);
                  }
                });
                if (!obj) {
                  obj = {
                    idFuncion:x.id,
                    activo: x.activo,
                    idRol: this.rol.id,
                    idPerfil: el.id
                  }
                  this.actualizarRol(obj);
                }
              }
            });
          }));
        })
      }

    }
  }

  onChange() {
    this.dataSelect.forEach(obj => {
      if (obj?.id == this.getRolSeleccion.value) {
        this.getRolSeleccion.setValue(obj.id);
        this.rol = obj
        setTimeout(() => {
          this.loadItems()
        }, 0);
      }
    })
  }

  onClear() {
    this.getRolSeleccion.setValue(this.dataSelect[0].id);
    this.rol = this.dataSelect[0];
    this.loadItems()
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
  }

  crearNuevoRol() {
    this.router.navigate([CONSTANTES.CREAR_ROL.route]);
  }

  verDetalleRol() {
    this.commonSrv.setRolSeleccionado = this.getRolSeleccion.value;
    this.router.navigate([CONSTANTES.EDITAR_ROL.route]);
  }

  actualizarRol(dto: any) {
    this.rolService.updateRol(dto).subscribe(
      respuesta => {
        //this.commonSrv.showMsg2(respuesta.data, "succes",5000);
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
