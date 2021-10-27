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
}
