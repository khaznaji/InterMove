import {User} from "../User/user";
import  {Post} from "./post.model";

export class Comment {
  commentID!: number;
  content!: string;
  created_at!: Date;
  post_postid !:number;
  user_userid !: number;
}
