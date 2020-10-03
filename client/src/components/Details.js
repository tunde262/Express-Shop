import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    handleDetail, 
    addToCart, 
    addLike, 
    openModal, 
    addTotals, 
    getCart, 
    addReview, 
    deleteReview, 
    handleTags 
} from '../actions/productActions';
import { getStoresByTag } from '../actions/storeActions';
import { getProductVariants } from '../actions/variantActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Footer from '../components/layout/Footer/Footer';
import Modal from 'react-responsive-modal';
import { ButtonContainer } from './Button';
import { BackButton } from './common/BackButton';
import { setNav1 } from '../actions/navActions';
import Spinner from './common/Spinner';
import ButtonSpinner from './common/ButtonSpinner';
import ProductOverview from './Overview/productOverview/ProductOverview';
import BrandOverview from './Overview/brandOverview/BrandOverview';
import TableDetails from './TableDetails/TableDetails';
import { HorizontalNav } from '../components/common/HorizontalNav';
import Header from './header/Header';

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
    store,
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
    handleDetail,
    getStoresByTag,
    handleTags,
    setNav1
}) => {
    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    // Reviews
    const [reviewData, setReviewData] = useState({
        text: ''
    });

    // Toggle
    const [displayModal, toggleModal] = useState(false);
    const [varsLoaded, setVarsLoaded] = useState(false);

    // Has Main Image Index Been Gotten
    const [gotIndex, setGotIndex] = useState(false);


    const [varKeys, setVarKeys] = useState([]);
    const [varValues, setVarValues] = useState([]);

    // Variant Options
    const [step, setStep] = useState({step: 1});
    const [colorValue, setColorValue] = useState();
    const [colorState, setColorState] = useState([]);
    const [sizeValue, setSizeValue] = useState();
    const [sizeState, setSizeState] = useState([]);
    const [weightValue, setWeightValue] = useState();
    const [weightState, setWeightState] = useState([]);
    const [typeValue, setTypeValue] = useState();
    const [typeState, setTypeState] = useState([]);
    const [bundleValue, setBundleValue] = useState();
    const [bundleState, setBundleState] = useState([]);
    const [scentValue, setScentValue] = useState();
    const [scentState, setScentState] = useState([]);
    const [fitValue, setFitValue] = useState();
    const [fitState, setFitState] = useState([]);
    const [flavorValue, setFlavorValue] = useState();
    const [flavorState, setFlavorState] = useState([]);
    const [materialValue, setMaterialValue] = useState();
    const [materialState, setMaterialState] = useState([]);


    const colorArray = [];
    const sizeArray = [];
    const weightArray = [];
    const typeArray = [];
    const bundleArray = [];
    const scentArray = [];
    const fitArray = [];
    const flavorArray = [];
    const materialArray = [];

    // Button loader
    const [cartLoading, setCartLoading] = useState(true);

    // Show Img Index
    const [showImage, setShowImage] = useState(0);

    // Load Recommended Stores by Item Category
    const [storesLoaded, setStoresLoaded] = useState(false);
    // Load Recommended Products by Item Category
    const [productsLoaded, setProductsLoaded] = useState(false);
    // Load Nav
    const [navLoaded, setNavLoaded] = useState(false);

    const [skip, setSkip] = useState(0);

    useEffect(() => {
        handleDetail(match.params.id);
        getProductVariants(match.params.id);

        if(modalOpen) {
            setCartLoading(true);
        } else {
            setCartLoading(false);
        }
    }, [modalOpen]);

    const handleMixpanel = () => {
        mixpanel.identify(user._id);
        mixpanel.track("View Item Detail Page", {
            // "Entry Point": "Home Page",
            "Item Name": detailProduct.name,
            "Item Category": detailProduct.category,
            "Item Cost": detailProduct.price,
            // "Item Rating": "A",
            // "Suggested Item?": "false",
            // "Discount %": "0",
            // "Sale Item?": "A",
            // "Item ID": detailProduct._id,
            "Store Name": detailProduct.store.name,
            // "Store ID": detailProduct.store._id, 
        });
    }

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

    const todo = (id, item) => {
        onAddToCart(id);
        handleModalOpen(id);
        clicked(item);
        setCartLoading(true);
    }

    const clicked = (item) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Page',
            label: item.name
        });
        mixpanel.track("Add Item To Cart", {
            // "Entry Point": "Home Page",
            "Item Name": item.name,
            "Item Category": item.category,
            "Item Cost": item.price,
            // "Item Rating": "A",
            // "Suggested Item?": "false",
            // "Discount %": "0",
            // "Sale Item?": "A",
            // "Item ID": item._id,
            "Store Name": item.store.name,
            // "Store ID": item.store._id, 
        });    
    }

    const setModal = () => {
        toggleModal(!displayModal);

        console.log('MODAL VAR OPTIONS')
        console.log(colorState);
        console.log(sizeState);
        console.log(weightState);
        console.log(typeState);
        console.log(bundleState);
        console.log(scentState);
        console.log(fitState);
        console.log(flavorState);
        console.log(materialState);
    }

    const getImgIndex = (orderNum) => {
        if(detailProduct !== null && !loading){
            for(var i = 0; i < detailProduct.img_gallery.length; i++) {
                if(detailProduct.img_gallery[i]['img_order'] === orderNum) {
                    return i;
                }
            }
        }

    }

    const changeImage = (index) => {
        setShowImage(index)

        mixpanel.track("Main Img Change", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
        });
    }

    const decImage = () => {
        let tempImgIndex = showImage - 1; 
        const imgLength = detailProduct.img_gallery.length - 1;

        if(showImage > 0) {
            setShowImage(tempImgIndex);
        } else {
            setShowImage(imgLength);
        }

        mixpanel.track("Main Img Change", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
        });
    }

    const incImage = () => {

        console.log('INCREASE IMG');
        console.log(detailProduct.img_gallery.length)
        console.log(showImage)
        let tempImgIndex = showImage + 1; 
        const imgLength = detailProduct.img_gallery.length;

        if(showImage < imgLength - 1) {
            setShowImage(tempImgIndex);
        } else {
            setShowImage(0)
        }

        

        mixpanel.track("Main Img Change", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
        });
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

        mixpanel.track("New Item Comment Completed", {
            "Item Name": detailProduct.name,
            "Item Category": detailProduct.category,
            "Item Cost": detailProduct.price,
            "Store Name": detailProduct.store.name,
            "Total Imgs": detailProduct.img_gallery.length,
            "Total Likes": detailProduct.likes.length,
            "Total Comments": detailProduct.comments.length + 1,
            "Comment Text": text
        });
    };

    if(!sentMixpanel && user !== null) {
        if(detailProduct) {
            handleMixpanel();
            setSentMixpanel(true);
        }
    }

    if(!navLoaded && detailProduct) {
        if(detailProduct.category === 'clothing & fashion') {
            setNav1('clothing and fashion');
        } else if (detailProduct.category === 'shoes') {
            setNav1('shoes');
        } else if (detailProduct.category === 'household essentials') {
            setNav1('household essentials');
        } else if (detailProduct.category === 'personal care') {
            setNav1('personal care');
        } else if (detailProduct.category === 'pets') {
            setNav1('pets');
        } else if (detailProduct.category === 'school & office supplies') {
            setNav1('school & office supplies');
        } else if (detailProduct.category === 'women') {
            setNav1('women');
        } else if (detailProduct.category === 'men') {
            setNav1('men');
        } else if (detailProduct.category === 'bathroom') {
            setNav1('bathroom');
        } else if (detailProduct.category === 'laundry') {
            setNav1('laundry');
        }
        
        setNavLoaded(true);
    }

    if(!storesLoaded && detailProduct) {
        getStoresByTag(detailProduct.category);
        setStoresLoaded(true);
    }

    if(!productsLoaded && detailProduct) {
        handleTags(detailProduct.category, skip);
        setProductsLoaded(true);
    }

    let varKeyList = [];
    let varValueList = [];
    let optionList;
    

    const getVarKeys = () => {
        // variant.sortedVariants.map(varKey => {
        //     for (var key in varKey) {
        //         varKeyList.includes(key) ? 
        //         console.log('k'): 
        //         varKeyList.push(key)
        //     }
        // })
        // console.log('VAR KEYS');
        // console.log(varKeyList);
        // setVarKeys([...varKeyList]);

        variant.sortedVariants.map(sortedVariant => {
            if(sortedVariant.color) {
                colorArray.includes(sortedVariant.color) ? 
                console.log('COLOR ALREADY THERE'): 
                colorArray.push(sortedVariant.color);
                console.log('COLOR ARRAY BELOW')
                console.log(colorArray);
            }
            if(sortedVariant.size) {
                sizeArray.includes(sortedVariant.size) ? 
                console.log('SIZE ALREADY THERE'): 
                sizeArray.push(sortedVariant.size);
                console.log('SIZE ARRAY BELOW')
                console.log(sizeArray);
            }
            if(sortedVariant.weight) {
                weightArray.includes(sortedVariant.weight) ? 
                console.log('WEIGHT ALREADY THERE'): 
                weightArray.push(sortedVariant.weight);
                console.log('WEIGHT ARRAY BELOW')
                console.log(weightArray);
            }
            if(sortedVariant.type) {
                typeArray.includes(sortedVariant.type) ? 
                console.log('TYPE ALREADY THERE'): 
                typeArray.push(sortedVariant.type);
                console.log('TYPE ARRAY BELOW');
                console.log(typeArray);
            }
            if(sortedVariant.bundle) {
                bundleArray.includes(sortedVariant.bundle) ? 
                console.log('BUNDLE ALREADY THERE'): 
                bundleArray.push(sortedVariant.bundle);
                console.log('BUNDLE ARRAY BELOW')
                console.log(bundleArray);
            }
            if(sortedVariant.scent) {
                scentArray.includes(sortedVariant.scent) ? 
                console.log('SCENT ALREADY THERE'): 
                scentArray.push(sortedVariant.scent);
                console.log('SCENT ARRAY BELOW')
                console.log(scentArray);
            }
            if(sortedVariant.fit) {
                fitArray.includes(sortedVariant.fit) ? 
                console.log('FIT ALREADY THERE'): 
                fitArray.push(sortedVariant.fit);
                console.log('FIT ARRAY BELOW')
                console.log(fitArray);
            }
            if(sortedVariant.flavor) {
                flavorArray.includes(sortedVariant.flavor) ? 
                console.log('FLAVOR ALREADY THERE'): 
                flavorArray.push(sortedVariant.flavor);
                console.log('FLAVOR ARRAY BELOW')
                console.log(flavorArray);
            }
            if(sortedVariant.material) {
                materialArray.includes(sortedVariant.material) ? 
                console.log('MATERIAL ALREADY THERE'): 
                materialArray.push(sortedVariant.material);
                console.log('MATERIAL ARRAY BELOW')
                console.log(materialArray);
            }
        });
        console.log('SHOULD HAVE ARRAYS');

        handleOptions();
    }

    let colorOptions;
    let sizeOptions;
    let weightOptions;
    let typeOptions;
    let bundleOptions;
    let scentOptions;
    let fitOptions;
    let flavorOptions;
    let materialOptions;
    const handleOptions = () => {
        console.log('COLOR VALUUUE');
        console.log(colorArray);
        setColorState([...colorArray]);
        console.log('COLOR STATE');
        console.log(colorState);
        if(colorArray.length > 0) {
            console.log('COLOR PASSED');
            let choices;
            choices = colorArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setColorValue((
                <Fragment>
                    <label>Color</label>
                    <select name="color">
                        {choices}
                    </select>
                </Fragment>
            ));
        }

        console.log('SIZE VALUUUE');
        console.log(sizeArray);
        setSizeState([...sizeArray]);
        console.log('SIZE STATE');
        console.log(sizeState);
        if(sizeArray.length > 0) {
            console.log('SIZE PASSED');
            let choices;
            choices = sizeArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setSizeValue((
                <Fragment>
                    <label>Size</label>
                    <select name="size">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('WEIGHT VALUUUE');
        console.log(weightArray);
        setWeightState([...weightArray]);
        console.log('WEIGHT STATE');
        console.log(weightState);
        if(weightArray.length > 0) {
            console.log('WEIGHT PASSED');
            let choices;
            choices = weightArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setWeightValue((
                <Fragment>
                    <label>Weight</label>
                    <select name="weight">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('TYPE VALUUUE');
        console.log(typeArray);
        setTypeState([...typeArray]);
        console.log('TYPE STATE');
        console.log(typeState);
        if(typeArray.length > 0) {
            console.log('TYPE PASSED');
            let choices;
            choices = typeArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setTypeValue((
                <Fragment>
                    <label>Type</label>
                    <select name="type">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('BUNDLE VALUUUE');
        console.log(bundleArray);
        setBundleState([...bundleArray]);
        console.log('BUNDLE STATE');
        console.log(bundleState);
        if(bundleArray.length > 0) {
            console.log('BUNDLE PASSED');
            let choices;
            choices = bundleArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setBundleValue((
                <Fragment>
                    <label>Bundle</label>
                    <select name="material">
                        {choices}
                    </select>
                </Fragment>
            ));
        }

        console.log('SCENT VALUUUE');
        console.log(scentArray);
        setScentState([...scentArray]);
        console.log('SCENT STATE');
        console.log(scentState);
        if(scentArray.length > 0) {
            console.log('SCENT PASSED');
            let choices;
            choices = scentArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setScentValue((
                <Fragment>
                    <label>Scent</label>
                    <select name="scent">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('FIT VALUUUE');
        console.log(fitArray);
        setFitState([...fitArray]);
        console.log('FIT STATE');
        console.log(fitState);
        if(fitArray.length > 0) {
            console.log('FIT PASSED');
            let choices;
            choices = fitArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setFitValue((
                <Fragment>
                    <label>Fit</label>
                    <select name="fit">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('FLAVOR VALUUUE');
        console.log(flavorArray);
        setFlavorState([...flavorArray]);
        console.log('FLAVOR STATE');
        console.log(flavorState);
        if(flavorArray.length > 0) {
            console.log('FLAVOR PASSED');
            let choices;
            choices = flavorArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setFlavorValue((
                <Fragment>
                    <label>Flavor</label>
                    <select name="flavor">
                        {choices}
                    </select>
                </Fragment>
            ))
        }

        console.log('MATERIAL VALUUUE');
        console.log(materialArray);
        setMaterialState([...materialArray]);
        console.log('MATERIAL STATE');
        console.log(materialState);
        if(materialArray.length > 0) {
            console.log('MATERIAL PASSED');
            let choices;
            choices = materialArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            setMaterialValue((
                <Fragment>
                    <label>Material</label>
                    <select name="material">
                        {choices}
                    </select>
                </Fragment>
            ))
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
        console.log('LOOK HERE');
        console.log(bundleValue);

        let img_gallery = detailProduct.img_gallery.sort((a, b) => a.img_order - b.img_order);

        if(!gotIndex) {
            setShowImage(getImgIndex(1))
            setGotIndex(true);
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
                            {/* <p className="mobile" style={{color:'#333', fontWeight:'bold'}}>{detailProduct.name}</p> */}
                            {/* <div className="detail-image-container">
                                <div onClick={decImage} className="detail-image-icon-container">
                                    <i class="fas fa-chevron-left"></i>
                                </div>
                                {detailProduct && img_gallery && img_gallery.length > 0 && <img src={`/api/products/image/${img_gallery[showImage].img_name}`} className="img-fluid" alt="product" />}
                                <div onClick={incImage} className="detail-image-icon-container">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div> */}
                            <div className="detail-image-container desktop">
                                {detailProduct && img_gallery && img_gallery.length > 0 && <img src={`/api/products/image/${img_gallery[showImage].img_name}`} className="img-fluid" alt="product" />}
                                <div className="detail-image-overlay">
                                    <div onClick={decImage} className="detail-overlay-icon-container">
                                        <i class="fas fa-chevron-left"></i>
                                    </div>
                                    <div onClick={incImage} className="detail-overlay-icon-container">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-image-container mobile" onClick={incImage}>
                                {detailProduct && img_gallery && img_gallery.length > 0 && <img src={`/api/products/image/${img_gallery[showImage].img_name}`} className="img-fluid" alt="product" />}
                                <div className="detail-image-overlay">
                                    <div onClick={decImage} className="detail-overlay-icon-container">
                                        <i class="fas fa-chevron-left"></i>
                                    </div>
                                    <div onClick={incImage} className="detail-overlay-icon-container">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="datail-sub-image-container desktop">
                                <div className="desktop" style={{ margin:'1rem 5px', textAlign:'center', height: '50px', display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    {detailProduct && img_gallery && img_gallery.length > 3 && <p className="desktop" style={{color:'#808080', fontWeight:'bold', fontSize:'12px'}}>Scroll<br/><i class="fas fa-arrow-left"></i></p>}
                                </div>
                                <div className="datail-sub-images">
                                    {img_gallery.map((item, index) => {
                                        if (index === showImage) {
                                            return <img key={index} style={{border:'2px solid #0000FF'}} onClick={() => changeImage(index)} src={`/api/products/image/${img_gallery[index].img_name}`} alt={detailProduct.name} />
                                        } else {
                                            return <img key={index} onClick={() => changeImage(index)} src={`/api/products/image/${img_gallery[index].img_name}`} alt={detailProduct.name} />
                                        }
                                    })}
                                </div>
                                <div className="desktop" style={{ margin:'1rem 5px', textAlign:'center', height: '50px', display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    {detailProduct && img_gallery && img_gallery.length > 3 && <p className="desktop" style={{color:'#808080', fontWeight:'bold', fontSize:'12px'}}>Scroll<br/><i class="fas fa-arrow-right"></i></p>}
                                </div>
                            </div> */}
                            <div style={{marginTop:'10px'}}>
                                <p style={{color:'#808080', fontWeight:'bold', fontSize:'12px'}}><i style={{marginRight:'10px'}} class="far fa-hand-pointer"></i> Click image for more photos...</p>
                            </div>
                            <div className="product-detail-main-container">
                                {img_gallery.map((item, index) => {
                                    if (index === showImage) {
                                        return (
                                            <div className="product-detail-image-container">
                                                <img key={index} style={{border:'2px solid #0000FF'}} onClick={() => changeImage(index)} src={`/api/products/image/${img_gallery[index].img_name}`} alt={detailProduct.name} />
                                                <div className="detail-image-overlay" onClick={() => changeImage(index)}></div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="product-detail-image-container">
                                                <img key={index} onClick={() => changeImage(index)} src={`/api/products/image/${img_gallery[index].img_name}`} alt={detailProduct.name} />
                                                <div className="detail-image-overlay" onClick={() => changeImage(index)}></div>
                                            </div>
                                        ) 
                                    }
                                })}
                            </div>
                        </div>
                        <div class="detail-info">
                            <div class="detail-status-box">
                                <div className="detail-status-box-header">
                                    <div><p style={{color:'#333', fontWeight:'bold'}}>{detailProduct.name}</p></div>
                                    <div>
                                        {/* <span>{detailProduct.likes.length > 0 && <span>{detailProduct.likes.length}</span>}</span>{' '}
                                        {liked ? <i style={{color:'#ff4b2b', fontSize:'1.4rem', margin:'1rem 1rem 0 0'}} onClick={() => addLike(detailProduct._id)} class="fas fa-heart"></i> : <i onClick={() => addLike(detailProduct._id)} style={{color:'#808080', margin:'1rem 1rem 0 0'}} className="far fa-heart detail-heart"></i>} */}
                                    </div>
                                </div>
                                <h3 style={{color:'#ff4b2b', marginTop:'-1rem', fontWeight:'bold'}}>${detailProduct.price}</h3>
                                {/* <p><i style={{color:'#808080'}} class="fas fa-truck"></i> Next Delivery Time: <span style={{fontWeight:'bold', color:'#ff4b2b'}}>1pm</span></p> */}
                                <p><i style={{color:'#808080'}} class="fas fa-truck"></i> Est. Delivery Time: <span style={{fontWeight:'bold', color:'#ff4b2b'}}>2 hr</span></p>
                                <p style={{color:'#808080', marginTop:'-1rem'}}><i className="fas fa-sign-out-alt" /> Return eligible</p>
                                <hr style={{background:'#dfe1e5', height:'1px', marginBottom:'0.5rem'}}/>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center', marginTop:'-0.6rem', padding:'0 1rem'}}>
                                    <div style={{display:'flex', alignItems: 'center'}}>
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
                                    <div style={{display:'flex', paddingTop:'10px', color:'#808080', alignItems: 'center'}}>
                                        <p style={{fontWeight:500}}>Subscribe <i style={{marginLeft:'10px'}} class="far fa-bookmark"></i></p>
                                    </div>
                                </div>
                                <hr style={{marginTop:'-0.5rem', background:'#dfe1e5', height:'1px'}}/>
                            </div>
                            <div class="detail-description-box">
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                                    {colorValue}
                                    {sizeValue}
                                    {weightValue}
                                    {typeValue}
                                    {bundleValue}
                                    {scentValue}
                                    {fitValue}
                                    {flavorValue}
                                    {materialValue}
                                </div>
                                {/* <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}> */}
                                    <button 
                                        onClick={() =>todo(detailProduct._id, detailProduct)}
                                        disabled={cartLoading ? true : false} 
                                    >
                                        {cartLoading ? <ButtonSpinner /> : "Add To Cart"}
                                    </button>
                                    {liked ? <button onClick={() => addLike(detailProduct._id)} style={{background:'#ff4b2b', color:'#fff', borderColor:'#ff4b2b'}}>Added To Favorites <i style={{marginLeft:'10px', color:'#fff', outline:'none', fontSize:'13px'}} className="fas fa-heart"></i> </button> : <button onClick={() => addLike(detailProduct._id)} className="likeButton">Favorite <i style={{marginLeft:'10px', color:'#ff4b2b', fontSize:'13px'}} className="fas fa-heart"></i> </button> }
                                    {detailProduct.likes.length > 2 && <div style={{width:'100%', textAlign:'center'}}><span style={{color:'#808080',}}> <span>{detailProduct.likes.length}</span> Others favorited</span></div>}
                                {/* </div> */}
                                {/* <TableDetails page="store" setModal={setModal} description={detailProduct.description} /> */}

                                <div style={{marginTop:'50px'}}>
                                    <p style={{color:'#808080', fontWeight:'bold'}}>Description</p>
                                    <hr style={{marginTop:'-0.5rem', background:'#dfe1e5', height:'1px'}}/>
                                    {detailProduct.description && <p>{detailProduct.description}</p>}
                                </div>
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
                {store.stores.length > 0 && detailProduct && (
                    <div style={{marginTop:'85px'}}>
                        <BrandOverview title={`Other Stores For ${detailProduct.category}`} stores={store.stores} />
                    </div>
                )}
    
                <ProductOverview title="You may also like..." products={products} link={`/collection?filter=${detailProduct.category}`} />
                <Modal open={displayModal} onClose={setModal} center>
                    <p>
                        Write a quick review...
                    </p>
                    <MuiThemeProvider>
                        <form
                            className='form my-1'
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
                            <button onClick={onSubmit} type='submit' style={{width:'100%'}}>Submit</button>
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
                <Header />
                {detailItem}
            </Fragment>
        )
}

Details.propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
    getStoresByTag: PropTypes.func.isRequired,
    handleTags: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    auth: state.auth,
    store: state.store,
});

export default connect(mapStateToProps, { getProductVariants, addToCart, addLike, getCart, openModal, addTotals, handleDetail, addReview, getStoresByTag, handleTags, setNav1 })(Details);
