import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  idMeasure : number;
  temperature: number;
  humidity: number;
  timeData: Date;
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Mediciones');
    this.idMeasure = 1;
    this.temperature = 20.0;
    this.humidity = 20.0;
    this.timeData = new Date(2017, 4, 4, 17, 23, 42, 11);
  }

  ngOnInit(): void { }

  bomba(){
    console.log("bomba de awa");
  }

}
