import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

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


}
