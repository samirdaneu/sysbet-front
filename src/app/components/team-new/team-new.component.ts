import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../model/response-api';
import { NgForm } from '@angular/forms';
import { Team } from '../../model/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.css']
})
export class TeamNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm
  
  team = new Team(0, '', null, null);
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private teamService: TeamService, private route: ActivatedRoute) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: number = this.route.snapshot.params['id'];
    if(id != undefined) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.teamService.findById(id).subscribe((responseApi: ResponseApi) => {
        this.team = responseApi.data;
    }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
    });
  }

  register() {
    this.message = {};
    this.teamService.createOrUpdate(this.team).subscribe((responseApi: ResponseApi) => {
      this.team = new Team(0, '', null, null);
      let teamReturn: Team = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${teamReturn.name} successfuly`
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
