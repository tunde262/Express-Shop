import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCollectionById, deleteCollection, addItem } from '../../../actions/collectionActions';
import { setSortedProducts, getStoreProducts } from '../../../actions/productActions';

import Navbar from '../../Overview/categoryOverview/CategoryOverview';
import Spinner from '../../common/Spinner';
import Modal from 'react-responsive-modal';
import Map from '../../common/map/Map';
import Banner from '../../common/Banner';

import Item from '../table/Item';
import ShortItem from '../table/ShortItem';
import InputTag from '../../common/InputTag/InputTag';


const initialState = {
    file: '',
    name: '',
    tags: ''
};

const CollectionPage = ({ 
    getCollectionById,
    deleteCollection,
    setSortedProducts,
    getStoreProducts,
    product,
    match,
    addItem, 
    collection: { 
        collection, 
        loading 
    }}) => {
    
    const [formData, setFormData] = useState(initialState);
    const [itemList, setItemListData] = useState([]);
    const [displayModal, toggleModal] = useState(false);
    const [varTags, setVarTags] = useState([]);
        
    useEffect(() => {
        if(match.params.id) {
            if (!collection) getCollectionById(match.params.id);
            if (!product.products) getStoreProducts();
        }

        if (!loading && collection) {
            const collectionData = { ...initialState };
            for (const key in collection) {
                if (key in collectionData) collectionData[key] = collection[key];
            }

            setFormData(collectionData);

            const tags = [...collectionData.tags];
            console.log(tags);
        }
    }, [loading]);
    

    const onSubmit = (e) => {
        e.preventDefault();

        itemList.map(item => {
            let data = new FormData();
            data.append('id', item);

            addItem(data, collection._id);
            console.log(item);
        });
        
    };

    const setModal = () => {
        toggleModal(!displayModal);
    }

    const onAddTag = (tag) => {
        setVarTags([...varTags, tag]);
        filterItems(tag);
        console.log('products: ' + product.products);
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
        let tempProd = [...product.products];
        const tags = [...varTags, tag];
        for(var i = 0; i < tags.length; i++) {
            tempProd = tempProd.filter(prod => prod.tags.includes(tags[i]));
        }
        setSortedProducts(tempProd);
        console.log(product)
    }

    const unFilterItems = (tag) => {
        let tempProd = [...product.products];
        let remainingTags = varTags.filter ((t) => {
            return (t !== tag);
        });
        for(var i = 0; i < remainingTags.length; i++) {
            tempProd = tempProd.filter(prod => prod.tags.includes(remainingTags[i]));
        }
        setSortedProducts(tempProd);
        console.log(product)
    }

    const handleItemClick = (newItem) => {
        if(itemList.filter(item => item === newItem).length > 0) {
            // Get remove index
            const removeIndex = itemList.indexOf(newItem);

            const newList = itemList.splice(removeIndex, 1);

            setItemListData([...newList]);
        } else {
            setItemListData([...itemList, newItem]);
        }
        console.log('ITEM');
        console.log(newItem);
        console.log(itemList);
    }


    let display;

    if(product.loading) {
        display = <Spinner />
    } else {
        let res = [];
        for(var i = 0; i < formData.tags.length; i++) {
            res = product.products.filter(prod => prod.tags.includes(formData.tags[i]));
        }

        display = (
            <Fragment>
                <div class="content-box container-fluid">
                    <div class="table-responsive table-filter">
                        <Item setModal={setModal} page="collection" product={{sortedProducts: [...res], loading: false}} />
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
                    <h3 style={{color: "black"}}>{collection && collection.name}</h3>
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
                
               <ShortItem product={product} handleClick={handleItemClick} itemList={itemList} />
            </Modal>
        </Fragment>
    )
}

CollectionPage.propTypes = {
    getCollectionById: PropTypes.func.isRequired,
    deleteCollection: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    getStoreProducts: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product
})

export default connect(mapStateToProps, { getCollectionById, deleteCollection, addItem, setSortedProducts, getStoreProducts })(withRouter(CollectionPage));
