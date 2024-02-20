import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  canActivate():boolean{
    let userDetails=localStorage.getItem("userData")
    if(userDetails!==null){
      return true
    }else{
       this.router.navigate(['login'])
       return false
    }
  }
}
