import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-rejecteddetails',
  templateUrl: './rejecteddetails.page.html',
  styleUrls: ['./rejecteddetails.page.scss'],
})
export class RejecteddetailsPage implements OnInit {
  rejectedListData: any;
  locationIdInfo:any;
  activatedRouteId:any;
  constructor(
    private common: CommonService,   
    private loader: LoaderService,
    private router: Router,
    private route:ActivatedRoute, 
  ) {
    this.route.snapshot.paramMap.get('id');
    this.activatedRouteId =  this.route.snapshot.paramMap.get('id');
    console.log("activatedRouteId", this.activatedRouteId);
   }

  ngOnInit() {
    this.locationIdInfo = localStorage.getItem('locationId');
    console.log("locationIdInfo", this.locationIdInfo);

    this.rejectedList();
  }

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
      'tbl_trips.reject_notes',
     ];
    let filledOrder: any = {
      'tbl_trips.plate_region': 'asc',
      'tbl_trips.created_on': 'asc',
    };
    let filledFilter: any = {
      'tbl_trips.truck_number': '',
      'tbl_trucks.truck_type': '',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id':this.locationIdInfo,
      'tbl_trips.status': 'Rejected',
      'tbl_trips.trip_id': this.activatedRouteId,
      'tbl_trips.updated_on':'',
      'tbl_trips.reject_notes':'',
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
