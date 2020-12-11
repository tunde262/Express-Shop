import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const ShortLocation = ({ storageLocation: {loading, locations}, store, handleClick, itemList }) => {  
    const [listForColor, setListForColor] = useState([]);
    const [colorSwitch, setColorSwitch] = useState(false);

    const itemClick = (newItem) => {
        handleClick(newItem);
        setColorSwitch(!colorSwitch)
        if(listForColor.includes(newItem)) {
            // Get remove index
            const removeIndex = listForColor.indexOf(newItem);

            const newList = listForColor.splice(removeIndex, 1);

            setListForColor([...newList]);
        } else {
            setListForColor([...listForColor, newItem]);
        }
    }

    let locationList;
    if(locations === null || loading) {
        locationList = <Spinner />; 
    } else {
        if(locations.length > 0) {
            
            locationList = locations.map(location => {
                let rowStyle;
                if(listForColor.includes(location._id)){
                    rowStyle = {background: 'rgb(0,0,255,0.2)'};
                }
                if(listForColor.includes(!location._id)){
                    rowStyle = {background: 'rgb(0,0,0,0)'};
                }

                return (
                    <tr key={location._id} style={rowStyle} onClick={() => itemClick(location._id)}>
                        <td>
                            <input class="edit_info" type="checkbox" style={{width:'15px'}}/>
                        </td>
                        <td><a href={`https://www.cardboardexpress.com/admin/location/${store.store._id}/${location._id}`}>{location.name}</a></td>
                        <td>120</td>
                    </tr>
                )

            });
        } else {
            locationList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="name1" />
                        </th>
                        <th>Name</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>{locationList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ShortLocation.propTypes = {
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, null)(ShortLocation);
