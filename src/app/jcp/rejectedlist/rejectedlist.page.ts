import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rejectedlist',
  templateUrl: './rejectedlist.page.html',
  styleUrls: ['./rejectedlist.page.scss'],
})
export class RejectedlistPage implements OnInit {

  constructor(    private router: Router,) { }

  ngOnInit() {
  }

  cardClickAction(){
    this.router.navigate(['/rejecteddetails']); 
   }

}
