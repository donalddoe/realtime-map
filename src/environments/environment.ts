// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

 mapbox: {
    accessToken: 'pk.eyJ1IjoiZG9uYWxkMjYiLCJhIjoiY2txa25wM3VhMDA4bjJucXcyazJydTBodCJ9.lj1pxzzXwYgBmiE0kL6kAQ',
    style: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh'
  },

  mapToken: "5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E",
  baseUrl: 'https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&receipt=undefined',
  detailsUrl: 'https://app.smartapartmentdata.com/List/json/propertyItem.aspx?'
  //listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&propertyID=74015'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
