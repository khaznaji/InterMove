

export class Question {
  id!: number;
  question!: string;
  type!: string[];
  questionNote!: number;
  responses!: string[];
  correctResponsesIndex!: number[];
  quiz_id!: number;
  studentResponses!: Response[];
}
