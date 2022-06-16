import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  // Close with code 0
  exit() {
    this.activeModal.close(0);
    return 0;
  }

}
