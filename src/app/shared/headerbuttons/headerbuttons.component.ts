import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { filter } from 'rxjs/operators';

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
    private router: Router
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

}


