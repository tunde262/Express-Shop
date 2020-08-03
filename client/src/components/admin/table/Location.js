import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLocationsByStoreId, deleteLocation } from '../../../actions/locationActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Location = ({ location: {loading, locations}, store, getLocationsByStoreId, deleteLocation }) => {
    useEffect(() => {
        getLocationsByStoreId(store.store._id);
      }, [])

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };
     

    let locationList;
    if(locations === null || loading) {
        locationList = <Spinner />; 
    } else {
        if(locations.length > 0) {
            locationList = locations.map(location => (
                <tr key={location._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td><Link to={"/admin/location/" + store.store._id + "/" + location._id}>{location.name}</Link></td>
                    <td>{location.qty}</td>
                    <td>
                        {location.tags.map( (tag, index) => (  
                            <p key={index}>{tag}{' '}</p>
                            )
                        )}
                    </td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <i onClick={() => deleteLocation(location._id)} className="fas fa-trash"></i></td>
                </tr>

            ));
        } else {
            locationList = <h3>No Locations</h3>
        }
    }

    return (
        <Fragment>
            <section>
                <p style={{alignSelf: 'flex-end'}}>40 locations</p>
                <Link to="/admin/add-location" style={{background: '#42b499', color:'#fff'}} className="btn">Add Location</Link>
            </section>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" value=""/>
                        </th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Tag(s)</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{locationList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <CollectionForm />
            </Modal> */}
        </Fragment>
    )
}

Location.propTypes = {
    location: PropTypes.object.isRequired,
    deleteLocation: PropTypes.func.isRequired,
    getLocationsByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    location: state.location,
    store: state.store
})

export default connect(mapStateToProps, { getLocationsByStoreId, deleteLocation })(Location);
