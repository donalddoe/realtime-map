export interface IGeoJSON {
  type: string; // 'geojson',
  data: {
    type: string; //'FeatureCollection',
    features: IFeature[];
  };
}

export interface IFeature {
  
    // feature for Mapbox DC
    type: string; //'Feature',
    geometry: {
      type: string; //'Point',
      coordinates: any[];
      //-77.03238901390978, 38.913188059745586
    };
    properties: {
      title: string; //'Mapbox DC'
    };
  
}
