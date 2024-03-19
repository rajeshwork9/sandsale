import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  locationData: any;

  constructor(
    private common: CommonService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationDetails();
  }

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
    console.log('payload', payload);
    this.loader.dismissLoader();
    this.common.getLocations(payload).subscribe((resp: any) => {
      console.log(resp.data);
      this.locationData = resp.data;
     console.log("locationData",this.locationData);
    });
  }

  onLocationChange(id: any, name: any){
    console.log(id);
    localStorage.setItem('locationId',id);
    localStorage.setItem('locationName', name)
    this.router.navigate(['home']);
  }

  backButton(){
    this.router.navigate(['home'])
  }
}
