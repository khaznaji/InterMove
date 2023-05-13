import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../model/Forum/post.model";
import {ForumService} from '../shared/forum.service'
import {Comment} from "../model/Forum/comment.model";
import {User} from "../model/User/user";
import {Observable} from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})


export class FeedsComponent {

  postDescription?: string;
  postImage?: string;
  contentT? : string  ;

  constructor(private forumService: ForumService,private http: HttpClient,private sanitizer: DomSanitizer) {console.log('description');this.getPosts();}

  createPost() {
    // Get the post description and photo from the form
    const description = this.postDescription;
    console.log(description);
    const photo = this.postImage;
    const photoString = photo ? photo.toString() : "hohohohoh";
    console.log(description);
    console.log(photo);
    // Create a new FormData object to store the post data
    //const postData = new FormData();
    //postData.append('postdescription', description || '');
    let currentDate = new Date();
    let us= new User();
    const id = Math.floor(Math.random() * 1000000000);

    //postData.append('postimage', photo|| '');
    const postData :Post = {

      postID : id,
      title : "string",
      postdescription: description || '',
      postimage: photoString,
      created_at: currentDate,
      nbrLIKE : 0,
      commentaires:[],
      user : us,



    };

    // Make an HTTP request to create the post
    this.forumService.createPost(postData).subscribe(()=>{
      console.log("khatfet");
    })
    this.postDescription = '';
    this.postImage = '' ;
    console.log("asssss");
      // Reset the form
      this.postDescription = '';
      this.postImage = '' ;

  }
  posts: Post[] = [];

    getPosts(): void {
      this.forumService.getPosts()
        .subscribe(posts => this.posts = posts);
  }
  getPostImage(base64String: string):  HTMLImageElement {
    const img = new Image();
    img.onload = () => {
      // Create a new canvas element
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      const context = canvas.getContext('2d');
      context?.drawImage(img, 0, 0);

      // Get the data URL of the canvas
      const dataUrl = canvas.toDataURL();

      // Set the src attribute of an img tag to display the image in HTML
      const imgTag = document.createElement('img');
      imgTag.src = dataUrl;
      document.body.appendChild(imgTag);
    };
    img.src= base64String ;
    return  img
    //return 'data:image/png;base64,' + base64String;
  }

  showComments(postId: number): void {
    const post = this.posts.find(p => p.postID === postId);
    if (post) {

        this.getComments(postId);

    }
  }
  comment : Comment[] =[];
  getComments(postId: number): void {
    this.forumService.getCommentsPost(postId)
      .subscribe(comments => {
        const post = this.posts.find(p => p.postID === postId);
        if (post) {
          this.comment = comments

        }
      });
  }
  addComment(event: any, post: Post) {
    event.preventDefault();

    // Get the comment content from the form input
    const content = this.contentT;
    console.log(content);
    // Create a new comment object
    const comment: Comment = {
      commentID: 6,
      content: content || '',
      created_at: new Date(),
      post_postid : post.postID ,
      user_userid : 1
    };
    console.log(comment);
    // Add the comment to the post's comment array

      this.forumService.createComment(comment).subscribe(()=>{
        console.log("khatfet");
      });


    // Make an HTTP request to update the post in the database


    // Reset the form input
    this.contentT = '';
  }
  handlePhotoUpload(event: any) {
    // Get the selected file from the file input element
    const files = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(base64String);
        this.postImage = "https://www.etudionet.com/storage/app/uploads/public/5d5/ad9/363/5d5ad93634d58798336335.jpg";

      };

    }

  }
}
