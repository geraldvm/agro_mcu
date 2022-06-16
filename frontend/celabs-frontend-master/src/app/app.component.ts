import { Component } from '@angular/core';
import { Router } from '@angular/router'; // This import is just for testing

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // This constructor is just for testing purposes
  constructor(public router: Router) { }
  title = 'celabs-frontend';
}
