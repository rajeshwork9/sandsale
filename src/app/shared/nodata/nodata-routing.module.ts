import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodataComponent } from './nodata.component';

const routes: Routes = [
  {
    path:'',
    component:NodataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodataRoutingModule { }
