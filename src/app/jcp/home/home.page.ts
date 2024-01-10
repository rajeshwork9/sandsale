import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isModalOpen = true;
  isRejectionModalOpen = false;
  locationColumns: any = [
    "id",
    "location_name",
    "location_anpr",
    "status",
    "created_on"
  ];
  locationOrder: any={
    "location_name": "asc"
  };
  locationFilter: any = {
    
  }
  locationData: any;
  selectedLocId: any;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setRejectionOpen(isOpen: boolean) {
    this.isRejectionModalOpen = isOpen;
  }

  constructor(private common: CommonService) { }

  ngOnInit() {
    this.locationDetails()
  }

  async locationDetails(){
    // await this.loader.showLoader();

    let payload ={
      "columns":this.locationColumns,
      "order_by": this.locationOrder,
      "filters":this.locationFilter
    }
    console.log("payload",payload);
    this.common.getLocations(payload).subscribe((resp: any)=>{
      console.log(resp.data);
      this.locationData = resp.data;
      console.log(this.locationData);
    })
  }

  onLocationChange(event: any) {
    this.selectedLocId = event.detail.value;
    console.log(this.selectedLocId);
    
  }
}
