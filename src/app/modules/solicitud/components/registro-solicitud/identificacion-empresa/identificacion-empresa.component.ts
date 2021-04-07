import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IPagina } from 'src/app/interfaces/pagina.interface';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { IRespuesta } from '../../../../../interfaces/respuesta.interface';
import { ISolicitud } from '../../../interfaces/solicitud.interface';
import { DivipolaService } from '../../../services/divipola/divipola.service';
import { IdentificacionEmpresaService } from '../../../services/registro-solicitud/identificacion-empresa/identificacion-empresa.service';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-identificacion-empresa',
  templateUrl: './identificacion-empresa.component.html',
  styleUrls: ['./identificacion-empresa.component.scss']
})
export class IdentificacionEmpresaComponent extends FormGeneric {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'identificacionEmpresa';

  public formGroupPlantaProduccion: FormGroup;

  public plantas: any[] = [];

  public busqueda: string;
  public pagina: IPagina = {
    pagina: 1,
    registrosPorPagina: 10
  };
  public sort: { [key: string]: string };
  public departamentos: any[] = [];
  public ciudades: any[] = [];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private identificacionEmpresaService: IdentificacionEmpresaService,
    private divipolaService: DivipolaService
  ) {
    super();
    this.formGroupPlantaProduccion = this.formBuilder.group({
      departamento: [null, Validators.required],
      ciudad: [null, Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.departamentos = this.divipolaService.consultarDepartamentos();
    this.ciudades = this.divipolaService.consultarCiudades();
  }

  public onBuscar(): void {
    this.getPlantas();
  }

  public onSort(event: {
    sortField: string;
    sortOrder: number;
  }): void {
    this.sort = {
      ordenamientoCampo: event.sortField,
      ordenamientoDireccion: event.sortOrder === 1 ? 'ASC' : 'DESC'
    };
    this.getPlantas();
  }

  public onPageChange(event: {
    page: number
  }): void {
    if (this.pagina.pagina !== event.page + 1) {
      this.pagina.pagina = event.page + 1;
      this.getPlantas();
    }
  }

  public agregarPlanta(): void {
    if (this.formGroupPlantaProduccion.valid) {
      let body: any = {
        solicitudId: this.getFatherFormGroupValue('id'),
        planDepartamentoId: this.formGroupPlantaProduccion.controls.departamento.value,
        planMunicipioId: this.formGroupPlantaProduccion.controls.ciudad.value,
        planDireccion: this.formGroupPlantaProduccion.controls.direccion.value,
        auditoria: {
          usuarioCreacion: 'test'
        }
      };
      this.identificacionEmpresaService.post(body).subscribe((respuesta) => {
        this.getPlantas();
        this.formGroupPlantaProduccion.reset();
      });
    } else {
      this.dialog.open(AlertComponent, {
        data: {
          type: 'warning',
          title: 'Atención',
          description: 'Verifique que seleccionó departamento, ciudad<br/>e ingresó la dirección de la Planta de Producción',
          acceptButton: 'REGRESAR'
        }
      });
    }
  }

  public eliminarPlanta(id: any, index): void {
    this.identificacionEmpresaService.delete(id).subscribe(() => {
      this.getPlantas();
    });
  }

  private getPlantas(): void {
    this.identificacionEmpresaService.get(
      {
        postfix: `/solicitud/${this.getFatherFormGroupControl('id').value}`,
        queryParams: { datoBuscado: this.busqueda },
        sort: this.sort
      }).subscribe((respuesta: any): void => {
        this.plantas = respuesta.respuesta.datos;
        this.pagina = respuesta.respuesta.paginacion;
        this.plantas.map((planta) => {
          planta.departamento = planta.planDepartamentoId;
          planta.ciudad = planta.planMunicipioId;
          planta.direccion = planta.planDireccion;
        });
        //this.pagina = respuesta.respuesta.pagina;
      });
  }

}
