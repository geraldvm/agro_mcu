import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HoursModalComponent } from './hours-modal/hours-modal.component';

interface measure {
  id: number;
  fecha: Date;
  temperature: number;
  humidify: number;
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
})
export class HoursComponent implements OnInit {
  measures: measure[];

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal
  ) {
    this.titleService.setTitle('Historial de medidas');
  }

  ngOnInit(): void {
    this.measures = this.getMeasure();
  
  }

  public open(title: string, hour?: any): void {
    const modalRef = this.modalService.open(HoursModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.hour = hour;
    modalRef.result.then(() => { }).catch(() => { });
  }

  edit(hour): void {
    console.log(hour);
  }

  // GETs
  // Retorna true si ingresó como admin
  getAdmin() {
    return true;
  }

  // Cuidado con el formato de las horas -> HH:MM
  getMeasure() {
    return [
      {
        id: 1,
        fecha: new Date() ,
        temperature: 25.1,
        humidify:21
      },{
        id: 2,
        fecha: new Date() ,
        temperature: 25.1,
        humidify:21
      } 
    ];
  }

  
}
