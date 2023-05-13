
import { offer } from "./offer";
import { User } from "./user";

export class candidacy{
    idC!:number;

    score!:number;
    dateCandidacy!:Date;
    status!:string;
    situation!:string;
    user!:User;
    offer!:offer;


}



