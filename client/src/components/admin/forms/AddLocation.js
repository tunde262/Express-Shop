import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLocation } from '../../../actions/locationActions';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import mixpanel from 'mixpanel-browser';

const AddLocation = ({ addLocation, store, history }) => {
    useEffect(() => {
        
    }, []);

    const [fileData, setFileData] = useState({
        file: ''
    });

    const [formattedData, setFormattedData] = useState({
        name: '',
        city: '',
        country: '',
        area: '',
        stateProvince: '',
        street_number: '',
        formatted_address: '',
        street_name: '',
        postalCode: '',
        placeId: '',
        location_tags: '',
        tags: '',
        latLng: ''
    });

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null, 
        lng: null
    });


    const handleSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0])
        console.log(result);
        console.log(latLng);

        let locationTags = [];

        if(result[0].types && result[0].types.length > 0) {
            result[0].types.map(type => locationTags.push(type));
        };
        const address = result[0].formatted_address;
        const placeId = result[0].place_id;
        const addressArray =  result[0].address_components;
        const city = getCity(addressArray);
        const country = getCountry(addressArray );
        const area = getArea(addressArray);
        const state = getState(addressArray);
        const postalCode = getPostalCode(addressArray);
        const street = getStreet(addressArray);
        const number = getNumber(addressArray);


        console.log('city: ' + city);
        console.log('country: ' + country);
        console.log('area: ' + area);
        console.log('state: ' + state);
        console.log('number: ' + number);
        console.log('street: ' + street);
        console.log('postalCode: ' + postalCode);
        console.log("formatted address: " + address);
        console.log("placeId: " + placeId);
        console.log("tags: ")
        console.log(tags);
        console.log("location tags: ")
        console.log(locationTags);

        let newTags;
        if (Array.isArray(locationTags)) {
            newTags = locationTags.join(', ');
        }

        setAddress(value);
        setFormattedData({
            name: (name) ? name : '',
            city: (city) ? city : '',
            country: (country) ? country : '',
            area: (area) ? area : '',
            stateProvince: (state) ? state : '',
            street_number: (number) ? number : '',
            formatted_address: (address) ? address : '',
            street_name: (street) ? street : '',
            postalCode: (postalCode) ? postalCode : '',
            placeId: (placeId) ? placeId : '',
            location_tags: (newTags) ? newTags : '',
            tags: '',
            latLng: `${latLng.lat}, ${latLng.lng}`
        })
        setCoordinates(latLng);
    };

    const getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};

	const getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'administrative_area_level_2' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
    };
    
    const getCountry = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'country' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
    };

    const getPostalCode = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'postal_code' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
    };

	const getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
    };
    
    const getNumber = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
    };
    
    const getStreet = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
    

    const { file } = fileData;
    const { 
        name, 
        street_number, 
        formatted_address, 
        street_name, 
        placeId, 
        stateProvince, 
        city, 
        state, 
        country, 
        area, 
        postalCode, 
        phone, 
        location_tags,
        tags,
        latLng
    } = formattedData;

    const fileChanged = e => {
        setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
    }
    
    const onChange = e => {
        setFormattedData({ ...formattedData, [e.target.name]: e.target.value });
        console.log(formattedData);
    } 

    const onSubmit = (e) => {
        e.preventDefault();
    
        let data = new FormData();
        if(file !== '') data.append('file', file);
        if(name !== '')data.append('name', name);
        if(street_name !== '')data.append('street_name', street_name);
        if(street_number !== '')data.append('street_number', street_number);
        if(city !== '')data.append('city', city);
        if(state !== '')data.append('state', state);
        if(postalCode !== '')data.append('postalCode', postalCode);
        if(country !== '')data.append('country', country);
        if(area !== '')data.append('area', area);
        if(placeId !== '')data.append('placeId', placeId);
        if(stateProvince !== '')data.append('stateProvince', stateProvince);
        if(formatted_address !== '')data.append('formatted_address', formatted_address);
        if(tags !== '')data.append('tags', tags);
        if(location_tags !== '')data.append('location_tags', location_tags);
        if(phone !== '')data.append('phone', phone);
        if(latLng !== '')data.append('coordinates', latLng);
    
        addLocation(data, store.store._id, history);

        mixpanel.track("Add Location Page Completed", {
            "Location Name": name,
            "Location City": city,
            "location Zipcode": postalCode,
            "Store Name": store.name,
            "Creation Date": new Date().toISOString(), 
        });
    };

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Add Location
                    </h1>   
                    <form onSubmit={onSubmit}>
                        <label>Img</label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={fileChanged}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name this location"
                            value={name}
                            onChange={onChange}
                        />
                        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input {...getInputProps({placeholder: "Address"})} />

                                    <div>
                                        {loading ? (
                                            <div>...loading</div>
                                        ) : null} 

                                        {suggestions.map((suggestion) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                            }
                                            console.log(suggestion)
                                            return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                            <input 
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                placeholder="Phone Number"
                            />
                            <input
                                type="text"
                                placeholder="Tags"
                                name="tags"
                                value={tags}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please use comma separated tags (eg. Nike Store, Warehouse1, Mom's House...)
                            </small>
                        <button type="submit" className="btn btn-primary btn-block">
                            Add Location
                        </button>
                    </form>
                    <p className="lead mt-4"><Link to="/admin">Back to admin</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

AddLocation.propTypes = {
    addLocation: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    store: state.store
});

export default connect(mapStateToProps, { addLocation })(AddLocation);
