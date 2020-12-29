import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.scss']
})
export class FormularioSolicitudComponent implements OnInit {

  departments: any[];

  selectedDepartment: any;

  cities: any[];

  selectedCity: any;

  subpartidas: any[];

  selectedSubpartida: any;

  unidades: any[];

  selectedUnidad: any;

  sectores: any[];

  selectedSector: any;

  empresas: any[];

  selectedEmpresa: any;

  codigos: any[];

  selectedCodigo: any;

  display: boolean = false;

  myForm: FormGroup;

  plantas: any[] = [];

  busqueda: string;


  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.buildForm();

    this.route.params.subscribe( params => {
      if(Object.keys(params).length == 0){

      }else {
        this.getSolicitud(params.id);
      }
    });


    this.myForm.valueChanges.subscribe(console.log)

    this.departments = [
      { name: 'Amazonas', code: 'NY' },
      { name: 'Antioquia', code: 'RM' },
      { name: 'Cundinamarca', code: 'LDN' },
      { name: 'Boyaca', code: 'IST' }
    ];

    this.cities = [
      { name: 'Bogota', code: 'NY' },
      { name: 'Medellin', code: 'RM' },
      { name: 'Cali', code: 'LDN' },
      { name: 'Barranquilla', code: 'IST' },
      { name: 'Tunja', code: 'PRS' }
    ];

    this.unidades = [
      { name: 'unidad', code: 'NY' },
      { name: 'kilo', code: 'RM' },
      { name: 'tonelada', code: 'LDN' },
      { name: 'litro', code: 'IST' }
    ];

    this.sectores = [
      { name: 'sectores 1', code: 'NY' },
      { name: 'sectores 2', code: 'RM' },
      { name: 'sectores 3', code: 'LDN' },
      { name: 'sectores 4', code: 'IST' }
    ];

    this.empresas = [
      { name: 'empresa 1', code: 'NY' },
      { name: 'empresa 2', code: 'RM' },
      { name: 'empresa 3', code: 'LDN' },
      { name: 'empresa 4', code: 'IST' }
    ];

    this.codigos = [
      { name: 'codigo 1', code: 'NY' },
      { name: 'codigo 2', code: 'RM' },
      { name: 'codigo 3', code: 'LDN' },
      { name: 'codigo 4', code: 'IST' }
    ];

    this.subpartidas = [
      { name: 'subpartida 1', code: 'NY' },
      { name: 'subpartida 2', code: 'RM' },
      { name: 'subpartida 3', code: 'LDN' },
      { name: 'subpartida 4', code: 'IST' }
    ];

  }

  buildForm() {
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
      tamano_empresa: [undefined, []],
      unidad_anho: [undefined, []],
    });



  }


  showDialog() {
    this.display = true;
  }

  onBuscar(): void {
    this.getSolicitudes();
  }

  getSolicitudes(): void {
    //this.solicitudes = [];
  }

  getSolicitud(id: number){
    this.solicitudService.getSolicitud(id).subscribe(resp=>{
      debugger;
      this.myForm.patchValue({
        nombre_empresa: resp.respuesta.empresaContactoNombre,
        numero_radicado: resp.respuesta.radicado,
        nombre_comercial: resp.respuesta.productoNombreComercial,
        fecha_actualizacion: resp.respuesta.fechaActuacionFormateada,
        estado: resp.respuesta.estado
      })
    })
  }

  pushPlanta() {
    this.plantas.push(
      {"departamento": this.myForm.controls.departamento_produccion.value.name,
       "ciudad": this.myForm.controls.ciudad_produccion.value.name,
       "direccion": this.myForm.controls.direccion_produccion.value}
      )
      console.log(this.plantas)
  }


}
