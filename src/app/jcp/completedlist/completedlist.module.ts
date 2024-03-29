import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedlistPageRoutingModule } from './completedlist-routing.module';

import { CompletedlistPage } from './completedlist.page';
import{HeaderbuttonsModule} from 'src/app/shared/headerbuttons/headerbuttons.module'
import{FotterbuttonsModule} from 'src/app/shared/fotterbuttons/fotterbuttons.module'
import { NodataModule } from 'src/app/shared/nodata/nodata.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedlistPageRoutingModule,
    HeaderbuttonsModule,
    FotterbuttonsModule,
    NodataModule,
    ReactiveFormsModule
  ],
  declarations: [CompletedlistPage]
})
export class CompletedlistPageModule {}
