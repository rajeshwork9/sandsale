import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedlistPageRoutingModule } from './completedlist-routing.module';

import { CompletedlistPage } from './completedlist.page';
import{HeaderbuttonsModule} from 'src/app/shared/headerbuttons/headerbuttons.module'
import{FotterbuttonsModule} from 'src/app/shared/fotterbuttons/fotterbuttons.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedlistPageRoutingModule,
    HeaderbuttonsModule,
    FotterbuttonsModule
  ],
  declarations: [CompletedlistPage]
})
export class CompletedlistPageModule {}
