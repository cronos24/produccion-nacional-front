import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { IRespuesta } from 'src/app/interfaces/respuesta.interface';
import { DianService } from '../../../services/dian/dian.service';
import { SubpartidaPorTipoService } from '../../../services/subpartida/subpartida-por-tipo.service';
import { SubpartidaService } from '../../../services/subpartida/subpartida.service';
import { FormGeneric } from '../clases/form-generic';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss'],
})
export class DatosProductoComponent extends FormGeneric implements OnInit {

  @Input() protected formGroup: FormGroup;
  protected formGroupName: string = 'datosProducto';

  public subpartidas: any[] = [];
  public totalSubpartidas: any[] = [];
  public subpartidaSeleccionada: any;
  public sectores: any = sectoresEconomicos;
  public unidadesMedidaDian: any = this.dianService.obtenerUnidadesDeMedida();
  public constructor(private subpartidaService: SubpartidaService,
    private subpartidaPorTipoService: SubpartidaPorTipoService,
    private dianService: DianService) {
    super();
  }

  public messagesSubpartidaArancelaria: Message[] = [
    {
      severity: 'info', summary: ''
    },
  ];

  public messagesCodigoNumericoUnico: Message[] = [
    {
      severity: 'info',
      summary: '',
    },
  ];

  ngOnInit(): void {
    this.totalSubpartidas = this.subpartidaService.getSubpartida();
    this.subpartidas = this.totalSubpartidas;
    this.onChangeSubpartida();
    this.getFatherFormGroupControl('tipoFormulario').valueChanges.subscribe((tipoFormulario: any) => {
      this.getChildFormGroupControl('descripcionMotoparte').setValidators([]);
      this.getChildFormGroupControl('numeroMotoparte').setValidators([]);
      this.getChildFormGroupControl('codigoNumericoUnico').setValidators([]);
      this.getChildFormGroupControl('tecnologia').setValidators([]);
      this.getChildFormGroupControl('resolucion').setValidators([]);
      this.getChildFormGroupControl('programa').setValidators([]);
      switch (tipoFormulario) {
        case 'produccionNacional':
          this.getChildFormGroupControl('resolucion').setValidators([Validators.required]);
          this.getChildFormGroupControl('programa').setValidators([Validators.required]);
          this.subpartidas = this.totalSubpartidas;
          this.validarLimpiezaSubpartida();
          break;
        case 'fomentoIndustriaAutomotriz':
          this.getChildFormGroupControl('codigoNumericoUnico').setValidators([Validators.required]);
          this.getChildFormGroupControl('tecnologia').setValidators([Validators.required]);
          this.obtenerSubpartidasFiltradas(tipoFormulario);
          break;
        case 'fomentoIndustriaAstilleros':
          this.getChildFormGroupControl('codigoNumericoUnico').setValidators([Validators.required]);
          this.getChildFormGroupControl('tecnologia').setValidators([Validators.required]);
          this.obtenerSubpartidasFiltradas(tipoFormulario);
          break;
        case 'regimenTransformacionEnsamblePlanillas':
          this.getChildFormGroupControl('descripcionMotoparte').setValidators([Validators.required]);
          this.getChildFormGroupControl('numeroMotoparte').setValidators([Validators.required]);
          this.subpartidas = this.totalSubpartidas;
          this.validarLimpiezaSubpartida();
          break;
        default:
          break;
      }
    });
  }

  public obtenerSubpartidasFiltradas(tipo: string): void {
    this.subpartidaPorTipoService.get({ queryParams: { general: tipo } }).subscribe((data: IRespuesta<any>) => {
      if (data.codigo == 200) {
        this.subpartidas = [];
        data.respuesta.datos.forEach(subpartidaPorTipo => {
          this.totalSubpartidas.forEach(subpartida => {
            if (subpartidaPorTipo.id == subpartida['numero-subpartida']) {
              let temporal: any = subpartida;
              temporal.cnus = subpartidaPorTipo.cnus;
              this.subpartidas.push(temporal);
            }
          });
        });
        this.validarLimpiezaSubpartida();
        if (this.getChildFormGroupControl('codigoNumericoUnico')?.value) {
          this.onChangeCNU();
        }
      }

    });
  }

