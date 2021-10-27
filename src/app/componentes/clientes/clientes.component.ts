import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  settings = {
    columns: {
      mode: 'external',
      nroDoc: {
        title: 'Nº Factura',
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
      tipoDocumento: {
        title: 'Tipo de documento',
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
      fechaEmision: {
        filter: false,
        title: 'Fecha de emisión',
      },

      fechaEnvio: {
        title: 'Fecha de envío',
        filter: false
      },
      eventoEmisor: {
        title: 'Último evento emisor',
        filter: false,
      },
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
      display: false,
      perPage: 5
    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [
        {
          name: 'verDetalles',
          title: '<i class="fas fa-eye icon-list" title="Ver Detalles"></i>'
        },
        {
          name: 'kude',
          title: '<i class="far fa-file-pdf icon-list" title="KUDE"></i>'
        },
        {
          name: 'xml',
          title: '<i class="far fa-file-code icon-list" title="XML" ></i>'
        },
        {
          name: 'gestionarEventos',
          title: '<i class="fas fa-cog icon-list" title="Gestionar Eventos" ></i>'
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

  constructor() { 
  }

  ngOnInit(): void {

  }

}
