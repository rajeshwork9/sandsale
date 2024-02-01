import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocationService } from 'src/app/services/location.service';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  filterForm: FormGroup;
  isModalOpen = true;
  isRejectionModalOpen = false;
  locationClose=false;
 

  truckTypeFilters: any = {};

  locationData: any;
  selectedLocId: any;
  selectedLocName: any;
  fillingListData: any;
  subLocId: any;
  rejectedNotes: any;
  rejectedId: any;
  rejectedTrucknumber:any;
  truckTypeListData: any;

  locationName: any;
  filteredListData: any;
  isFilterModalOpen: boolean = false;
  dataFiltered: any;
  clearFilterBlock: boolean = false;
  Filterlocdata : any ;
  filterLocName: any;
  disabledLocationSubmit:boolean = false;



  constructor(
    private common: CommonService,
    private loader: LoaderService,
    private locationSer: LocationService,
    private actionSheetController: ActionSheetController,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.filterForm = this.fb.group({
      truck_number: [null],
      truck_type: [null],
      date: [null],
      // location: [null],
    });


  }

  ngOnInit() {
    this.locationDetails();
    // this.fillingList();
this.disabledLocationSubmit=false;
  }

    


  setRejectionOpen(isOpen: boolean, id: any, trucknumber:any) {
    this.rejectedId = id;
    this.rejectedTrucknumber=trucknumber;
    console.log("setRejectionOpenID", this.rejectedId);
    console.log("setRejectionOpenTrucknumber", this.rejectedTrucknumber);
    
    this.isRejectionModalOpen = isOpen;
    this.disabledLocationSubmit= true;
  }

  // Location
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log('this.isModalOpen', this.isModalOpen);
   
  }

  locationSubmit(){
    this.isModalOpen = false;
    this.fillingList(); 

  }

  locationBt(){
    this.isModalOpen = true;
    this.locationClose=true;
  }

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

  // truckType
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
  async locationDetails() {
    // await this.loader.showLoader();
    let payload = {
      columns: this.locationColumns,
      order_by: this.locationOrder,
      filters: this.locationFilter,
    };
    console.log('payload', payload);
    this.common.getLocations(payload).subscribe((resp: any) => {
      console.log(resp.data);
      this.locationData = resp.data;
     console.log("locationData",this.locationData);
    });
  }

  onLocationChange(event: any) {
    this.selectedLocId = event.detail.value;
    console.log('selectedLocId', this.selectedLocId);
    localStorage.setItem('locationId', this.selectedLocId);
  

    this.filterLocName = this.locationData.filter((loc:any) => loc.id === this.selectedLocId);
    this.filterLocName = this.filterLocName[0].location_name;
    // localStorage.removeItem('locationName');
    localStorage.setItem('locationName', this.filterLocName);
    console.log("filterLocName", this.filterLocName);

    this.disabledLocationSubmit=true;
  }

    // Location End 

  async fillingList() {
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
      'tbl_trips.truck_number': '',
      'tbl_trucks.truck_type': '',
      'tbl_trips.created_on': '',
      'tbl_trips.location_id': this.selectedLocId,
      'tbl_trips.status': 'Yet to Fill',
      'tbl_trips.trip_id': '',
    };

    // 'tbl_trips.location_id': this.selectedLocId,
    let payload = {
      columns: fillingColumns,
      order_by: fillingOrder,
      filters: fillingFilter,
    };
    this.common.getFillingList(payload).subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log("fillingListData", resp.data);
      this.fillingListData = resp.data;
    });
  }

  // Filter
  setFilterOpen(isOpen: boolean) {
    this.filteredList();
    this.isFilterModalOpen = isOpen;
    this.truckTypesList();
    this.clearFilterBlock = true;
    this.fillingList = this.dataFiltered;
    console.log('setFilterApply', this.fillingList);
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
      'tbl_trips.location_id': this.selectedLocId,
      'tbl_trips.status': 'Yet to Fill',
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

      this.dataFiltered = this.filteredListData;
    });

    this.filterForm.reset();
  }

  clearFilterBt() {
    this.filteredList();
    this.clearFilterBlock = false;
  }

  // Filter

  async accept(id: any) {
    await this.loader.showLoader();
    let payload = {
      trip_id: id,
    };
    this.common.acceptTrip(payload).subscribe((resp: any) => {
      console.log(resp.data);
      this.loader.dismissLoader();
      this.fillingList(); 
    });
  }

  async presentActionSheet(data: any) {
    const actionSheet = await this.alertController.create({
      header: '',
      message: 'Are you sure you want to fill the truck?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          },
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.accept(data.trip_id);
            console.log("fillingListOK", data.trip_id);
            },
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    await actionSheet.present();
  }

  rejectClose() {
    this.rejectedNotes = '';
    this.isRejectionModalOpen = false;
  }

reject() {
    if (this.rejectedId) {
      let payload = {
        trip_id: this.rejectedId,
        reject_notes: this.rejectedNotes,
      };
      this.common.rejectTrip(payload).subscribe((resp: any) => {
        this.rejectClose();
        console.log(resp);
        this.loader.dismissLoader();
        this.fillingList(); 
      });
    }
  }

  truckTypesList() {
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


}
