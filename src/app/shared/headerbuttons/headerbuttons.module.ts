import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderbuttonsRoutingModule } from './headerbuttons-routing.module';
import {HeaderbuttonsComponent} from './headerbuttons.component'

@NgModule({
  declarations: [HeaderbuttonsComponent],
  imports: [
    CommonModule,
    IonicModule,
    HeaderbuttonsRoutingModule
  ],
  exports:[HeaderbuttonsComponent]
})
export class HeaderbuttonsModule { }
