import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejecteddetailsPage } from './rejecteddetails.page';

const routes: Routes = [
  {
    path: ':id',
    component: RejecteddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejecteddetailsPageRoutingModule {}
