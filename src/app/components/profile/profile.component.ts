import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/common/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  updateGroup!: FormGroup;
  selectedFile: any;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateGroup = this.fb.nonNullable.group({
      firstname: new FormControl(this.profile.given_name, Validators.required),
      lastname: new FormControl(this.profile.family_name, Validators.required),
      picture: new FormControl(''),
    }) 
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  updateUser() {

  }

  deleteUser() {

  }

  changePassword() {

  }
}
