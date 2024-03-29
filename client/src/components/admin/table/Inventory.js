import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getStoreVariants, deleteVariant } from '../../../actions/variantActions';

import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';

import VariantTagList from './common/VariantTagList';


const Inventory = ({ page, setModal, store, variant: {loading, sortedVariants}, deleteVariant }) => {
    // const [modalShow, setModal] = useState(false);
     
    // const openModal = () => {
    // setModal(true);
    // };

    // const closeModal = () => {
    // setModal(false);
    // };

    const [variantList, setVariantList] = useState([]);
    const [gotVariants, setGotVariants] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderVariantList();

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [sortedVariants]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

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
                            <div className={isTablet ? "inventory-table-row-mobile" : "inventory-table-row"} key={variant._id}>
                                {isTablet ? (
                                    <Fragment>
                                        <div className="table-row-img">{res.data.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${res.data.img_gallery[0].img_name}`} alt="img" />}</div>
                                        <div>
                                            <Link 
                                                to={{pathname:`/admin/product/${store.store._id}/${res.data._id}`,search: "?show=detail"}} 
                                                className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}
                                            >
                                                {variant.name}
                                            </Link>
                                            <VariantTagList variant={variant} />
                                            <div style={{marginTop:'2px'}}>${variant.price}</div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div>
                                            <input type="checkbox" value=""/>
                                        </div>
                                        <div className="table-row-img">{res.data.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${res.data.img_gallery[0].img_name}`} alt="img" />}</div>
                                        <div>
                                            <Link 
                                                to={{pathname:`/admin/product/${store.store._id}/${res.data._id}`,search: "?show=detail"}} 
                                                className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}
                                            >
                                                {variant.name}
                                            </Link>
                                            <VariantTagList variant={variant} />
                                            <div style={{marginTop:'5px'}}>${variant.price}</div>
                                        </div>
                                        <div>{variant.inventory_qty}</div>
                                        <div>0</div>
                                        <div style={{width:'50px'}}><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></div>
                                    </Fragment>
                                ) }
                            </div>
                        )])
                    }
                });
                
                setGotVariants(true);
            } else {
                setVariantList([(
                    <div className="no-rides">
                        <h1>No Variants</h1>
                        <h2>No item variants to display yet. <a href="#">Need Help?</a></h2>
                    </div>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }
     

    // let variantList;
    // if(sortedVariants === null || loading) {
    //     variantList = <Spinner />; 
    // } else {
    //     if(sortedVariants.length > 0) {
    //         variantList = sortedVariants.map(variant => (
    //             <tr key={variant._id}>
    //                 <td>
    //                     <input type="checkbox" value=""/>
    //                 </td>
    //                 <td></td>
    //                 <td><Link to={"/admin/variant/" + variant._id}>{variant.name}</Link></td>
    //                 <td>5 Stock / 2 Variants</td>
    //                 <td>{variant.price}</td>
    //                 <td><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></td>
    //             </tr>

    //         ));
    //     } else {
    //         variantList = <h3>No Items</h3>
    //     }
    // }

    let count;
    if(sortedVariants !== null && !loading) {
        count = sortedVariants.length;
    }

    return (
        <Fragment>
            {/* {page === 'dashboard' ? (
                <section>
                    <p style={{alignSelf: 'flex-end'}}>{count} Variants</p>
                    <Link to="/admin/add-variant"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button></Link>
                </section>
            ) : null} */}
            {page === 'location' ? (
                <div onClick={setModal} style={{display:'flex', justifyContent:'flex-end', alignItems:'center', height:'50px'}}>
                    <button style={{width:'100%', background:'#42b499', margin:'0', borderRadius:'0', borderColor:'#0098d3', height:'100%', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-plus-circle"></i>
                        Add Item
                    </button>
                </div>
                // <section>
                //     <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                //     <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Manually</button>
                // </section>
            ) : null}
            <div className="table">
                {gotVariants && (
                    <div className="thead">
                        {!isTablet && (
                            <Fragment>
                                <div>
                                    <input type="checkbox" value=""/>
                                </div>
                                <div><p>Img</p></div>
                                <div><p>Name</p></div>
                                <div><p>Awaiting</p></div>
                                <div><p>Sold</p></div>
                                <div></div>
                            </Fragment>
                        )}
                    </div>
                )}
                <div className="tbody">{!variantList.length > 0 ? <Spinner /> : variantList}</div>
            </div>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

Inventory.propTypes = {
    deleteVariant: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    store: state.store,
    variant: state.variant
})

export default connect(mapStateToProps, { deleteVariant })(Inventory);
