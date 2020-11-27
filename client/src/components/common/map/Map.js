import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Map = ({ storageLocation }) => {

    useEffect(() => {
        renderMap();
    }, [storageLocation.locations]);

    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAhxRYq5kVL5I2EEuShO9HPSsRrjCA68_4&callback=initMap");
        window.initMap = initMap;
    }

    const initMap = () => {
        const markers = []; 
        if(storageLocation) {
            console.log('MARKERS LENGTH');
            console.log(storageLocation.locations.length);

            console.log('LOCARIONS ARRAY');
            console.log(storageLocation.locations);
        }

        if(storageLocation && storageLocation.locations.length > 0) {
            storageLocation.locations.map((location, index) => {
                if(location.location) {
                    const latitude = location.location.coordinates[0];
                    const longitude = location.location.coordinates[1];
        
                    markers.push({
                        coords:{
                            lat: latitude,
                            lng: longitude
                        },
                        content:`<h1>${location.name}</h1>`
                    });
                }
            });
        }

        console.log('MARKERS');
        console.log(markers)

        // Map options
        let options;
        if(storageLocation && storageLocation.locations.length > 0) { 
            if(storageLocation.locations[0].location) {
                options = {
                    zoom: 10,
                    center: {
                        lat: storageLocation.locations[0].location.coordinates[0], 
                        lng: storageLocation.locations[0].location.coordinates[1]
                    },
                    disableDefaultUI: true
                }
                calculateDistance(storageLocation)
            }
        } else {
            options = {
                zoom: 10,
                center: {
                    lat: 32.776664, 
                    lng: -96.796988
                },
                disableDefaultUI: true
            }
        }
        
        const map = new window.google.maps.Map(document.getElementById('map'), options);


        // Add markers
        for(var i = 0; i < markers.length; i++) {
            addMarker(markers[i], map)
        }
    }

    const calculateDistance = (storageLocation) => {
        console.log('CALCULATING DISTANCE HERE!!!')
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [storageLocation.locations[0].formatted_address],
            destinations: ["300 Rivercrest Blvd, Allen, TX 75002, USA"],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.IMPERIAL, // miles and feet.
            // unitSystem: window.google.maps.UnitSystem.METRIC, // kilometers and meters.
            avoidHighways: false,
            avoidTolls: false
        }, (response, status) => {
            if(status != window.google.maps.DistanceMatrixStatus.OK) {
                console.log('ERROR DISTANCE MATRIX')
            } else {
                const origin = response.originAddresses[0];
                const destination = response.destinationAddresses[0];
                if(response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    console.log('NO ROADS BETWEEN');
                } else {
                    const distance = response.rows[0].elements[0].distance;
                    const duration = response.rows[0].elements[0].duration;
                    console.log('RESPONSE OBJECT HERE:')
                    console.log(response.rows[0].elements[0])
                    console.log('DISTANCE HERE:')
                    console.log(response.rows[0].elements[0].distance)
                    console.log('DURATION HERE:')
                    console.log(response.rows[0].elements[0].duration)
                    const distance_in_kilo = distance.value / 1000;
                    const distance_in_mile = distance.value / 1609.34;
                    const duration_text = duration.text;
                    const duration_value = duration.value;

                    console.log('DISTANCE IN KILO HERE:')
                    console.log(distance_in_kilo.toFixed(2));
                    console.log('DISTANCE IN MILES HERE:')
                    console.log(distance_in_mile.toFixed(2));
                    console.log('DURATION TEXT HERE:')
                    console.log(duration_text);
                    console.log('DURATION VALUE HERE:')
                    console.log(duration_value);
                    console.log('FROM ORIGIN HERE:')
                    console.log(origin);
                    console.log('DESTINATION ORIGIN HERE:')
                    console.log(destination);
                }
            }
        })
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
