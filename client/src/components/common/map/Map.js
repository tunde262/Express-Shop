import React, { useEffect } from 'react';

const Map = () => {

    useEffect(() => {
        renderMap();
    }, []);

    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCFCHndjQWFP1QHybzn8_OjTtNqMKITiYY&callback=initMap");
        window.initMap = initMap;
    }

    const initMap = () => {
        // Map options
        const options = {
            zoom: 6,
            center: {lat:33.0198, lng: -96.6989}
        }
        
        const map = new window.google.maps.Map(document.getElementById('map'), options);

        // Add marker
        var marker = new window.google.maps.Marker({
            position: {lat: 33.050360, lng: -96.834391},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 33.118162, lng: -96.828644},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 26.233853, lng: -98.379058},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 27.817086, lng: -97.067308},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 29.496349, lng: -98.472078},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 32.729442, lng: -97.331810},
            map: map
        });
        var marker = new window.google.maps.Marker({
            position: {lat: 31.832278, lng: -102.367742},
            map: map
        });

        var infoWindow = new window.google.maps.InfoWindow({
            content: '<h3>Product & Fulfiller Info</h3>'
        });

        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
    }
    return (
        <div id="map" className="map"></div>

    )
}

const loadScript = (url) => {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


export default Map;
