import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { getProductVariants, deleteVariant } from '../../../actions/variantActions';
import { getProductLocations } from '../../../actions/locationActions';
import { handleMap } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';

import Map from '../../common/map/Map';

// Imgs
import BoxEmoji from '../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../utils/imgs/car.jpg'; 
import EyeballsEmoji from '../../../utils/imgs/eyeballs.png'; 
import PencilEmoji from '../../../utils/imgs/pencil.png'; 


const Variant = ({ setModal, getProductLocations, handleMap, product: {switchMaps, detailProduct}, location, page, prodId, variant: {loading, sortedVariants}, getProductVariants, deleteVariant }) => {
    const [variantList, setVariantList] = useState([]);
    const [gotVariants, setGotVariants] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderVariantList();
        if(switchMaps) {
            getProductLocations(detailProduct._id);
        }
        
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [switchMaps, sortedVariants]);

    const [modalShow, handleModal] = useState(false);
    const [displayMapModal, toggleMapModal] = useState(false);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };
    
      const handleToggle = () => {
        toggleMapModal(!displayMapModal)
        handleMap();
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
                sortedVariants.map(async variant => {
                    if (variant) {
                        const res = await axios.get(`/api/products/${variant.product}`);
                        setVariantList(variantList => [...variantList, (
                            <div className={isTablet ? "variant-table-row-mobile" : "variant-table-row"} key={variant._id}>
                                {isTablet ? (
                                    <Fragment>
                                        <div>{res.data.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${res.data.img_gallery[0].img_name}`} alt="img" />}</div>
                                        <div>
                                            {variant.color && (<span>{variant.color} </span>)}
                                            {variant.size && (<span>{variant.size} </span>)}
                                            {variant.weight && (<span>{variant.weight} </span>)}
                                            {variant.bundle && (<span>{variant.bundle} </span>)}
                                            {variant.type && (<span>{variant.type} </span>)}
                                            {variant.scent && (<span>{variant.scent} </span>)}
                                            {variant.fit && (<span>{variant.fit} </span>)}
                                            {variant.flavor && (<span>{variant.flavor} </span>)}
                                            {variant.material && (<span>{variant.material} </span>)}
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div>{res.data.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${res.data.img_gallery[0].img_name}`} alt="img" />}</div>
                                        <div>
                                            {variant.color && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.color} </p></div>)}
                                            {variant.size && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.size} </p></div>)}
                                            {variant.weight && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.weight} </p></div>)}
                                            {variant.bundle && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.bundle} </p></div>)}
                                            {variant.type && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.type} </p></div>)}
                                            {variant.scent && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.scent} </p></div>)}
                                            {variant.fit && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.fit} </p></div>)}
                                            {variant.flavor && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.flavor} </p></div>)}
                                            {variant.material && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.material} </p></div>)}
                                        </div>
                                        <div>$5</div>
                                        <div>5</div>
                                        <div>6</div>
                                        <div style={{width:'50px', color:'#ff4b2b'}}><i onClick={() => deleteVariant(variant._id)} className="fas fa-pen"></i></div>
                                    </Fragment>
                                ) }
                            </div>
                        )])
                    }
                });
            } else {
                setVariantList([(
                    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <p>No Variants</p>
                    </div>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }
     

    // let variantList;
    // if(variants === null || loading) {
    //     variantList = <Spinner />; 
    // } else {
    //     if(variants.length > 0) {
    //         variantList = variants.map(variant => {
                // let variantList;
                // if(variant.color) variantList = `${variant.color}`;
                // if(variant.size) variantList = `${variant.color} / ${variant.size}`;
                // if(variant.weight) variantList = `${variant.color} / ${variant.size} / ${variant.weight}`;
                // if(variant.type) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type}`;
                // if(variant.bundle) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle}`;
                // if(variant.scent) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent}`;
                // if(variant.fit) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit}`;
                // if(variant.flavor) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit} / ${variant.flavor}`;
                // if(variant.material) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit} / ${variant.flavor} / ${variant.material}`;

    //             return (
    //                 <tr key={variant._id} onClick={handleToggle}>
    //                     <td><img style={{width: '50px'}} src={`/api/variants/image/${variant.img_name}`} alt="img" /></td>
    //                     <td>
    //                         {variant.color && (<span>{variant.color} </span>)}
    //                         {variant.size && (<span>{variant.size} </span>)}
    //                         {variant.weight && (<span>{variant.weight} </span>)}
    //                         {variant.bundle && (<span>{variant.bundle} </span>)}
    //                         {variant.type && (<span>{variant.type} </span>)}
    //                         {variant.scent && (<span>{variant.scent} </span>)}
    //                         {variant.fit && (<span>{variant.fit} </span>)}
    //                         {variant.flavor && (<span>{variant.flavor} </span>)}
    //                         {variant.material && (<span>{variant.material} </span>)}
    //                     </td>
    //                     <td>{variant.inventory_qty}</td>
    //                     <td>{variant.price}</td>
    //                     <td>{variant.sale_price}</td>
    //                     <td><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></td>
    //                 </tr>
    //             )
    //         });
    //     } else {
    //         variantList = <h3>No Items</h3>
    //     }
    // }

    if(!gotVariants) {
        getProductVariants(prodId);
        setGotVariants(true);
    }

    let count;
    if(sortedVariants !== null && !loading) {
        count = sortedVariants.length;
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

    return (
        <Fragment>
            {/* {page === 'product' ? (
                <section>
                    <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button>
                </section>
            ) : null} */}
            {page !== 'dashboard' ? (
                <div onClick={setModal} style={{display:'flex', justifyContent:'flex-end', alignItems:'center', height:'50px'}}>
                    <button style={{width:'100%', background:'#42b499', margin:'0', borderRadius:'0', borderColor:'#0098d3', height:'100%', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-plus-circle"></i>
                        Add Variant
                    </button>
                </div>
            ) : null}

            <table className="table">
                <div className="variant-thead">
                    <div></div>
                    <div>Options</div>
                    <div>Stock</div>
                    <div>Price</div>
                    <div>Sale $</div>
                    <div></div>
                </div>
                <div className="tbody">{!variantList.length > 0 ? <Spinner /> : variantList}</div>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
            <Modal styles={modalStyles} open={displayMapModal} onClose={handleClose} center>
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
                        {/* Action Buttons */}
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

Variant.propTypes = {
    variant: PropTypes.object.isRequired,
    deleteVariant: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    getProductLocations: PropTypes.func.isRequired,
    handleMap: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    profile: state.profile,
    variant: state.variant,
    location: state.location
});

export default connect(mapStateToProps, { getProductVariants, getProductLocations, handleMap, deleteVariant })(Variant);
