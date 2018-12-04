import { Competition } from './../model/competition.model';
import { Injectable } from '@angular/core';
import { SYSBET_API } from './sysbet.api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompetitionService {

  constructor(private http: HttpClient) { 

  }

  createOrUpdate(competition: Competition) {
    if(competition.id != null) {
      return this.http.put(`${SYSBET_API}/api/competition`, competition);
    } else {
      return this.http.post(`${SYSBET_API}/api/competition`, competition);
    }
  }

  delete(id: number) {
    if(id != null) {
      return this.http.delete(`${SYSBET_API}/api/competition/${id}`);
    }
  }

  findById(id: number) {
    if(id != null) {
      return this.http.get(`${SYSBET_API}/api/competition/${id}`);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${SYSBET_API}/api/competition/${page}/${count}`);
  }

  findByParams(page:number,count:number,c:Competition){
    c.name = c.name == '' ? "uninformed" : c.name;
    return this.http.get(`${SYSBET_API}/api/ticket/${page}/${count}/${c.name}`);
  }


}
