import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedLang: any;
  constructor(private router:Router,) { }

  ngOnInit() {
    let userInfo:any = localStorage.getItem("userData");

    this.selectedLang = "en";
  }

  logout(){
    // this.loginService.logout();   
    localStorage.removeItem('userData');
    this.router.navigate(["login"]);
  }

}
