import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteProduct } from '../../../../actions/productActions';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';

import Modal from 'react-responsive-modal';

import LocationTable from '../LocationTable/LocationTable';
import ShortVarTable from '../ShortVarTable/ShortVarTable';
import Item from './Item';
import InputTag from '../../../common/InputTag/InputTag';
import { getLocationById, getProductLocations } from '../../../../actions/locationActions';
import { setModalVariants } from '../../../../actions/variantActions'


const initialState = {
    sku: '',
    sale_price: '',
    price: '',
    inventory_qty: ''
};

const ItemTable = ({ 
    store, 
    setModal, 
    page, 
    product: {loading, sortedProducts}, 
    getProductLocations,
    getLocationById,
    deleteProduct,
    onAddTag,
    onDeleteTag,
    varTags,
    setModalVariants
}) => {  
    const [formData, setFormData] = useState(initialState);

    const [productList, setProductList] = useState([]);
    const [gotProducts, setGotProducts] = useState(false);

    const [displayMapModal, toggleMapModal] = useState(false);

    const [modalForm1, setModalForm1] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        renderProductList();
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [sortedProducts]);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const {
        sku,
        sale_price,
        price,
        inventory_qty,
    } = formData;

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleToggle = () => {
        toggleMapModal(true)
        // handleMap();
        // getVariantLocations(varId);
    }

    const handleClose = () => {
        toggleMapModal(false);
        setModalForm1(false);
        // handleMap();
    }

    const setVarModal = async (prodId, locId) => {
        setModalForm1(true);
        const res = await axios.get(`/api/variants/product/${prodId}`);
        console.log('PRODUCT VARIANTS');
        console.log(res.data)

        const variantArray = [];

        getLocationById(locId);
        
        if(res.data.length > 0) {
            res.data.map(async variant => {
                for(var i = 0; i < variant.locations.length; i++) {
                  console.log('Location ID');
                  console.log(variant.locations[i].location);

                  if(variant.locations[i].location.toString() === locId) {
                    variantArray.push(variant);
                  }

                  break;
                }
            })
        }

        setModalVariants(variantArray);
    }

    const renderProductList = async () => {
        setProductList([]);
        try {
            if(sortedProducts.length > 0) {
                sortedProducts.map(async product => {
                    if (product) {
                        const res = await axios.get(`/api/variants/product/${product._id}`);
                        setProductList(productList => [...productList, (
                            <Item
                                detailProduct={product}
                                deleteProduct={deleteProduct}
                                itemVariants={res.data}
                                handleToggle={handleToggle}
                                page={page}
                            />
                        )])
                    }
                });
            } else {
                setProductList([(
                    <button>Add Item</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    // if(!gotProducts && !loading && sortedProducts.length > 0) {
    //     renderProductList();
    //     setGotProducts(true);
    // }

    // console.log('PRODCUT LIST DATA');
    // console.log(productList);

    // let productList;
    // if(sortedProducts === null || loading) {
    //     productList = <Spinner />; 
    // } else {
    //     if(sortedProducts.length > 0) {
    //         productList = sortedProducts.map(product => (
    //             <tr className="table-row" key={product._id}>
    //                 <td>
    //                     <input type="checkbox" value=""/>
    //                 </td>
    //                 <td>{product.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${product.img_gallery[0].img_name}`} alt="img" />}</td>
    //                 <td><Link to={"/admin/product/" + store.store._id + "/" + product._id}>{product.name}</Link></td>
    //                 <td>5 Stock / 2 Variants</td>
    //                 <td>{product.price}</td>
    //                 <td><i onClick={() => deleteProduct(product._id)} className="fas fa-trash"></i></td>
    //             </tr>

    //         ));
    //     } else {
    //         productList = <h3>No Items</h3>
    //     }
    // }

    let count;
    if(gotProducts && !loading) {
        count = sortedProducts.length;
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
            {/* {page === 'dashboard' ? (
                <section>
                    <p style={{alignSelf: 'flex-end'}}>{count} Items</p>
                    <Link to="/admin/add-product"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Product</button></Link>
                </section>
            ) : null} */}
            {page !== 'dashboard' ? (
                <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', height:'50px'}}>
                    <button onClick={setModal} style={{width:'100%', background:'#0098d3', margin:'0', borderRadius:'0', borderColor:'#0098d3', height:'100%', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-plus-circle"></i>
                        Add Item
                    </button>
                </div>
            ) : null}
            
            <div className="table">
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
                <div className="tbody">{!productList.length > 0 ? <Spinner /> : productList}</div>
            </div>

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
                            {/* <InputTag
                                onAddTag ={onAddTag}
                                onDeleteTag = {onDeleteTag}
                                defaultTags={varTags}  
                                placeholder="Search products (seperate by comma)"
                            /> */}
                        </div>
                        <div  
                            className={modalForm1 ? "modal-table-top-container active" : "modal-table-top-container"} id="transition-2"
                        >
                            <div onClick={() => setModalForm1(false)} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'0 10px', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <p style={{margin:'0 10px'}}>  Back</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div className={!modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-1">
                            <div className="table-responsive table-filter">
                                <LocationTable 
                                    page="collection" 
                                    setVarModal={setVarModal}
                                    onChange={onChange}
                                />
                            </div>
                            {/* <ShortTable handleClick={handleItemClick} setVarModal={setVarModal} itemList={itemList} setModalForm1={setModalForm1} modalForm1={modalForm1} slide /> */}
                        </div>
                        <div className={modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-2">
                            <ShortVarTable 
                                modalForm={modalForm1}
                                onChange={onChange}
                            />
                            {/* <ShortVarTable handleClick={handleItemClick} itemList={itemList} /> */}
                            {/* <VarLocationTable setModalForm1={setModalForm1} modalForm1={modalForm1} slide /> */}
                        </div>
                    </div>
                </div>
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <button style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Items (0)</button>
                </div>
            </Modal>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ItemTable.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    getProductLocations: PropTypes.func.isRequired,
    setModalVariants: PropTypes.func.isRequired,
    getLocationById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { deleteProduct, getProductLocations, getLocationById, setModalVariants })(ItemTable);
