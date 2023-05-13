import { User } from '../User/user';
import { Domain } from '../Offer/domain';

export class Offer {
    idoffre!: number;
    titre!: string;
    description!: string;
    datedebut!: Date;
    datefin!: Date;
    domain!: Domain;
    interesse!: Boolean;
    restaurer!: Boolean;

    
    users!: User[];
      [key: string]: any;}