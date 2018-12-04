import { SYSBET_API } from './sysbet.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../model/player.model';

@Injectable()
export class PlayerService {

  constructor(public http: HttpClient) { }

  createOrUpdate(player: Player) {
    if(player.id != null) {
      return this.http.put(`${SYSBET_API}/api/player`, player);
    } else {
      return this.http.post(`${SYSBET_API}/api/player`, player);
    }
  }

  delete(id: number) {
    if(id != null) {
      return this.http.delete(`${SYSBET_API}/api/player/${id}`);
    }
  }

  findById(id: number) {
    if(id != null) {
      return this.http.get(`${SYSBET_API}/api/player/${id}`);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${SYSBET_API}/api/player/${page}/${count}`);
  }

  findByParams(page:number,count:number,p:Player){
    p.name = p.name == '' ? "uninformed" : p.name;
    return this.http.get(`${SYSBET_API}/api/ticket/${page}/${count}/${p.name}`);
  }

}
