import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-headerbuttons',
  templateUrl: './headerbuttons.component.html',
  styleUrls: ['./headerbuttons.component.scss'],
})
export class HeaderbuttonsComponent  implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor() { }

  ngOnInit() {}

}


