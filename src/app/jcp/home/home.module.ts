import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import{HeaderbuttonsModule} from 'src/app/shared/headerbuttons/headerbuttons.module'
import{FotterbuttonsModule} from 'src/app/shared/fotterbuttons/fotterbuttons.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderbuttonsModule,
    FotterbuttonsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
