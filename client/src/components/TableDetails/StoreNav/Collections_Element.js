import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';

import sampleShoe from '../../../utils/imgs/20484728.jpeg';
import paperTowels from '../../../utils/imgs/paper_towels.jpeg';

const Collections_Element = ({
    setCollectionModal,
    displayCollectionModal,
    collection,
    auth
}) => {

    const [active, setActive] = useState(false);

    const [collectionList, setCollectionList] = useState([]);

    useEffect(() => {
        renderCollectionList();
      }, [collection.profile_collections, auth.user])


    const renderCollectionList = () => {
        setCollectionList([]);
        try {
            if(collection.profile_collections.length > 0) {
                collection.profile_collections.map(collectionObj => {
                    setCollectionList(collectionList => [...collectionList, (
                        <a href={`https://www.cardboardexpress.com/collection/${collectionObj._id}`}>
                            <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                                <div className="store-nav-collection-img-container">
                                    <i style={{fontSize:'18px'}} class="fas fa-list-ul"></i>
                                    {/* <div className="store-nav-collection-img"> */}
                                        {/* <img 
                                            alt="" 
                                            style={{width:'100%'}}
                                            src={sampleShoe}
                                        /> */}
                                    {/* </div> */}
                                    {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        1
                                    </span> */}
                                </div>
                                <div style={{lineHeight:'20px'}}>
                                    <p style={{margin:'0', fontSize:'15px', fontWeight:'600'}}>{collectionObj.name}</p>
                                <p style={{margin:'0', color: '#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>
                                    {collectionObj.items.length} items {collectionObj.visible && (
                                        <span style={{margin:'0', color: '#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>| {collectionObj.likes.length} followers</span>
                                    )}
                                </p>
                                </div>
                            </div>
                        </a>
                    )])       
                });
            } else {
                setCollectionList([(
                    <p style={{margin:'0'}}>No Collections</p>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{zIndex:'10'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header-btn">
                <h3 style={{fontWeight:'600'}}>Collection</h3>
                <small onClick={() => setCollectionModal(!displayCollectionModal)}><i class="fas fa-plus"></i>Create</small>
            </div>
            <div className={active ? "table-nav-dropdown active" : "table-nav-dropdown short"}>
                {!collectionList.length > 0 ? <Spinner /> : collectionList}
            </div>
            <div onClick={() => setActive(!active)} style={{display:'flex', alignItems:'center', color:'#808080'}} className="store-table-nav-items action">
                {active ? (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-up"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show less</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show 4 more</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

Collections_Element.propTypes = {
    collection: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
    auth: state.auth
});

export default connect(mapStateToProps, null)(Collections_Element);
