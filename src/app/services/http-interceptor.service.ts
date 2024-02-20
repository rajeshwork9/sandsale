import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Inject,Injectable, Injector, InjectionToken } from '@angular/core';
import { Observable, fromEvent, timeout, tap, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';


export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const apiWithoutHeader = [];

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  userData: any;
  bearerToken: any;
  constructor(
    private injector: Injector, private login: LoginService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
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

  
  getToken(){
    let userInfo:any = localStorage.getItem('userData')
    this.userData = JSON.parse(userInfo)
    // console.log(this.userData);
    this.bearerToken = this.userData.api_token
    console.log(this.bearerToken);
    return this.bearerToken;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const timeoutValue = 50000000;//request.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    if (this.apiWithNoHeaders(request)) {
      return next.handle(request).pipe(
        timeout(timeoutValueNumeric),
        //tap((event: HttpResponse<any>) => event),
        tap((event: any) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
      );
    } else {
      return next.handle(this.addToken(request)).pipe(
        timeout(timeoutValueNumeric),
        tap((response: any) => {
          if (response.type !== 0) {
            const token = response.headers.get('Authorization');
            if (token) {
              localStorage.setItem('hashToken', token.split(' ')[1]);
            }
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => this.networkErrorScenario(error, request, next))
      );
    }
  }


  addToken(req: HttpRequest<any>): HttpRequest<any> {
  
    if(localStorage.getItem("userData")){
      console.log(localStorage.getItem("userData"));
      const local_user: any = localStorage.getItem("userData");
      const userData = JSON.parse(local_user);
      
    if (userData && userData.data && userData.data.api_token) {
    const accessToken = userData.data.api_token;
    if (accessToken) {
      // return req.clone({
      //   setHeaders: {
      //     'Authorization':  `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json'
      //   }         
      // });
      const headers = req.headers.set('Authorization', `Bearer ${accessToken}`).set('Access-Control-Allow-Origin', '*');
      console.log(headers);
      return req.clone({ headers });  
    } else {
      return req;
    }
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
    apiWithNoHeaders(request: HttpRequest<any>): boolean {
      return apiWithoutHeader.includes(request.url as never);
    }
}
