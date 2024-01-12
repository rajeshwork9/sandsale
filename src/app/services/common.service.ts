import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  bearerToken: any;
  userData: any;
  constructor(
    private http: HttpClient
  ) {
    let userInfo:any = localStorage.getItem('userData')
    // console.log(userInfo);
    this.userData = JSON.parse(userInfo)
    // console.log(this.userData);
    this.bearerToken = this.userData.api_token
    // console.log(this.bearerToken);  
   }

  getLocations(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'location-details', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          console.log(res);
          Observer.next(res);
          Observer.complete();
        },
        (err: any) => {
          Observer.error(err);
          Observer.complete();
        }
      );
    })
  }

  getFillingList(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'trip-details', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          console.log(res);
          Observer.next(res);
          Observer.complete();
        },
        (err: any) => {
          Observer.error(err);
          Observer.complete();
        }
      );
    })
  }

  acceptTrip(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'accept-trip', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          console.log(res);
          Observer.next(res);
          Observer.complete();
        },
        (err: any) => {
          Observer.error(err);
          Observer.complete();
        }
      );
    })
  }

  getCompletedList(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'trip-details', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          console.log(res);
          Observer.next(res);
          Observer.complete();
        },
        (err: any) => {
          Observer.error(err);
          Observer.complete();
        }
      );
    })
  }

  getRejectedList(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'trip-details', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          console.log(res);
          Observer.next(res);
          Observer.complete();
        },
        (err: any) => {
          Observer.error(err);
          Observer.complete();
        }
      );
    })
  }

}
