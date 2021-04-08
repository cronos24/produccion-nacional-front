import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VuceService } from '../vuce/vuce.service';

@Injectable(
)
export class SubpartidaService extends VuceService {
  public modulo: string = '/subpartidas';

  public subpartidas = [{
    "numero-subpartida": "0401100000",
    "numero-subpartida-nomenclatura": "0401.10.00.00",
    "codigo-complementario": "0",
    "codigo-suplementario": "0",
    "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
    "estado": "ACTIVO",
    "partidas": [
      {
        "codigo": "0401",
        "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
        "capitulo": {
          "codigo": "04",
          "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
          "tipo": "CAPITULO",
          "seccion": {
            "codigo": "I",
            "nombre": "Animales vivos y productos del reino animal",
            "tipo": "SECCION"
          }
        },
        "partida-relacionada": null
      }
    ],
    "legislaciones": [
      {
        "id": 3,
        "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
        "tipo": "NOMENCLATURA"
      },
      {
        "id": 4,
        "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
        "tipo": "DESCRIPCION"
      }
    ],
    "unidad-fisica": {
      "id": 222,
      "codigo": "l",
      "nombre": "Litro",
      "estado": "ACTIVO",
      "tipo-dato-referencia": {
        "id": 7,
        "nombre": "REGIMEN ADUANERO"
      }
    }
  },{
    "numero-subpartida": "0401100000",
    "numero-subpartida-nomenclatura": "0401.10.00.00",
    "codigo-complementario": "0",
    "codigo-suplementario": "0",
    "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
    "estado": "ACTIVO",
    "partidas": [
      {
        "codigo": "0401",
        "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
        "capitulo": {
          "codigo": "04",
          "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
          "tipo": "CAPITULO",
          "seccion": {
            "codigo": "I",
            "nombre": "Animales vivos y productos del reino animal",
            "tipo": "SECCION"
          }
        },
        "partida-relacionada": null
      }
    ],
    "legislaciones": [
      {
        "id": 3,
        "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
        "tipo": "NOMENCLATURA"
      },
      {
        "id": 4,
        "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
        "tipo": "DESCRIPCION"
      }
    ],
    "unidad-fisica": {
      "id": 222,
      "codigo": "l",
      "nombre": "Litro",
      "estado": "ACTIVO",
      "tipo-dato-referencia": {
        "id": 7,
        "nombre": "REGIMEN ADUANERO"
      }
    }
  },{
    "numero-subpartida": "0401100000",
    "numero-subpartida-nomenclatura": "0401.10.00.00",
    "codigo-complementario": "0",
    "codigo-suplementario": "0",
    "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
    "estado": "ACTIVO",
    "partidas": [
      {
        "codigo": "0401",
        "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
        "capitulo": {
          "codigo": "04",
          "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
          "tipo": "CAPITULO",
          "seccion": {
            "codigo": "I",
            "nombre": "Animales vivos y productos del reino animal",
            "tipo": "SECCION"
          }
        },
        "partida-relacionada": null
      }
    ],
    "legislaciones": [
      {
        "id": 3,
        "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
        "tipo": "NOMENCLATURA"
      },
      {
        "id": 4,
        "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
        "tipo": "DESCRIPCION"
      }
    ],
    "unidad-fisica": {
      "id": 222,
      "codigo": "l",
      "nombre": "Litro",
      "estado": "ACTIVO",
      "tipo-dato-referencia": {
        "id": 7,
        "nombre": "REGIMEN ADUANERO"
      }
    }
  },
    {
      "numero-subpartida": "0401100001",
      "numero-subpartida-nomenclatura": "0401.10.00.00",
      "codigo-complementario": "0",
      "codigo-suplementario": "0",
      "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
      "estado": "ACTIVO",
      "partidas": [
        {
          "codigo": "0401",
          "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
          "capitulo": {
            "codigo": "04",
            "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
            "tipo": "CAPITULO",
            "seccion": {
              "codigo": "I",
              "nombre": "Animales vivos y productos del reino animal",
              "tipo": "SECCION"
            }
          },
          "partida-relacionada": null
        }
      ],
      "legislaciones": [
        {
          "id": 3,
          "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
          "tipo": "NOMENCLATURA"
        },
        {
          "id": 4,
          "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
          "tipo": "DESCRIPCION"
        }
      ],
      "unidad-fisica": {
        "id": 222,
        "codigo": "l",
        "nombre": "Litro",
        "estado": "ACTIVO",
        "tipo-dato-referencia": {
          "id": 7,
          "nombre": "REGIMEN ADUANERO"
        }
      }
    },{
      "numero-subpartida": "0401100000",
      "numero-subpartida-nomenclatura": "0401.10.00.00",
      "codigo-complementario": "0",
      "codigo-suplementario": "0",
      "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
      "estado": "ACTIVO",
      "partidas": [
        {
          "codigo": "0401",
          "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
          "capitulo": {
            "codigo": "04",
            "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
            "tipo": "CAPITULO",
            "seccion": {
              "codigo": "I",
              "nombre": "Animales vivos y productos del reino animal",
              "tipo": "SECCION"
            }
          },
          "partida-relacionada": null
        }
      ],
      "legislaciones": [
        {
          "id": 3,
          "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
          "tipo": "NOMENCLATURA"
        },
        {
          "id": 4,
          "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
          "tipo": "DESCRIPCION"
        }
      ],
      "unidad-fisica": {
        "id": 222,
        "codigo": "l",
        "nombre": "Litro",
        "estado": "ACTIVO",
        "tipo-dato-referencia": {
          "id": 7,
          "nombre": "REGIMEN ADUANERO"
        }
      }
    },{
      "numero-subpartida": "0401100002",
      "numero-subpartida-nomenclatura": "0401.10.00.00",
      "codigo-complementario": "0",
      "codigo-suplementario": "0",
      "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
      "estado": "ACTIVO",
      "partidas": [
        {
          "codigo": "0401",
          "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
          "capitulo": {
            "codigo": "04",
            "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
            "tipo": "CAPITULO",
            "seccion": {
              "codigo": "I",
              "nombre": "Animales vivos y productos del reino animal",
              "tipo": "SECCION"
            }
          },
          "partida-relacionada": null
        }
      ],
      "legislaciones": [
        {
          "id": 3,
          "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
          "tipo": "NOMENCLATURA"
        },
        {
          "id": 4,
          "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
          "tipo": "DESCRIPCION"
        }
      ],
      "unidad-fisica": {
        "id": 222,
        "codigo": "l",
        "nombre": "Litro",
        "estado": "ACTIVO",
        "tipo-dato-referencia": {
          "id": 7,
          "nombre": "REGIMEN ADUANERO"
        }
      }
    }, {
      "numero-subpartida": "9958322200",
      "numero-subpartida-nomenclatura": "9958.32.22.00",
      "codigo-complementario": "0",
      "codigo-suplementario": "0",
      "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
      "estado": "ACTIVO",
      "partidas": [
        {
          "codigo": "0401",
          "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
          "capitulo": {
            "codigo": "04",
            "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
            "tipo": "CAPITULO",
            "seccion": {
              "codigo": "I",
              "nombre": "Animales vivos y productos del reino animal",
              "tipo": "SECCION"
            }
          },
          "partida-relacionada": null
        }
      ],
      "legislaciones": [
        {
          "id": 3,
          "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
          "tipo": "NOMENCLATURA"
        },
        {
          "id": 4,
          "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
          "tipo": "DESCRIPCION"
        }
      ],
      "unidad-fisica": {
        "id": 222,
        "codigo": "l",
        "nombre": "Litro",
        "estado": "ACTIVO",
        "tipo-dato-referencia": {
          "id": 7,
          "nombre": "REGIMEN ADUANERO"
        }
      }
    }, {
      "numero-subpartida": "0553322200",
      "numero-subpartida-nomenclatura": "0553.32.22.00",
      "codigo-complementario": "0",
      "codigo-suplementario": "0",
      "descripcion": "- Con un contenido de materias grasas inferior o igual al 1% en peso",
      "estado": "ACTIVO",
      "partidas": [
        {
          "codigo": "0401",
          "descripcion": "Leche y nata (crema), sin concentrar, sin adición de azúcar ni otro edulcorante.",
          "capitulo": {
            "codigo": "64",
            "nombre": "Leche y productos lácteos; huevos de ave; miel natural; productos comestibles de origen animal, no expresados ni comprendidos en otra parte",
            "tipo": "CAPITULO",
            "seccion": {
              "codigo": "I",
              "nombre": "Animales vivos y productos del reino animal",
              "tipo": "SECCION"
            }
          },
          "partida-relacionada": null
        }
      ],
      "legislaciones": [
        {
          "id": 3,
          "nombre": "DECRETO 2153 DEL 26-DIC-2016 CONGRESO DE COLOMBIA. DIARIO OFICIAL NO.PÁG.",
          "tipo": "NOMENCLATURA"
        },
        {
          "id": 4,
          "nombre": "DECRETO 4589 DEL 27-DIC-2006 MINISTERIO DE COMERCIO, INDUSTRIA y TURISMO.DIARIO OFICIAL NO 46494. PÁG. 193",
          "tipo": "DESCRIPCION"
        }
      ],
      "unidad-fisica": {
        "id": 222,
        "codigo": "l",
        "nombre": "Litro",
        "estado": "ACTIVO",
        "tipo-dato-referencia": {
          "id": 7,
          "nombre": "REGIMEN ADUANERO"
        }
      }
    }
  ];

