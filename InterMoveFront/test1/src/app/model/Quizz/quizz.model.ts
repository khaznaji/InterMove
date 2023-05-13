import { Domain } from '../Quizz/domain';
import { Question } from './question';
export class Quizz {
    id!: number;
    nom!: string;
    description!: string;
    domain!: Domain;
    timelimit!: number;
    score!: number;
    etat!: string[];
    questions!: Question[];
  }