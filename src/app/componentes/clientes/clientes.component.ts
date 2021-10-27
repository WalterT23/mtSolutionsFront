import { Component, OnInit } from '@angular/core';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginationDTO } from 'src/app/model/paginationDTO';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { CommonService } from 'src/app/servicios/common.service';
import { ClienteDTO } from 'src/app/model/clienteDTO';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  pagination: PaginationDTO;
  response:any[] = [];
  settings = {
    columns: {
      mode: 'external',
      ruc: {
        title: 'Ruc',
        filter: false,
      },
      /* rucReceptor: {
        title: 'RUC del receptor',
        filter: false,
        valuePrepareFunction: (doc) => {
          let formatted = this.formatPipe.transform(doc);
          return formatted;
        }
      }, */
      dv: {
        title: 'Dig. Ver',
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
      razonSocial: {
        filter: false,
        title: 'Razón Social',
      },

      direccion: {
        title: 'Dirección',
        filter: false
      },
      fechaCreacion: {
        title: 'Alta',
        filter: false,
      }/* ,
      valuePrepareFunction: (doc:any) => {
        let formatted = this.datePipe.transform(doc);
        return formatted;
      }, */
      /*eventoReceptor: {
        title: 'Último evento del receptor',
        filter: false,
      },*/
      /* estado: {
        type: 'html',
        title: 'Estado',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          if (row.estado === 'Rechazado') {
            return `<h6 class="container-estados"><p class="cell_rechazado"${cell};>${cell}</p></h6>`;
          } else if (row.estado === 'Aceptado con obs.') {
            return `<h6 class="container-estados"><p class="cell_aprobadoObs"${cell};>${cell}</p></h6>`;
          } else if (row.estado === 'Aceptado') {
            return `<h6 class="container-estados"><p class="cell_aprobado"${cell};>${cell}</p></h6>`;
          } else {
            return `<h6 class="container-estados"><p class="cell_pendiente"${cell};>${cell}</p></h6>`;
          }
        },
      }, */
      /* strength: {
         title: 'Strength', filter: false, width: '100px',
         editor: {
           type: 'html',
           config: {
             completer: {
               data: [
                 { value: '1', title: 'Option 1' },
                 { value: '2', title: 'Option 2' },
                 { value: '3', title: 'Option 3' },
                 { value: '4', title: 'Option 4' },
               ],
               searchFields: 'strength',
               titleField: 'strength',
             }
           }
         }
       },*/
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
    hideSubHeader: true,
  };
  source: LocalDataSource = new LocalDataSource;
  

  constructor(
    public service: ClientesService,private commonSrv: CommonService) {
      
    /* this.source: LocalDataSource; */
    this.pagination = {
      page: 1,
      pageSize: 8
    }; 
  }

  ngOnInit(): void {
    this.obtenerClientes(this.pagination.pageSize, 0);
  }

  obtenerClientes(cantidad:number, origen:number) {
    this.service.getListaClientes(cantidad, origen).subscribe(
      respuesta => {
        this.response = respuesta.data?.lista;
        
        this.source = new LocalDataSource();
        this.source.load(this.response);
          /* this.arrayUsuario = respuesta.data?.lista;
          this.totalUsuario = respuesta.data?.totalRegistros;
          this.cantActualUsuario = respuesta.data?.cantActualRegistros; */
      },
      error => {
        if(error && error.status != 403) {
          //console.log(error.error.mensaje)
          this.commonSrv.showMsg2(error.error.mensaje, "error",5000);
        }
      }
    )
  }
}
