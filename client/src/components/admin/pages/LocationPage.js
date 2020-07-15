import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocationById, deleteLocation, addVariant } from '../../../actions/locationActions';
import { setSortedVariants, getStoreVariants } from '../../../actions/variantActions';

import Navbar from '../../Overview/categoryOverview/CategoryOverview';
import Spinner from '../../common/Spinner';
import Modal from 'react-responsive-modal';
import Map from '../../common/map/Map';
import Banner from '../../common/Banner';

import Inventory from '../table/Inventory';
import ShortVariant from '../table/ShortVariant';
import InputTag from '../../common/InputTag/InputTag';


const initialState = {
    file: '',
    name: '',
    tags: ''
};

const LocationPage = ({ 
    getLocationById,
    deleteLocation,
    setSortedVariants,
    getStoreVariants,
    variant,
    match,
    addVariant, 
    location: { 
        location, 
        loading 
    }}) => {
    
    const [formData, setFormData] = useState(initialState);
    const [variantList, setVariantListData] = useState([]);
    const [displayModal, toggleModal] = useState(false);
    const [varTags, setVarTags] = useState([]);
        
    useEffect(() => {
        if(match.params.id) {
            if (!location) getLocationById(match.params.id);
            if (!variant.variants.length > 0) getStoreVariants();
        }

        if (!loading && location) {
            const locationData = { ...initialState };
            for (const key in location) {
                if (key in locationData) locationData[key] = location[key];
            }

            setFormData(locationData);

            const tags = [...locationData.tags];
            console.log(tags);
        }
    }, [loading, getLocationById, location]);
    

    const onSubmit = (e) => {
        e.preventDefault();

        variantList.map(variant => {
            let data = new FormData();
            data.append('id', variant);

            addVariant(data, location._id);
            console.log(variant);
        });
        
    };

    const setModal = () => {
        toggleModal(!displayModal);
    }

    const onAddTag = (tag) => {
        setVarTags([...varTags, tag]);
        filterItems(tag);
        console.log('variants: ' + variant.variants);
    }
    
    const onDeleteTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags.filter ((t) => {
        return (t !== tag);
        });
        setVarTags([...remainingTags]);
        unFilterItems(tag);
    }

    const filterItems = (tag) => {
        let tempVar = [...variant.variants];
        const tags = [...varTags, tag];
        for(var i = 0; i < tags.length; i++) {
            tempVar = tempVar.filter(item => item.tags.includes(tags[i]));
        }
        setSortedVariants(tempVar);
        console.log(variant)
    }

    const unFilterItems = (tag) => {
        let tempVar = [...variant.variants];
        let remainingTags = varTags.filter ((t) => {
            return (t !== tag);
        });
        for(var i = 0; i < remainingTags.length; i++) {
            tempVar = tempVar.filter(item => item.tags.includes(remainingTags[i]));
        }
        setSortedVariants(tempVar);
        console.log(variant)
    }

    const handleItemClick = (newVariant) => {
        if(variantList.filter(variant => variant === newVariant).length > 0) {
            // Get remove index
            const removeIndex = variantList.indexOf(newVariant);

            const newList = variantList.splice(removeIndex, 1);

            setVariantListData([...newList]);
        } else {
            setVariantListData([...variantList, newVariant]);
        }
        console.log('VARIANT');
        console.log(newVariant);
        console.log(variantList);
    }


    let display;

    if(variant.loading) {
        display = <Spinner />
    } else {
        let res = [];
        for(var i = 0; i < formData.tags.length; i++) {
            res = variant.variants.filter(item => item.tags.includes(formData.tags[i]));
        }

        display = (
            <Fragment>
                <div class="content-box container-fluid">
                    <div class="table-responsive table-filter">
                        <section>
                            <p style={{alignSelf: "flex-end"}}>50 Varients</p>
                            <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Manually</button>
                        </section>
                        <Inventory variant={{sortedVariants: [...res], loading: false}} />
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div id="product-content-wrapper">
                <div id="breadcrumb">
                    <nav className="breadcrumb">
                        <ol>
                            <li><b>My Portfolio</b></li>
                        </ol>
                    </nav>
                </div>
                <div class="product-header container-fluid">
                    <h3 style={{color: "black"}}>{location && location.name}</h3>
                    <hr/>
                    <p>Qty 20 in stock for  varients</p>
                    <hr/>
                </div>
                <div class="product-map">
                    <Map />
                </div>
                <div class="product-info">
                    <div class="product-status-box">
                        <div class="product-status-box-title"><p>status</p></div>
                        <div class="product-status-box-stats">
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                        </div>
                    </div>
                    <div class="product-description-box">
                        <ul class="nav-underline">
                            <li><a href="#">Activity</a></li>
                            <li><a href="#" class="active">Info</a></li>
                            <li><a href="#">Location</a></li>
                        </ul>
                        <div class="container-fluid">
                            <ul class="nav-underline secondary">
                                <li><a href="#" class="active">City</a></li>
                                <li><a href="#">State</a></li>
                                <li><a href="#">Country</a></li>
                            </ul>
                        </div>
                        <div class="locations">
                            <ul>Dallas</ul>
                            <ul>Forth Worth</ul>
                            <ul>Allen</ul>
                        </div>

                    </div>
                </div>
                {display}
            </div>

            <Modal open={displayModal} onClose={setModal} center>
                <div style={{display:'flex'}}>
                    <InputTag
                        onAddTag ={onAddTag}
                        onDeleteTag = {onDeleteTag}
                        defaultTags={varTags}  
                        placeholder="enter tags separated by comma"
                    />
                    <button onClick={onSubmit}>Add</button>
                </div>
                
               <ShortVariant variant={variant} handleClick={handleItemClick} variantList={variantList} />
            </Modal>
        </Fragment>
    )
}

LocationPage.propTypes = {
    getLocationById: PropTypes.func.isRequired,
    deleteLocation: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    setSortedVariants: PropTypes.func.isRequired,
    getStoreVariants: PropTypes.func.isRequired,
    addVariant: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    location: state.location,
    variant: state.variant
})

export default connect(mapStateToProps, { getLocationById, deleteLocation, addVariant, setSortedVariants, getStoreVariants })(withRouter(LocationPage));
