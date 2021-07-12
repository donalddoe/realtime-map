import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {
  history = {...history.state}
  data = null;

  // @Input() feature: any;

  panelOpenState = false;
  mapDetails: any
  constructor(private map: MapService, public loaderService: LoaderService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * If data (of type feat) was then let us load the details
     * else return to the map data 
     */

     this.route.paramMap.subscribe((params) => {
      const eventId = params.get("id");
      console.log('event id ', eventId)
    })

    if (this.history.data) {
      this.data = this.history.data;
      console.log('Data', this.data);
      this.setMapDetails();
    } else {
      console.log('we are going back');
      
    }
    // if (this.feature != null) {
    //   console.log('Feature received ', this.feature);
    //   this.setMapDetails();

    // } else {
    //   console.log('We have NO feature')
    // }

    
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get("id");
      console.log('event id ', eventId)
    })
  }


  back = () => this.location.back();

  
  setMapDetails() {
    this.map.getListDetails(this.data.listID, this.data.propertyID).subscribe(
      (data) => { this.mapDetails = data
          console.log(this.mapDetails)
      })
  }

  highAmenitiesIcons = ['assets/images/BlackStainless-Appliances.svg', 'assets/images/Granite-Countertops.svg', 'assets/images/BlackStainless-Appliances.svg', 'assets/images/DogWalk-Park.svg', 'assets/images/Jogging-Trail.svg', 'assets/images/Fitness-Center.svg', 'assets/images/Vallet-Trash.svg'];

  communityFeaturesIcon = ['assets/images/Swimming+Pool.svg', 'assets/images/Picnic+Area.svg', 'assets/images/School+Bus+Pickup.svg', 'assets/images/Shuttle+Route.svg', 'assets/images/Business+Center.svg', 'assets/images/Laundry+Rooms.svg']

  unitOptionsIcon = ['assets/images/Microwave.svg', 'assets/images/Dishwasher.svg', 'assets/images/Pantry.svg', 'assets/images/Refrigerator.svg', 'assets/images/Walk-in+Closet.svg', 'assets/images/Patio.svg', 'assets/images/Fireplace.svg', 'assets/images/Berber+Carpet.svg', 'assets/images/Ceiling+Fans.svg', 'assets/images/Hot+TubJacuzzi.svg']
}
