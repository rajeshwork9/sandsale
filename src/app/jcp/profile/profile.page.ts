import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedLang: any;
  userData: any;
  userFirstName: any;
  userLastName: any;
  constructor(
    private router:Router,
    private toastService: ToastService,
    ) { }

  ngOnInit() {
    let userInfo:any = localStorage.getItem("userData");
    this.userData = JSON.parse(userInfo);
    this.userFirstName = this.userData.first_name;
    this.userLastName = this.userData.last_name;

    this.selectedLang = "en";
  }

  logout(){
    // this.loginService.logout();   
    localStorage.clear();
    localStorage.removeItem('userData');
    this.router.navigate(["login"]);
    this.toastService.showSuccess('Successfully Logout', 'Success');
  }

}
