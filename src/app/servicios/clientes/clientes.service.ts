import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MtSolutionsResponse } from 'src/app/model/mtSolutionsDTO';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }
    
  getListaClientes(cantidad: number, origen: number): Observable<MtSolutionsResponse> {
    return this.http.get<MtSolutionsResponse>(`${environment.base_url}/ve_clientes/lista?cantidad=${cantidad}&origen=${origen}`, this.auth.getHeaders());
  }
}
