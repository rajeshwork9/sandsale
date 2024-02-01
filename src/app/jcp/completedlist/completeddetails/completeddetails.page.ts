import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-completeddetails',
  templateUrl: './completeddetails.page.html',
  styleUrls: ['./completeddetails.page.scss'],
})
export class CompleteddetailsPage implements OnInit {
  completedListData: any;
  locId: any;
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
    // this.locId = localStorage.getItem('locationId');
      this.completedList();

  
  }
  async completedList() {
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
      'tbl_trucks.truck_type': '',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id': '',
      'tbl_trips.status': 'Filled',
      'tbl_trips.trip_id': this.activatedRouteId,
    };
    let payload = {
      columns: filledColumns,
      order_by: filledOrder,
      filters: filledFilter,
    };
    this.common.getCompletedList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
      this.completedListData = resp.data;
      console.log("completedDetails", this.completedListData);
    });
  }
}
