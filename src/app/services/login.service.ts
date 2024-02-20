import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }



  login(body: any):Observable<any>{
    return this.http.post(environment.apiUrl+'login',body).pipe(catchError(this.handleError))
  }

  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;

    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      localStorage.removeItem("userData");

    }
    return throwError(msg);
  }
}
