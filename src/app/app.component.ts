import { Component } from '@angular/core';
import { CommonService } from './servicios/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi tienda';

  constructor(public common:CommonService){
    

  }
}


