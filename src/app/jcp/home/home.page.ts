import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isRejectionModalOpen = false;

  setRejectionOpen(isOpen: boolean) {
    this.isRejectionModalOpen = isOpen;
  }

  constructor() { }

  ngOnInit() {
  }

}
