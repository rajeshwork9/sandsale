import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private loader: LoaderService,
    private loginService: LoginService
  ) { 
    let userInfo:any = localStorage.getItem("userData");
    if(userInfo){
      this.router.navigate(['home'])
      // this.loader.dismissLoader()
    }
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    const PAT_PASSWORD = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
    this.loginForm = this.fb.group({
      email: [null,  [Validators.required, Validators.pattern(PAT_EMAIL)]],
      password: [null, [Validators.required, Validators.pattern(PAT_PASSWORD)]]
    });

  }

  ngOnInit() {

  }

  get form() { return this.loginForm.controls; }

  async onSubmit(){    
    await this.loader.showLoader();
    this.submitted=true;
    if(this.loginForm.invalid){
      this.loader.dismissLoader();
      return ;
    }

    let data={
      
      "email_id" : this.loginForm.value.email,
      "password" : this.loginForm.value.password,
      // "device_id":this.deviceInfo
  }

  this.loginService.login(data).pipe(finalize(()=>{
    this.loader.dismissLoader();
  })).subscribe((resp: any)=>{
    console.log(resp.status);
    
    if(resp.status == 200){
      localStorage.setItem("userData",JSON.stringify(resp.data));
      this.loginForm.reset()
      this.submitted = false; 
      console.log("response login", resp)
      this.router.navigate(['home'])
    }
    else{
      this.loader.dismissLoader();
    }
  })
  }

}
