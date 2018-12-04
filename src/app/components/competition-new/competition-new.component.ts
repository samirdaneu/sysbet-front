import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../model/response-api';
import { Competition } from '../../model/competition.model';
import { CompetitionService } from '../../services/competition.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-competition-new',
  templateUrl: './competition-new.component.html',
  styleUrls: ['./competition-new.component.css']
})
export class CompetitionNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm
  
  competition = new Competition(0, '', null);
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) {
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: number = this.route.snapshot.params['id'];
    if(id != undefined) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.competitionService.findById(id).subscribe((responseApi: ResponseApi) => {
        this.competition = responseApi.data;
    }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
    });
  }

  register() {
    this.message = {};
    this.competitionService.createOrUpdate(this.competition).subscribe((responseApi: ResponseApi) => {
      this.competition = new Competition(0,'',null);
      let competitionReturn: Competition = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${competitionReturn.name} successfuly`
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
