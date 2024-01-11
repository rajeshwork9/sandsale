import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private selectedLocationSubject = new BehaviorSubject<string | null>(null);
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor() { }
  
  setSelectedLocation(locationId: string): void {
    this.selectedLocationSubject.next(locationId);
  }
}
