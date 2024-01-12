import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodataRoutingModule } from './nodata-routing.module';
import { IonicModule } from '@ionic/angular';
import { NodataComponent } from './nodata.component';


@NgModule({
  declarations: [NodataComponent],
  imports: [
    CommonModule,
    NodataRoutingModule,
    IonicModule
  ],
  exports:[NodataComponent],

})
export class NodataModule { }
