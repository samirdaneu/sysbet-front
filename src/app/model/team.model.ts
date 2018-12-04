import { Competition } from './competition.model';
import { Player } from './player.model';
export class Team {

    constructor(public id: number, public name: string, 
        public competitions: Array<Competition>, public players: Array<Player>) {
    }

}