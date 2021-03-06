import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';

const initMapbox = () => {

  const mapElement = document.getElementById('map');

  // ###########################################################################
  const fitMapToMarkers = (map, markers) => {

    const bounds = new mapboxgl.LngLatBounds();

    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  };
  // ###########################################################################


  // ###########################################################################
  if (mapElement) { // only build a map if there's a div#map to inject into

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {

      // Create an instance of popup
      const popup = new mapboxgl.Popup().setHTML(marker.info_window);

      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        // Set that popup on the marker
        .setPopup(popup)
        .addTo(map);
    });

    fitMapToMarkers(map, markers);

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                      mapboxgl: mapboxgl }));

  }
  // ###########################################################################

}

export { initMapbox }
