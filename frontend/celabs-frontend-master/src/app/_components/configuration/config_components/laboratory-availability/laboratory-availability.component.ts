import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';

@Component({
  selector: 'app-laboratory-availability',
  templateUrl: './laboratory-availability.component.html',
  styleUrls: ['./laboratory-availability.component.css']
})
export class LaboratoryAvailabilityComponent implements OnInit {

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('');
   }

  ngOnInit(): void {
  }

}
