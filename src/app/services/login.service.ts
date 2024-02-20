import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(body: any):Observable<any>{
    return this.http.post(environment.apiUrl+'login',body).pipe(catchError(this.handleError))
  }

  logout(){
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }

  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;

    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }
    return throwError(msg);
  }
}
