import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { CunService } from '../../services/cun.service';
import { DepartamentoService } from '../../services/departamento.service';
import { SectorEconomicoService } from '../../services/sector-economico.service';
import { SolicitudService } from '../../services/solicitud.service';
import { SubpartidaService } from '../../services/subpartida.service';
import { TamanhoEmpresaService } from '../../services/tamanho-empresa.service';
import { UnidadComercialService } from '../../services/unidad-comercial.service';
import { ModalComponent } from '../../util/modal/modal.component';

@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.scss']
})
export class FormularioSolicitudComponent implements OnInit {

  public departments: any[];

  public selectedDepartment: any;

  public cities: any[];

  public selectedCity: any;

  public subpartidas: any[];

  public selectedSubpartida: any;

  public unidades: any[];

  public selectedUnidad: any;

  public sectores: any[];

  public selectedSector: any;

  public empresas: any[];

  public selectedEmpresa: any;

  public codigos: any[];

  public selectedCodigo: any;

  public display: boolean = false;

  public myForm: FormGroup;

  public plantas: any[] = [];

  public busqueda: string;

  public response: any;

  public edit: boolean;

  public constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private departamentoService: DepartamentoService,
    private cunService: CunService,
    private subpartidaService: SubpartidaService,
    private sectorEconomicoService: SectorEconomicoService,
    private tamanhoEmpresaService: TamanhoEmpresaService,
    private unidadComercialService: UnidadComercialService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  public async ngOnInit() {

    await this.buildForm();

    this.route.params.subscribe(async (params) => {
      if (Object.keys(params).length == 0) {

        this.edit = false;
        this.getDepartamentosCiudades();
        this.getUnidades();
        this.getSectores();
        this.getEmpresas();
        this.getCun();
        this.getSubpartidas();

      } else {
        this.edit = true;
        await this.getSolicitud(params.id);
        await this.getDepartamentosCiudades();
        await this.getUnidades();
        await this.getSectores();
        await this.getEmpresas();
        await this.getCun();
        await this.getSubpartidas();

        if (this.edit) {
          this.myForm.get('cun').setValue(this.codigos.find((codigo) => codigo.id == this.response.cun)?.id);
          this.myForm.get('subpartida').setValue(this.subpartidas.find((sub) => sub.id == this.response.subpartida)?.id);
          this.myForm.get('unidad_comercial').setValue(this.unidades.find((unidad) => unidad.id == this.response.unidadComercial)?.id);
          this.myForm.get('sector_economico').setValue(this.sectores.find((sector) => sector.id == this.response.sectorEconomico)?.id);
          this.myForm.get('tamanho_empresa').setValue(this.empresas.find((empresa) => empresa.id == this.response.tamanhoEmpresa)?.id);
        }

      }
    });

    this.myForm.valueChanges.toPromise().then(console.log);

  }

  public async buildForm() {
    this.myForm = this.fb.group({
      tipo_formulario: [undefined, []],
      numero_radicado: [undefined, []],
      fecha_actualizacion: [undefined, []],
      estado: [undefined, []],
      nit: [undefined, []],
      razon_social: [undefined, []],
      nombre_empresa: [undefined, []],
      correo_electronico: [undefined, []],
      indicativo_telefono: [undefined, []],
      telefono_contacto: [undefined, []],
      departamento_produccion: [undefined, []],
      ciudad_produccion: [undefined, []],
      direccion_produccion: [undefined, []],
      plantas: [, []],

      subpartida: [undefined, []],
      cun: [undefined, []],
      nombre_comercial: [undefined, []],
      nombre_tecnico: [undefined, []],
      unidad_comercial: [undefined, []],
      tecnologia: [undefined, []],
      numero_motoparte: [undefined, []],
      sector_economico: [undefined, []],
      tamanho_empresa: [undefined, []],
      unidad_anho: [undefined, []]
    });

  }

  public showDialog() {
    this.display = true;
  }

  public onBuscar(): void {
    this.getSolicitudes();
  }

  public getSolicitudes(): void {
    // this.solicitudes = [];
  }

  public async getSolicitud(id: number) {
    await this.solicitudService.getGenericById(id).toPromise().then((resp) => {
      this.myForm.patchValue({
        tipo_formulario: resp.tipoFormulario,
        numero_radicado: resp.radicado,
        fecha_actualizacion: resp.fechaActuacionFormateada,
        estado: resp.estado,
        nit: resp.nit,
        razon_social: resp.razonSocial,
        nombre_empresa: resp.empresaContactoNombre,
        correo_electronico: resp.correoElectronico,
        indicativo_telefono: resp.indicativoTelefono,
        telefono_contacto: resp.telefonoContacto,

        nombre_comercial: resp.nombreComercial,
        nombre_tecnico: resp.nombreTecnico,
        // unidad_comercial: resp.unidadComercial,
        tecnologia: resp.tecnologia,
        numero_motoparte: resp.numeroMotoparte,
        // sector_economico: resp.sectorEconomico,
        // tamanho_empresa: resp.tamanhoEmpresa,
        unidad_anho: resp.unidadAnho

      });

      resp?.plantasProduccion?.forEach((element) => {
        this.plantas.push(
          {
            'departamentoProduccion': element.departamentoProduccion,
            'ciudadProduccion': element.ciudadProduccion,
            'direccionProduccion': element.direccionProduccion
          }
        );
      });

      this.response = resp;

    });

  }

