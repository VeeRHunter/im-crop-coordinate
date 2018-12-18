import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {

  public userEmail = '';
  public userPass = '';

  private emailCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
  ]);

  constructor() {
  }

  ngOnInit() {
  }

  loginConfirm() {
    this.emailCtrl.setValue(this.userEmail);
    if (this.emailCtrl.valid && this.userPass !== '') {
      console.log('Process Login');
    }
  }

}
