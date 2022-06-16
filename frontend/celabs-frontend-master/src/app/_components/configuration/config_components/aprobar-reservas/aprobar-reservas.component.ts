import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';

interface Reserva {
  id: number,
  idLaboratorio: string,
  horaInicial: string,
  horaFinal: string,
  fechaInicial: string,
  fechaFinal: string,
  descripcion: string
}

@Component({
  selector: 'app-aprobar-reservas',
  templateUrl: './aprobar-reservas.component.html',
  styleUrls: ['./aprobar-reservas.component.css']
})
export class AprobarReservasComponent implements OnInit {
  reservasPendientes : Reserva [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.reservasPendientes = this.getReservas();
  }

  confirm(Id: number) {
    this.alertService.confirm(
      'Alerta',
      '¿Está seguro de que desea aprobar esta reserva?').then((result) => {
        if (result) {
          // Success
          this.postAllow(Id);
        } else {
          // No success
          console.log(false);
        }
      }).catch(err => {
        // Error
        console.log(false);
      });
  }
  //GETSs

  getReservas () : Reserva [] {
    return [{id: 1,
      idLaboratorio: "F2-07",
      horaInicial: "string",
      horaFinal: "string",
      fechaInicial: "string",
      fechaFinal: "string",
      descripcion: "string"
    }];
  }

  // POSTs
  postAllow(userId : number) : void {
    console.log(userId);
  }


}
