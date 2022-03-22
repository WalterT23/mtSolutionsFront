import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { AuthService } from './login/auth.service';

declare var M: any;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private KEYUSE: string = 'usuarioSelect';
  private KEYUSEROL: string = 'rolSelect';
  private KEYPROVEEDOR: string = 'proveedorSelect';
  private KEYARTICULO: string = 'articuloSelect';
  private KEYPARAMETRO: string = 'parametroSelect';
  url: string = environment.base_url;
  apagado: boolean = false;
  titulo: any;
  proveedorSeleccionado: any;
  usuarioSeleccionado: any;
  rolSeleccionado: any;
  articuloSeleccionado: any;
  parametroSeleccionado: any;
  serviceProcesando = new Subject<boolean>();
  cantidadLlamadasEspera = new Subject<number>();
  urlSinLoading: string[] = [];
  horaServer: Date = new Date();
  constructor(
    private authService: AuthService,
    private titleSrv: Title
  ) { }

  set setTitle(title: string) {
    this.titleSrv.setTitle('MtSolutions - ' + title);
  }

  get getUsuarioSeleccionado(): any {
    if (!this.usuarioSeleccionado) {
      let z = window.sessionStorage.getItem(btoa(this.KEYUSE))
      if (z) {
        this.usuarioSeleccionado = JSON.parse(atob(z));
      }
    }
    return this.usuarioSeleccionado;
  }

  get getRolSeleccionado(): any {
    if (!this.rolSeleccionado) {
      let z = window.sessionStorage.getItem(btoa(this.KEYUSEROL))
      if (z) {
        this.rolSeleccionado = JSON.parse(atob(z));
      }
    }
    return this.rolSeleccionado;
  }

  get getProveedorSeleccionado(): any {
    if (!this.proveedorSeleccionado) {
      let z = window.sessionStorage.getItem(btoa(this.KEYPROVEEDOR))
      if (z) {
        this.proveedorSeleccionado = JSON.parse(atob(z));
      }
    }
    return this.proveedorSeleccionado;
  }

  get getArticuloSeleccionado(): any {
    if (!this.articuloSeleccionado) {
      let z = window.sessionStorage.getItem(btoa(this.KEYARTICULO))
      if (z) {
        this.articuloSeleccionado = JSON.parse(atob(z));
      }
    }
    return this.articuloSeleccionado;
  }

  get getParametroSeleccionado(): any {
    if (!this.parametroSeleccionado) {
      let z = window.sessionStorage.getItem(btoa(this.KEYPARAMETRO))
      if (z) {
        this.parametroSeleccionado = JSON.parse(atob(z));
      }
    }
    return this.parametroSeleccionado;
  }

  remover() {
    window.sessionStorage.removeItem(btoa(this.KEYUSE));
    window.sessionStorage.removeItem(btoa(this.KEYUSEROL));
    window.sessionStorage.removeItem(btoa(this.KEYPROVEEDOR));
    this.usuarioSeleccionado = undefined;
    this.rolSeleccionado = undefined;
    this.proveedorSeleccionado = undefined;
  }

  set setUsuarioSeleccionado(param: any) {
    if (param) {
      window.sessionStorage.setItem(btoa(this.KEYUSE), btoa(JSON.stringify(param)));
      this.usuarioSeleccionado = param;
    } else {
      this.rolSeleccionado = undefined;
      window.sessionStorage.removeItem(btoa(this.KEYUSE));
    }
  }

  set setRolSeleccionado(param: any) {
    if (param) {
      window.sessionStorage.setItem(btoa(this.KEYUSEROL), btoa(JSON.stringify(param)));
      this.rolSeleccionado = param;
    } else {
      this.rolSeleccionado = undefined;
      window.sessionStorage.removeItem(btoa(this.KEYUSEROL));
    }
  }

  set setProveedorSeleccionado(param: any) {
    if (param) {
      window.sessionStorage.setItem(btoa(this.KEYPROVEEDOR), btoa(JSON.stringify(param)));
      this.proveedorSeleccionado = param;
    } else {
      this.rolSeleccionado = undefined;
      window.sessionStorage.removeItem(btoa(this.KEYPROVEEDOR));
    }
  }

  set setArticuloSeleccionado(param: any) {
    if (param) {
      window.sessionStorage.setItem(btoa(this.KEYARTICULO), btoa(JSON.stringify(param)));
      this.articuloSeleccionado = param;
    } else {
      this.articuloSeleccionado = undefined;
      window.sessionStorage.removeItem(btoa(this.KEYARTICULO));
    }
  }

  set setParametroSeleccionado(param: any) {
    if (param) {
      window.sessionStorage.setItem(btoa(this.KEYPARAMETRO), btoa(JSON.stringify(param)));
      this.parametroSeleccionado = param;
    } else {
      this.parametroSeleccionado = undefined;
      window.sessionStorage.removeItem(btoa(this.KEYPARAMETRO));
    }
  }

  isLoading(url: string): boolean {

    return this.urlSinLoading.filter(row => row == url).length > 0;

  }

  clearToken(token: any) {
    this.authService.authData =  token;
  }

  logoutX() {
    this.apagado = true;
    this.authService.logOut();
  }

  private _getHeaders(opt:any=null): { headers: HttpHeaders } {

    let headers;

    headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };


    return headers;
  }


  showMsg2(mensaje: string, tipo: string, tiempo:number=5000) {
      //tipo: info - error - success
    M.toast({html: `<div><h6 font-weight: 600'>${mensaje}</h6></div>`,
    classes: `rounded ${tipo}`,
    displayLength: tiempo});
  }

  alertaAviso(mensaje: string, tipo: string) {
    let elemn = document.getElementById("modalAlerta");
    var instance = M.Modal.getInstance(elemn);
    instance.open();
    let icono = '<i style="color: #de6e2a7a;" class="material-icons large">report</i>';
    let id = document.getElementById("iconoModalAlerta");
    if (id) {
      id.innerHTML = icono;
    }
    let cont = '<p style="font-size: 20px;">'+mensaje+'</p>';
    let idCont = document.getElementById("contenidoModalAlerta");
    if (idCont) {
      idCont.innerHTML = cont;
    }
  }
}
