import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteddetailsPage } from './completeddetails.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteddetailsPageRoutingModule {}
