import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-completedlist',
  templateUrl: './completedlist.page.html',
  styleUrls: ['./completedlist.page.scss'],
})
export class CompletedlistPage implements OnInit {
  completedListData: any;
  locationData: any;
  selectedLocId: any;
  subLocId: any;

  locationColumns: any = [
    'id',
    'location_name',
    'location_anpr',
    'status',
    'created_on',
  ];
  locationOrder: any = {
    location_name: 'asc',
  };
  locationFilter: any = {};
  locId: any;
  constructor(
    private router: Router,
    private common: CommonService,
    private loader: LoaderService,
    private locationSer: LocationService
  ) {}

  ngOnInit() {
    this.locId = localStorage.getItem('locationId');
    console.log("lo",this.locId);
    this.completedList();
  }

  cardClickAction() {
    this.router.navigate(['/completeddetails']);
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
      'tbl_trucks.truck_type': '1',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id': this.locId,
      'tbl_trips.status': 'Filled',
      'tbl_trips.trip_id': '',
    };
    let payload = {
      columns: filledColumns,
      order_by: filledOrder,
      filters: filledFilter,
    };
    this.common.getCompletedList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp.data);
      this.completedListData = resp.data;
    });
  }
}
