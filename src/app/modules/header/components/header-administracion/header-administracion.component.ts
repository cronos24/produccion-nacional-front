import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-administracion',
  templateUrl: './header-administracion.component.html',
  styleUrls: ['./header-administracion.component.scss']
})
export class HeaderAdministracionComponent implements OnInit {
  @Input() public usuario: string = 'Admin';
  constructor() { }

  ngOnInit(): void {
  }

}
