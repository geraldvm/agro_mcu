import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormGroup } from '@angular/forms';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';
import { InventoryReportComponent } from './inventory-report/inventory-report.component'
import { Time } from '@angular/common';

interface Inventario {
  fecha: string;
  reporte: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  idData : number;
  start: Time;
  hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  mins = [0,30];
  timelapse: number;
  lapse = [1,2,3];
  weekday: number;
  week = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  weekJson = {1:"Domingo", 2:"Lunes", 3:"Martes", 4:"Miércoles", 5:"Jueves", 6:"Viernes", 7:"Sábado"};
  day : string;
  
  states: string[];
  amounts: number[];
  inventories: Inventario[];
  operator: string;

  inventoryForm: FormGroup;
  inventoryModal: NgbModalRef;
  reportModal: NgbModalRef;

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private formGenerator: FormGeneratorService,
    private formToJson: FormToJsonService) {
    this.titleService.setTitle('Parámetros de riego');
    this.idData = 1;
    this.start = {hours:20,minutes:30};
    this.timelapse = 1;
    this.weekday = 1;
    switch(this.weekday) { 
      case 1: 
        this.day = "Domingo";
        break; 
      case 2: 
      this.day = "Lunes";
        break; 
      case 3: 
        this.day = "Martes";
        break; 
      case 4: 
        this.day = "Miércoles";
        break; 
      case 5: 
        this.day = "Jueves";
        break; 
      case 6: 
        this.day = "Viernes";
        break;  
      case 7: 
        this.day = "Sábado";
        break;
      default: 
        this.day = "Jueves";
        break; 
    }
  }

  ngOnInit(): void {
    this.amounts = this.getAmounts();
    this.inventoryForm = this.formGenerator.createInventoryForm(this.operator);
    this.inventories = this.getInventories();
  }

  open(content): void {
    this.inventoryModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.inventoryModal.result.then(() => {
      this.inventoryForm.reset();
    }).catch(() => {
      this.inventoryForm.reset();
    });
  }

  view(reportId): void {
    this.reportModal = this.modalService.open(
      InventoryReportComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.reportModal.result.then(() => { }).catch(() => { });
    this.reportModal.componentInstance.inventoryId = reportId;
  }

  successfulPost(json: any): void {
    this.inventoryModal.close();
    this.inventoryForm.reset();
    alert('Json generado:\n' + JSON.stringify(json));
  }

  print(report: any): void {
    console.log('print', report);
  }

  get laboratory() {
    return this.inventoryForm.get('laboratory');
  }

  get completeComputers() {
    return this.inventoryForm.get('completeComputers');
  }

  get incompleteComputers() {
    return this.inventoryForm.get('incompleteComputers');
  }

  get projectors() {
    return this.inventoryForm.get('projectors');
  }

  get chairs() {
    return this.inventoryForm.get('chairs');
  }

  get extinguishers() {
    return this.inventoryForm.get('extinguishers');
  }

  // GETs
  getInventories(): Inventario[] {
    return [{
      fecha: '2020-06-12',
      reporte: '2-2020-06-12'
    }, {
      fecha: '2020-05-12',
      reporte: '1-2020-05-12'
    }];
  }

  getAmounts(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  }

  getStates(): string[] {
    return ['Aprobado', 'Pendiente'];
  }

  // POSTs
  post() {
    const json = this.formToJson.createInventoryJson(
      this.operator,
      this.inventoryForm.value.laboratory.id,
      this.inventoryForm.value.completeComputers,
      this.inventoryForm.value.incompleteComputers,
      this.inventoryForm.value.projectors,
      this.inventoryForm.value.chairs,
      this.inventoryForm.value.extinguishers
    );
    this.successfulPost(json);
  }
  //puts
  put(){
    
  }

}
