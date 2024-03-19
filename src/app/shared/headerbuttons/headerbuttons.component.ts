import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { filter } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { SharedService } from 'src/app/services/shared.service';
import { getName } from 'ionicons/dist/types/components/icon/utils';


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
  fillingListData: any;
  routeName: any;
  locationName: any;


  setFilterOpen(isOpen: boolean){
    this.isFilterModalOpen = isOpen;
  }

  constructor(
    private common: CommonService,
    private location: LocationService,
    private shared : SharedService,
    private activatedRouteService: ActivatedRoute,
    private router: Router
  ) {
    let userInfo:any = localStorage.getItem('userData')
    this.userData = JSON.parse(userInfo)
    console.log(this.userData); 
   }

  ngOnInit() {
    this.locationName = localStorage.getItem('locationName')
    // this.locationDetails();
    // this.routeName=this.activatedRouteService.snapshot.pathFromRoot[1].routeConfig?.path;
    // console.log(this.routeName,"nameee");    

  }
  
  setOpen() {
    this.router.navigate(['location'])
  }

   onLocationChange(event: any) {
    this.selectedLocId = event.detail.value;
    console.log(this.selectedLocId);
    console.log(this.routeName,"routename");
    if(this.routeName === 'home'){
      this.shared.setLocationId(this.selectedLocId);
    }
    if(this.routeName === 'completedlist'){
    this.shared.setLocationIdforCompleted(this.selectedLocId);
    }
    this.isModalOpen = false;
  }
  async locationDetails(){
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


