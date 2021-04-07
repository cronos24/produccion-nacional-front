import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IPagina } from '../../../../../interfaces/pagina.interface';
import { DivipolaService } from '../../../services/divipola/divipola.service';
import { MaquilaService } from '../../../services/registro-solicitud/maquila/maquila.service';
import { InformativoComponent } from '../../informativo/informativo.component';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-proceso-produccion',
  templateUrl: './proceso-produccion.component.html',
  styleUrls: ['./proceso-produccion.component.scss']
})
export class ProcesoProduccionComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'procesoProduccion';

  public maquila: boolean;

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 10
  };
  public sort: { [key: string]: string };
  public departamentos: any[] = [];
  public ciudades: any[] = [];

  public maquilas: any[] = [];

  public maquilaFormGroup = new FormGroup({
    nit: new FormControl('', [Validators.required]),
    razonSocial: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    contacto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6000)]),
    correo: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    departamento: new FormControl(null, [Validators.required]),
    ciudad: new FormControl(null, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    telefono: new FormControl('', [Validators.required, Validators.min(7), Validators.maxLength(11)]),
    contrato: new FormControl('', [Validators.required]),
  })

  public constructor(
    private dialog: MatDialog,
    private maquilaService: MaquilaService,
    private divipolaService: DivipolaService
  ) {
    super();
    this.departamentos = this.divipolaService.consultarDepartamentos();
    this.ciudades = this.divipolaService.consultarCiudades();
  }

  public ngOnInit(): void {
  }

  public onBuscar(): void {
    this.getMaquilas();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getMaquilas();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getMaquilas();
    }
  }

  public onMensajeConfirmacion(): void {
    if (this.maquila === false) {
      this.dialog.open(InformativoComponent, {
        width: '450px',
      });
    }
  }

  public getMaquilas(): void {
    this.maquilaService.get().subscribe((response) => {
      this.maquilas = response.respuesta.datos as any[];
      this.pagina = response.respuesta.paginacion as IPagina;
    });
  }

}
