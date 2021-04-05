import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { SolicitudService } from '../../../services/solicitud.service';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.scss']
})
export class RegistroSolicitudComponent extends FormGeneric {

  public formGroup: FormGroup;
  protected formGroupName: string;

  public produccionNacional: boolean = true;
  public fomentoIndustriaAutomotriz: boolean = false;
  public regimenTransformacionEnsamblePlanillas: boolean = false;
  public fomentoIndustriaAstilleros: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute) {
    super();
    const radicado = this.activatedRoute.snapshot.paramMap.get('radicado');

    this.solicitudService.getById(radicado, {
      postfix: '/radicado'
    }).subscribe((response) => {
      this.setFormGroup(response.respuesta);
    });

    this.buildFromGroup();
  }

  public onSelectedCheckBox(tipoFormulario: string): void {
    setTimeout(() => {
      this.setFatherFormGroupValue('tipoFormulario', tipoFormulario);

      this.produccionNacional = false;
      this.fomentoIndustriaAutomotriz = false;
      this.regimenTransformacionEnsamblePlanillas = false;
      this.fomentoIndustriaAstilleros = false;

      this[tipoFormulario] = true;
    });
  }

  public onGuardar() {
    const body = this.getBody();
    this.solicitudService.patch(body).subscribe((respuesta) => {
      console.log(respuesta, 'respuesta');
    });
  }

  public isActive(step: number) {
    switch (step) {
      case 8:
        return (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value == 'bienesProcesoProductivo';  
        case 4:
          return (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value == 'bienesElaboradosNacionales';
        default:     
      return true;
    }
  }

  private buildFromGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [],
      tipoFormulario: ['produccionNacional', Validators.required],
      datosProducto: this.formBuilder.group({
        subpartida: [null, [Validators.required]],
        nombreComercial: ['', [Validators.required]],
        nombreTecnico: ['', [Validators.required]],
        unidadComercial: [null, [Validators.required]],
        sectorEconomico: [null, [Validators.required]],
        tamanoEmpresa: [null, [Validators.required]],
        unipadesProducidas: ['', [Validators.required, Validators.min(0)]],
        codigoNumericoUnico: [''],
        tecnologia: [''],
        descripcionMotoparte: [''],
        numeroMotoparte: ['']
      }),
      criteriosRegistro: this.formBuilder.group({
        criterio: ['', Validators.required],
        origenInsumo: ['']
      }),
      caracteristicasTransformacion: this.formBuilder.group({
        descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32000)]],
      }),
      caracteristicasTecnicas: this.formBuilder.group({
        descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32000)]],
      }),
      aplicacionesProducto: this.formBuilder.group({
        descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32000)]],
      }),
      valorAgregado: this.formBuilder.group({
        valor: [0],
      }),
      datosRepresentante: this.formBuilder.group({
        nombreRepresentante: ['', [Validators.required, Validators.maxLength(3000)]],
        identificacion: ['', [Validators.required, Validators.maxLength(20)]],
        cargo: ['', [Validators.required, Validators.maxLength(3000)]],
        fecha: ['']
      })
    });
  }

  private getBody() {
    let solicitud: any = {};

    solicitud.id = this.getFatherFormGroupValue('id');

    switch (this.getFatherFormGroupValue('tipoFormulario')) {
      case 'produccionNacional':
        solicitud.programaId = 0;
        break;
      case 'fomentoIndustriaAutomotriz':
        solicitud.programaId = 1;
        break;
      case 'regimenTransformacionEnsamblePlanillas':
        solicitud.programaId = 2;
        break;
      case 'fomentoIndustriaAstilleros':
        solicitud.programaId = 3;
        break;
      default:
        break;
    }

    return solicitud;
  }

  private setFormGroup(solicitud) {
    this.getFatherFormGroupControl('id').setValue(solicitud.id);

    switch (solicitud.programaId) {
      case 0:
        this.setFatherFormGroupValue('tipoFormulario', 'produccionNacional');
        break;
      case 1:
        this.setFatherFormGroupValue('tipoFormulario', 'fomentoIndustriaAutomotriz');
        break;
      case 2:
        this.setFatherFormGroupValue('tipoFormulario', 'regimenTransformacionEnsamblePlanillas');
        break;
      case 3:
        this.setFatherFormGroupValue('tipoFormulario', 'fomentoIndustriaAstilleros');
        break;
      default:
        break;
    }

    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['subpartida'].setValue(solicitud.productoSubpartidaId);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreComercial'].setValue(solicitud.productoNombreComercial);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreTecnico'].setValue(solicitud.productoNombreTecnico);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unidadComercial'].setValue(solicitud.productoUnidadId);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['sectorEconomico'].setValue(solicitud.productoSectorId);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['tamanoEmpresa'].setValue(solicitud.empresaTamanoId);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unipadesProducidas'].setValue(solicitud.productoUnidadesProducidas);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['codigoNumericoUnico'].setValue(solicitud.productoCnuId);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['tecnologia'].setValue(solicitud.productoTecnologia);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['descripcionMotoparte'].setValue(solicitud.productoMotoparteDescripcion);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['numeroMotoparte'].setValue(solicitud.productoMotoparteNumero);

    solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').format('DD/MM/YYYY');
    (this.getFatherFormGroupControl('datosRepresentante') as FormGroup).controls['fecha'].setValue(solicitud.auditoria.fechaCreacionFormateada);
  }

}
