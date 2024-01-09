import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-completedlist',
  templateUrl: './completedlist.page.html',
  styleUrls: ['./completedlist.page.scss'],
})
export class CompletedlistPage implements OnInit {

  constructor(    private router: Router,) { }

  ngOnInit() {

 

  }

  cardClickAction(){
    this.router.navigate(['/completeddetails']); 
   }

}
