import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { addLike } from '../../../actions/collectionActions';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';

const CollectionCard = ({ auth: { user }, preview, collection }) => {
    const [collectionImages, setCollectionImages] = useState([]);

    useEffect(() => {
        renderCollectionImages();
      }, [collection.items])


    const renderCollectionImages = async () => {
        setCollectionImages([]);
        try {
            if(collection.items.length > 0) {
                                
                if(collection.items.length === 1){
                    collection.items.slice(0, 3).map(async itemObj => {
                        const res = await axios.get(`/api/products/${itemObj.item}`);
                        let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
                        
                        setCollectionImages(collectionImages => [...collectionImages, (
                            <Fragment>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                                    {res.data.img_gallery[0] && <img style={{width:'100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                                </div>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
    
                                </div>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
    
                                </div>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
    
                                </div>
                            </Fragment>
                        )])       
                    });
                } else if(collection.items.length === 2){
                    collection.items.slice(0, 3).map(async itemObj => {
                        const res = await axios.get(`/api/products/${itemObj.item}`);
                        let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
                        
                        setCollectionImages(collectionImages => [...collectionImages, (
                            <Fragment>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                                    {res.data.img_gallery[0] && <img style={{width:'100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                                </div>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
    
                                </div>
                            </Fragment>
                        )])       
                    });
                } else if(collection.items.length === 3){
                    setCollectionImages(collectionImages => [...collectionImages, (
                        <Fragment>
                            <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                            </div>
                        </Fragment>
                    )]) 
                    collection.items.slice(0, 3).map(async itemObj => {
                        const res = await axios.get(`/api/products/${itemObj.item}`);
                        let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
                        
                        setCollectionImages(collectionImages => [...collectionImages, (
                            <Fragment>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                                    {res.data.img_gallery[0] && <img style={{width:'100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                                </div>
                            </Fragment>
                        )])  
                    });
                } else {
                    collection.items.slice(0, 3).map(async itemObj => {
                        const res = await axios.get(`/api/products/${itemObj.item}`);
                        let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
                        
                        setCollectionImages(collectionImages => [...collectionImages, (
                            <Fragment>
                                <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                                    {res.data.img_gallery[0] && <img style={{width:'100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                                </div>
                            </Fragment>
                        )])       
                    });
                }
                
            } else {
                setCollectionImages([(
                    <Fragment>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                            
                        </div>
                    </Fragment>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    
    // const handleLike = (item) => {
    //     addLike(item._id);

    //     // Check if product already liked by same user
    //     if(item.likes.filter(like => like.user.toString() === user._id).length > 0) {
    //         mixpanel.track("Product Un-Bookmark", {
    //             "Product Name": item.name,
    //             "Product Category": item.category,
    //             // "Product Rating": cartIds,
    //             "Total Likes": item.likes.length - 1,
    //             "Total Comments": item.comments.length,
    //             "Product ID": item._id,
    //         });
            
    //         mixpanel.people.increment("Saved Products", -1);
    //     } else {
    //         mixpanel.track("Product Bookmark", {
    //             "Product Name": item.name,
    //             "Product Category": item.category,
    //             // "Product Rating": cartIds,
    //             "Total Likes": item.likes.length + 1,
    //             "Total Comments": item.comments.length,
    //             "Product ID": item._id,
    //         });
            
    //         mixpanel.people.increment("Saved Products");
    //     }
    // }

    const { _id, name } = collection;

    return (
        <div style={{width:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
            <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                {!collectionImages.length > 0 ? (
                    <Fragment>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>

                        </div>
                        <div style={{width:'100%', height:'100%', overflow:'hidden', borderRadius:'5px', background:'#f4f4f4'}}>
                            
                        </div>
                    </Fragment>
                ) : collectionImages}
            </div>  
            <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                
                <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                {/* <h3>{name}</h3> */}
            </div>
        </div>
    );
}

CollectionCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(CollectionCard);



