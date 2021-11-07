import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { MtSolutionsResponse } from '../../model/mtSolutionsDTO';
import { environment } from 'src/environments/environment.prod';
import { FiltroDTO } from 'src/app/model/filtroDTO';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

    crearProveedor(dto: Object): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/co_proveedor/crear`, dto, this.auth.getHeaders());
    }

    getListaProveedores(cantidad: number, origen: number): Observable<MtSolutionsResponse> {
      return this.http.get<MtSolutionsResponse>(`${environment.base_url}/co_proveedor/lista?cantidad=${cantidad}&origen=${origen}`, this.auth.getHeaders());
    }

    buscarListaProveedores(filtro: FiltroDTO, cantidad: number, origen: number): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/co_proveedor/buscador?cantidad=${cantidad}&origen=${origen}`, filtro, this.auth.getHeaders());
    }

    obtenerProveedor(idProveedor: any): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/co_proveedor/obtener`, idProveedor, this.auth.getHeaders());
    }
}
