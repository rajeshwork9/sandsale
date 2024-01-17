import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-rejectedlist',
  templateUrl: './rejectedlist.page.html',
  styleUrls: ['./rejectedlist.page.scss'],
})
export class RejectedlistPage implements OnInit {
  rejectedListData: any;
  locationIdInfo:any;
  isFilterModalOpen: boolean = false;

  
  setFilterOpen(isOpen: boolean){
    this.isFilterModalOpen = isOpen;
      }
  
  constructor(
    private router: Router,
    private common: CommonService,
    private loader: LoaderService,
  ) {}

  ngOnInit() { 
   this.locationIdInfo = localStorage.getItem('locationId');
  console.log("locationIdInfo", this.locationIdInfo);
    this.rejectedList();
  }

  // cardClickAction() {
  //   this.router.navigate(['/completeddetails']);
  // }

  async rejectedList() {
    await this.loader.showLoader();
    let filledColumns: any = [
      'tbl_trips.trip_id',
      'tbl_trips.truck_number',
      'tbl_trips.created_on',
      'tbl_trips.status',
      'vehicle_entry',
      'vehicle_exit',
      'trip_date',
      'tbl_trips.updated_on',
    ];
    let filledOrder: any = {
      'tbl_trips.plate_region': 'asc',
      'tbl_trips.created_on': 'asc',
    };
    let filledFilter: any = {
      'tbl_trips.truck_number': '',
      'tbl_trucks.truck_type': '1',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id':this.locationIdInfo,
      'tbl_trips.status': 'Reject',
      'tbl_trips.trip_id': '',
    };
    
    let payload = {
      columns: filledColumns,
      order_by: filledOrder,
      filters: filledFilter,
    };

    this.common.getRejectedList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
       this.rejectedListData = resp.data;
       console.log("rejectedListData",  this.rejectedListData)
    });
  }

}


