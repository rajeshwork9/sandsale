import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FotterbuttonsRoutingModule } from './fotterbuttons-routing.module';


import {FotterbuttonsComponent} from './fotterbuttons.component'

@NgModule({
  declarations: [FotterbuttonsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FotterbuttonsRoutingModule
  ],
  exports:[FotterbuttonsComponent]
})
export class FotterbuttonsModule { }
