import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VuceService } from '../vuce/vuce.service';


@Injectable()
export class DivipolaService extends VuceService {

  public modulo: string = '/divipola';

  private paises = [
    {
      "codigo": "CO",
      "nombre": "COLOMBIA",
      "tipos-pais": [
        {
          "id": 1,
          "nombre": "FABRICACION"
        }
      ]
    },
    {
      "codigo": "BR",
      "nombre": "BRAZIL",
      "tipos-pais": [
        {
          "id": 2,
          "nombre": "EXPORTACION"
        }
      ]
    }
  ];
  private departamentos = [
    {
      "codigo": "1",
      "nombre": "ANTIOQUIA",
      "pais": {
        "codigo": "CO",
        "nombre": "COLOMBIA"
      }
    },
    {
      "codigo": "2",
      "nombre": "CUNDINAMARCA",
      "pais": {
        "codigo": "CO",
        "nombre": "COLOMBIA"
      }
    }
  ];

  private ciudades = [
    {
      "codigo": "1",
      "nombre": "LA VEGA",
      "departamento": {
        "codigo": "2",
        "nombre": "CUNDINAMARCA",
        "pais": {
          "codigo": "CO",
          "nombre": "COLOMBIA"
        }
      }
    },
    {
      "codigo": "2",
      "nombre": "SOACHA",
      "departamento": {
        "codigo": "2",
        "nombre": "CUNDINAMARCA",
        "pais": {
          "codigo": "CO",
          "nombre": "COLOMBIA"
        }
      }
    },
    {
      "codigo": "17174",
      "nombre": "MEDELLIN",
      "departamento": {
        "codigo": "1",
        "nombre": "ANTIOQUIA",
        "pais": {
          "codigo": "CO",
          "nombre": "COLOMBIA"
        }
      }
    },
    {
      "codigo": "17175",
      "nombre": "APARTADO",
      "departamento": {
        "codigo": "1",
        "nombre": "ANTIOQUIA",
        "pais": {
          "codigo": "CO",
          "nombre": "COLOMBIA"
        }
      }
    }
  ];

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient)
  }

  public consultarPaises(codigo?: string): any {
    return codigo ? this.paises.find((pais) => pais.codigo == codigo) : this.paises;
  }

  public consultarDepartamentos(codigo?: string): any {
    return codigo ? this.departamentos.find((departamento) => departamento.codigo == codigo) : this.departamentos;
  }

  public consultarCiudades(codigo?: string): any {
    return codigo ? this.ciudades.find((ciudad) => ciudad.codigo == codigo) : this.ciudades;
  }

}
