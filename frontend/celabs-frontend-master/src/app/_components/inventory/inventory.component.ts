import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiService } from '../../_services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from 'src/app/_services/title.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneratorService } from 'src/app/_services/forms/form-generator.service';
import { FormGroup } from '@angular/forms';
import { FormToJsonService } from 'src/app/_services/forms/form-to-json.service';
import { InventoryReportComponent } from './inventory-report/inventory-report.component'
import { Time } from '@angular/common';
import { LaboratoryService } from 'src/app/_services/api/laboratory.service'
import { DataPar } from 'src/app/_models/laboratorio'

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
  hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  mins = [0,30];
  lapse = [5,10,15,20,25,30,35,40,45,50];

  week = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  weekJson = {1:"Domingo", 2:"Lunes", 3:"Martes", 4:"Miércoles", 5:"Jueves", 6:"Viernes", 7:"Sábado"};
  day : string;
  
  param:DataPar;
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
    private formToJson: FormToJsonService,
    public labService: LaboratoryService,
    public apiService: ApiService,
    private http: HttpClient) {
    this.titleService.setTitle('Parámetros de riego');
  }

  ngOnInit(): void {
    this.labService.getParam();
    this.inventoryForm = this.formGenerator.createInventoryForm(this.operator);
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
    /*this.param ={
      idData = 1
    }
    await this.http.put(this.apiService.getUrl() + '/updateDatapar/1',this.param).toPromise().then(res => {
      this.param = res as DataPar[];
  });*/
  
  }
}