import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/_services/title.service';
import { CoursesService } from 'src/app/_services/api/configuration/courses.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  len:number;
  constructor(
    public route: ActivatedRoute,
    private titleService: TitleService,
    public courseService: CoursesService) {
    this.titleService.setTitle('Mediciones');

    
  }

  ngOnInit(): void {
   this.courseService.getMedidas();
   this.len = this.courseService.medidas.length;
   this.courseService.getMedidasbyId(this.len);
  }

  bomba(){
    console.log("Bomba wiiiiiiiiiiiiiii");
  }


}
