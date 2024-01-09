import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejectedlistPage } from './rejectedlist.page';

const routes: Routes = [
  {
    path: '',
    component: RejectedlistPage
  }
  // {
  //   path: 'rejecteddetails',
  //   loadChildren: () => import('./rejecteddetails/rejecteddetails.module').then( m => m.RejecteddetailsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejectedlistPageRoutingModule {}
