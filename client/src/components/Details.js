import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDetail, addToCart, addLike, openModal, addTotals, getCart, addReview, deleteReview } from '../actions/productActions';
import { getProductVariants } from '../actions/variantActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import ReactGA from 'react-ga';

import Footer from '../components/layout/Footer/Footer';
import Modal from 'react-responsive-modal';
import { ButtonContainer } from './Button';
import { BackButton } from './common/BackButton';
import Spinner from './common/Spinner';
import ButtonSpinner from './common/ButtonSpinner';
import ProductOverview from './Overview/productOverview/ProductOverview';
import BrandOverview from './Overview/brandOverview/BrandOverview';
import TableDetails from './TableDetails/TableDetails';

const Details = ({
    product: {
        detailProduct,
        modalOpen,
        loading,
        products
    }, 
    auth: {
        user
    },
    variant,
    match, 
    history, 
    addToCart, 
    addTotals, 
    getCart,
    openModal,
    getProductVariants,
    addReview,
    addLike,
    deleteReview,
    handleDetail
}) => {
    // Reviews
    const [reviewData, setReviewData] = useState({
        text: ''
    });

    // Toggle
    const [displayModal, toggleModal] = useState(false);
    const [varsLoaded, setVarsLoaded] = useState(false);


    const [varKeys, setVarKeys] = useState([]);
    const [varValues, setVarValues] = useState([]);

    // Variant Options
    const [step, setStep] = useState({step: 1});
    const [varKey1, setVarKey1] = useState('');
    const [varValue1, setVarValue1] = useState([]);
    const [varKey2, setVarKey2] = useState('');
    const [varValue2, setVarValue2] = useState([]);
    const [varKey3, setVarKey3] = useState('');
    const [varValue3, setVarValue3] = useState([]);
    const [varKey4, setVarKey4] = useState('');
    const [varValue4, setVarValue4] = useState([]);
    const [varKey5, setVarKey5] = useState('');
    const [varValue5, setVarValue5] = useState([]);
    const [varKey6, setVarKey6] = useState('');
    const [varValue6, setVarValue6] = useState([]);
    const [varKey7, setVarKey7] = useState('');
    const [varValue7, setVarValue7] = useState([]);
    const [varKey8, setVarKey8] = useState('');
    const [varValue8, setVarValue8] = useState([]);
    const [varKey9, setVarKey9] = useState('');
    const [varValue9, setVarValue9] = useState([]);

    // Button loader
    const [cartLoading, setCartLoading] = useState(true);

    // Show Img Index
    const [showImage, setShowImage] = useState(0);

    useEffect(() => {
        handleDetail(match.params.id);
        getProductVariants(match.params.id);

        if(modalOpen) {
            setCartLoading(true);
        } else {
            setCartLoading(false);
        }
    }, [modalOpen]);

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
        setCartLoading(true);
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

        console.log('MODAL KEYS')
        console.log(varKeys);
        console.log('MODAL VAR OPTIONS')
        console.log(varKey1);
        console.log(varValue1);
        console.log(varKey2);
        console.log(varValue2);
        console.log(varKey3);
        console.log(varValue3);
    }

    const { text } = reviewData;

    const fileChanged = e => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.files[0] });
    }

    const onChange = e => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    } 

    const onSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('text', text);

        addReview(data, detailProduct._id);
        
        setModal();
        setReviewData({text: ''});
    };

    let varKeyList = [];
    let varValueList = [];
    let optionList;
    

    const getVarKeys = () => {
        variant.sortedVariants.map(varKey => {
            for (var key in varKey) {
                varKeyList.includes(key) ? 
                console.log('k'): 
                varKeyList.push(key)
            }
        })
        console.log('VAR KEYS');
        console.log(varKeyList);
        setVarKeys([...varKeyList]);

        variant.sortedVariants.map(varValue => {
            if(varValue.color) {
                varValue1.includes(varValue.color) ? 
                console.log('g'): 
                setVarValue1([...varValue1, varValue.color])
                setVarKey1('color')
            }
            if(varValue.size) {
                varValue2.includes(varValue.size) ? 
                console.log('g'): 
                setVarValue2([...varValue2, varValue.size])
                setVarKey2('size')
            }
            if(varValue.weight) {
                varValue3.includes(varValue.weight) ? 
                console.log('g'): 
                setVarValue3([...varValue3, varValue.weight])
                setVarKey3('weight')
            }
            if(varValue.type) {
                varValue4.includes(varValue.type) ? 
                console.log('g'): 
                setVarValue4([...varValue4, varValue.type])
                setVarKey4('type')
            }
            if(varValue.bundle) {
                varValue5.includes(varValue.bundle) ? 
                console.log('g'): 
                setVarValue5([...varValue5, varValue.bundle])
                setVarKey5('bundle')
            }
            if(varValue.scent) {
                varValue6.includes(varValue.scent) ? 
                console.log('g'): 
                setVarValue6([...varValue6, varValue.scent])
                setVarKey6('scent')
            }
            if(varValue.fit) {
                varValue7.includes(varValue.fit) ? 
                console.log('g'): 
                setVarValue7([...varValue7, varValue.fit])
                setVarKey7('fit')
            }
            if(varValue.flavor) {
                varValue8.includes(varValue.flavor) ? 
                console.log('g'): 
                setVarValue8([...varValue8, varValue.flavor])
                setVarKey8('flavor')
            }
            if(varValue.material) {
                varValue9.includes(varValue.material) ? 
                console.log('g'): 
                setVarValue9([...varValue9, varValue.material])
                setVarKey9('material')
            }
        });
        console.log('VALUES');

        handleOptions();
    }

    let options;
    const handleOptions = () => {
        console.log('VAR VALUUUE');
        console.log(varValue1);
        if(varValue1.length > 0 && varKey1 !== '') {
            let choses;
            choses = varValue1.map(option => <option key={option} value={`${option}`}>{option}</option>);
            options = (
                <Fragment>
                    <label>{varKey1}</label>
                    <select name={`${varKey1}`}>
                        {choses}
                    </select>
                </Fragment>
            )
        }
    }

    // const { _id, company, img, info, price, title, inCart} = detailProduct;
    
    if(variant.sortedVariants !== null && !loading && !varsLoaded) {
        getVarKeys(); 
        setVarsLoaded(true)
    } 

    let detailItem;

    if(detailProduct === null || loading) {
        detailItem = <Spinner />;
    }
    else {
        let liked = false;
        if (user) {
            if(detailProduct.likes.filter(like => like.user.toString() === user._id).length > 0){
                liked = true
            }
        }
        detailItem = (
            <Fragment>
                <section className="container">
                    <div id="detail-content-wrapper">
                        {/* <div id="breadcrumb">
                            <nav className="breadcrumb">
                                <ol>
                                    <li style={{display: 'flex'}}>
                                        <Link to="/stores">Home</Link>{' '}
                                        <p style={{margin:'0 5px'}}> /
                                            <span style={{fontWeight:'bold'}}>
                                                {' '}
                                                {detailProduct.name}
                                            </span>
                                        </p>
                                    </li>
                                </ol>
                            </nav>
                            <BackButton onClick={goBack}><i className="fas fa-arrow-left"></i></BackButton>
                        </div> */}
                        <div class="detail-map">
                            <img src={`/api/products/image/${detailProduct.img_gallery[showImage].img_name}`} className="img-fluid" alt="product" />
                            <div className="datail-sub-images">
                                {detailProduct.img_gallery.map((item, index) => {
                                    return <img key={index} onClick={() => setShowImage(index)} src={`/api/products/image/${detailProduct.img_gallery[index].img_name}`} alt={detailProduct.name} />
                                })}
                            </div>
                        </div>
                        <div class="detail-info">
                            <div class="detail-status-box">
                                <div className="detail-status-box-header">
                                    <p style={{color:'#333', fontWeight:'bold'}}>{detailProduct.name}</p>
                                    <div>
                                        <span>{detailProduct.likes.length > 0 && <span>{detailProduct.likes.length}</span>}</span>{' '}
                                        {liked ? <i style={{color:'#ff4b2b', fontSize:'1.4rem', margin:'1rem 1rem 0 0'}} onClick={() => addLike(detailProduct._id)} class="fas fa-heart"></i> : <i onClick={() => addLike(detailProduct._id)} style={{color:'#808080', margin:'1rem 1rem 0 0'}} className="far fa-heart detail-heart"></i>}
                                    </div>
                                </div>
                                <h3 style={{color:'#ff4b2b', marginTop:'-1rem', fontWeight:'bold'}}>{detailProduct.price}</h3>
                                <p><i style={{color:'#808080'}} class="fas fa-truck"></i> Next Delivery Time: <span style={{fontWeight:'bold', color:'#ff4b2b'}}>1pm</span></p>
                                <p style={{color:'#808080', marginTop:'-1rem'}}><i className="fas fa-sign-out-alt" /> Return eligible</p>
                                <hr style={{background:'#dfe1e5', height:'1px', marginBottom:'0.5rem'}}/>
                                <div style={{display:'flex', alignItems: 'center', marginTop:'-0.6rem'}}>
                                    <Link to={"/store/" + detailProduct.store._id}>
                                        <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${detailProduct.store.img_name}`} alt="img" />
                                    </Link>
                                    <div style={{ display: 'flex', flexDirection:'column', marginTop:'0.5rem'}}>
                                        <Link to={"/store/" + detailProduct.store._id}>
                                            {detailProduct.store.name}
                                        </Link>
                                        <p style={{color:'#808080'}}>Wholesaler</p>
                                        {/* <Link to={"/location/" + detailProduct.locationId._id} style={{color:'#808080'}}>Wholesaler</Link> */}
                                    </div>
                                </div>
                                <hr style={{marginTop:'-0.5rem', background:'#dfe1e5', height:'1px'}}/>
                            </div>
                            <div class="detail-description-box">
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                                    <select className="select" name="category" onChange={onChange}>
                                        <option>* Choose a category</option>
                                        <option value="clothing & fashion">Clothing & Fashion</option>
                                        <option value="bathroom">Bathroom</option>
                                        <option value="household essentials">Household Essential</option>
                                        <option value="laundry">Laundry</option>
                                        <option value="men">Men</option>
                                        <option value="personal care">Personal Care</option>
                                        <option value="pets">Pets</option>
                                        <option value="school & office">School & Office</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="women">Women</option>
                                    </select>
                                    <select className="select" name="category" onChange={onChange}>
                                        <option>* Choose a category</option>
                                        <option value="clothing & fashion">Clothing & Fashion</option>
                                        <option value="bathroom">Bathroom</option>
                                        <option value="household essentials">Household Essential</option>
                                        <option value="laundry">Laundry</option>
                                        <option value="men">Men</option>
                                        <option value="personal care">Personal Care</option>
                                        <option value="pets">Pets</option>
                                        <option value="school & office">School & Office</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="women">Women</option>
                                    </select>
                                </div>
                                {/* <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}> */}
                                    {/* <button style={{background:'transparent', color:'#cd00cd', borderColor:'#cd00cd'}}>Make an Offer</button> */}
                                    <button 
                                        onClick={() =>todo(detailProduct._id, detailProduct.title)}
                                        disabled={cartLoading ? true : false} 
                                    >
                                        {cartLoading ? <ButtonSpinner /> : "Add To Cart"}
                                    </button>
                                {/* </div> */}
                                <TableDetails page="store" setModal={setModal} description={detailProduct.description} />
                            </div>
                        </div>
                        {/* <div class="content-box container-fluid">
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
                        </div> */}
                    </div>
                </section>
                <BrandOverview />
                <ProductOverview title="Tops" products={products} link="/top" />
                <Footer />
                <Modal open={displayModal} onClose={setModal} center>
                    <p>
                        Write a quick review...
                    </p>
                    <MuiThemeProvider>
                        <form
                            className='form my-1'
                            onSubmit={onSubmit}
                        >
                            <textarea
                            name='text'
                            style={{width: "100%"}}
                            rows='5'
                            placeholder='Tell a story'
                            value={text}
                            onChange={onChange}
                            required
                            />
                            <div className="line"></div>
                            <button type='submit' style={{width:'100%'}}>Submit</button>
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
                {detailItem}
            </Fragment>
        )
}

Details.propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    auth: state.auth
});

export default connect(mapStateToProps, { getProductVariants, addToCart, addLike, getCart, openModal, addTotals, handleDetail, addReview })(Details);