  public pushPlanta() {
    if (this.myForm.controls.departamento_produccion.value &&
      this.myForm.controls.ciudad_produccion.value &&
      this.myForm.controls.direccion_produccion.value) {
      this.plantas.push(
        {
          'departamentoProduccion': this.myForm.controls.departamento_produccion.value,
          'ciudadProduccion': this.myForm.controls.ciudad_produccion.value,
          'direccionProduccion': this.myForm.controls.direccion_produccion.value
        }
      );
    } else {
      this.openDialog(
        'info-warn',
        'Atención',
        'Verifique que seleccionó departamento, ciudad e ingresó la dirección de la Planta de Producción.',
        'REGRESAR',
        undefined,
        undefined
      ).subscribe((resp) => {

      });

    }

  }

  public deletePlanta(element: any) {

    const i = this.plantas.findIndex((i) => i.direccionProduccion == element.direccionProduccion);
    if (i > -1) {
      this.plantas.splice(i, 1);
    }

  }

  public async getDepartamentosCiudades() {

    await this.departamentoService.getGeneric().toPromise().then((resp) => {
      this.departments = resp;
    });

  }

  public async setCiudades(event: any) {
    this.cities = undefined;
    this.cities = event.value.ciudades;
  }

  public async getCun() {
    await this.cunService.getGeneric().toPromise().then((resp) => {
      this.codigos = resp;

    });
  }

  public async getSubpartidas() {
    await this.subpartidaService.getGeneric().toPromise().then((resp) => {
      this.subpartidas = resp;

    });

  }

  public async getUnidades() {
    await this.unidadComercialService.getGeneric().toPromise().then((resp) => {
      this.unidades = resp;

    });
  }

  public async getSectores() {
    await this.sectorEconomicoService.getGeneric().toPromise().then((resp) => {
      this.sectores = resp;

    });
  }

  public async getEmpresas() {
    await this.tamanhoEmpresaService.getGeneric().toPromise().then((resp) => {
      this.empresas = resp;

    });
  }

  public guardarParteUno() {

    let parte_uno = {
      tipoFormulario: this.myForm.controls.tipo_formulario.value,
      radicado: this.myForm.controls.numero_radicado.value,
      fechaActuacionFormateada: this.myForm.controls.fecha_actualizacion.value,
      estado: this.myForm.controls.estado.value,

      nit: this.myForm.controls.nit.value,
      razonSocial: this.myForm.controls.razon_social.value,
      empresaContactoNombre: this.myForm.controls.nombre_empresa.value,
      correoElectronico: this.myForm.controls.correo_electronico.value,
      indicativoTelefono: this.myForm.controls.indicativo_telefono.value,
      telefonoContacto: this.myForm.controls.telefono_contacto.value,
      plantas_produccion: this.plantas
    };

    if (this.edit) {
      this.solicitudService.put(parte_uno, this.myForm.controls.numero_radicado.value).toPromise().then((resp) => {
        // alert("Se actulizo el formulario parte 1")
        this.edit = false;
      });
    } else {
      this.solicitudService.post(parte_uno).toPromise().then((resp) => {
        // alert("Se creo el formulario parte 1")
      });
    }

  }

  public guardarParteDos() {

    let parte_dos = {
      tipoFormulario: this.myForm.controls.tipo_formulario.value,
      radicado: this.myForm.controls.numero_radicado.value,
      fechaActuacionFormateada: this.myForm.controls.fecha_actualizacion.value,
      estado: this.myForm.controls.estado.value,

      subpartida: this.myForm.controls.subpartida.value,
      cun: this.myForm.controls.cun.value,
      nombreComercial: this.myForm.controls.nombre_comercial.value,
      nombreTecnico: this.myForm.controls.nombre_tecnico.value,
      unidadComercial: this.myForm.controls.unidad_comercial.value,
      tecnologia: this.myForm.controls.tecnologia.value,
      numeroMotoparte: this.myForm.controls.numero_motoparte.value,
      sectorEconomico: this.myForm.controls.sector_economico.value,
      tamanhoEmpresa: this.myForm.controls.tamanho_empresa.value,
      unidadAnho: this.myForm.controls.unidad_anho.value
    };

    if (this.edit) {

      this.solicitudService.put(parte_dos, this.myForm.controls.numero_radicado.value).toPromise().then((resp) => {
        // this.openDialog()
        // alert("Se actulizo el formulario parte 2")
        this.edit = false;
      });
    } else {
      this.solicitudService.post(parte_dos).toPromise().then((resp) => {
        // alert("Se creo el formulario parte 2")
      });
    }
  }

  public openDialog(
    icon: string,
    title_modal: string,
    text_content: string,
    title_first_button: string,
    title_second_button: string,
    text_content_specific: string

  ): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          title_first_button,
          title_second_button,
          text_content,
          text_content_specific,
          title_modal,
          icon,
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('The dialog was closed' + result);
          observer.next(true);
        } else {
          observer.next(false);
        }

      });
    });
  }

}
