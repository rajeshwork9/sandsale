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

   }

  getLocations(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
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
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
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
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
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
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
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

  rejectTrip(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
      })
      const options = { headers: headers };
      let nativeHttpCall = this.http.post(environment.apiUrl + 'reject-trip', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          // console.log(res);
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
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
      })
      console.log(headers);
      
      const options = { headers: headers };
      console.log(options);
      
      let nativeHttpCall = this.http.post(environment.apiUrl + 'trip-details', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          // console.log(res);
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


  getTruckTypesList(body: any):Observable<any>{
    return Observable.create((Observer: any)=>{
      let bearerToken = this.getToken();
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+bearerToken,
      });
      const options = { headers: headers };
      let nativeHttpCall = this.http.post(environment.apiUrl + 'truck-types', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          // console.log(res);
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


  uploadAvatarPic(body:any):Observable<any>{
    return Observable.create((Observer: any)=>{
      let bearerToken = this.getToken();
      const headers: HttpHeaders | any = new HttpHeaders(
        {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer "+bearerToken,
        
      }
      );
      headers.set('Content-Type', null);
      headers.set('Accept', "multipart/form-data");
  

      const options = { headers: headers };
      let nativeHttpCall = this.http.post(environment.apiUrl + 'upload-avatar', body,options);
      from(nativeHttpCall).subscribe(
        (res: any) => {
          // console.log(res);
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

  getToken(){
    let userInfo:any = localStorage.getItem('userData')
    this.userData = JSON.parse(userInfo)
    // console.log(this.userData);
    let bearerToken = this.userData[0].api_token
    console.log(bearerToken);
    return bearerToken;
  }

}
