import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Item = ({ store, setModal, page, product: {loading, sortedProducts}, deleteProduct }) => {  

    const [productList, setProductList] = useState([]);
    const [gotProducts, setGotProducts] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        renderProductList();
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [sortedProducts]);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderProductList = async () => {
        setProductList([]);
        try {
            if(sortedProducts.length > 0) {
                sortedProducts.map(async product => {
                    if (product) {
                        const res = await axios.get(`/api/variants/product/${product._id}`);
                        setProductList(productList => [...productList, (
                            <div className={isTablet ? "table-row-mobile" : "table-row"} key={product._id}>
                                {isTablet ? (
                                    <Fragment>
                                        <Link className="table-row-img" to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}><div>{product.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${product.img_gallery[0].img_name}`} alt="img" />}</div></Link>
                                        <Link to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}>
                                            <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{product.name}</div>
                                            <div><p style={{margin:'0'}}><span style={{color:'#ff4b2b', fontSize:'14px'}}>{product.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{res.data.length}</span> Variants</p></div>
                                            <div><p style={{margin:'0'}}>${product.price}</p></div>
                                        </Link>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div>
                                            <input type="checkbox" value=""/>
                                        </div>
                                        <Link className="table-row-img" to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}><div>{product.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${product.img_gallery[0].img_name}`} alt="img" />}</div></Link>
                                        <Link to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}>
                                            <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{product.name}</div>
                                            <div><span style={{color:'#ff4b2b', fontSize:'14px'}}>{product.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{res.data.length}</span> Variants</div>
                                            <div>${product.price}</div>
                                        </Link>
                                        <Link to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}><div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden'}}>5</div></Link>
                                        <Link to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}><div>6</div></Link>
                                        <Link to={{pathname:`/admin/product/${store.store._id}/${product._id}`,search: "?show=detail"}}><div style={{width:'50px'}}><i onClick={() => deleteProduct(product._id)} className="fas fa-trash"></i></div></Link>
                                    </Fragment>
                                ) }
                            </div>
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
                        <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-plus-circle"></i>
                        Add Item
                    </button>
                </div>
            ) : null}
            
            <table className="table">
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
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

Item.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { deleteProduct })(Item);
