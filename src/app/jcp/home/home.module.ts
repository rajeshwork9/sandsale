import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import{HeaderbuttonsModule} from 'src/app/shared/headerbuttons/headerbuttons.module'
import{FotterbuttonsModule} from 'src/app/shared/fotterbuttons/fotterbuttons.module'
import { NodataModule } from 'src/app/shared/nodata/nodata.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderbuttonsModule,
    FotterbuttonsModule,
    NodataModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
