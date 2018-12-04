import { Team } from "./team.model";

export class Competition {

    constructor(public id: number, public name: string, public teams: Array<Team>) {
    }
}