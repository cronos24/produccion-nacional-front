import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-insumos',
  templateUrl: './modal-insumos.component.html',
  styleUrls: ['./modal-insumos.component.css']
})
export class ModalInsumosComponent implements OnInit {

  subpartidas: any[];

  selectedSubpartida: any;


  constructor() { }

  ngOnInit(): void {

    this.subpartidas = [
      { name: 'subpartida 0', code: 'NY' },
      { name: 'subpartida 1', code: 'RM' },
      { name: 'subpartida 2', code: 'LDN' },
      { name: 'subpartida 3', code: 'IST' }
    ];

  }

}
