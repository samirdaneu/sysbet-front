import { Team } from './../model/team.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SYSBET_API } from './sysbet.api';

@Injectable()
export class TeamService {

  constructor(public http: HttpClient) { }

  createOrUpdate(team: Team) {
    if(team.id != null) {
      return this.http.put(`${SYSBET_API}/api/team`, team);
    } else {
      return this.http.post(`${SYSBET_API}/api/team`, team);
    }
  }

  delete(id: number) {
    if(id != null) {
      return this.http.delete(`${SYSBET_API}/api/team/${id}`);
    }
  }

  findById(id: number) {
    if(id != null) {
      return this.http.get(`${SYSBET_API}/api/team/${id}`);
    }
  }

  findAllPagination(page: number, count: number) {
    return this.http.get(`${SYSBET_API}/api/team/${page}/${count}`);
  }

  findAll() {
    return this.http.get(`${SYSBET_API}/api/team/`);
  }

  findByParams(page:number,count:number,t:Team){
    t.name = t.name == '' ? "uninformed" : t.name;
    return this.http.get(`${SYSBET_API}/api/ticket/${page}/${count}/${t.name}`);
  }

}
