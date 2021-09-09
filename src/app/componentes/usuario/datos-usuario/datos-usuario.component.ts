import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario/usuario.service';
import { CommonService } from '../../../servicios/common.service';
import { PaginationDTO } from '../../../model/paginationDTO';
import { PROPERTIES } from '../../../../environments/mensaje.properties';
import { CONSTANTES } from '../../constantes';

declare var M: any;

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  
  txt: any;
  file: any;
  fileSize: number; 
  fileExtension: any;
  formCtrl: FormGroup;
  cedulaFormateado: any;
  dataSelect: Array<ObjectSelectPerfil> = [];
  perfilLoanding: boolean;
  perfil:any;
  listaFuncionalidades: any[] = [];
  pagination: PaginationDTO;

  constructor(private router: Router, 
    private service: UsuarioService,
    private commonSrv: CommonService) {
    this.txt = PROPERTIES;
    this.fileSize = 0;
    this.formCtrl = new FormGroup({
      fileName: new FormControl(undefined, [Validators.required]),
      nombreUsuario: new FormControl(undefined, [Validators.required]),
      apellidoUsuario: new FormControl(undefined, [Validators.required]),
      cargo: new FormControl(undefined, [Validators.required]),
      cedula: new FormControl(undefined, [Validators.required]),
      telefono: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required]),
      perfilSeleccion: new FormControl(undefined),
      items: new FormArray([])
    });
    this.perfilLoanding = true;

    this.pagination = {
      page: 1,
      pageSize: 6
    }
  }

  ngOnInit(): void {
    M.updateTextFields();
    /*var elems = document.querySelector('.bordeadito');
    M.CharacterCounter.init(elems);*/
     // Tooltip init
     var tooltip = document.querySelectorAll('.tooltipped');
     M.Tooltip.init(tooltip, {});

    // Dropdown init
    var dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown, { hover: true });

    //collapsible
    var elemsc = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elemsc, {});
    
    this.obtenerPerfiles();
    this.obtenerFuncionalidades();
  }

  get getFileName(): any {
    return this.formCtrl.get('fileName');
  }

  get getNombreUsuario(): any {
    return this.formCtrl.get('nombreUsuario');
  }

  get getApellidoUsuario(): any {
    return this.formCtrl.get('apellidoUsuario');
  }

  get getCargo(): any {
    return this.formCtrl.get('cargo');
  }

  get getCedula(): any {
    return this.formCtrl.get('cedula');
  }

  get getTelefono(): any {
    return this.formCtrl.get('telefono');
  }

  get getEmail(): any {
    return this.formCtrl.get('email');
  }

  get getPerfilSeleccion(): any {
    return this.formCtrl.get('perfilSeleccion');
  }

  get getItems(): FormArray {
    return <FormArray>this.formCtrl.get("items");
  }

  fileChangeEvent(fileInput:any) {
    if (fileInput.target.size > 0) {
      this.file = fileInput.target.files[0];
      this.getFileName.setValue(this.file.name);
      this.fileSize = this.file.size;
      this.fileExtension = this.file.name.split('.')[1].toLowerCase();
      /*if (this.fileExtension != 'xlsx') {
        this.alertaExt = true;
      } else {
        this.alertaExt = false;
      }
      if (this.fileSize > 1000000) {
        this.alertaTama = true;
      } else {
        this.alertaTama = false;
      }*/
    }
  }

  formatearCi( element: any ) {
    this.cedulaFormateado = this.miles(this.getCedula.value);
    element.target.value = this.cedulaFormateado;
  }

  private miles(value: any) {
    value = value?.replaceAll('.','');
    const DECIMAL_SEPARATOR = ",";
    const THOUSANDS_SEPARATOR = ".";
    let fractionSize = 0;
    const PADDING = "000000";
    let [ integer, fraction = "" ] = (value || '').toString()
      .split(DECIMAL_SEPARATOR); // Divide entre parte entera y decimal, por la "," en este caso

    fraction = fractionSize > 0
      ? DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

    return integer + fraction;
  }

  irAUsuario() {
    setTimeout(() => {
      this.router.navigate([CONSTANTES.USUARIO.route])
    }, 100)
  }

  obtenerPerfiles() {
    /*this.service.getListaPerfiles().subscribe(
      respuesta => {
          this.cargarSelect(respuesta.data?.lista);
          this.perfilLoanding = false;
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
          this.perfilLoanding = false;
        }
      }
    )*/
  }

  obtenerFuncionalidades() {
   /* this.service.getListaFuncionalidades().subscribe(
      respuesta => {
          this.listaFuncionalidades=respuesta.data?.lista;
          //this.perfilLoanding = false;
      },
      error => {
        if(error && error.status != 403) {
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
          this.perfilLoanding = false;
        }
      }
    )*/
  }

  onChange() {
    this.dataSelect.forEach(obj => {
      if (obj.perfil == this.getPerfilSeleccion.value) {
        this.getPerfilSeleccion.setValue(obj.perfil);
        this.perfil = obj
        setTimeout(() => {
          this.loadItems()
        }, 0);
      }
    })
  }

  onClear() {
    this.getPerfilSeleccion.setValue(this.dataSelect[0].perfil);
    this.perfil = this.dataSelect[0];
    this.loadItems()
  }

  cargarSelect(lista: Array<any>) {
    let obj: ObjectSelectPerfil;
    this.dataSelect = new Array<ObjectSelectPerfil>();
    if (lista) {
      lista.forEach(dato => {
        obj = {
          perfil: dato.perfil,
          nombre: dato.nombre,
          activo: dato.activo,
          listaFuncionalidades: dato.listaFuncionalidades
        }
        this.dataSelect.push(obj);
      });
      setTimeout(() => {
        this.getPerfilSeleccion.setValue(this.dataSelect[0].perfil);
        this.perfil = this.dataSelect[0];
        this.loadItems()
      }, 100);
    }
    
  }

  cambioPagina(p: number) {
    this.pagination.page = p;
  }

  loadItems() {
    this.getItems.clear();
    let control: FormGroup;
    
    if (this.listaFuncionalidades && this.listaFuncionalidades.length) {
      this.listaFuncionalidades.forEach( x => {
        control = new FormGroup({
          activo: new FormControl({value:false, disabled:true}),
          id: new FormControl(x.funcionalidad),
          nombre: new FormControl(x.nombre),
          descripcion: new FormControl(x.descripcion)
        });
        this.getItems.push(control);
      });
      if (this.getItems.value) {
        this.getItems.controls.forEach(e=> {
          /*this.perfil?.listaFuncionalidades.forEach(z => {
            if (e?.get('id')?.value == z) {
              e.get('activo')?.setValue(true);
            }
          })*/
        })
      }
    }
  }

  crearUsuario() {
      if ((!this.getNombreUsuario.value || this.getNombreUsuario.value?.trim() == ' ') || 
          (!this.getApellidoUsuario.value || this.getApellidoUsuario.value?.trim() == ' ') || 
          (!this.getCargo.value && this.getCargo.value?.trim() == ' ') || 
          (!this.getCedula.value && this.getCedula.value?.trim() == ' ') ||
          (!this.getTelefono.value && this.getTelefono.value?.trim() == ' ') ||
          (!this.getEmail.value && this.getEmail.value?.trim() == ' ')) {
          this.commonSrv.showMsg2(this.txt.alerta, 'info', 5000);
      } else {
        let obj= {
          nombre: this.getNombreUsuario.value.trim(),
          apellido: this.getApellidoUsuario.value.trim(),
          cargo: this.getCargo.value.trim(),
          documento: this.getCedula.value.trim().replaceAll('.',''),
          telefono: this.getTelefono.value.trim(),
          email: this.getEmail.value.trim(), 
          perfil: this.getPerfilSeleccion.value
        }
        console.log(obj)
      }

  }

}

export interface ObjectSelectPerfil {
  perfil:string,
  nombre: string,
  activo:boolean,
  listaFuncionalidades: string
}
