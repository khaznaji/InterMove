import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  userDetails = null as any;

  studentToUpdate = {
    firstname: "",
    email: "",
    phone: "",
    cin: "",
    lastname: "",
    userid: ""
  }
  showForm = false;

  constructor(private userService: UserService) {
    this.getUsersDetails();
  }

  getUsersDetails() {
    this.userService.getUsers().subscribe(
      (resp) => {
        console.log(resp);
        this.userDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteUser(user: any) {
    this.userService.deleteUsers(user.userid).subscribe(
      (resp) => {
        console.log(resp);
        this.getUsersDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  edit(user: any) {
    this.studentToUpdate = user;
  }

  updateUser() {
    this.userService.updateStudents(this.studentToUpdate)
    .subscribe(
      (resp) => {
        console.log(resp);
        this.showForm = false;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  openForm(studuent: any) {

    this.studentToUpdate = studuent;
    this.showForm = true;

  }

  closeForm() {
    this.showForm = false;
  }

}
