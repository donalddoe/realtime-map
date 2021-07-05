export interface IGeoJSON {
  
    'type': string; // 'geojson',
    'data': {
      'type': string;//'FeatureCollection',
    'features': [
      {
      // feature for Mapbox DC
      'type': string;//'Feature',
      'geometry': {
        'type': string;//'Point',
        'coordinates': number [
        //-77.03238901390978, 38.913188059745586
        ]
      },
      'properties': {
        'title': string;//'Mapbox DC'
      }
      }
    ]
    }
    
}