  public notas: any[] = [
    {
      "id": 4,
      "nota": "1. En esta Sección, cualquier referencia a un género o a una especie determinada de un animal se aplica también, salvo disposición en contrario, a los animales jóvenes de ese género o de esa especie.",
      "seccion-capitulo": {
        "codigo": "I",
        "nombre": "Animales vivos y productos del reino animal",
        "tipo": "SECCION"
      },
      "tipo-nota": "NOTA"
    },
    {
      "id": 5,
      "nota": "1. En los Capítulos 1 y 3, las expresiones Reproductores de raza pura, para reproducción o cría industrial, para lidia y para carrera, comprenden los animales considerados como tales por las autoridades competentes de los Ministerios de Agricultura de los Países Miembros.",
      "seccion-capitulo": {
        "codigo": "I",
        "nombre": "Animales vivos y productos del reino animal",
        "tipo": "SECCION"
      },
      "tipo-nota": "COMPLEMENTARIA_ANDINA"
    }
  ]
  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient)
  }

  public getSeccionesCapitulos(tipo: string): Observable<any> {
    let path: string = `${this.modulo}/secciones-capitulos/v1/${this.lenguaje}/${tipo}`
    return this.get(path);
  }

  public getSeccionCapitulo(codigoSeccionCapitulo: string): Observable<any> {
    let path: string = `${this.modulo}/secciones-capitulos/v1/${this.lenguaje}/${codigoSeccionCapitulo}`
    return this.get(path);
  }

  public getPartidasPorCapitulo(codigoCapitulo: string): Observable<any> {
    let path: string = `${this.modulo}/secciones-capitulos/v1/${this.lenguaje}/${codigoCapitulo}/partidas`
    return this.get(path);
  }

  public getPartida(codigoPartida: string): Observable<any> {
    let path: string = `${this.modulo}/partidas/v1/${this.lenguaje}/${codigoPartida}`
    return this.get(path);
  }

  public getNotasSeccionCapitulo(codigoSeccionCapitulo: string): Observable<any> {
    let path: string = `${this.modulo}/secciones-capitulos/v1/${this.lenguaje}/${codigoSeccionCapitulo}/notas`
    return this.get(path);
  }

  public getNotas(id: string): Observable<any> {
    let path: string = `${this.modulo}/notas/v1/${this.lenguaje}/${id}`
    return this.get(path);
  }

  public getSubpartida(id?: string): any[] | any {
    if (id) {
      return this.subpartidas.find((subpartida) => subpartida['numero-subpartida'] === id);
    } else {
      return this.subpartidas;
    }
  }

  public getLegislacionesSubpartida(idSubpartida: string): Observable<any> {
    let path: string = `${this.modulo}/legislaciones/v1/${this.lenguaje}/${idSubpartida}/legislaciones`
    return this.get(path);
  }

  public getLegislacion(id: string): Observable<any> {
    let path: string = `${this.modulo}/legislaciones/v1/${this.lenguaje}/${id}`
    return this.get(path);
  }

}
