import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTES } from '../../constantes';
import { PaginationDTO } from '../../../model/paginationDTO';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  pagination: PaginationDTO;
  response:any[] = [];

  settings = {
    columns: {
      mode: 'external',
      ruc: {
        title: 'Ruc',
        filter: false,
      },
      nombre: {
        title: 'Nombre',
        filter: false,
      },
      /* timbrado: {
        title: 'Número de timbrado',
        filter: false,
        valuePrepareFunction: (doc) => {
          let formatted = this.formatPipe.transform(doc);
          return formatted;
        }
      }, */
      numero: {
        filter: false,
        title: 'Número de telefono',
      },
      email: {
        filter: false,
        title: 'Email'
      },
      direccion: {
        title: 'Dirección',
        filter: false
      },
      fechaCreacion: {
        title: 'Alta',
        filter: false,
      }
    },
    pager: {
      display: true,
      perPage: 5
    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [
        {
          name: 'verDetalles',
          title: '<i class="material-icons icon-margin" title="Detalles" >visibility</i>'
        },
        {
          name: 'kude',
          title: '<i class="material-icons icon-margin" title="Editar">edit</i>'
        },
        {
          name: 'xml',
          title: '<i class="material-icons icon-margin" title="Eliminar">delete_forever</i>'
        }
      ],
      columnTitle: 'Acciones',
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    // estilos de la tabla
    short: true,
    mode: 'external',
    width: '1%',
    attr: { class: 'table table-striped' },
    selectMode: 'multi',
    hideSubHeader: true
  };
  source: LocalDataSource = new LocalDataSource;

  constructor( public router:Router) {
    this.pagination = {
      page: 1,
      pageSize: 8
    };
   }

  ngOnInit(): void {
    this.router.navigate( [CONSTANTES.CREAR_PROVEEDOR.route] );
  }

  onDeleteConfirm(event:any) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event:any) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event:any) {
    console.log("Edit Event In Console")
    console.log(event);
  }

}
