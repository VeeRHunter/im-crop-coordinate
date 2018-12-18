import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupUser = {
    'city': '', 'state': '', 'country': '',
    'postalCode': '', 'employee': '', 'employer1': '', 'employer2': '',
    'position': '', 'employment': ''
  };

  public part1Show = true;
  public part2Show = false;
  public part3Show = false;

  constructor() { }

  ngOnInit() {
  }

  signup1() {
    this.part1Show = false;
    this.part2Show = true;
    console.log('this.signup1');
  }

  signup2() {
    this.part2Show = false;
    this.part3Show = true;
  }

  back2() {
    this.part1Show = true;
    this.part2Show = false;
  }

  signup3() {
    // this.part2Show = false;
    // this.part3Show = true;
  }

  back3() {
    this.part2Show = true;
    this.part3Show = false;
  }

}
