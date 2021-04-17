import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TablaAnexosComponent } from 'src/app/modules/anexos/components/tabla-anexos/tabla-anexos.component';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { Estado } from '../../../enums/estado.enum';
import { SolicitudService } from '../../../services/solicitud.service';
import { AlertaLecturaCuidadosaComponent } from '../alerta-lectura-cuidadosa/alerta-lectura-cuidadosa.component';
import { SolicitudRequerimientoComponent } from '../../solicitud-requerimiento/solicitud-requerimiento.component';
import { FormGeneric } from '../clases/form-generic';
import { InicioFirmaComponent } from '../inicio-firma/inicio-firma.component';
import { DivipolaService } from '../../../services/divipola/divipola.service';
import { DianService } from '../../../services/dian/dian.service';
import { FirmaService } from '../../../services/firma/firma.service';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.scss']
})
export class RegistroSolicitudComponent extends FormGeneric {

  @ViewChild('sinUsuario') public sinUsuarioTemplate: TemplateRef<any>;
  @ViewChild('firmaDesatendida') public firmaDesatendidaTemplate: TemplateRef<any>;
  @ViewChild("tablaAnexos") public tablaAnexos: TablaAnexosComponent;

  public formGroup: FormGroup;
  protected formGroupName: string;

  private documento: any;
  public documentoFinal: any;
  public loading: boolean = false;
  public cargando: boolean = false;
  public radicado: string;
  public produccionNacional: boolean = true;
  public fomentoIndustriaAutomotriz: boolean = false;
  public regimenTransformacionEnsamblePlanillas: boolean = false;
  public fomentoIndustriaAstilleros: boolean = false;

