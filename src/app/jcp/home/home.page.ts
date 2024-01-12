import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocationService } from 'src/app/services/location.service';
import { NgModel } from '@angular/forms';
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
  rejectedNotes: any;
  rejectedId: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setRejectionOpen(isOpen: boolean, id:any) {
    this.rejectedId = id;
    console.log(this.rejectedId);
    
    this.isRejectionModalOpen = isOpen;
  }


  constructor(
    private common: CommonService,
    private loader: LoaderService,
    private locationSer: LocationService,
    private actionSheetController: ActionSheetController
    ) { }

  ngOnInit() {
    this.fillingList();
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
    localStorage.setItem("locationId", this.selectedLocId);
    this.isModalOpen = false
    this.fillingList();
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

  async presentActionSheet(data: any){
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to fill the truck?',
      buttons: [
        {
          text: 'Ok',
          handler: ()=>{
            this.accept(data.trip_id);
            console.log(data.trip_id);
            this.fillingList();
            
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler:() => {
            console.log("cancel");
            
          },
        }
      ]
    });
    await actionSheet.present();
  }


  rejectClose(){
    this.rejectedNotes = ''
    this.isRejectionModalOpen = false;
  } 

  async reject(){
    if(this.rejectedId){
      let payload = {
        "trip_id": 1,
        "reject_notes":this.rejectedNotes
      }
      this.common.rejectTrip(payload).subscribe((resp: any)=>{
        this.rejectClose();
        console.log(resp);
      });
    }
  }

}
