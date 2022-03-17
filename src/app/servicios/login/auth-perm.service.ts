import { Injectable } from '@angular/core';
import { PermisoDTO } from '../../model/permisoDTO';
import { CONSTANTES } from '../../componentes/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthPermService {

  public USUARIOS: boolean = false;
  public EDITAR_ROL: boolean = false;
  constructor() { }

  actualizarPermisos(permisos: PermisoDTO[], isAllowed: boolean) {
    if (permisos.filter(row => row.authority == CONSTANTES.USUARIO.permiso).length > 0) {this.USUARIOS = true};
    if (permisos.filter(row => row.authority == CONSTANTES.EDITAR_ROL.permiso).length > 0) {this.EDITAR_ROL = true};
  }

  reiniciarPermisos(): void {
    this.USUARIOS = false;
    this.EDITAR_ROL = false;
  }
}
