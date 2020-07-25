import React, { useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Info from './Info';
import Reviews from './Reviews';
import Locations from './Locations';

const TableDetails = ({description, setModal, admin}) => {

    const [tableShow1, setTableShow1] = useState('info');
    // const [tableShow2, setTableShow2] = useState('info');

    let tableContent;

    if(tableShow1 === 'info') {
        tableContent = <Info description={description} />;
    } else if (tableShow1 === 'reviews') {
        tableContent = <Reviews setModal={setModal} /> 
    } else if(tableShow1 === 'locations') {
        tableContent = <Locations /> 
    } 
    return (
        <Fragment>
            <div className="nav">
                <ul class={admin ? "admin-underline" : "nav-underline"}>
                    <li class={tableShow1 === "info" && "active"} onClick={e => setTableShow1('info')}><i class="fas fa-info"></i><p>Info</p></li>
                    <li class={tableShow1 === "photos" && "active"} onClick={e => setTableShow1('photos')}><i class="fas fa-camera"></i><p>Photos</p></li>
                    <li class={tableShow1 === "reviews" && "active"} onClick={e => setTableShow1('reviews')}><i style={{fontSize:'15px'}} class="fas fa-comment-dots"></i><p>Reviews</p></li>
                    <li class={tableShow1 === "locations" && "active"} onClick={e => setTableShow1('locations')}><i style={{fontSize:'15px'}} class="fas fa-map-marker-alt"></i><p>Locations</p></li>
                </ul>
                {/* <ul class="nav-underline secondary">
                    <li><a href="#" class="active">City</a></li>
                    <li><a href="#">State</a></li>
                    <li><a href="#">Country</a></li>
                </ul> */}
            </div>
            {tableContent}
            
        </Fragment>
    )
}

TableDetails.propTypes = {

}

export default TableDetails
