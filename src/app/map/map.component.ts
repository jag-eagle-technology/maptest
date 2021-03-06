import { Component, OnInit } from '@angular/core';
import * as esriVector from 'esri-leaflet-vector';
import * as esriLeaflet from 'esri-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = L.map('map').setView([-41.09, 174.88], 5);
    const map2 = L.map('map2').setView([-41.09, 174.88], 5);
    const map3 = L.map('map3').setView([-41.09, 174.88], 5);
    // hillshade
    var hillshadeLayer = esriLeaflet.tiledMapLayer({
      // url: 'https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
      maxNativeZoom: 13
    });
    hillshadeLayer.addTo(map);
    var hillshadeLayer2 = esriLeaflet.tiledMapLayer({
      // url: 'https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
      maxNativeZoom: 13
    });
    hillshadeLayer2.addTo(map2);
    // raster toplevel
    var rasterBasemap = esriLeaflet.tiledMapLayer({
      // url: 'https://tiles.arcgis.com/tiles/hLRlshaEMEYQG5A8/arcgis/rest/services/niwa_png_nz_0_13_v2/MapServer',
      // url: 'https://tiles.arcgis.com/tiles/fp1tibNcN9mbExhG/arcgis/rest/services/NIWA_Weather_Basemap/MapServer',
      url: 'https://tiles.arcgis.com/tiles/hLRlshaEMEYQG5A8/arcgis/rest/services/niwa_contours_v3_credits/MapServer',
      maxZoom: 13
    });
    rasterBasemap.addTo(map);
    var rasterBasemap2 = esriLeaflet.tiledMapLayer({
      // url: 'https://tiles.arcgis.com/tiles/hLRlshaEMEYQG5A8/arcgis/rest/services/niwa_png_nz_0_13_v2/MapServer',
      // url: 'https://tiles.arcgis.com/tiles/fp1tibNcN9mbExhG/arcgis/rest/services/NIWA_Weather_Basemap/MapServer',
      url: 'https://tiles.arcgis.com/tiles/hLRlshaEMEYQG5A8/arcgis/rest/services/niwa_contours_v3_credits/MapServer',
      maxZoom: 13
    });
    rasterBasemap2.addTo(map3);
    // vector detailed
    var vectorBasemap = esriVector.vectorTileLayer('93b8c97a705340fc8c12ec0c2ab95379', {minZoom: 13});
    // vectorBasemap.addTo(map);
    map.on('zoomend', function () {
      var zoomLevel = map.getZoom();
      console.log(`zoom is ${zoomLevel}`);
      if (zoomLevel >= 13) {
        if (!map.hasLayer(vectorBasemap)){
          console.log('adding layer');
          vectorBasemap.addTo(map);
        }
      }
      else {
        if (map.hasLayer(vectorBasemap)) {
          console.log('removing layer');
          vectorBasemap.remove();
        }
      }
    })
  }

}