  public get estado(): typeof Estado {
    return Estado;
  }

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private firmaService: FirmaService,
    private router: Router,
    public divipolaService: DivipolaService,
    public dianService: DianService,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<any>
  ) {
    super();
    this.loading = true;
    this.radicado = this.activatedRoute.snapshot.paramMap.get('radicado');

    this.buildFromGroup();
    this.solicitudService.getById(this.radicado, {
      postfix: '/radicado'
    }).subscribe((response) => {
      let solicitud = response.respuesta as any;
      if (solicitud.estado == this.estado['En requerimiento']) {
        this.dialog.open(SolicitudRequerimientoComponent, {
          width: '40%',
          data: {
            solicitud: solicitud
          }
        });
      }
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
    if (this.formGroup.invalid) {
      this.errorGuardadoSolicitud();
    } else {
      if (
        ((this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesTotalmenteObtenidos' ||
          (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesPorcentajeMinimoValor') &&
        (this.getFatherFormGroupControl('valorAgregado') as FormGroup).controls.valor.value > 40) {
        this.errorGuardadoSolicitud()
      }
    }
    this.guardarSolicitud();
  }

  public guardarSolicitud(): void {
    const body = this.getBody();
    this.solicitudService.patch(body).subscribe();
  }

  public onFirmar() {
    if (this.formGroup.invalid) {
      this.errorFirmarSolicitud();
    } else {
      if (
        ((this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesTotalmenteObtenidos' ||
          (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesPorcentajeMinimoValor') &&
        (this.getFatherFormGroupControl('valorAgregado') as FormGroup).controls.valor.value > 40) {
        this.errorFirmarSolicitud();
      } else {
        this.dialog.open(InicioFirmaComponent, {
          width: '550px'
        }).afterClosed().subscribe(() => {
          this.dialog.open(AlertComponent, {
            width: '510px',
            data: {
              type: 'warning',
              icono: 'informacion',
              title: `Importante`,
              description: `El PDF ha sido generado, por favor habilite las ventanas emergentes en el navegador, luego de click en <strong> ACEPTAR </strong> y sigal as indicaciones que se le irán suministrando`,
              acceptButton: 'ACEPTAR'
            }
          }).afterClosed().subscribe(() => {
            this.dialog.open(AlertaLecturaCuidadosaComponent, {
              width: '600px'
            })
          });
        });
        // this.dialog.open(AlertComponent, {
        //   data: {
        //     type: '',
        //     title: `<span class="headline-m"><strong>Radicado creado con éxito.</strong></span>`,
        //     description: `Número de Radicado asignado: ${this.radicado}`,
        //     acceptButton: 'CONTINUAR'
        //   }
        // });
      }
    }
  }

  public isActive(step: number) {
    const criterio = (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls['criterio'].value;
    switch (step) {
      case 4:
        return criterio && criterio != 'bienesElaboradosNacionales';
      case 7:
        const costosDirectosFabrica = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['costosDirectosFabrica'].value;
        const valorTransaccion = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].value;

        return costosDirectosFabrica && valorTransaccion;
      case 8:
        return criterio == 'bienesProcesoProductivo';
      default:
        return true;
    }
  }

  public onNewAdjunto() {
    this.tablaAnexos.getAnexos();
  }

  public onCerrarRequerimiento() {
    let body = {
      id: this.getFatherFormGroupValue('id'),
      estado: this.estado['En evaluacion']
    }
    this.solicitudService.patch(body).subscribe((respuesta) => {
      this.router.navigateByUrl('/solicitud/listar');
    });
  }

  private buildFromGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [],
      fechaModificacion: [],
      estado: [''],
      firmaRadicado: [''],
      firmaFecha: [],
      requerimiento: [''],
      tipoFormulario: ['produccionNacional', Validators.required],
      identificacionEmpresa: this.formBuilder.group({
        nit: ['', [Validators.required, Validators.maxLength(255)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
        nombreContacto: ['', [Validators.required, Validators.maxLength(255)]],
        correo: ['', [Validators.required, Validators.pattern(new RegExp(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?;)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/))]],
        indicativo: ['', [Validators.maxLength(4), Validators.pattern(new RegExp(/^\d{4,4}(-\d{4,4})*$/))]],
        telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern(new RegExp(/^\d{7,10}(-\d{7,10})*$/))]],
        plantasProduccion: [null]
      }),
      datosProducto: this.formBuilder.group({
        bienFinal: [false],
        subpartida: [null, [Validators.required]],
        nombreComercial: ['', [Validators.required]],
        nombreTecnico: ['', [Validators.required]],
        unidadComercial: [null, [Validators.required]],
        sectorEconomico: [null, [Validators.required]],
        tamanoEmpresa: [null, [Validators.required]],
        unidadesProducidas: ['', [Validators.required, Validators.min(0)]],
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
      materialesExtranjerosNacionales: this.formBuilder.group({
        valorTotalCif: [],
        valorTotalPlanta: []
      }),
      materialesNacionales: this.formBuilder.group({
        listaInsumos: [],
        valorTotalUnidadProducto: []
      }),
      costosValorFabrica: this.formBuilder.group({
        valorTotalUnidadProducto: [],
        costosDirectosFabrica: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)]],
        valorTransaccion: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)]]
      }),
      procesoProduccion: this.formBuilder.group({
        contratoMaquila: [],
        procesoProduccion: [],
        listaMaquilas: []
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

    solicitud.empresaNitNumero = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value;
    solicitud.empresaRazonSocial = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value;
    solicitud.empresaContactoNombre = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nombreContacto'].value;
    solicitud.empresaCorreoElectronico = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].value;
    solicitud.empresaTelefonoIndicativo = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['indicativo'].value;
    solicitud.empresaTelefonoNumero = (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['telefono'].value;

    solicitud.bienFinal = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['bienFinal'].value;
    solicitud.productoSubpartidaId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['subpartida'].value;
    solicitud.productoNombreComercial = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreComercial'].value;
    solicitud.productoNombreTecnico = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['nombreTecnico'].value;
    solicitud.productoUnidadId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unidadComercial'].value;
    solicitud.productoSectorId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['sectorEconomico'].value;
    solicitud.empresaTamanoId = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['tamanoEmpresa'].value;
    solicitud.productoUnidadesProducidas = (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unidadesProducidas'].value;
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

    solicitud.totalNacionales = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTotalUnidadProducto'].value;
    solicitud.totalOtros = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['costosDirectosFabrica'].value;
    solicitud.totalTransaccion = (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].value;

    solicitud.contratoMaquila = (this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls['contratoMaquila'].value;
    solicitud.procesoProduccion = (this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls['procesoProduccion'].value;

    /*caracteristicasTransformacion: this.formBuilder.group({
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
    }),*/

    return solicitud;
  }
  public errorFirmarSolicitud(): void {
    this.dialog.open(AlertComponent, {
      data: {
        type: 'warning',
        title: 'Atención',
        description: 'Para poder generar el archivo PDF, debe primero diligenciar<br/>todo el formulario y guardarlo para validar los campos.',
        acceptButton: 'REGRESAR'
      }
    });
  }

  public errorGuardadoSolicitud(): void {
    this.dialog.open(AlertComponent, {
      data: {
        type: 'warning',
        title: 'Atención',
        description: `
            ${(this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls.plantasProduccion.value.length > 0
            ? '' : '1.6 1.7 1.8 Debe ingresar al menos una Planta de Producción </br>'}
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.subpartida.value
            ? '' : '2.1 Ingrese la subpartida arancelaria  </br>'}
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.nombreComercial.value
            ? '' : '2.2 Ingrese el nombre comercial  </br>'}
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.nombreTecnico.value
            ? '' : '2.3 Ingrese el nombre técnico  </br>'}
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.unidadComercial.value
            ? '' : '2.4 Ingrese la unidad comercial  </br>'} 
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.descripcionMotoparte.value
            ? '' : '2.5 Ingrese la descripcion de la(s) motoparte(s)  </br>'} 
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.numeroMotoparte.value
            ? '' : '2.6 Ingrese el numero de la motoparte  </br>'} 
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.sectorEconomico.value
            ? '' : '2.7 Ingrese el sector económico  </br>'} 
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.tamanoEmpresa.value
            ? '' : '2.8 Ingrese el tamaño de la empresa  </br>'}
            ${(this.getFatherFormGroupControl('datosProducto') as FormGroup).controls.unidadesProducidas.value
            ? '' : '2.9 Ingrese las unidades producidas por año  </br>'} 
            ${(this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value
            ? '' : '3. Seleccione los criterios para el registro  </br>'} 
            ${(this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesElaboradosNacionales'
            ? (this.getFatherFormGroupControl('materialesNacionales') as FormGroup).controls.listaInsumos.value.length > 0 ? '' : '5. Debe agregar al menos un insumo.</br>'
            : ''} 
            ${(this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls.costosDirectosFabrica.value
            ? '' : '6.2. Ingrese los costos directos de fabrica  </br>'} 
            ${(this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls.valorTransaccion.value
            ? '' : '6.3. Debe ser mayor a la suma de: 6.1 + 6.2 + 4.10  </br>'} 
            ${(this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls.contratoMaquila.value
            ? ((this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls.listaMaquilas.value.length > 0 ? '' : '7. Debe ingresar almenos un contrato de maquila </br>')
            : ((this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls.procesoProduccion.value ? '' : '7. Debe ingresar las etapas del proceso productivo del bien a registrar </br>')} 
            ${(this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesProcesoProductivo'
            ? (this.getFatherFormGroupControl('caracteristicasTransformacion') as FormGroup).controls.descripcion.value ? '' : '8. Debe ingresar las caracteristicas de transformación sustancial</br>'
            : ''} 
            ${(this.getFatherFormGroupControl('caracteristicasTecnicas') as FormGroup).controls.descripcion.value
            ? '' : '9. Ingrese las caracteristicas técnicas del producto  </br>'} 
            ${(this.getFatherFormGroupControl('aplicacionesProducto') as FormGroup).controls.descripcion.value
            ? '' : '10. Ingrese las aplicaciónes del producto  </br>'}
            ${(this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesTotalmenteObtenidos' || (this.getFatherFormGroupControl('criteriosRegistro') as FormGroup).controls.criterio.value == 'bienesPorcentajeMinimoValor'
            ? (this.getFatherFormGroupControl('valorAgregado') as FormGroup).controls.valor.value > 40 ? '' : '11. El Valor agregado nacional debe ser mayor o igual al 40% Art. 5 del decreto 2680”.</br>'
            : ''}  
            ${(this.getFatherFormGroupControl('datosRepresentante') as FormGroup).valid
            ? '' : '12. Ingrese los datos del representante legal  </br>'} 
        `,
        acceptButton: 'REGRESAR'
      }
    });
  }
  private setFormGroup(solicitud) {
    this.setFatherFormGroupValue('id', solicitud.id);
    this.setFatherFormGroupValue('fechaModificacion', solicitud.auditoria.fechaModificacionFormateada);
    this.setFatherFormGroupValue('estado', solicitud.estado);
    this.setFatherFormGroupValue('requerimiento', solicitud.requerimiento);

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
    (this.getFatherFormGroupControl('datosProducto') as FormGroup).controls['unidadesProducidas'].setValue(solicitud.productoUnidadesProducidas);
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

    (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTotalUnidadProducto'].setValue(solicitud.totalNacionales);
    (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['costosDirectosFabrica'].setValue(solicitud.totalOtros);
    (this.getFatherFormGroupControl('costosValorFabrica') as FormGroup).controls['valorTransaccion'].setValue(solicitud.totalTransaccion);

    (this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls['contratoMaquila'].setValue(solicitud.contratoMaquila);
    (this.getFatherFormGroupControl('procesoProduccion') as FormGroup).controls['procesoProduccion'].setValue(solicitud.procesoProduccion);

    solicitud.auditoria.fechaCreacionFormateada = moment(solicitud.auditoria.fechaCreacionFormateada, 'DD/MM/YYYY').format('DD/MM/YYYY');
    (this.getFatherFormGroupControl('datosRepresentante') as FormGroup).controls['fecha'].setValue(solicitud.auditoria.fechaCreacionFormateada);
  }

  public generarPdf() {
    this.cargando = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    document.getElementById('pdf').style.display = 'block';
    const DATA = document.getElementById('pdf');
    html2canvas(DATA).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      let bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      let pages = Math.ceil(pdfHeight / doc.internal.pageSize.getHeight());
      for (let i = 1; i < pages; i++) {
        doc.addPage('a4');
        bufferY -= doc.internal.pageSize.getHeight();
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      }

      document.getElementById('pdf').style.display = 'none';
      return doc;
    }).then((docResult) => {
      this.documento = docResult;
      let file = docResult.output('blob', { filename: `solicitud_${this.getFatherFormGroupValue('id')}.pdf` });
      let formData = new FormData();
      formData.append("nif", (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value);
      formData.append("nombre", `solicitud_${this.getFatherFormGroupValue('id')}.pdf`);
      formData.append("file", file);
      this.firmaService.post(formData, {
        postfix: '/initCircuitBySigners'
      }).subscribe(
        (initCircuitResponse) => {
          document.getElementById('pdf').style.display = 'none';
          this.cargando = false;
          if (initCircuitResponse.response.code === '000') {
            (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value;
            (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value;
            (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nombreContacto'].value;
            (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].value;

            this.firmaService.postUrl({
              documento: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value,
              nombres: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value,
              apellidos: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value,
              correo: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].value
            }, {
              postfix: `/circuitFrame/${initCircuitResponse.circuitInstance}`
            }).subscribe((circuitFrameResponse) => {
              window.open(circuitFrameResponse, "_blank");
            });
          } else if (initCircuitResponse.response.code === '38') {
            this.dialogRef = this.matDialog.open(this.sinUsuarioTemplate, {
              width: '450px'
            });
            this.firmaService.postUrl({
              documento: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['nit'].value,
              nombres: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value,
              apellidos: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['razonSocial'].value,
              correo: (this.getFatherFormGroupControl('identificacionEmpresa') as FormGroup).controls['correo'].value
            }, {
              postfix: '/newUser'
            }).subscribe((newUserResponse) => {
              window.open(newUserResponse, "_blank");
            });
          }
        },
        () => {
          this.cargando = false;
          document.getElementById('pdf').style.display = 'none';
          this.documentoFinal = null;
          this.dialogRef = this.matDialog.open(this.firmaDesatendidaTemplate, {
            width: '450px'
          });
          throw new Error('Error al iniciar proceso de porta firmas.');
        });
    });
  }

  public descargarFormulario(): void {
    this.documento.save(`solicitud_${this.getFatherFormGroupValue('id')}.pdf`);
  }

  public recibirAdjuntoFirmado(event: any): void {
    this.documentoFinal = event?.archivo ? event : null;
  }

}
