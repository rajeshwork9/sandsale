import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Inject,Injectable, Injector, InjectionToken } from '@angular/core';
import { Observable, fromEvent, timeout, tap, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';


// export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
// export const apiWithoutHeader = [];

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  userData: any;
  // bearerToken: any;
  constructor(
    private injector: Injector, private login: LoginService,
    // @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
  ) { 
    this.onlineEvent = fromEvent(window,'online')
    this.offlineEvent = fromEvent(window, 'offline');

    this.onlineEvent.subscribe(e => {
      console.log('Application is Online');
    });
    this.offlineEvent.subscribe(e => {
      console.log('Application is Offline');
    });
  }

  
  // getToken(){
  //   let userInfo:any = localStorage.getItem('userData')
  //   this.userData = JSON.parse(userInfo) 
  //   this.bearerToken = this.userData.api_token
  //   console.log(this.bearerToken);
  //   return this.bearerToken;
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = 50000000;
    const timeoutValueNumeric = Number(timeoutValue);
    // if (this.apiWithNoHeaders(request)) {
    //   return next.handle(request).pipe(
    //     timeout(timeoutValueNumeric),
    //     //tap((event: HttpResponse<any>) => event),
    //     tap((event: any) => {
    //       return event;
    //     }),
    //     catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
    //   );
    // } else {
    //   return next.handle(this.addToken(request)).pipe(
    //     timeout(timeoutValueNumeric),
    //     tap((response: any) => {
    //       if (response.type !== 0) {
    //         const token = response.headers.get('Authorization');
    //         if (token) {
    //           localStorage.setItem('hashToken', token.split(' ')[1]);
    //         }
    //       }
    //       return response;
    //     }),
    //     catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
    //   );
    // }

    return this.addTokenAndHandle(request, next, timeoutValueNumeric);
  }

  private addTokenAndHandle(
    request: HttpRequest<any>,
    next: HttpHandler,
    timeoutValueNumeric: number
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = this.addToken(request);

    return next.handle(modifiedRequest).pipe(
      timeout(timeoutValueNumeric),
      catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
      // tap((response: any) => {
        // if (response.type !== 0) {
        //   const token = response.headers.get('Authorization');
        //   if (token) {
        //     localStorage.setItem('hashToken', token.split(' ')[1]);
        //   }
        // }
        // return response;
      // }),
      // catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
    ) as Observable<HttpEvent<any>>;
  }



  // addToken(req: HttpRequest<any>): HttpRequest<any> {
  
  //   if(localStorage.getItem("userData")){
  //     console.log(localStorage.getItem("userData"));
  //     const local_user: any = localStorage.getItem("userData");
  //     const userData = JSON.parse(local_user);
      
  //   if (userData && userData.data && userData.data.api_token) {
  //   const accessToken = userData.data.api_token;
  //   if (accessToken) {
  //     // return req.clone({
  //     //   setHeaders: {
  //     //     'Authorization':  `Bearer ${accessToken}`,
  //     //     'Content-Type': 'application/json'
  //     //   }         
  //     // });
  //     const headers = req.headers.set('Authorization', `Bearer ${accessToken}`).set('Access-Control-Allow-Origin', '*');
  //     console.log(headers);
  //     return req.clone({ headers });  
  //   } else {
  //     return req;
  //   }
  // }
  // }
  //   return req;
  // // }
  // addToken(req: HttpRequest<any>): HttpRequest<any> {
  //   const localUser = localStorage.getItem("userData");
  //   if (localUser) {
  //     const userData = JSON.parse(localUser);
  //     if (userData.data && userData.data.api_token) {
  //       const accessToken = userData.data.api_token;
  
  //       // Check if the token is expired
  //       const tokenExpiration = userData.data.token_expiration;
  //       if (tokenExpiration && new Date(tokenExpiration) > new Date()) {
  //         const headers = req.headers
  //           .set('Authorization', `Bearer ${accessToken}`)
  //           .set('Access-Control-Allow-Origin', '*');
  //         return req.clone({ headers });
  //       } else {
  //         // Token is expired, handle the refresh logic or log out the user
  //         // Example: this.login.logout();
  //       }
  //     }
  //   }
  //   return req;
  // }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    if (localStorage.getItem('userData')) {
      const localUser: any = localStorage.getItem('userData');
      console.log(localUser);
      console.log(JSON.parse(localUser));
      const userData = JSON.parse(localUser);
      console.log(userData[0].api_token);
      if (userData && userData[0].api_token) {
        const accessToken = userData[0].api_token;
        console.log(`Bearer ${accessToken}`);
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        });

        return req.clone({ headers });
      }
    }
    return req;
  }

  
  private networkErrorScenario(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler) {
    if (error instanceof HttpErrorResponse) {
      const errorCode = (error as HttpErrorResponse).status;
      switch (true) {
        case (errorCode === 400):
          return this.handle400Error(error);

        case (errorCode === 401):
          return this.handle401Error(error);

        case (errorCode === 403):
          return this.handle403Error(error);

        case (errorCode === 404):
          return this.handle404Error(error);

        case (errorCode >= 500 && errorCode < 600):
          return throwError(error);

        case (errorCode === 0):
          return throwError(error);

        default:
          return throwError(error);
      }
    } else {
      return throwError(error);
    }
  }


    handle401Error(error: HttpErrorResponse): any {
      if (error && error.status === 401) {
        this.login.logout();
        console.log(error,"errorr");
        return throwError(error);    
      }

      localStorage.clear();
      localStorage.removeItem('userData');
    }

    handle400Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      if (error && error.status === 400) {

        return throwError(error);
      }
  
      return throwError(error);
    }
  
    // eslint-disable-next-line @typescript-eslint/member-ordering
    handle403Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      if (error && error.status === 403) {
        // this.toastService.showError(error.error.message, error.statusText);
        // this.auth.logout();
        return throwError(error);
      }
  
      return throwError(error);
    }
    handle404Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      console.log("error", error);
      if (error && error.status === 404) {
        // this.toastService.showError(error.error.message, error.statusText);
        // this.auth.logout();
        return throwError(error);
      }
  
      return throwError(error);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    // apiWithNoHeaders(request: HttpRequest<any>): boolean {
    //   return apiWithoutHeader.includes(request.url as never);
    // }
}
