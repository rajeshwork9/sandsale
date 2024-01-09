import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteddetailsPageRoutingModule } from './completeddetails-routing.module';

import { CompleteddetailsPage } from './completeddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteddetailsPageRoutingModule
  ],
  declarations: [CompleteddetailsPage]
})
export class CompleteddetailsPageModule {}
