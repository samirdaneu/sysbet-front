import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SYSBET_API } from './sysbet.api';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${SYSBET_API}/api/auth`, user);
  }

  createOrUpdate(user:User) {
    if(user.id != null && user.id != '') {
      return this.http.put(`${SYSBET_API}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${SYSBET_API}/api/user`, user);
    }
  }

  findAll(page:number, count:number) {
    return this.http.get(`${SYSBET_API}/api/user/${page}/${count}`);
  }

  findById(id:string) {
    return this.http.get(`${SYSBET_API}/api/user/${id}`);
  }

  delete(id:string) {
    return this.http.delete(`${SYSBET_API}/api/user/${id}`);
  }

}
