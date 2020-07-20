import React, { useEffect } from 'react';

const Map = ({centerLat, centerLng}) => {

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
            zoom: 10,
            center: {lat: centerLat, lng: centerLng}
        }

        console.log('CENTER')
        console.log(centerLat)
        
        const map = new window.google.maps.Map(document.getElementById('map'), options);

        // Add marker
        addMarker({
            coords:{lat: centerLat, lng: centerLng},
            content: '<h1>bBob</h1>'
        }, map)
    }

    const addMarker = (props, map) => {
        var marker = new window.google.maps.Marker({
            position: props.coords,
            map: map
        });

        if(props.iconImage) {
            marker.setIcon(props.iconImage)
        }

        if(props.content){
            var infoWindow = new window.google.maps.InfoWindow({
                content: props.content
            });
    
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
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
