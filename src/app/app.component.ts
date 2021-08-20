import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersServiceService } from './services/users-service.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  action = '';
  usersList: {
    Occupation: string;
    age: string;
    firstName: string;
    gender: string;
    id: number;
    img: string;
    lastName: string;
    location: string;
  }[];
  randomeUserImageUrl = 'https://randomuser.me/api/portraits/';
  constructor(
    private Users: UsersServiceService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.usersList = this.Users.usersData;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Occupation: ['', Validators.required],
      age: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      img: [''],
      id: []
    });
  }
  actionType(type, user) {
    this.action = type;
    if (type === 'edit') {
      this.registerForm.setValue(user);
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.f);

    if (this.registerForm.invalid) {
      return;
    }

    if (this.action === 'add') {
      this.registerForm.value.img =
        this.registerForm.value.gender === 'Male'
          ? `${this.randomeUserImageUrl}men/${Math.floor(
              Math.random() * 35
            )}.jpg`
          : `${this.randomeUserImageUrl}women/${Math.floor(
              Math.random() * 35
            )}.jpg`;
      this.registerForm.value.id = Math.floor(Math.random() * 101);
      this.Users.usersData.push(this.registerForm.value);
      this.usersList = this.Users.usersData;
      document.getElementById('closeModalButton').click();
      this.action = '';
    } else {
      this.Users.usersData = this.Users.usersData.map(x =>
        x.id == this.registerForm.value.id ? this.registerForm.value : x
      );
      this.usersList = this.Users.usersData;
      document.getElementById('closeModalButton').click();
      this.action = '';
    }
    console.log(this.Users.usersData);
  }
  deleteUser(user) {
    this.Users.usersData = this.Users.usersData.filter(x => x.id != user.id);
    this.usersList = this.Users.usersData;
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
