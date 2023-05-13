import { User } from '../User/user';
import { ModaliteEvent } from '../Event/modalite-event';
import { TypeEvent } from '../Event/type-event';
export class Event {
    id!: number;
    title!: string;
    description!: string;
    dateD!: Date;
    dateF!: Date;
    nbreDePlaces!: number;
    image!: string; // Initialisation à null
    speaker!: string;
    typeEvent!: TypeEvent;
    modaliteEvent!: ModaliteEvent;
    users!: User[];
      [key: string]: any;

  
 

  }
