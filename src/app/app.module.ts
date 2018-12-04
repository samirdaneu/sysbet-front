import { DialogService } from './services/dialog.service';
import { AuthGuard } from './components/security/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes';
import { SharedService } from './services/shared.service';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CompetitionService } from './services/competition.service';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamNewComponent } from './components/team-new/team-new.component';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { CompetitionNewComponent } from './components/competition-new/competition-new.component';
import { PlayerNewComponent } from './components/player-new/player-new.component';
import { PlayerListComponent } from './components/player-list/player-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent,
    TeamListComponent,
    TeamNewComponent,
    CompetitionListComponent,
    CompetitionNewComponent,
    PlayerNewComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [
    UserService,
    CompetitionService,
    PlayerService,
    TeamService,
    SharedService,
    DialogService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
