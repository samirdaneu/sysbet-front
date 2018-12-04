import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Team } from '../../model/team.model';
import { DialogService } from '../../services/dialog.service';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listTeam=[];
  teamFilter = new Team(0, '', null, null);

  constructor(
    private dialogService: DialogService,
    private teamService: TeamService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.teamService.findAllPagination(page,count).subscribe((responseApi:ResponseApi) => {
        this.listTeam = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void {
    this.page = 0;
    this.count = 5;
    this.teamService.findByParams(this.page,this.count,this.teamFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.teamFilter.name = this.teamFilter.name == 'uninformed' ? "" : this.teamFilter.name;
      this.listTeam = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(): void {
    this.page = 0;
    this.count = 5;
    this.teamFilter = new Team(0, '', null, null);
    this.findAll(this.page,this.count);
  }


  edit(id:number){
    this.router.navigate(['/team-new',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Do you want to delete this team?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.teamService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }

}
