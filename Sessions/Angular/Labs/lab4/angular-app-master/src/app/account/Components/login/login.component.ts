import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../Services/account.service';
import { IUserLogin } from '../../../Models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: IUserLogin = {
    Method: '',
    Password: '',
  };

  constructor(private accountSrv: AccountService) {}
  Send() {
    this.accountSrv.Login(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit() {}
}
