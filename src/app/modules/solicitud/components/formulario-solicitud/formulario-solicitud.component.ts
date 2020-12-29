import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.buildForm();

    this.departments = [
      { name: 'Cundinamarca', code: 'NY' },
      { name: 'Antioquia', code: 'RM' },
      { name: 'Otro', code: 'LDN' },
      { name: 'Boyaca', code: 'IST' }
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
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


  }

  buildForm() {
    this.myForm = this.fb.group({
      tipo_formulario: [undefined, []],
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
    });
  }


  showDialog() {
    this.display = true;
  }

}
