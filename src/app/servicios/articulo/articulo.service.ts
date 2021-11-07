import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { MtSolutionsResponse } from '../../model/mtSolutionsDTO';
import { environment } from 'src/environments/environment.prod';
import { FiltroDTO } from '../../model/filtroDTO';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

    crearArticulo(dto: Object): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/stk_articulo/crear`, dto, this.auth.getHeaders());
    }

    getListaArticulo(cantidad: number, origen: number): Observable<MtSolutionsResponse> {
      return this.http.get<MtSolutionsResponse>(`${environment.base_url}/stk_articulo/lista?cantidad=${cantidad}&origen=${origen}`, this.auth.getHeaders());
    }

    buscarListaArticulo(filtro: FiltroDTO, cantidad: number, origen: number): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/stk_articulo/buscador?cantidad=${cantidad}&origen=${origen}`, filtro, this.auth.getHeaders());
    }

    obtenerArticulo(id: any): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/stk_articulo/obtener`, id, this.auth.getHeaders());
    }
}
