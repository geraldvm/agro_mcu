import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  @Input() inventoryId;
  inventory;

  @ViewChild('report') report: ElementRef;

  download() {
    // Landscape export, 2×4 inches
    const doc = new jsPDF();
    let y = 25;
    const x = 20;
    doc.setFont('times');
    doc.setFontSize(20);
    doc.text('CELabs - XTEC', x, y);
    doc.setFontSize(18);
    doc.text('Reporte de inventario ' + this.inventory.report, x, y += 10);
    doc.setFontSize(16);
    doc.text('Información general', x, y += 20);
    doc.setFontSize(12);
    doc.text('Operador a cargo: ' + this.inventory.operator, x, y += 10);
    doc.text('Fecha: ' + this.inventory.date, x, y += 5);
    doc.text('Laboratorio: ' + this.inventory.laboratory, x, y += 5);
    doc.setFontSize(16);
    doc.text('Desglose', x, y += 20);
    doc.setFontSize(12);
    doc.text('Tabla 1: Desglose de activos', x, y += 10);
    autoTable(doc, {
      margin: x,
      startY: y += 5,
      html: this.report.nativeElement,
      head: [[{ styles: { fillColor: '#4a9eed' } }]],
      styles: { font: 'times' }
    });
    doc.save('reporte_inventario_' + this.inventory.report + '.pdf');
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.inventory = this.getInventory();
  }

  // GETs
  // Buscar inventario con this.inventoryId (el código)
  getInventory() {
    return {
      date: '2020-06-12',
      report: this.inventoryId,
      operator: 'Ejemplo Martínez',
      laboratory: 'F2-04',
      completeComputers: 20,
      incompleteComputers: 12,
      projectors: 2,
      chairs: 32,
      extinguishers: 2
    }
  }

}
