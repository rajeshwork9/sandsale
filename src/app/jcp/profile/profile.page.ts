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
  getCamPhoto:any;

  avatarData:any;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private common: CommonService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
   
    // localStorage.setItem("conference", JSON.stringify(data));
    this.userData = JSON.parse(userInfo);
    this.userFirstName = this.userData[0].first_name;
    this.userLastName = this.userData[0].last_name;
    this.userAvatar = this.userData[0].avatar;
    this.roleName = this.userData[0].role_name;
    this.profilePic = this.imageBase+this.userData[0].avatar;

    this.selectedLang = 'en';

console.log("environment", this.profilePic);
 

 let avatarDatapic:any = localStorage.getItem('avatarData');
 this.profilePic = avatarDatapic;



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

    this.getCamPhoto = image.webPath;
    console.log('image', image);
    console.log("this.getCamPhoto", this.getCamPhoto)
    this.filefetch(image.webPath)

  }





  async filefetch(file:any){
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData(); 
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000000000000000;
    const imageFle = random + '.jpg';  
    formData.append('avatar', blob, imageFle);
    console.log("blob",blob); 
    console.log("formData",formData); 
    console.log("response",response); 
    this.uploadData(formData);
  }

  async uploadData(payload:any){   
   this.common.uploadAvatarPic(payload).subscribe((resp: any)=>{
    this.avatarData = resp.data;
    // this.profilePic=this.imageBase+resp.data
      console.log("avatarData", this.avatarData);
      if(resp.data[0].profile_img!==null){
        this.profilePic=this.imageBase+resp.data
       }else{
        this.profilePic=''
       }

     console.log("---profilePic",  this.profilePic)
     localStorage.setItem('avatarData', this.profilePic);
    });
  }

  //   async getProfile(payload:any) {


  //   this.common.uploadAvatarPic(payload).subscribe((resp: any) => {
  //     if (resp.status == 'success') {
  //       if (resp.data[0].avatar !== null) {
  //         this.profilePic = resp.data[0].avatar;
  //       } else {
  //         this.profilePic ='';
  //       }
  //       console.log("profilePicResp", this.profilePic);
  //     }
  //   });
  // }




}
