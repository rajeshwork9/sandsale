import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderbuttonsComponent} from './headerbuttons.component'

const routes: Routes = [
  {
    path:'',
    component:HeaderbuttonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderbuttonsRoutingModule { }
