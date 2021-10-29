import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { MtSolutionsResponse } from '../../model/mtSolutionsDTO';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

    crearProveedor(dto: Object): Observable<MtSolutionsResponse> {
      return this.http.post<MtSolutionsResponse>(`${environment.base_url}/co_proveedor/crear`, dto, this.auth.getHeaders());
    }
}