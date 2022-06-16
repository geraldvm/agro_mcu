import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  permisos: boolean;
}

@Component({
  selector: 'app-csupport-team',
  templateUrl: './csupport-team.component.html',
  styleUrls: ['./csupport-team.component.css']
})
export class CsupportTeamComponent implements OnInit {

  buttonDanger: string = 'btn btn-danger';
  buttonSuccess: string = 'btn btn-success';

  users: User[];

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('');
  }
  ngOnInit(): void {
    this.users = this.getSupportTeam();
  }

  checkValue(id: number): void {
    var button = (<HTMLInputElement>document.getElementById('btn' + id));
    var clase = button.className;
    if (clase == this.buttonSuccess) {
      // POST
      // if POST is successful
      if (this.postDeny(id)) {
        document.getElementById('btn' + id).className = this.buttonDanger;
        button.value = 'Denegado';
      }
    } else {
      // POST
      // if POST is successful
      if (this.postAllow(id)) {
        document.getElementById('btn' + id).className = this.buttonSuccess;
        button.value = 'Permitido';
      }
    }
  }

  // GETs
  getSupportTeam(): User[] {
    return [
      {
        id: 0,
        nombre: 'Luis Diego Noguera',
        correo: 'lnoguera@itcr.ac.cr',
        rol: 'admininistrador',
        permisos: false
      },
      {
        id: 1,
        nombre: 'Brayan Muñoz Mora',
        correo: 'brianm.bra@estudiantec.cr',
        rol: 'admininistrador',
        permisos: true
      }
    ]
  }

  // POSTs
  postDeny(userId: number): boolean {
    console.log(userId);
    return true;
  }

  postAllow(userId: number): boolean {
    console.log(userId);
    return true;
  }

}
