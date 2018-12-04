import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Player } from '../../model/player.model';
import { DialogService } from '../../services/dialog.service';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listPlayer=[];
  playerFilter = new Player(0, '', false, 0, 0, null);

  constructor(
    private dialogService: DialogService,
    private playerService: PlayerService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.playerService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listPlayer = responseApi['data']['content'];
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
    this.playerService.findByParams(this.page,this.count,this.playerFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.playerFilter.name = this.playerFilter.name == 'uninformed' ? "" : this.playerFilter.name;
      this.listPlayer = responseApi['data']['content'];
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
    this.playerFilter = new Player(0, '', false, 0, 0, null);
    this.findAll(this.page,this.count);
  }


  edit(id:number){
    this.router.navigate(['/player-new',id]);
  }

  delete(id:number){
    this.dialogService.confirm('Do you want to delete this player?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.playerService.delete(id).subscribe((responseApi:ResponseApi) => {
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
