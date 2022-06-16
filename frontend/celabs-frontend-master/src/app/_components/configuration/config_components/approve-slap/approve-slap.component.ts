import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { SlapService } from 'src/app/_services/api/slap.service';
import { VPalmada } from 'src/app/_models/v-palmada.model';


interface Palmada {
  id: number,
  operador: string,
  idLaboratorio: string,
  motivo: string,
  fechaSolicitud: string,
  fechaPalmada: string,
}

@Component({
  selector: 'app-approve-slap',
  templateUrl: './approve-slap.component.html',
  styleUrls: ['./approve-slap.component.css']
})
export class ApproveSlapComponent implements OnInit {

  pendingSlaps: VPalmada[];
  constructor(private alertService: AlertService,
  private slapService: SlapService) { }

  ngOnInit(): void {
    this.pendingSlaps = this.getPalmadas();
  }

  confirm(id: number) {
    this.alertService.confirm(
      'Alerta',
      '¿Está seguro de que desea aprobar esta palmada?').then((result) => {
        if (result) {
          // Success
          this.postAllow(id);
        } else {
          // No success
          console.log(false);
        }
      }).catch(err => {
        // Error
        console.log(false);
      });
  }

  //GETs
  getPalmadas(): VPalmada[] {
    return this.slapService.getSlaps();
    //return [{ id: 1, operador: "Brayan", idLaboratorio: "F2-07", motivo: "Proyecto", fechaPalmada: "10", fechaSolicitud: "10" }]
  }

  // POSTs
  postAllow(palmadaId: number): void {
    console.log({ palmada: palmadaId });
    this.slapService.updateStatus(palmadaId);
  }
}
