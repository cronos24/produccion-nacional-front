import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InformativoComponent } from '../../informativo/informativo.component';
import { IPagina } from '../../../../../interfaces/pagina.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';

@Component({
  selector: 'app-proceso-produccion',
  templateUrl: './proceso-produccion.component.html',
  styleUrls: ['./proceso-produccion.component.scss']
})
export class ProcesoProduccionComponent implements OnInit  {

  public maquila: boolean;
  public procesoProduccion: ISolicitud[] = [];
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 8
  };
  public sort: { [key: string]: string };

  public form = new FormGroup ({
    razonSocial: new FormControl('', [Validators.minLength(3), Validators.maxLength(300)]),
    nombreContacto: new FormControl('', [Validators.minLength(3), Validators.maxLength(6000)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    telefono: new FormControl('', [Validators.required, Validators.min(7), Validators.maxLength(11)]),
  })

  public constructor(
    private dialog: MatDialog
    ) { }

    public ngOnInit(): void {

    }

    public onSort(event: {
      sortField: string;
      sortOrder: number;
    }): void {
      this.sort = {
        ordenamientoCampo: event.sortField,
        ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
      };
      this.getProcesoProduccion();
    }

    public onPageChange(event: {
      page: number
    }): void {
      if (this.pagina.pagina !== event.page + 1) {
        this.pagina.pagina = event.page + 1;
        this.getProcesoProduccion();
      }
    }

    private getProcesoProduccion(): void {

    }

  public onAdjuntarArchivo(): void {
    /*this.dialog.open(AdjuntarArchivoComponent, {
        width: '450px',
    });*/
  }

  public onMensajeConfirmacion(): void {
    if (this.maquila === false) {
      this.dialog.open(InformativoComponent, {
        width: '450px',
    });
    }
  }

}
