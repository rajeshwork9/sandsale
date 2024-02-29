import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { filter } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-headerbuttons',
  templateUrl: './headerbuttons.component.html',
  styleUrls: ['./headerbuttons.component.scss'],
})
export class HeaderbuttonsComponent  implements OnInit {
  isModalOpen = false;
  isFilterModalOpen=false;
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
  userData: any;
  locationData: any;
  selectedLocId: any;
  fillingListData: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

setFilterOpen(isOpen: boolean){
this.isFilterModalOpen = isOpen;
  }

  constructor(
    private loader: LoaderService,
    private common: CommonService,
    private activatedRouterService: ActivatedRoute,
    private router: Router,
    private location: LocationService,
    private shared : SharedService
  ) {
    let userInfo:any = localStorage.getItem('userData')
    // console.log(userInfo);
    this.userData = JSON.parse(userInfo)
    console.log(this.userData); 
   }

  ngOnInit() {
    this.locationDetails();
    
  }

   onLocationChange(event: any) {
    this.selectedLocId = event.detail.value;
    console.log(this.selectedLocId);
    this.location.selectedLocation(this.selectedLocId)
    this.shared.setLocationId(this.selectedLocId)
    this.fillingList();
    
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

  async fillingList(){
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
      "tbl_trips.location_id": this.selectedLocId,
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

}


