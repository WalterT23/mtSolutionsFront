import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { MtSolutionsResponse } from '../../model/mtSolutionsDTO';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  updateRol(dto: any): Observable<MtSolutionsResponse> {
    return this.http.post<MtSolutionsResponse>(`${environment.base_url}/roles/update`, dto, this.auth.getHeaders());
  }

  createRol(dto: any): Observable<MtSolutionsResponse> {
    return this.http.post<MtSolutionsResponse>(`${environment.base_url}/roles/create`, dto, this.auth.getHeaders());
  }
}
