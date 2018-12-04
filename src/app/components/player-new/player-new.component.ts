import { ResponseApi } from './../../model/response-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../../model/player.model';
import { SharedService } from '../../services/shared.service';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../model/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.css']
})
export class PlayerNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  player = new Player(0, '', false, 0, 0, new Team(null, '', null, null));
  teams: Array<Team> = [];
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private playerService: PlayerService, private teamService: TeamService, 
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: number = this.route.snapshot.params['id'];
    if(id != undefined) {
      this.findById(id);
    }
    
    this.teamService.findAll().subscribe((responseApi: ResponseApi) => {
      for(let key in responseApi.data) {
        this.teams.push(responseApi.data[key]);
      }
    }, err=> {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findById(id: number) {
    this.playerService.findById(id).subscribe((responseApi: ResponseApi) => {
        this.player = responseApi.data;
    }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
    });
  }

  register() {
    this.message = {};
    this.playerService.createOrUpdate(this.player).subscribe((responseApi: ResponseApi) => {
      this.player = new Player(0, '', false, 0, 0, null);
      let playerReturn: Player = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${playerReturn.name} successfuly`
      });
    }, err => { 
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
    });
  }

  private showMessage(message: {type: string, text: string}) : void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type:string): void {
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }

}
