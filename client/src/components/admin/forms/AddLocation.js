import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLocation } from '../../../actions/locationActions';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AddLocation = ({ addLocation, history }) => {
    useEffect(() => {
        
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        tags: '',
        file: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: ''
    });

    const [formattedData, setFormattedData] = useState(null);

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

        let tags = [];

        if(result[0].types && result[0].types.length > 0) {
            result[0].types.map(type => tags.push(type));
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

        let newTags;
        if (Array.isArray(tags)) {
            newTags = tags.join(', ');
        }

        setAddress(value);
        setFormattedData({
            city: (city) ? city : '',
            country: (country) ? country : '',
            area: (area) ? area : '',
            stateProvince: (state) ? state : '',
            street_number: (number) ? number : '',
            formatted_address: (address) ? address : '',
            street_name: (street) ? street : '',
            postalCode: (postalCode) ? postalCode : '',
            placeId: (placeId) ? placeId : '',
            tags: (newTags) ? newTags : '',
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
    

    const { name, street, city, state, zipcode, phone, tags, file } = formData;

    const fileChanged = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formattedData);
    } 

    const onSubmit = (e) => {
        e.preventDefault();
    
        let data = new FormData();
        if(file !== '') data.append('file', file);
        data.append('name', name);
        data.append('street', street);
        data.append('city', city);
        data.append('state', state);
        data.append('zipcode', zipcode);
        data.append('phone', phone);
        data.append('tags', tags);
    
        addLocation(data, history);
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
                        <div className="form-group">
                            <label>Img</label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="form-control"
                                onChange={fileChanged}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Collection Name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <p>Latitude: {coordinates.lat}</p>
                                    <p>Longitude: {coordinates.lng}</p>
                                    <input {...getInputProps({placeholder: "Type Address"})} />

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
                        <div className="form-group">
                            <label>Address</label>
                            <input 
                                type="text"
                                name="street"
                                className="form-control"
                                value={street}
                                onChange={onChange}
                                placeholder="1234 Example Street Drive"
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input 
                                type="text"
                                name="city"
                                className="form-control"
                                value={city}
                                onChange={onChange}
                                placeholder="city"
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input 
                                type="text"
                                name="state"
                                className="form-control"
                                value={state}
                                onChange={onChange}
                                placeholder="state"
                            />
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input 
                                type="text"
                                name="zipcode"
                                className="form-control"
                                value={zipcode}
                                onChange={onChange}
                                placeholder="zipcode"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                                type="text"
                                name="phone"
                                className="form-control"
                                value={phone}
                                onChange={onChange}
                                placeholder="123-456-7890"
                            />
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                placeholder="streetwear, hoodies, joggers..."
                                name="tags"
                                value={tags}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please use comma separated tags (eg. streetwear, hoodies, joggers...)
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Add Collection
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
}

export default connect(null, { addLocation })(AddLocation);
