import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { MtSolutionsResponse } from '../../model/mtSolutionsDTO';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getHelper(): Observable<MtSolutionsResponse> {
    return this.http.get<MtSolutionsResponse>(`${environment.base_url}/parametros/helper`, this.auth.getHeaders());
  }

  getClaves(dto: any): Observable<MtSolutionsResponse> {
    return this.http.post<MtSolutionsResponse>(`${environment.base_url}/parametros/clave`, dto, this.auth.getHeaders());
  }
}
