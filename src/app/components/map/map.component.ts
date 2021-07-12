import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../services/map.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { IFeature, IGeoJSON } from '../../models/geojson.interface';
import { LoaderService } from 'src/app/loader/loader.service';
import { NavigationEnd, Router } from '@angular/router';

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


  mapLoaded = false;
  selectedFeature = null;
  visibility = 'visible';

  constructor(
    private map: MapService,
    public loaderService: LoaderService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log('current route', this.router.url);
      }

  });
    if (this.mapa) {
      this.mapa.setCenter(this.center);
    }
  }

  ngOnInit() {
    this.setList();
    this.createMap();
  }

  center: mapboxgl.LngLat = new mapboxgl.LngLat(-97.382, 32.729);

  initialCenter = {
    lat: 32.729,
    lng: -97.382,
  };
  initialZoom = 11.54;
  //Bed images for the price
  priceIcons = [
    'assets/images/1-bed.svg',
    'assets/images/2-bed.svg',
    'assets/images/3-bed.svg',
  ];

  markerClick(marker: any) {
    console.log('makr', marker);
    console.log('type of', typeof marker);

    this.flyTo(marker.geometry.coordinates);
  }

  flyTo(center: mapboxgl.LngLat, zoom = 15.5) {
    this.mapa.flyTo({
      center,
      zoom,
    });
  }

  sideClick(feat) {
    console.log('feat', feat);
    this.flyTo(
      new mapboxgl.LngLat(feat.geocode.Longitude, feat.geocode.Latitude)
    );
    this.selectedFeature = feat;
    this.visibility = 'visible';
    this.gotoListing(feat);
  }

  gotoListing(feat) {
    this.router.navigate(['/map', feat.propertyID], { state: { data: feat } });
  }
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
      this.mapLoaded = true;
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
    this.mapa.on('click', (e) => {
      this.flyTo(e.lngLat);
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
