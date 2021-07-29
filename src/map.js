import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZWNob3BwZXIiLCJhIjoiY2tybmV1Y2JiMWl5bTJvbGl1c3YxYXRkcyJ9.FaoSTf4KVAj0G_T9yQPqAw';

const chippyLocation = [-1.7806817227247218, 52.41458753868306];

const geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: chippyLocation
      },
      properties: {
        title: 'Kings Chippy & Chinese',
        description: 'We are here!'
      }
    }]
};


export function loadLocation(){
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
    });
}

function successLocation(position){
    setupMap([position.coords.longitude,position.coords.latitude]);
}

function errorLocation(){
    setupMap([-1.778197,52.412811]);
}

function setupMap(center){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: chippyLocation,
        zoom: 18
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    map.on('load', () => {
        document.getElementById('loader').remove();
        const directions = new MapboxDirections({accessToken: mapboxgl.accessToken});
        map.addControl(directions, 'top-left');
        directions.setOrigin(center);
        directions.setDestination(chippyLocation);
        map.flyTo({center: chippyLocation});
    });
    geojson.features.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'marker';
        const newMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
        newMarker.getElement().addEventListener('click', () => {
            
        });
    });
}