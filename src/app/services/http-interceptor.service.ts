import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Inject,Injectable, Injector, InjectionToken } from '@angular/core';
import { Observable, fromEvent, timeout, tap, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  userData: any;
  constructor(
    private injector: Injector, private login: LoginService,private loader: LoaderService
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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = 50000000;
    const timeoutValueNumeric = Number(timeoutValue);
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
    ) as Observable<HttpEvent<any>>;
  }

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
        this.loader.dismissLoader();
        this.login.logout();
        console.log(error,"errorr");
        localStorage.clear();
        localStorage.removeItem('userData');
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
  
    handle403Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      if (error && error.status === 403) {
        return throwError(error);
      }
  
      return throwError(error);
    }
    handle404Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      console.log("error", error);
      if (error && error.status === 404) {
        return throwError(error);
      }
  
      return throwError(error);
    }
}
