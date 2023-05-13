import {User} from "../User/user";

export class Message {

  messageID!: number;
  content!: string;
  sent_at!: Date;
  sender!: User;
  receiver!:User;
}
