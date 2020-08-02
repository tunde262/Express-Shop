import React, { useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Info from './Info';
import Reviews from './Reviews';
import Locations from './Locations';

const TableDetails = ({description, setModal, page}) => {

    const [tableShow1, setTableShow1] = useState('info');
    const [tableShow2, setTableShow2] = useState('locations');
    // const [tableShow2, setTableShow2] = useState('info');

    let pageContent;
    if(page === 'product') {
        pageContent = (
            <ul class="admin-underline">
                <li class={tableShow1 === "info" && "active"} onClick={e => setTableShow1('info')}><i class="fas fa-info"></i></li>
                <li class={tableShow1 === "locations" && "active"} onClick={e => setTableShow1('locations')}><i style={{fontSize:'15px'}} class="fas fa-map-marker-alt"></i></li>
                <li class={tableShow1 === "activity" && "active"} onClick={e => setTableShow1('activity')}><i class="fas fa-list"></i></li>
                <li class={tableShow1 === "notes" && "active"} onClick={e => setTableShow1('notes')}><i className="fas fa-pencil-alt banner-icon"></i></li>
            </ul>
        )
    } else if (page === 'collection') {
        pageContent = (
            <ul class="collection-underline">
                <li class={tableShow2 === "locations" && "active"} onClick={e => setTableShow2('locations')}><i style={{fontSize:'15px'}} class="fas fa-map-marker-alt"></i></li>
                <li class={tableShow2 === "activity" && "active"} onClick={e => setTableShow2('activity')}><i class="fas fa-list"></i></li> 
            </ul>
        )
    } else if(page === 'store') {
        pageContent = (
            <ul class="nav-underline">
                <li class={tableShow1 === "info" && "active"} onClick={e => setTableShow1('info')}><i class="fas fa-info"></i></li>
                <li class={tableShow1 === "photos" && "active"} onClick={e => setTableShow1('photos')}><i class="fas fa-camera"></i></li>
                <li class={tableShow1 === "reviews" && "active"} onClick={e => setTableShow1('reviews')}><i style={{fontSize:'15px'}} class="fas fa-comment-dots"></i></li>
                <li class={tableShow1 === "locations" && "active"} onClick={e => setTableShow1('locations')}><i style={{fontSize:'15px'}} class="fas fa-map-marker-alt"></i></li>
            </ul>
        )
    }

    let tableContent;

    if(tableShow1 === 'info') {
        tableContent = <Info description={description} />;
    } else if (tableShow1 === 'reviews') {
        tableContent = <Reviews setModal={setModal} /> 
    } else if(tableShow1 === 'locations') {
        tableContent = <Locations /> 
    } else if (tableShow1 === 'activity') {
        tableContent = <h1>activity</h1>
    } else if(tableShow1 === 'notes') {
        tableContent = <h1>notes</h1>
    } 

    return (
        <Fragment>
            <div className="nav">
                {pageContent}
                
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
