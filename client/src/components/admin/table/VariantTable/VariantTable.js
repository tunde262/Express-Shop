import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from 'react-responsive-modal';

import { getProductVariants, getVariantById, deleteVariant, editVariant } from '../../../../actions/variantActions';
import { getProductLocations, getVariantLocations } from '../../../../actions/locationActions';
import { handleMap } from '../../../../actions/productActions';

import InputTag from '../../../common/InputTag/InputTag';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';

import Map from '../../../common/map/Map';
import LocationTable from '../LocationTable/LocationTable';
import Variant from './Variant';


const VariantTable = ({ 
    setModal, 
    getProductLocations, 
    getVariantLocations, 
    handleMap, 
    product: {
        switchMaps, 
        detailProduct
    }, 
    location, 
    store,
    page, 
    prodId, 
    locId,
    variant: {
        loading, 
        sortedVariants
    }, 
    getProductVariants, 
    getVariantById,
    deleteVariant,
    editVariant,
    onAddTag,
    onDeleteTag,
    varTags,
    onChange,
}) => {
    const [variantHeader, setVariantHeader] = useState(null);
    const [variantList, setVariantList] = useState([]);
    const [gotVariants, setGotVariants] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [modalForm1, setModalForm1] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderVariantList();
        // if(switchMaps) {
        //     getProductLocations(detailProduct._id);
        // }
        
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [switchMaps, sortedVariants]);

    const [modalShow, handleModal] = useState(false);
    const [displayMapModal, toggleMapModal] = useState(false);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };
    
      const handleToggle = (varId) => {
        toggleMapModal(!displayMapModal)
        handleMap();
        getVariantById(varId);
        // getVariantLocations(varId);
      }

      const handleClose = () => {
          toggleMapModal(!displayMapModal);
          handleMap();
      }
     
      const openModal = () => {
        handleModal(true);
      };

      const closeModal = () => {
        handleModal(false);
      };

      const [tableShow1, setTableShow1] = useState('locations');

    const setTable = (show) => {
        setTableShow1(show)
    }

    let modalContent;

    if(tableShow1 === 'locations') {
        modalContent = (
            <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{fontSize: '1.3rem', fontWeight:'500', margin: ' 0.3rem 0'}}>home</p>
                    <a style={{color:'#808080', marginBottom: '1rem'}}><i class="fas fa-map-marker-alt"></i> plano, tx</a>
                    <p style={{margin: '0'}}>
                        In Stock: 
                        <span style={{fontWeight:'bold', color:'#ff4b2b'}}>5</span>
                    </p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center', marginRight: '10px'}}>
                        <p style={{margin: '0'}}>Deliver</p>
                    </div>
                    <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center'}}>
                        <p style={{margin: '0'}}>Pick Up </p>
                    </div>
                </div>
            </div>
        )
    } else if(tableShow1 === 'activity') {
        modalContent = (
            <h1>activity</h1>
        );
    } else if (tableShow1 === 'notes') {
        modalContent = (
            <h1>notes</h1>
        );
    }

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderVariantList = async () => {
        setVariantList([]);
        try {
            if(sortedVariants.length > 0) {
                if( 
                    sortedVariants[0].color || 
                    sortedVariants[0].size || 
                    sortedVariants[0].weight || 
                    sortedVariants[0].bundle || 
                    sortedVariants[0].type || 
                    sortedVariants[0].scent || 
                    sortedVariants[0].fit || 
                    sortedVariants[0].flavor || 
                    sortedVariants[0].material
                ) {
                    setVariantHeader((
                        <div className="variant-thead">
                            <div></div>
                            <div>Options</div>
                            <div>Stock</div>
                            <div>Price</div>
                            <div>Sale $</div>
                            <div></div>
                        </div> 
                    ))
                    sortedVariants.map(async variant => {
                        if (variant) {
                            if(page === 'inventory') {
                                for(var i = 0; i < variant.locations.length; i++) {
                                    console.log('Location ID');
                                    console.log(variant.locations[i].location);
                
                                    if(variant.locations[i].location.toString() === locId) {
                                        const res = await axios.get(`/api/products/${variant.product}`);
                                        setVariantList(variantList => [...variantList, (
                                            <Variant 
                                                detailVariant={variant} 
                                                prodId={prodId}
                                                handleToggle={handleToggle} 
                                                variantItem={res.data} 
                                                deleteVariant={deleteVariant}
                                                editVariant={editVariant} 
                                                onChange={onChange}
                                                store={store}
                                            />
                                        )])
                                    }
                                    
                                    break;
                                }
                            } else {
                                const res = await axios.get(`/api/products/${variant.product}`);
                                setVariantList(variantList => [...variantList, (
                                    <Variant 
                                        detailVariant={variant} 
                                        prodId={prodId}
                                        handleToggle={handleToggle} 
                                        variantItem={res.data} 
                                        deleteVariant={deleteVariant}
                                        editVariant={editVariant} 
                                        onChange={onChange}
                                        store={store}
                                    />
                                )])
                            }
                        }
                    });
                } else if (sortedVariants[1]) {
                    setVariantHeader((
                        <div className="variant-thead">
                            <div></div>
                            <div>Options</div>
                            <div>Stock</div>
                            <div>Price</div>
                            <div>Sale $</div>
                            <div></div>
                        </div> 
                    ))
                    sortedVariants.slice(1).map(async variant => {
                        if (variant) {
                            if(page === 'inventory') {
                                for(var i = 0; i < variant.locations.length; i++) {
                                    console.log('Location ID');
                                    console.log(variant.locations[i].location);
                
                                    if(variant.locations[i].location.toString() === locId) {
                                        const res = await axios.get(`/api/products/${variant.product}`);
                                        setVariantList(variantList => [...variantList, (
                                            <Variant 
                                                detailVariant={variant} 
                                                prodId={prodId}
                                                handleToggle={handleToggle} 
                                                variantItem={res.data} 
                                                deleteVariant={deleteVariant}
                                                editVariant={editVariant} 
                                                onChange={onChange}
                                                store={store}
                                            />
                                        )])
                                    }
                                    
                                    break;
                                }
                            } else {
                                const res = await axios.get(`/api/products/${variant.product}`);
                                setVariantList(variantList => [...variantList, (
                                    <Variant 
                                        detailVariant={variant} 
                                        prodId={prodId}
                                        handleToggle={handleToggle} 
                                        variantItem={res.data} 
                                        deleteVariant={deleteVariant}
                                        editVariant={editVariant} 
                                        onChange={onChange}
                                        store={store}
                                    />
                                )])
                            }
                        }
                    });
                } else {
                    setVariantList([(
                        <div className="no-rides">
                            <h1>No Variants</h1>
                            <h2>What exactly is a variant? <a href="#">Learn More.</a></h2>
                        </div>
                    )])
                }
            } else {
                setVariantList([(
                    <div className="no-rides">
                        <h1>No Variants</h1>
                        <h2>What exactly is a variant? <a href="#"> Learn More.</a></h2>
                    </div>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotVariants && prodId) {
        getProductVariants(prodId);
        setGotVariants(true);
    }

    let count;
    if(sortedVariants !== null && !loading) {
        if(sortedVariants.length > 0) {
            if(
                sortedVariants[0].color || 
                sortedVariants[0].size || 
                sortedVariants[0].weight || 
                sortedVariants[0].bundle || 
                sortedVariants[0].type || 
                sortedVariants[0].scent || 
                sortedVariants[0].fit || 
                sortedVariants[0].flavor || 
                sortedVariants[0].material
            ) {
                count = sortedVariants.length;
            } else if (sortedVariants[1]){
                count = sortedVariants.length - 1;
            } else {
                count = 0;
            }
        } else {
            count = 0;
        }
    }

    const modalStyles = {
        overlay: {
            height: "100vh",
            width: "100vw",
            overflow: "hidden"
        },
        modal: {
          height: "100vh",
          width: "100vw",
          overflow: "hidden"
        }
    }

    const bg2 = {
        modal: {
            boxShadow: "none",
            borderRadius: "15px",
            border: "1px solid rgb(214, 214, 214)",
            padding: "0"
        },
        closeButton: {
            display: "none"
        },
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    return (
        <Fragment>
            {/* {page === 'product' ? (
                <section>
                    <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button>
                </section>
            ) : null} */}
            {page !== 'dashboard' ? (
                <div onClick={setModal} style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'50px'}}>
                    <p style={{margin:'0 20px', color:'#208cec'}}>{count} Options</p>
                    <button style={{fontSize:'14px', backgroundColor:'#ebf1ff', color:'#3374ff', padding:'7px 16px', border:'1px solid #ebf1ff', borderRadius:'4px', fontWeight:'500', outline:'none', textAlign:'center'}}>
                        {/* <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-plus"></i> */}
                        Add Variant
                    </button>
                </div>
                // <section>
                //     <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                //     <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button>
                // </section>
            ) : null}

            <div className="table">
                {variantHeader}
                <div className="tbody">{!variantList.length > 0 ? <Spinner /> : variantList}</div>
            </div>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
            {/* <Modal styles={modalStyles} open={displayMapModal} onClose={handleClose} center>
                <div className="modal-content-wrapper">
                    <div className="modal-header container-fluid">
                        <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                            <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                            <h3 style={{color: "black"}}>
                                title
                            </h3>
                        </div>
                    </div>
                    <div className="modal-content">
                        <div class="modal-status-box">
                            <div class="modal-status-box-stats">
                                <div>
                                    <img style={{width: '28px'}} src={CarEmoji} alt="img" />
                                    <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                                </div>
                                <div>
                                    <img style={{width: '28px'}} src={ClosedLockEmoji} alt="img" />
                                    <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                                </div>
                                <div>
                                    <img style={{width: '25px'}} src={OpenLockEmoji} alt="img" />
                                    <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                                </div>
                                <div>
                                    <img style={{width: '20px'}} src={BoxEmoji} alt="img" />
                                    <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content-main">
                            <div style={{height:'calc(100vw / 3)', maxHeight:'250px', width:'100%'}}>
                                {location.locations.length > 0 && switchMaps ? (
                                    <Map 
                                        defaultZoom="8"
                                        centerLat={location.locations[0].location.coordinates[0]}
                                        centerLng={location.locations[0].location.coordinates[1]}
                                        markerLat={location.locations[0].location.coordinates[0]}
                                        markerLng={location.locations[0].location.coordinates[1]}
                                    />
                                ) : null} 
                            </div>
                        </div>
                        <div class="modal-content-secondary">
                            <div class="modal-description-box">
                                <div className="nav">
                                    <ul class="nav-underline">
                                        <li class={tableShow1 === "locations" && "active"} onClick={e => setTableShow1('locations')}><i style={{fontSize:'15px'}} class="fas fa-map-marker-alt"></i></li>
                                        <li class={tableShow1 === "activity" && "active"} onClick={e => setTableShow1('activity')}><i class="fas fa-list"></i></li>
                                        <li class={tableShow1 === "notes" && "active"} onClick={e => setTableShow1('notes')}><i className="fas fa-pencil-alt banner-icon"></i></li>
                                    </ul>
                                </div>
                                {modalContent}
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions" style={{display:'flex', width:'100%', justifyContent:'flex-end', alignItems:'center'}}>
                        
                    </div>
                </div> 
            </Modal> */}

            <Modal open={displayMapModal} onClose={handleClose} center styles={bg2}>
                <div className="itemUploadContainer">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', justifyContent:'center', alignItems:'center', height:'40px'}}>
                        <p style={{margin:'0', color:'#0098d3'}}>Variant Details</p>
                    </div>
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div  
                            className={!modalForm1 ? "modal-table-top-container active" : "modal-table-top-container"} id="transition-1"
                        >
                            <InputTag
                                onAddTag ={onAddTag}
                                onDeleteTag = {onDeleteTag}
                                defaultTags={varTags}  
                                placeholder="Search products (seperate by comma)"
                            />
                        </div>
                        <div  
                            className={modalForm1 ? "modal-table-top-container active" : "modal-table-top-container"} id="transition-2"
                        >
                            <div onClick={() => setModalForm1(false)} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'0 10px', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                                <i class="fas fa-long-arrow-alt-left"></i>
                                <p style={{margin:'0 10px'}}>  Back</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div className={!modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-1">
                            <div class="table-responsive table-filter">
                                <LocationTable 
                                    page="variant" 
                                    inventoryNav="locations" 
                                    onChange={onChange}
                                />
                            </div>
                            {/* <ShortTable handleClick={handleItemClick} setVarModal={setVarModal} itemList={itemList} setModalForm1={setModalForm1} modalForm1={modalForm1} slide /> */}
                        </div>
                        <div className={modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-2">
                            {/* <ShortVarTable handleClick={handleItemClick} itemList={itemList} /> */}
                            {/* <VarLocationTable setModalForm1={setModalForm1} modalForm1={modalForm1} slide /> */}
                        </div>
                    </div>
                </div>
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <button style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Items (0)</button>
                </div>
            </Modal>
        </Fragment>
    )
}

VariantTable.propTypes = {
    variant: PropTypes.object.isRequired,
    deleteVariant: PropTypes.func.isRequired,
    editVariant: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
    getVariantById: PropTypes.func.isRequired,
    getVariantLocations: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    getProductLocations: PropTypes.func.isRequired,
    handleMap: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    profile: state.profile,
    variant: state.variant,
    location: state.location,
    store: state.store
});

export default connect(
    mapStateToProps, { 
        getProductVariants, 
        getVariantById, 
        getProductLocations, 
        getVariantLocations, 
        handleMap, 
        deleteVariant,
        editVariant
    }
)(VariantTable);
