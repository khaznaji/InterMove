  import { Component } from '@angular/core';
  import {Router} from "@angular/router";
  import {HttpClient} from "@angular/common/http";
  import {ForumService} from "../../shared/forum.service";
  import {Observable} from "rxjs";

  import {User} from "../../model/User/user";
  import {Message} from "../../model/Forum/message.model";

  @Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css']
  })
  export class ConversationComponent {
    users!: Observable<User[]>;
    id : number = 1;
    selectedUser: number=2;
    messages!:Observable<Message[]>;
    showUserBubbles = false;
    showConversation = false ;
    newMessageContent: string = '';

    constructor(private forumService: ForumService ,private router: Router,private http: HttpClient){ }
  
    onClick() {
      if (this.showUserBubbles) {
        this.showUserBubbles = false;
      } else {
      this.users=this.forumService.getChatterList(1);
        this.showUserBubbles = true;
        console.log("aaa");

      }
    }

    onUserSelected(u: any) {
      console.log(u[0]);
      
      this.selectedUser = u[0];
      console.log(this.selectedUser);
      this.showConversation=true;
      this.messages=this.forumService.getConverstation(1,2);
    }

    closeChatBox(){
      this.showConversation=false;
    }

    createNewMessage(id:number) {
      const message = {
        content: this.newMessageContent,
        sender: {
          userid: 1
        },
        receiver: {
          userid: id
        }
      };
      console.log(this.newMessageContent);
      this.forumService.createMessage(message).subscribe((res)=>{
        this.messages=this.forumService.getConverstation(1,id);
        console.log(res)
      });
      this.newMessageContent = ''; // reset the input field after sending the message
    }

  }
