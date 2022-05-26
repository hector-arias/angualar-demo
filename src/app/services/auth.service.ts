import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from "ngx-cookie-service";
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string;


  constructor(private http: HttpClient,
              private cookies: CookieService) {
                this.url = GLOBAL.url;
              }

  login(username: string, password: string){
    let json = JSON.stringify({'username': username, 'password': password});
		let params = 'json='+json;
		let headers = {'Content-Type':'application/json'};
    console.log('params',params);
    return this.http.post(this.url + 'login', json, {headers, responseType: 'text'});
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

}

