import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title_first_button: string;
  title_second_button: string;
  text_content: string;
  text_content_specific: string;
  title_modal: string;
  icon: string
  style_icon: string;
  style_title: string;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data.icon == "alert") {

      this.style_icon = "fill: #3772ff";
      this.style_title = "color: #3772ff";
      this.icon = "check-negativo";

    } else if (this.data.icon == "alert-exit") {

    } else if (this.data.icon == "alert-error") {

    } else if (this.data.icon == "info-warn") {

      this.icon = "cara-disgusto-negativo"
      this.style_icon = "fill: #FFAB00"
      this.style_title = "color: #FFAB00";

    } else if (this.data.icon == "alert-warn") {

    } else {

      this.icon = "buscar-circular-negativo"
    }

    this.text_content_specific = this.data.text_content_specific;
    this.title_first_button = this.data.title_first_button
    this.title_second_button = this.data.title_second_button
    this.text_content = this.data.text_content
    this.text_content_specific = this.data.text_content_specific
    this.title_modal = this.data.title_modal


  }

  aceptar() {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
