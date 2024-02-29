import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public locations = new Subject();

  setLocationId(id: any){
    console.log("id",id);
    this.locations.next({locId: id})
  }


  constructor() { }
}
