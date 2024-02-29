import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-rejectedlist',
  templateUrl: './rejectedlist.page.html',
  styleUrls: ['./rejectedlist.page.scss'],
})
export class RejectedlistPage implements OnInit {
  filterForm: FormGroup;
  rejectedListData: any;
  locationIdInfo:any;
  isFilterModalOpen: boolean = false;

  clearFilterBlock:boolean = false;
  filteredListData: any;
  truckTypeListData:any;
  locationData: any;
  locationName:any;
  
  constructor(
    private common: CommonService,
    private loader: LoaderService,
    private locationSer: LocationService,
    private fb: FormBuilder,
    private router: Router,
    private shared: SharedService
  ) {
    this.filterForm = this.fb.group({
      truck_number: [null],
      truck_type: [null],
      date: [null],
      // location: [null],
    });
  }

  ngOnInit() { 
    this.shared.locations.subscribe((obj: any)=>{
      console.log("iddjhg",obj);
    })
   this.locationIdInfo = localStorage.getItem('locationId');
  console.log("locationIdInfo", this.locationIdInfo);
  this.locationName = localStorage.getItem('locationName');
  console.log("locationName", this.locationName);
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
      'tbl_trucks.truck_type': '',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id':this.locationIdInfo,
      'tbl_trips.status': 'Rejected',
      'tbl_trips.trip_id': '',
    };
    
    let payload = {
      columns: filledColumns,
      order_by: filledOrder,
      filters: filledFilter,
    };

    this.common.getRejectedList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
      // console.log("rejectedresp", resp.data);
       this.rejectedListData = resp.data;
       console.log("rejectedListData",  this.rejectedListData);
      //  this.locationName = this.completedListData[0].location_name;
    });
  }

  //Start location 
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

async locationDetails() {
  // await this.loader.showLoader();

  let payload = {
    columns: this.locationColumns,
    order_by: this.locationOrder,
    filters: this.locationFilter,
  };

  this.common.getLocations(payload).subscribe((resp: any) => {
    this.locationData = resp.data;

  });
}
//End location


//Start truckType
truckTypeColumns: any = [
  'id',
  'truck_type',
  'truck_amount',
  'status',
  'created_on',
];

truckTypeOrderBy: any = {
  id: 'asc',
};

truckTypeFilters: any = {};

async truckTypesList() {
  let payload = {
    columns: this.truckTypeColumns,
    order_by: this.truckTypeOrderBy,
    filters: this.truckTypeFilters,
  };
  this.common.getTruckTypesList(payload).subscribe((resp: any) => {
    this.truckTypeListData = resp.data;
    console.log('truckTypeListData', this.truckTypeListData);
  });
}
//End truckType


 // Filter
 setFilterApply(isOpen: boolean) {
  this.filteredList();
  this.isFilterModalOpen = isOpen;
  this.truckTypesList();
  this.clearFilterBlock = true;
  console.log("setFilterApply", this.rejectedListData);
}

filterTrue() {
  this.truckTypesList();
  this.locationDetails();
  this.isFilterModalOpen = true;
}

filterFalse() {
  this.isFilterModalOpen = false;
}

async filteredList() {
  await this.loader.showLoader();
  let fillingColumns: any = [
    'tbl_trips.trip_id',
    'tbl_trips.truck_number',
    'tbl_trips.created_on',
    'tbl_trips.status',
    'vehicle_entry',
    'vehicle_exit',
    'trip_date',
    'tbl_trips.updated_on',
  ];
  let fillingOrder: any = {
    'tbl_trips.plate_region': 'asc',
    'tbl_trips.created_on': 'asc',
  };
  let fillingFilter: any = {
    'tbl_trips.truck_number': this.filterForm.value['truck_number'],
    'tbl_trucks.truck_type': this.filterForm.value['truck_type'],
    'tbl_trips.created_on': this.filterForm.value['date'],
    'tbl_trips.location_id':this.locationIdInfo,
    'tbl_trips.status': 'Rejected',
    'tbl_trips.trip_id': '',
  };
  let payload = {
    columns: fillingColumns,
    order_by: fillingOrder,
    filters: fillingFilter,
  };

  this.common.getRejectedList(payload).subscribe((resp: any) => {
    this.loader.dismissLoader();
    this.filteredListData = resp.data;
    this.rejectedListData = this.filteredListData;
    console.log('filteredListData', this.rejectedListData);
  });
  this.filterForm.reset();
}

clearFilterBt(){
  this.rejectedList();    
  this.clearFilterBlock = false;    
  }

}


