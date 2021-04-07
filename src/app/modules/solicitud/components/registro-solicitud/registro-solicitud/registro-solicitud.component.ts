import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { TablaAnexosComponent } from 'src/app/modules/anexos/components/tabla-anexos/tabla-anexos.component';
import { Estado } from '../../../enums/estado.enum';
import { SolicitudService } from '../../../services/solicitud.service';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.scss']
})
export class RegistroSolicitudComponent extends FormGeneric {

  @ViewChild("tablaAnexos") public tablaAnexos: TablaAnexosComponent;

  public formGroup: FormGroup;
  protected formGroupName: string;

  public loading: boolean = false;

  public produccionNacional: boolean = true;
  public fomentoIndustriaAutomotriz: boolean = false;
  public regimenTransformacionEnsamblePlanillas: boolean = false;
  public fomentoIndustriaAstilleros: boolean = false;

  public get estado(): typeof Estado {
    return Estado;
  }

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute) {
    super();
    this.loading = true;
    const radicado = this.activatedRoute.snapshot.paramMap.get('radicado');

    this.solicitudService.getById(radicado, {
      postfix: '/radicado'
    }).subscribe((response) => {
      this.buildFromGroup();
      this.setFormGroup(response.respuesta);
      this.loading = false;
    });
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

    });
  }

  public isActive(step: number) {
    const criterio = (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value;
    switch (step) {
      case 4:
        return criterio && criterio != 'bienesElaboradosNacionales';
      case 8:
        return criterio == 'bienesProcesoProductivo';
      default:
        return true;
    }
  }

  public onNewAdjunto(){
    this.tablaAnexos.getAnexos();
  }

  private buildFromGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [],
      estado: [''],
      tipoFormulario: ['produccionNacional', Validators.required],
      identificacionEmpresa: this.formBuilder.group({
        nit: ['', [Validators.required, Validators.maxLength(255)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
        nombreContacto: ['', [Validators.required, Validators.maxLength(255)]],
        correo: ['', [Validators.required, Validators.pattern(new RegExp(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?;)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/))]],
        indicativo: ['', [Validators.maxLength(4), Validators.pattern(new RegExp(/^\d{4,4}(-\d{4,4})*$/))]],
        telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern(new RegExp(/^\d{7,10}(-\d{7,10})*$/))]]
      }),
      datosProducto: this.formBuilder.group({
        bienFinal: [false],
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
        numeroMotoparte: [''],
        resolucion: [''],
        programa: ['']
      }),
      criteriosRegistro: this.formBuilder.group({
        criterio: ['', Validators.required],
        origenInsumo: ['']
      }),
      materialesExtranjerosNacionales: new FormArray([], Validators.required),
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

    solicitud.empresaNitNumero = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value;
    solicitud.empresaRazonSocial = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value;
    solicitud.empresaContactoNombre = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nombreContacto'].value;
    solicitud.empresaCorreoElectronico = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].value;
    solicitud.empresaTelefonoIndicativo = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['indicativo'].value;
    solicitud.empresaTelefonoNumero = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['telefono'].value;

    solicitud.productoBienFinal = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['bienFinal'].value;
    solicitud.productoSubpartidaId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['subpartida'].value;
    solicitud.productoNombreComercial = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreComercial'].value;
    solicitud.productoNombreTecnico = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreTecnico'].value;
    solicitud.productoUnidadId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unidadComercial'].value;
    solicitud.productoSectorId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['sectorEconomico'].value;
    solicitud.empresaTamanoId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['tamanoEmpresa'].value;
    solicitud.productoUnidadesProducidas = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unipadesProducidas'].value;
    solicitud.productoCnuId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['codigoNumericoUnico'].value;
    solicitud.productoTecnologia = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['tecnologia'].value;
    solicitud.productoMotoparteDescripcion = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['descripcionMotoparte'].value;
    solicitud.productoMotoparteNumero = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['numeroMotoparte'].value;
    solicitud.productoResolucion = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['resolucion'].value;
    solicitud.productoPrograma = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['programa'].value;

    switch ((this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value) {
      case 'bienesTotalmenteObtenidos':
        solicitud.empresaProductorCriterio = 0;
        break;
      case 'bienesElaboradosNacionales':
        solicitud.empresaProductorCriterio = 1;
        break;
      case 'bienesPorcentajeMinimoValor':
        solicitud.empresaProductorCriterio = 2;
        break;
      case 'bienesProcesoProductivo':
        solicitud.empresaProductorCriterio = 3;
        break;
      default:
        break;
    }

    switch ((this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['origenInsumo'].value) {
      case 'nacional':
        solicitud.empresaInsumosOrigen = 0;
        break;
      case 'importado':
        solicitud.empresaInsumosOrigen = 1;
        break;
      case 'piezaInsumo':
        solicitud.empresaInsumosOrigen = 2;
        break;
      default:
        break;
    }

    return solicitud;
  }

  private setFormGroup(solicitud) {
    this.setFatherFormGroupValue('id', solicitud.id);
    this.setFatherFormGroupValue('estado', solicitud.estado);

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
    this.onSelectedCheckBox(this.getFatherFormGroupValue('tipoFormulario'));

    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].setValue(solicitud.empresaNitNumero);
    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].setValue(solicitud.empresaRazonSocial);
    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nombreContacto'].setValue(solicitud.empresaContactoNombre);
    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].setValue(solicitud.empresaCorreoElectronico);
    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['indicativo'].setValue(solicitud.empresaTelefonoIndicativo);
    (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['telefono'].setValue(solicitud.empresaTelefonoNumero);

    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['bienFinal'].setValue(solicitud.productoBienFinal);
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
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['resolucion'].setValue(solicitud.productoResolucion);
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['programa'].setValue(solicitud.productoPrograma);

    switch (solicitud.empresaProductorCriterio) {
      case 0:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].setValue('bienesTotalmenteObtenidos');
        break;
      case 1:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].setValue('bienesElaboradosNacionales');
        break;
      case 2:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].setValue('bienesPorcentajeMinimoValor');
        break;
      case 3:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].setValue('bienesProcesoProductivo');
        break;
      default:
        break;
    }

    switch (solicitud.empresaInsumosOrigen) {
      case 0:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['origenInsumo'].setValue('nacional');
        break;
      case 1:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['origenInsumo'].setValue('importado');
        break;
      case 2:
        (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['origenInsumo'].setValue('piezaInsumo');
        break;
      default:
        break;
    }

    solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').format('DD/MM/YYYY');
    (this.getFatherFormGroupControl('datosRepresentante') as FormGroup).controls['fecha'].setValue(solicitud.auditoria.fechaCreacionFormateada);
  }

}
