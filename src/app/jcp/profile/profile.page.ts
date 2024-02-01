import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { Plugins, PermissionState } from '@capacitor/core';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';
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
  roleName:any;
  profilePic: any = '';
  imageBase=environment.imgUrl;
  userAvatar:any;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private common: CommonService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    this.userData = JSON.parse(userInfo);
    this.userFirstName = this.userData[0].first_name;
    this.userLastName = this.userData[0].last_name;
    this.userAvatar = this.userData[0].avatar;
    this.roleName = this.userData[0].role_name;
    this.selectedLang = 'en';
    // this.getProfile();
  }

  logout() {
    // this.loginService.logout();
    localStorage.clear();
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
    this.toastService.showSuccess('Successfully Logout', 'Success');
  }

  // public actionProfileImgEditButtons = [
  //   {
  //     text: 'Gallery',
  //     role: 'destructive',
  //     data: {
  //       action: 'delete',
  //     },
  //   },
  //   {
  //     text: 'Camara',
  //     data: {
  //       action: 'share',
  //     },
  //   },
  //   {
  //     text: 'Cancel',
  //     role: 'cancel',
  //     data: {
  //       action: 'cancel',
  //     },
  //   },
  // ];

  async capturePhoto() {
    const { Camera } = Plugins;
    const image = await Camera['getPhoto']({
      quality: 100,
      allowEditing: false,
      //resultType: CameraResultType.Base64,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log('image', image);
    // this.startUpload(image.webPath);
  }

  // async getProfile() {
  //   await this.loader.showLoader();
  //   let payload = {
  //     'avatar':'',
  //     'existing_avatar':'',
  //   };
  //   this.common.getProfilePic(payload).subscribe((resp: any) => {
  //     if (resp.status == 'success') {
  //       if (resp.data[0].avatar !== null) {
  //         this.profilePic = this.imageBase + resp.data[0].avatar;
  //       } else {
  //         this.profilePic = '';
  //       }
  //     }
  //   });
  // }




}
