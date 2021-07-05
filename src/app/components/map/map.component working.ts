import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { IFeature, IGeoJSON } from './geojso.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  records: any[] = [];
  mapa: mapboxgl.Map;
  geojson: any;
  features: any[];

  constructor(private map: MapService) {}

  ngOnInit() {
    this.setList();

    // this.buildGeoJson();

    this.createMap();
  }

  createMap() {
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style:
        'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh ',
      // center: [-91.2619023159175, 43.481780997799746], // LNG, LAT
      center: [-95.6092 , 29.7189], // LNG, LAT
   
      zoom: 4.5, // starting zoom
      accessToken: environment.mapbox.accessToken,
    });
    // this.createMarker(-91.2619023159175, 43.481780997799746); // original - wiscon michi
    // this.createMarker(-95.6092 , 29.7189);
    // this.createMarker(-95.602 , 29.6804);

 
    // Begin
    this.mapa.on('load', () => {
      // Add an image to use as a custom marker
      this.mapa.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
         (error, image) => {
          if (error) throw error;
          this.mapa.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          this.mapa.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: this.features,
            },
            
          });

          // Add a symbol layer
          this.mapa.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        }
      );
    });

    // End
  }

  createMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      color: '#3FB1CE',
      draggable: true,
      anchor: 'bottom-right',
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
  }

  setList() {
    this.map.fetchItems().subscribe((data) => {
      this.records = data.records;
      // this.fetchData = data
      console.log(this.records);
      // console.log(this.records.records)
      this.buildGeoJson();
    });
  }

  buildGeoJson() {
    let features = [];
    this.records.map((record) => {
      let feature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            `${record.geocode.Longitude} , ${record.geocode.Latitude}`,
          ],
          //-77.03238901390978, 38.913188059745586
        },
        properties: {
          title: record.name,
        },
      };

      // then push it to the features
      features.push(feature);
    });

    console.log('features', features);

    // after iteration then now build the GeoJSON interface and set content
    let geojson: IGeoJSON = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
    };

    // this.geojson = geojson;


    // setting only features
    this.features = features;
    console.log('GeoJson', geojson);

    // this.createMap();
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
