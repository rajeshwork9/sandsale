import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private injector: Injector
  ) { }
}
