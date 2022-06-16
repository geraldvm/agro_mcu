import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/_services/title.service';
import { AccountService } from 'src/app/_services/api/account.service';
import { Admin } from 'src/app/_models/admin.model';



@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  buttonDanger: string = 'btn btn-danger';
  buttonSuccess: string = 'btn btn-success';

  admins: Admin[];

  constructor(private titleService: TitleService,
    private accountService: AccountService) {
    this.titleService.setTitle('');
  }
  ngOnInit(): void {
    this.admins = this.accountService.getAdmins();
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

 
  // POSTs
  postDeny(userId: number): boolean {
    this.accountService.updateAdminAccess(userId,false);
    console.log(userId);
    return true;
  }

  postAllow(userId: number): boolean {
    this.accountService.updateAdminAccess(userId,true);
    console.log(userId);
    return true;
  }

}
