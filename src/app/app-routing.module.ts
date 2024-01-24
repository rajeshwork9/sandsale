import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./authentication/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./jcp/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenticationService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./jcp/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rejectedlist',
    loadChildren: () => import('./jcp/rejectedlist/rejectedlist.module').then( m => m.RejectedlistPageModule)
  },
  {
    path: 'completedlist',
    loadChildren: () => import('./jcp/completedlist/completedlist.module').then( m => m.CompletedlistPageModule)
  },

  {
    path: 'completeddetails',
    loadChildren: () => import('./jcp/completedlist/completeddetails/completeddetails.module').then( m => m.CompleteddetailsPageModule)
  },


    {
    path: 'rejecteddetails',
    loadChildren: () => import('./jcp/rejectedlist/rejecteddetails/rejecteddetails.module').then( m => m.RejecteddetailsPageModule)
  }




];

// {
//   path: 'signup',
//   loadChildren: () => import('./Authentication/signup/signup.module').then( m => m.SignupPageModule)
// },

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
