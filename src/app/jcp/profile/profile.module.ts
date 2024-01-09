import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import{HeaderbuttonsModule} from 'src/app/shared/headerbuttons/headerbuttons.module'
import{FotterbuttonsModule} from 'src/app/shared/fotterbuttons/fotterbuttons.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderbuttonsModule,
    FotterbuttonsModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
