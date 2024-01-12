import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private selectedLocationSubject = new BehaviorSubject<string | null>(null);
  selectedLocation$ = this.selectedLocationSubject.asObservable();
  private locId = new Subject()

  constructor() { }

  setSelectedLocation(locationId: string): void {
    this.selectedLocationSubject.next(locationId);
  }

  selectedLocation(data: any){
    this.selectedLocationSubject.next(data);
    console.log(data);
  }
}
