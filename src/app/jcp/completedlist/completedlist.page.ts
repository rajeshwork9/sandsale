import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocationService } from 'src/app/services/location.service';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-completedlist',
  templateUrl: './completedlist.page.html',
  styleUrls: ['./completedlist.page.scss'],
})
export class CompletedlistPage implements OnInit {
  filterForm: FormGroup;
  completedListData: any;
  locationData: any;
  selectedLocId: any;
  subLocId: any;

  truckTypeListData: any;
  filteredListData: any;
  dataFiltered: any;
  locationName:any;

  locationIdInfo: any;
  isFilterModalOpen: boolean = false;
  clearFilterBlock:boolean = false;

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
    // this.locationIdInfo = localStorage.getItem('locationId');
    // this.completedList();
  }

  ionViewWillEnter(){
    this.locationIdInfo = localStorage.getItem('locationId');
    this.locationName = localStorage.getItem('locationName');
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
      'tbl_trips.location_id':this.locationIdInfo,
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
        console.log("completedresp", resp.data);
        this.completedListData = resp.data;
        console.log("completedListData", this.completedListData);
        // this.locationName = this.completedListData[0].location_name;
       
    });


  }

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

//Start location 
locationColumns: any = [
  'id',
  'location_name',
  'status',
  'created_on',
];
locationOrder: any = {
  location_name: 'asc',
};
locationFilter: any = {};

async locationDetails() {
  await this.loader.showLoader();
  let payload = {
    columns: this.locationColumns,
    order_by: this.locationOrder,
    filters: this.locationFilter,
  };
  this.common.getLocations(payload).subscribe((resp: any) => {
    this.loader.dismissLoader();
    this.locationData = resp.data;
  });
}
//End location



  // Filter
  setFilterApply(isOpen: boolean) {
    this.filteredList();
    this.isFilterModalOpen = isOpen;
    this.truckTypesList();
    this.clearFilterBlock = true;
    console.log("setFilterApply", this.completedListData);
  }

  filterTrue() {
    this.truckTypesList();
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
      'tbl_trips.status': 'Filled',
      'tbl_trips.trip_id': '',
    };
    let payload = {
      columns: fillingColumns,
      order_by: fillingOrder,
      filters: fillingFilter,
    };

    this.common.getFillingList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
      this.filteredListData = resp.data;
      console.log('filteredListData', this.filteredListData);
      this.completedListData = this.filteredListData;
    });
    this.filterForm.reset();
  }

  clearFilterBt(){
    this.completedList();    
    this.clearFilterBlock = false;    
    }
}
