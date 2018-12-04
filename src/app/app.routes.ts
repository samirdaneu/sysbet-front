import { LoginComponent } from './components/security/login/login.component';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TeamNewComponent } from './components/team-new/team-new.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PlayerNewComponent } from './components/player-new/player-new.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { CompetitionNewComponent } from './components/competition-new/competition-new.component';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';

export const ROUTES: Routes = [
    { path : '', component: HomeComponent, canActivate: [AuthGuard]},
    { path : 'login', component : LoginComponent},
    { path : 'user-new', component : UserNewComponent, canActivate: [AuthGuard]},
    { path : 'user-new/:id', component : UserNewComponent, canActivate: [AuthGuard]},
    { path : 'user-list', component : UserListComponent, canActivate: [AuthGuard]},
    { path : 'team-new', component : TeamNewComponent, canActivate: [AuthGuard]},
    { path : 'team-new/:id', component : TeamNewComponent, canActivate: [AuthGuard]},
    { path : 'team-list', component : TeamListComponent, canActivate: [AuthGuard]},
    { path : 'player-new', component : PlayerNewComponent, canActivate: [AuthGuard]},
    { path : 'player-new/:id', component : PlayerNewComponent, canActivate: [AuthGuard]},
    { path : 'player-list', component : PlayerListComponent, canActivate: [AuthGuard]},
    { path : 'competition-new', component : CompetitionNewComponent, canActivate: [AuthGuard]},
    { path : 'competition-new/:id', component : CompetitionNewComponent, canActivate: [AuthGuard]},
    { path : 'competition-list', component : CompetitionListComponent, canActivate: [AuthGuard]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);