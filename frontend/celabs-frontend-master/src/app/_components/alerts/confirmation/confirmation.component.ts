import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  // Close with true
  confirm() {
    this.activeModal.close(true);
    return true;
  }

  // Close with false
  cancel() {
    this.activeModal.close(false);
    return false;
  }

}
