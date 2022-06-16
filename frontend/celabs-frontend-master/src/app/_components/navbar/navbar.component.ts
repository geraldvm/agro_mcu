import { Component, OnInit, OnChanges } from '@angular/core';
import { TitleService } from './../../_services/title.service';
import { UserService } from 'src/app/_services/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title: String;
  userClaims: any;
  constructor(private titleService: TitleService,
    private userService: UserService, 
    private router: Router) {
    this.titleService.getTitle().subscribe(appTitle => this.title = appTitle);
  }

  ngOnInit(): void {
    this.getUserInfo();
  }


  //Obtiene la información del usuario logueado
  getUserInfo() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
