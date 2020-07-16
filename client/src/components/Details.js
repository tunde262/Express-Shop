import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDetail, addToCart, openModal, addTotals, getCart, addReview, deleteReview } from '../actions/productActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import ReactGA from 'react-ga';

import Modal from 'react-responsive-modal';
import { ButtonContainer } from './Button';
import { BackButton } from './common/BackButton';
import Spinner from './common/Spinner';
import ProductOverview from './Overview/productOverview/ProductOverview';

const Details = ({
    product: {
        detailProduct,
        loading,
        products
    }, 
    match, 
    history, 
    addToCart, 
    addTotals, 
    openModal
}) => {
    const [reviewData, setReviewData] = useState({
        title: '',
        text: '',
        file: ''
    });

    const [displayModal, toggleModal] = useState(false);

    useEffect(() => {
        handleDetail(match.params.id);
    }, [handleDetail]);

    const goBack = () => {
        history.goBack();
    }

    const onAddToCart = (id) => {
        addToCart(id);
        addTotals();
    }

    const handleModalOpen = (id) => {
        openModal(id);
    }

    const todo = (id, title) => {
        onAddToCart(id);
        handleModalOpen(id);
        clicked(title);
    }

    const clicked = (title) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Page',
            label: title
        });
    }

    const setModal = () => {
        toggleModal(!displayModal);
    }

    const { title, text, file } = reviewData;

    const fileChanged = e => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.files[0] });
    }

    const onChange = e => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    } 

    const onSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('file', file);
        data.append('title', title);
        data.append('text', text);

        addReview(data);
        
        setModal();
        setReviewData({title: '', text: '', file: ''});
    };

    // const { _id, company, img, info, price, title, inCart} = detailProduct;

    let detailItem;

    if(detailProduct === null || loading) {
        detailItem = <Spinner />;
    }
    else {
        detailItem = (
            <Fragment>
                <section className="container">
                    <div id="detail-content-wrapper">
                        <div id="breadcrumb">
                            <nav className="breadcrumb">
                                <ol>
                                    <li><b>My Portfolio</b></li>
                                </ol>
                            </nav>
                        </div>
                        <p>{detailProduct.name}</p>
                        <div class="detail-map">
                            <img src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} className="img-fluid" alt="product" />
                            <div className="datail-sub-images">
                                {detailProduct.img_gallery.map((item, index) => {
                                    return <img key={index} src={`/api/products/image/${detailProduct.img_gallery[index].img_name}`} alt={detailProduct.name} />
                                })}
                            </div>
                        </div>
                        <div class="detail-info">
                            <div class="detail-status-box">
                                <h2>{detailProduct.name}</h2>
                                <div style={{display:'flex', alignItems: 'center', margin:'1rem 0'}}>
                                    <Link to={"/store/" + detailProduct.store._id}>
                                        <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${detailProduct.store.img_name}`} alt="img" />
                                    </Link>
                                    <Link to={"/store/" + detailProduct.store._id}>
                                        <p>{detailProduct.store.name}</p>
                                    </Link>
                                </div>
                                <h2 style={{color:'#ff4b2b'}}>{detailProduct.price}</h2>
                                <p>Delivery</p>
                                <p>Return</p>

                            </div>
                            <div class="detail-description-box">
                                <h4 className="text-blue">
                                        color : {detailProduct.color}
                                    </h4>
                                    <h4 className="text-blue">
                                        size : {detailProduct.size}
                                    </h4>
                                <button onClick={goBack}>back to products</button>
                                <button
                                    cart
                                    disabled={detailProduct.inCart ? true : false}
                                    onClick={() =>todo(detailProduct._id, detailProduct.title)}
                                >
                                    {detailProduct.inCart ? 'inCart' : 'add to cart'}
                                </button>

                            </div>
                        </div>
                        <div class="content-box container-fluid">
                            <div className="bg-light p-2">
                                <h2 className="text-primary">Quick Info</h2>
                                <div className="skills">
                                    <div className="p-1">
                                        <i className="fas fa-check"></i> HTML
                                    </div>
                                    <div className="p-1">
                                        <i className="fas fa-check"></i> CSS
                                    </div>
                                    <div className="p-1">
                                        <i className="fas fa-check"></i> FUCK
                                    </div>
                                    <div className="p-1">
                                        <i className="fas fa-check"></i> YOU
                                    </div>
                                    <div className="p-1">
                                        <i className="fas fa-check"></i> TOO
                                    </div>
                                </div>
                                <div className="line"></div>
                                    <Fragment>
                                        <h2 className="text-primary">Description</h2>
                                        <p>
                                            {detailProduct.description}
                                        </p>
                                    </Fragment>
                            </div>
                            <div class="table-responsive table-filter">
                                <section>
                                    <p style={{alignSelf: "flex-end"}}>50 Reviews</p>
                                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Write A Review</button>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <ProductOverview title="Tops" products={products} link="/top" />
                <Modal open={displayModal} onClose={setModal} center>
                    <h2>Add Variant</h2>
                    <p>
                        Add options to create variants
                    </p>
                    <MuiThemeProvider>
                        <form
                            className='form my-1'
                            onSubmit={onSubmit}
                        >
                            <TextField 
                                hintText="Enter A Title For This Post"
                                floatingLabelText="Title of Post"
                                name='title'
                                onChange={e => onChange(e)}
                                defaultValue={title}
                                required
                                style={{marginBottom: "1rem"}}
                            />
                            <div className="line"></div>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="form-control"
                                placeholder="Start with ../img/"
                                onChange={fileChanged}
                            />
                            <div className="line"></div>
                            <textarea
                            name='text'
                            style={{width: "100%"}}
                            rows='5'
                            placeholder='Tell a story'
                            value={text}
                            onChange={e => onChange(e)}
                            required
                            />
                            <div className="line"></div>
                            <input type='submit' className='btn btn-dark my-1' value='Submit' />
                        </form>
                    </MuiThemeProvider>
                </Modal>
            </Fragment>
            // <div>
            //     <div id="breadcrumb">
            //         <nav className="breadcrumb">
            //             <ol>
            //                 <li><b>My Portfolio</b></li>
            //             </ol>
            //         </nav>
            //     </div>
            //     {/* end title */}
            //     {/* product info */}
            //     <div className="row">
            //         <div className="col-10 mx-auto col-md-6 my-3">
            //             <img src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} className="img-fluid" alt="product" />
            //         </div>
            //         {/* product text */}
            //         <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            //             <h2>{detailProduct.name}</h2>
            //             {/* <h4 className="text-uppercase text-muted mt-3 mb-2">
            //                 Brand : <span className="text-uppercase">{detailProduct.company}</span>
            //             </h4> */}
            //             <h4 className="text-blue">
            //                 <strong><span>$</span>{detailProduct.price}</strong>
            //             </h4>
            //             <h4 className="text-blue">
            //                 color : {detailProduct.color}
            //             </h4>
            //             <h4 className="text-blue">
            //                 size : {detailProduct.size}
            //             </h4>
            //             <p className="text-capitalize font-weight-bold mt-3 mb-0">
            //                 Details:
            //             </p>
            //             <p className="text-muted lead">{detailProduct.info}</p>
            //             {/* buttons */}
            //             <div>
            //                 <ButtonContainer onClick={goBack}>back to products</ButtonContainer>
            //                 <ButtonContainer
            //                     cart
            //                     disabled={detailProduct.inCart ? true : false}
            //                     onClick={()=>todo(detailProduct._id, detailProduct.title)}
            //                 >
            //                     {detailProduct.inCart ? 'inCart' : 'add to cart'}
            //                 </ButtonContainer>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            );
        }

        return (
            <Fragment>
                <BackButton onClick={goBack}><i className="fas fa-arrow-left"></i></BackButton>
                {detailItem}
            </Fragment>
        )
}

Details.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { addToCart, getCart, openModal, addTotals, handleDetail, addReview })(Details);
