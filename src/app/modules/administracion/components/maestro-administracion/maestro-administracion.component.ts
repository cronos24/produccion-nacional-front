import { Component, OnInit } from '@angular/core';

import data from './../menu/menu.json';
@Component({
  selector: 'app-maestro-administracion',
  templateUrl: './maestro-administracion.component.html',
  styleUrls: ['./maestro-administracion.component.scss']
})
export class MaestroAdministracionComponent implements OnInit {

  public objetoPerfil: any = data;
  public perfil: number = 0;
  public menu: any = this.objetoPerfil[this.perfil].menu;
  constructor() {
    localStorage.setItem('MENU_ADMINISTRACION', JSON.stringify(this.menu));
  }

  ngOnInit(): void {
  }

}
