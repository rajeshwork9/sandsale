import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderbuttonsModule } from './shared/headerbuttons/headerbuttons.module';
import { DEFAULT_TIMEOUT, HttpInterceptorService } from './services/http-interceptor.service';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HeaderbuttonsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  { provide: DEFAULT_TIMEOUT, useValue: 60000 },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
