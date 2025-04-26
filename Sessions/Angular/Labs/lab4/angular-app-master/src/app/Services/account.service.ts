import { Injectable } from '@angular/core';
import { IUserRegister } from '../Models/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLogin } from '../Models/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  Url: string = 'http://localhost:5094/api/Account/';
  constructor(private http: HttpClient) {}

  Login(user: IUserLogin): Observable<any> {
    return this.http.post(this.Url + 'Login', user);
  }

  Register(user: IUserRegister): Observable<any> {
    return this.http.post(this.Url + 'Register', user);
  }

  Logout() {
    //
  }
}
