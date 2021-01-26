import { Component, OnInit } from '@angular/core';
import data from './menu.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuAdministracion: any = data;
  constructor() { }

  ngOnInit(): void {
  }

}
