import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
//import { UserService } from '../services/user.service'
//import { ExperienceService } from '../services/experience.service'
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.css']
})
export class BuzzComponent implements OnInit {
/*
@Input() myval
 result=[]
 //url =''
 base_url = 'https://api.embedly.com/1/oembed?'
 wee: any;
 */

base_url = 'https://api.embedly.com/1/oembed?'
isShareLinkThought: boolean = false
isSharePhoto: boolean = false
isShareVideo: boolean = false
isShareDefault: boolean = true
 

  /*
  userDetails: any[]
  firstname
  lastname
  email
  memberID
  showSelected : boolean;

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    profilephoto: ["", Validators.required],
    password: ["", Validators.required]
  });

  */

  constructor() { }

  
  ngOnInit() {
    
  
  }

  
  

  
}