  onChangeSubpartida(): void {
    let indexSubpartida: number = this.subpartidas.findIndex((val: any) => val['numero-subpartida'] == this.getChildFormGroupControl('subpartida')?.value)
    this.subpartidaSeleccionada = this.subpartidas[indexSubpartida];
    this.getChildFormGroupControl('sectorEconomico')?.setValue(this.sectores.findIndex((element: any) => +this.subpartidaSeleccionada.partidas[0].capitulo.codigo >= +element.capitulosDesde && +this.subpartidaSeleccionada.partidas[0].capitulo.codigo <= +element.capitulosHasta));
    this.messagesSubpartidaArancelaria = [
      {
        severity: 'info', summary:
          `${this.subpartidaSeleccionada?.['numero-subpartida']}
        ${this.subpartidaSeleccionada?.descripcion}`
      },
    ];
    this.messagesCodigoNumericoUnico = [];
  }

  validarLimpiezaSubpartida(): void {
    if (this.subpartidas.findIndex((val: any) => val['numero-subpartida'] == this.getChildFormGroupControl('subpartida')?.value) == -1) {
      this.messagesSubpartidaArancelaria = [];
      this.messagesCodigoNumericoUnico = [];
      this.getChildFormGroupControl('subpartida')?.setValue(null);
    }
  }

  onChangeCNU(): void {
    let indexCNU: number = this.subpartidaSeleccionada.cnus.findIndex((val: any) => val['id'] == this.getChildFormGroupControl('codigoNumericoUnico')?.value);
    this.getChildFormGroupControl('nombreTecnico')?.setValue(this.subpartidaSeleccionada.cnus[indexCNU].nombreTecnico);
    this.messagesCodigoNumericoUnico = [
      {
        severity: 'info', summary:
          `${this.subpartidaSeleccionada.cnus[indexCNU]?.['id']}
        ${this.subpartidaSeleccionada.cnus[indexCNU]?.descripcion}`
      },
    ];
  }
}

