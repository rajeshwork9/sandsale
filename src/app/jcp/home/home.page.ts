import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocationService } from 'src/app/services/location.service';

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
    
  };

  locationData: any;
  selectedLocId: any;
  fillingListData: any;
  subLocId: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setRejectionOpen(isOpen: boolean) {
    this.isRejectionModalOpen = isOpen;
  }

  constructor(
    private common: CommonService,
    private loader: LoaderService,
    private locationSer: LocationService
    ) { }

  ngOnInit() {
    this.locationSer.selectedLocation$.subscribe((resp: any)=>{
      console.log(resp);
      this.subLocId = resp
      this.fillingList(this.subLocId);
    })
    this.locationDetails();
   
     

    
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
    // localStorage.setItem("locationId", this.selectedLocId);
    // this.locationSer.setSelectedLocation(this.selectedLocId)
    this.isModalOpen = false
    this.fillingList("");
  }

  async fillingList(data:any){
    console.log( data!=''?this.selectedLocId:data)
    console.log(data)
    await this.loader.showLoader();
    let fillingColumns: any =[
      "tbl_trips.trip_id",
      "tbl_trips.truck_number",
      "tbl_trips.created_on",
      "tbl_trips.status",
      "vehicle_entry",
      "vehicle_exit",
      "trip_date",
      "tbl_trips.updated_on"
    ];
    let fillingOrder : any = {
      "tbl_trips.plate_region": "asc",
      "tbl_trips.created_on": "asc"
    };
    let fillingFilter: any = {
      "tbl_trips.truck_number": "",
      "tbl_trucks.truck_type": "1",
      "tbl_trips.created_on": "",
      "tbl_trips.location_id": data!=''?this.selectedLocId:data,
      "tbl_trips.status": "Yet to Fill",
      "tbl_trips.trip_id": ""
    }
    let payload = {
      "columns":fillingColumns,
      "order_by":fillingOrder,
      "filters":fillingFilter
    }
    this.common.getFillingList(payload).subscribe((resp: any)=>{
      this.loader.dismissLoader();
      console.log(resp.data);
      this.fillingListData = resp.data;
    })
  }

  async accept(id: any){
    await this.loader.showLoader();
    let payload = {
      "trip_id":id
    }
    this.common.acceptTrip(payload).subscribe((resp: any)=>{
      console.log(resp.data);
      this.loader.dismissLoader();
    })
  }

}
