import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-fotterbuttons',
  templateUrl: './fotterbuttons.component.html',
  styleUrls: ['./fotterbuttons.component.scss'],
})
export class FotterbuttonsComponent implements OnInit {
  currentRoute: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }
}

