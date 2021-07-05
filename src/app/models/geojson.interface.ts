export interface IGeoJSON {
  type: string; // 'geojson',
  data: {
    type: string; //'FeatureCollection',
    features: IFeature[];
  };
}

export interface IFeature {
  
    type: string; //'Feature',
    geometry: {
      type: string; //'Point',
      coordinates: any[];
      //Lng, Lat
    };
    properties: {
      title: string; 
    };
  
}
