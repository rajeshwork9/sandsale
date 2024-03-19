import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public locations = new Subject();
  public completedlocations = new Subject();
  public rejectedlocations = new Subject();

  setLocationId(id: any){
    console.log("id",id);
    this.locations.next({locId: id})
  }

  setLocationIdforCompleted(id: any){
    this.completedlocations.next({locId: id})
  }
  

  constructor() { }
}
