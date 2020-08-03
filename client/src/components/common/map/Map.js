import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Map = ({ storageLocation }) => {

    useEffect(() => {
        renderMap();
    }, []);

    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCFCHndjQWFP1QHybzn8_OjTtNqMKITiYY&callback=initMap");
        window.initMap = initMap;
    }

    const initMap = () => {
        const markers = []; 
        console.log('MARKERS LENGTH');
        console.log(storageLocation.locations.length);

        console.log('LOCARIONS ARRAY');
        console.log(storageLocation.locations);

        if(storageLocation.locations.length > 0) {
            storageLocation.locations.map((location, index) => {
            
                const latitude = location.location.coordinates[0];
                const longitude = location.location.coordinates[1];
    
                markers.push({
                    coords:{
                        lat: latitude,
                        lng: longitude
                    },
                    content:`<h1>${location.name}</h1>`
                });
            });
        }

        console.log('MARKERS');
        console.log(markers)

        // Map options
        const options = {
            zoom: 10,
            center: {
                lat: storageLocation.locations[0].location.coordinates[0], 
                lng: storageLocation.locations[0].location.coordinates[1]
            }
        }
        
        const map = new window.google.maps.Map(document.getElementById('map'), options);

        // Add markers
        for(var i = 0; i < markers.length; i++) {
            addMarker(markers[i], map)
        }
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
