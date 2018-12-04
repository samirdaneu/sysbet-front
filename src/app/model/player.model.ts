import { Team } from "./team.model";

export class Player {

    constructor(public id: number, public name: string, public suspended: boolean, 
        public qtdCartaoAmarelo: number, public qtdCartaoVermelho: number, public team: Team) {
    }

}