const sectoresEconomicos = [
  {
    codigo: 'SECCI??N I',
    designacionMercancias: 'Animales vivos y productos del reino animal',
    capitulosDesde: '01',
    capitulosHasta: '05',
    sectorEconomico: 'Agropecuario'
  },
  {
    codigo: 'SECCI??N II',
    designacionMercancias: 'Productos del reino vegetal',
    capitulosDesde: '06',
    capitulosHasta: '14',
    sectorEconomico: 'Agricola'
  },
  {
    codigo: 'SECCI??N III',
    designacionMercancias: 'Grasas y aceites animales o vegetales; productos de su desdoblamiento; grasas alimenticias elaboradas; ceras de origen animal o vegetal',
    capitulosDesde: '15',
    capitulosHasta: '15',
    sectorEconomico: 'Industria de Grasas y aceites animales y vegetajes '
  },
  {
    codigo: 'SECCI??N IV',
    designacionMercancias: 'Productos de las industrias alimentarias; bebidas, l??quidos alcoh??licos y vinagre; tabaco y suced??neos del tabaco elaborados',
    capitulosDesde: '16',
    capitulosHasta: '24',
    sectorEconomico: 'Productos de la Industria alimenticia'
  },
  {
    codigo: 'SECCI??N V',
    designacionMercancias: 'Productos minerales',
    capitulosDesde: '25',
    capitulosHasta: '27',
    sectorEconomico: 'Industria Minera'
  },
  {
    codigo: 'SECCI??N VI',
    designacionMercancias: 'Productos de las industrias qu??micas o de las industrias conexas',
    capitulosDesde: '28',
    capitulosHasta: '38',
    sectorEconomico: 'Industria Quimica'
  },
  {
    codigo: 'SECCI??N VII',
    designacionMercancias: 'Pl??stico y sus manufacturas; caucho y sus manufacturas',
    capitulosDesde: '39',
    capitulosHasta: '40',
    sectorEconomico: 'Manufacturas de pl??stico'
  },
  {
    codigo: 'SECCI??N VIII',
    designacionMercancias: 'Pieles, cueros, peleter??a y manufacturas de estas materias; art??culos de talabarter??a o guarnicioner??a; art??culos de viaje, bolsos de mano (carteras) y continentes similares; manufacturas de tripa      ',
    capitulosDesde: '41',
    capitulosHasta: '43',
    sectorEconomico: 'Manufacturas de cuero'
  },
  {
    codigo: 'SECCI??N IX',
    designacionMercancias: 'Madera, carb??n vegetal y manufacturas de madera; corcho y sus manufacturas; manufacturas de esparter??a o cester??a',
    capitulosDesde: '44',
    capitulosHasta: '46',
    sectorEconomico: 'Industria  Maderera'
  },
  {
    codigo: 'SECCI??N X',
    designacionMercancias: 'Pasta de madera o de las dem??s materias fibrosas celul??sicas; papel o cart??n para reciclar (desperdicios y desechos); papel o cart??n y sus aplicaciones',
    capitulosDesde: '47',
    capitulosHasta: '49',
    sectorEconomico: 'Manufacturas de madera'
  },
  {
    codigo: 'SECCI??N XI',
    designacionMercancias: 'Materias textiles y sus manufacturas',
    capitulosDesde: '50',
    capitulosHasta: '63',
    sectorEconomico: 'Industria Textil'
  },
  {
    codigo: 'SECCI??N XII',
    designacionMercancias: 'Calzado, sombreros y dem??s tocados, paraguas, quitasoles, bastones, l??tigos, fustas, y sus partes; plumas preparadas y art??culos de plumas; flores artificiales; manufacturas de cabello',
    capitulosDesde: '64',
    capitulosHasta: '67',
    sectorEconomico: 'Manufacturas de calzado y dem??s'
  },
  {
    codigo: 'SECCI??N XIII',
    designacionMercancias: 'Manufacturas de piedra, yeso fraguable, cemento, amianto (asbesto), mica o materias an??logas; productos cer??micos; vidrio y sus manufacturas',
    capitulosDesde: '68',
    capitulosHasta: '70',
    sectorEconomico: 'Manufacturas de cer??mica, piedra y vidrio'
  },
  {
    codigo: 'SECCI??N XIV',
    designacionMercancias: 'Perlas finas (naturales) o cultivadas, piedras preciosas o semipreciosas, metales preciosos, chapados de metal precioso (plaque) y manufacturas de estas materias; bisuter??a; monedas',
    capitulosDesde: '71',
    capitulosHasta: '71',
    sectorEconomico: 'Manufacturas de metales preciosos y bisuteria  '
  },
  {
    codigo: 'SECCI??N XV',
    designacionMercancias: 'Metales comunes y manufacturas de estos metales',
    capitulosDesde: '72',
    capitulosHasta: '83',
    sectorEconomico: 'Manufacturas de metales comunes'
  },
  {
    codigo: 'SECCI??N XVI',
    designacionMercancias: 'Maquinas y aparatos, material el??ctrico y sus partes; aparatos de grabaci??n o reproducci??n de sonido, aparatos de grabaci??n o reproducci??n de imagen y sonido en televisi??n, y las partes y accesorios de estos aparatos',
    capitulosDesde: '84',
    capitulosHasta: '85',
    sectorEconomico: 'Industria electrica y mecanica '
  },
  {
    codigo: 'SECCI??N XVII',
    designacionMercancias: 'Material de transporte',
    capitulosDesde: '86',
    capitulosHasta: '89',
    sectorEconomico: 'Maquinas de Transporte '
  },
  {
    codigo: 'SECCI??N XVIII',
    designacionMercancias: 'Instrumentos y aparatos de ??ptica, fotograf??a o cinematograf??a, de medida, control o precisi??n; instrumentos y aparatos medicoquir??rgicos; aparatos de relojer??a; instrumentos musicales; partes y accesorios de estos instrumentos o aparatos',
    capitulosDesde: '90',
    capitulosHasta: '92',
    sectorEconomico: 'Industria de cine, televisi??n , sonido  y aparatos medicos'
  },
  {
    codigo: 'SECCI??N XIX',
    designacionMercancias: 'Armas, municiones, y sus partes y accesorios',
    capitulosDesde: '93',
    capitulosHasta: '93',
    sectorEconomico: 'Industria Militar '
  },
  {
    codigo: 'SECCI??N XX',
    designacionMercancias: 'Mercanc??as y productos diversos',
    capitulosDesde: '94',
    capitulosHasta: '96',
    sectorEconomico: 'Industria Metalmecanica '
  },
  {
    codigo: 'SECCI??N XXI',
    designacionMercancias: 'Objetos de arte o colecci??n y antig??edades',
    capitulosDesde: '97',
    capitulosHasta: '98',
    sectorEconomico: 'Industria Cultural'
  },
]
