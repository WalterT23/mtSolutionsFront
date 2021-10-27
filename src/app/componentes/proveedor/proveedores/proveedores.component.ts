import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTES } from '../../constantes';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor( public router:Router) { }

  ngOnInit(): void {
    this.router.navigate( [CONSTANTES.CREAR_PROVEEDOR.route] );
  }

}
