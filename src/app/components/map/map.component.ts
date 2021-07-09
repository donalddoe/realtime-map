import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { IFeature, IGeoJSON } from '../../models/geojson.interface';
import { LoaderService } from 'src/app/loader/loader.service';

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
  mapInfo: any;

  constructor(private map: MapService, public loaderService: LoaderService) {}

  ngOnInit() {
    this.setList();
    this.createMap();
  }
//Bed images for the price
  priceIcons = ['assets/images/1-bed.svg', 'assets/images/2-bed.svg', 'assets/images/3-bed.svg'];

  //Create map with coordinates
  createMap() {
    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: environment.mapbox.style,
      center: [-97.382, 32.729], // LNG, LAT original
      zoom: 11.54, // starting zoom
      accessToken: environment.mapbox.accessToken,
    });

    // Begin
    this.mapa.on('load', () => {
      // Add an image to use as a custom marker
      this.mapa.loadImage(
        '/assets/images/map-circle-red.png',
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
  }

  //fetch data and load the url to get coordinates
  setList() {
    this.map.getListItems().subscribe((data) => {
      this.records = data.records;
      this.mapInfo = data.agentInfo;
      console.log(this.mapInfo);
      console.log(this.records);
      this.buildGeoJson();
    });
  }

  buildGeoJson() {
    let features = [];
    this.records.map((record) => {
      let feature: IFeature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [record.geocode.Longitude, record.geocode.Latitude],
        },
        properties: {
          title: record.name,
        },
      };

      // then push it to the features
      features.push(feature);
    });

    // console.log('features', features);
    this.features = features;

    // after iteration then now build the GeoJSON interface and set content
    let geojson: IGeoJSON = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features,
      },
    };

    this.geojson = geojson;
    console.log('GeoJson', geojson);
  }
}
