import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  constructor(
    private fb: FormBuilder,
    public router: Router, 
  ) { 
   

  }

  ngOnInit() {



 
  }

}
