import { Component, OnInit } from '@angular/core';
import { MapService } from "../../services/map.service";

import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../../environments/environment";
import {IGeoJSON} from './geojso.interface.ts'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

records: any = [] ;
mapa: mapboxgl.Map;


  constructor(private map: MapService) {
  }

  ngOnInit(){
this.setList()

this.createMap()

  }

  createMap() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
this.mapa = new mapboxgl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh ',
  center: [-91.2619023159175, 43.481780997799746], // LNG, LAT
  zoom: 4.5 // starting zoom
  });
  this.createMarker(-91.2619023159175,43.481780997799746)
  }

  createMarker(lng: number, lat:number) {
    const marker = new mapboxgl.Marker({
      color: "#3FB1CE",
      draggable: true,
      anchor: 'bottom-right'
      }).setLngLat([lng, lat])
      .addTo(this.mapa);

      marker.on('drag', () => {
        console.log( marker.getLngLat() )
      })
  }

  setList() {
    this.map.fetchItems().subscribe(
      data => {
        this.records = data.records
        // this.fetchData = data
        console.log(this.records)
        // console.log(this.records.records)
      }
    )
  }

  buildGeoJson () {
    let geejson: IGeoJSON;

    geejson.type = 'geojson';
    geejson.
    // this.records is the array
    for (record in this.records) {

    }
  }



  // geojson = {
  //   'type': 'FeatureCollection',
  //   'features': [
  //       {
  //           'type': 'Feature',
  //           'properties': {
  //               'message': 'Foo',
  //               'iconSize': [60, 60]
  //           },
  //           'geometry': {
  //               'type': 'Point',
  //               'coordinates': [-66.324462, -16.024695]
  //           }
  //       },






}
