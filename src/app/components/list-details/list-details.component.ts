import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  panelOpenState = false;
  mapDetails: any
  constructor(private map: MapService, public loaderService: LoaderService) { }

  ngOnInit() {
    this.setMapDetails()
  }

  setMapDetails() {
    this.map.getListDetails().subscribe(
      (data) => { this.mapDetails = data
          console.log(this.mapDetails)
      })
  }

  highAmenitiesIcons = ['assets/images/BlackStainless-Appliances.svg', 'assets/images/Granite-Countertops.svg', 'assets/images/BlackStainless-Appliances.svg', 'assets/images/DogWalk-Park.svg', 'assets/images/Jogging-Trail.svg', 'assets/images/Fitness-Center.svg', 'assets/images/Vallet-Trash.svg'];

  communityFeaturesIcon = ['assets/images/Swimming+Pool.svg', 'assets/images/Picnic+Area.svg', 'assets/images/School+Bus+Pickup.svg', 'assets/images/Shuttle+Route.svg', 'assets/images/Business+Center.svg', 'assets/images/Laundry+Rooms.svg']

  unitOptionsIcon = ['assets/images/Microwave.svg', 'assets/images/Dishwasher.svg', 'assets/images/Pantry.svg', 'assets/images/Refrigerator.svg', 'assets/images/Walk-in+Closet.svg', 'assets/images/Patio.svg', 'assets/images/Fireplace.svg', 'assets/images/Berber+Carpet.svg', 'assets/images/Ceiling+Fans.svg', 'assets/images/Hot+TubJacuzzi.svg']
}
