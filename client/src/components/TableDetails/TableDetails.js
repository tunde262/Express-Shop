import React, { useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Info from './Info';
import Reviews from './Reviews';
import Locations from './Locations';

const TableDetails = ({description, setModal}) => {

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
                <ul class="nav-underline">
                    <li><a class={tableShow1 === "info" && "active"} onClick={e => setTableShow1('info')}>Info</a></li>
                    <li><a class={tableShow1 === "reviews" && "active"} onClick={e => setTableShow1('reviews')}>reviews</a></li>
                    <li><a class={tableShow1 === "photos" && "active"} onClick={e => setTableShow1('photos')}>Photos</a></li>
                    <li><a class={tableShow1 === "locations" && "active"} onClick={e => setTableShow1('locations')}>Locations</a></li>
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
