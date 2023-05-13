import {User} from "../User/user";
import {Comment} from "./comment.model";

export class Post {
  postID!: number;
  title!: string;
  postdescription!: string;
  postimage!: string;
  created_at!: Date;
  nbrLIKE!: number;
  commentaires!:Comment[];
  user!: User;


}
