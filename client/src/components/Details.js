import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { 
    handleDetail, 
    addToCart, 
    addLike, 
    addView,
    openModal, 
    addTotals, 
    getCart, 
    addReview, 
    deleteReview, 
    getCategoryProducts,
    clearProducts
} from '../actions/productActions';
import { getStoresByTag, favorite } from '../actions/storeActions';
import { getProductVariants } from '../actions/variantActions';
import { setAlert } from '../actions/alertActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Footer from '../components/layout/Footer/Footer';
import Modal from 'react-responsive-modal';
import { ButtonContainer } from './Button';
import { BackButton } from './common/BackButton';
import { setNav1, setMainNav } from '../actions/navActions';
import { openCollectionModal } from '../actions/collectionActions';
import Spinner from './common/Spinner';
import ButtonSpinner from './common/ButtonSpinner';
import ProductOverview from './Overview/productOverview/ProductOverview';
import BrandOverview from './Overview/brandOverview/BrandOverview';
import ImageOverview from './Overview/imageOverview/ImageOverview';
import TableDetails from './TableDetails/TableDetails';
import { HorizontalNav } from '../components/common/HorizontalNav';
import Header from './header/Header';

import AuthModal from './modals/AuthModal';

const Details = ({
    product: {
        detailProduct,
        modalOpen,
        loading,
        products
    }, 
    auth,
    profile,
    variant,
    store,
    match, 
    history, 
    addToCart, 
    clearProducts,
    addTotals, 
    getCart,
    openModal,
    getProductVariants,
    addReview,
    addLike,
    addView,
    deleteReview,
    handleDetail,
    getStoresByTag,
    favorite,
    getCategoryProducts,
    setNav1,
    setMainNav,
    openCollectionModal,
    setAlert
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

    const [tableShow1, setTableShow1] = useState('');

    // Item Store
    const [subscribedToo, setSubscribedToo] = useState(false);
    const [checkSub, setCheckSub] = useState(false);

    // Has Main Image Index Been Gotten
    const [gotIndex, setGotIndex] = useState(false);

    const [gotDescription, setGotDescription] = useState(false);

    // Has view been added by profile if auth
    const [sentView, setSentView] = useState(false);
    

    const [varKeys, setVarKeys] = useState([]);
    const [varValues, setVarValues] = useState([]);

    // Variant Options
    const [step, setStep] = useState({step: 1});
    const [colorValue, setColorValue] = useState();
    const [colorState, setColorState] = useState([]);
    const [selectedColor, setSelectedColor] = useState();
    const [sizeValue, setSizeValue] = useState();
    const [sizeState, setSizeState] = useState([]);
    const [selectedSize, setSelectedSize] = useState();
    const [weightValue, setWeightValue] = useState();
    const [weightState, setWeightState] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState();
    const [typeValue, setTypeValue] = useState();
    const [typeState, setTypeState] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [bundleValue, setBundleValue] = useState();
    const [bundleState, setBundleState] = useState([]);
    const [selectedBundle, setSelectedBundle] = useState();
    const [scentValue, setScentValue] = useState();
    const [scentState, setScentState] = useState([]);
    const [selectedScent, setSelectedScent] = useState();
    const [fitValue, setFitValue] = useState();
    const [fitState, setFitState] = useState([]);
    const [selectedFit, setSelectedFit] = useState();
    const [flavorValue, setFlavorValue] = useState();
    const [flavorState, setFlavorState] = useState([]);
    const [selectedFlavor, setSelectedFlavor] = useState();
    const [materialValue, setMaterialValue] = useState();
    const [materialState, setMaterialState] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState();


    const colorArray = [];
    const sizeArray = [];
    const weightArray = [];
    const typeArray = [];
    const bundleArray = [];
    const scentArray = [];
    const fitArray = [];
    const flavorArray = [];
    const materialArray = [];

    const [descriptionState, setDescriptionState] = useState(null);

    // Button loader
    const [cartLoading, setCartLoading] = useState(false);

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
        setMainNav('store');
        handleDetail(match.params.id);
        getProductVariants(match.params.id);

        if(modalOpen) {
            setCartLoading(true);
        } else {
            setCartLoading(false);
        }

    }, [modalOpen]);


    const handleMixpanel = () => {
        mixpanel.identify(auth.user._id);
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

    const handleTableShow1 = (value) => {
        if(value !== tableShow1) {
            if(value === 'for you') {
                history.push('/home?show=for-you');
            } else if (value === 'popular') {
                history.push('/home?show=popular');
            } else if (value === 'nearby') {
                history.push('/home?show=nearby');
            }
            clearProducts();
            setSkip(0);
            setTableShow1(value);
        }
    }

    const handleSubscribe= (detailStore) => {
        if (auth.user) {
            favorite(detailStore._id, auth.user._id);
            setSubscribedToo(!subscribedToo);

            // Check if product already liked by same auth.user
            if(detailStore.favorites){
                if(detailStore.favorites.filter(favorite => favorite.user.toString() === auth.user._id).length > 0) {
                    mixpanel.track("Store Un-Bookmark", {
                        "Store Name": detailStore.name,
                        "Store Category": detailStore.category,
                        // "Store Rating": cartIds,
                        "Total Favorites": detailStore.favorites.length - 1,
                        "Total Reviews": detailStore.reviews.length,
                        "Store ID": detailStore._id,
                    });
                    
                    mixpanel.people.increment("Saved Stores", -1);
                } else {
                    mixpanel.track("Store Bookmark", {
                        "Store Name": detailStore.name,
                        "Store Category": detailStore.category,
                        // "Store Rating": cartIds,
                        "Total Favorites": detailStore.favorites.length + 1,
                        "Total Reviews": detailStore.reviews.length,
                        "Store ID": detailStore._id,
                    });
                    
                    mixpanel.people.increment("Saved Stores");
                }
            }
        }
    }

    if(auth.user && detailProduct && profile.subscriptions.length > 0 && !checkSub) {
        profile.subscriptions.map(subscription => {
            if (subscription._id === detailProduct.store._id.toString()) {
                setSubscribedToo(true);
            }
        })
        
        setCheckSub(true);
    }  

    const onAddToCart = (id) => {
        addToCart(id);
        addTotals();
    }

    const handleModalOpen = (id) => {
        openModal(id);
    }

    const handleCollectionModalOpen = () => {
        openCollectionModal();
    }

    const todo = (e, id, item) => {
        e.preventDefault();

        let selectedVariant;
        let tempVars = [...variant.sortedVariants];
        
        if(colorState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.color === selectedColor)];
        }

        if (sizeState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.size === selectedSize)];
            console.log('ATTEMPTED FILTER')
            console.log(tempVars)
        }
        if (weightState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.weight === selectedWeight)];
        }
        if (typeState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.type === selectedType)];
        }
        if (bundleState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.bundle === selectedBundle)];
        }
        if (scentState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.scent === selectedScent)];
        }
        if (fitState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.fit === selectedFit)];
        }
        if (flavorState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.flavor === selectedFlavor)];
        }
        if (materialState.length > 0) {
            tempVars = [...tempVars.filter(prodVar => prodVar.material === selectedMaterial)];
        }http://localhost:3000/admin/5f73eea1ce775100176937a0

        selectedVariant = tempVars[0];

        console.log('SELECTED VARIANT');
        console.log(selectedVariant);

        if(tempVars.length > 0){
            onAddToCart(selectedVariant._id);
            handleModalOpen(id);
            clicked(item);
            setCartLoading(true);
        } else {
            setAlert('Please select available options', 'danger')
        }
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

    if(!sentMixpanel && auth.user !== null) {
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

    if(!sentView && auth.user && detailProduct) {
        addView(detailProduct._id)
        setSentView(true);
    }

    if(!storesLoaded && detailProduct) {
        getStoresByTag(detailProduct.category);
        setStoresLoaded(true);
    }

    if(!productsLoaded && detailProduct) {
        getCategoryProducts(detailProduct.category, skip);
        setProductsLoaded(true)
    }

    if (detailProduct && !gotDescription) {
        console.log('DESCRIPTION BLOCK')

        let unRawState;

        if(detailProduct.description !== null) {
            unRawState = EditorState.createWithContent(
                convertFromRaw(JSON.parse(detailProduct.description))
            );
        
            console.log(unRawState)

            console.log(draftToHtml(convertToRaw(unRawState.getCurrentContent())))
            
            const unRawDescription = draftToHtml(convertToRaw(unRawState.getCurrentContent()));

            setDescriptionState(unRawDescription);
        }

        
        // let editorState = detailProduct.description
        // const rawContentState = editorState.getCurrentContent();
 
        // const markup = draftToHtml(
        //     rawContentState
        // );

        // console.log(markup)

        setGotDescription(true)
    }

    let htmlDescription;

    if(descriptionState !== null) {
        const descString = descriptionState;
        htmlDescription = descString.substring(1, descString.length-1);

        console.log(htmlDescription);
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

        if(variant.sortedVariants.length > 0) {
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
        }
        console.log('SHOULD HAVE ARRAYS');

        handleOptions();
    }

    const handleSelectedColor = (option) => {
        setSelectedColor(option);
        handleOptions();
    }

    const handleSelectedSize = (option) => {
        setSelectedSize(option);
        handleOptions();
    }

    const handleSelectedWeight = (option) => {
        setSelectedWeight(option);
        handleOptions();
    }

    const handleSelectedType = (option) => {
        setSelectedType(option);
        handleOptions();
    }

    const handleSelectedBundle = (option) => {
        setSelectedBundle(option);
        handleOptions();
    }

    const handleSelectedScent = (option) => {
        setSelectedScent(option);
        handleOptions();
    }

    const handleSelectedFit = (option) => {
        setSelectedFit(option);
        handleOptions();
    }

    const handleSelectedFlavor = (option) => {
        setSelectedFlavor(option);
        handleOptions();
    }

    const handleSelectedMaterial = (option) => {
        setSelectedMaterial(option);
        handleOptions();
    }


    const handleOptions = () => {
        console.log('COLOR VALUUUE');
        console.log(colorArray);
        setColorState([...colorArray]);
        console.log('COLOR STATE');
        console.log(colorState);
        if(colorArray.length > 0) {
            console.log('COLOR PASSED');
            let choices;
            // choices = colorArray.map(option => <option key={option} value={`${option}`}>{option}</option>);
            choices = colorArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedColor(option)}>{option}</div>);
            setColorValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Color:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = sizeArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedSize(option)}>{option}</div>);
            setSizeValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Size:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = weightArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedWeight(option)}>{option}</div>);
            setWeightValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Weight:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = typeArray.map(option => <div style={selectedType === option ? {border: '2px solid #ffbf00', color: '#333'} : null} className="variant_option" key={option} onClick={e => handleSelectedType(option)}>{option}</div>);
            setTypeValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Type:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = bundleArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedBundle(option)}>{option}</div>);
            setBundleValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Bundle:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = scentArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedScent(option)}>{option}</div>);
            setScentValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Scent:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = fitArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedFit(option)}>{option}</div>);
            setFitValue((
                <div style={{display:'flex', flexDirection:'column', width: '100%', marginBottom:'10px'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Fit:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = flavorArray.map(option => <div className="variant_option" key={option} onClick={e => handleSelectedFlavor(option)}>{option}</div>);
            setFlavorValue((
                <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Flavor:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
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
            choices = materialArray.map(option => <div className={selectedMaterial === option ? "variant_option active": "variant_option"} key={option} onClick={e => handleSelectedMaterial(option)}>{option}</div>);
            setMaterialValue((
                <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <p style={{fontWeight:'bold', color:'#333', fontSize:'12px'}}>Material:</p>
                    <hr style={{background:'#dfe1e5', height:'1px', margin:'0 0 1rem 0'}}/>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        {choices}
                    </div>
                </div>
            ))
        }
    }

    // const { _id, company, img, info, price, title, inCart} = detailProduct;
    
    if(variant.sortedVariants.length > 0 && !loading && !varsLoaded) {
        getVarKeys(); 
        setVarsLoaded(true)
    } 

    let detailItem;

    if(detailProduct === null || loading) {
        detailItem = <Spinner />;
    }
    else {
        let liked = false;
        if (auth.user) {
            if(detailProduct.likes.filter(like => like.user.toString() === auth.user._id).length > 0){
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
                <div style={{background:'#fff', border: '1px solid rgb(214, 214, 214)', margin:'10px'}}>
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
                                <div className="mobile" style={{width:'100%', background:'yellow', overflow:'hidden'}}>
                                    <ImageOverview images={img_gallery} title="Imgs" changeImage={changeImage} showImage={showImage} detailProduct={detailProduct} />
                                </div>

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
                                        <div><p style={{color:'#333', fontWeight:'bold'}}>{detailProduct.name}:{selectedColor} {selectedSize} {selectedType} {selectedFit} {selectedWeight} {selectedMaterial} {selectedBundle} {selectedScent} {selectedFlavor}</p></div>
                                        <div>
                                            <i style={{color:'#808080', margin:'1rem 1rem 0 0', fontSize:'20px'}} onClick={handleCollectionModalOpen} class="far fa-bookmark"></i>
                                        </div>
                                    </div>
                                    <h3 style={{color:'#ff4b2b', marginTop:'-1rem', fontWeight:'bold'}}>${detailProduct.price}</h3>
                                    {/* <p><i style={{color:'#808080'}} class="fas fa-truck"></i> Next Delivery Time: <span style={{fontWeight:'bold', color:'#ff4b2b'}}>1pm</span></p> */}
                                    <p><i style={{color:'#808080'}} class="fas fa-truck"></i> Est. Delivery Time: <span style={{fontWeight:'bold', color:'#ff4b2b'}}>2 hr</span></p>
                                    <p style={{color:'#808080', marginTop:'-1rem'}}><i className="fas fa-sign-out-alt" /> Return eligible</p>
                                    <hr style={{background:'#dfe1e5', height:'1px', marginBottom:'0.5rem'}}/>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center', marginTop:'-0.6rem', padding:'0 1rem'}}>
                                        <div style={{display:'flex', alignItems: 'center'}}>
                                            <a href={`https://www.cardboardexpress.com/store/${detailProduct.store._id}`}>
                                                {detailProduct.store.img_name ? (
                                                    <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${detailProduct.store.img_name}`} alt="img" /> 
                                                ) : (
                                                    <div style={{background:'#f4f4f4', height: '35px', width:'35px', marginRight: '1rem', borderRadius: '50px'}} />
                                                )}
                                            </a>
                                            <div style={{ display: 'flex', flexDirection:'column', lineHeight:'17px', marginTop:'0.5rem'}}>
                                                <a href={"https://www.cardboardexpress.com/store/" + detailProduct.store._id}>
                                                    {detailProduct.store.name}
                                                </a>
                                                <p style={{color:'#808080', fontSize:'13px', fontFamily:'Arial, Helvetica,sans-serif'}}>Wholesaler</p>
                                                {/* <Link to={"/location/" + detailProduct.locationId._id} style={{color:'#808080'}}>Wholesaler</Link> */}
                                            </div>
                                        </div>
                                        {subscribedToo ? (
                                            <div className="detail-sub-btn active" onClick={() => handleSubscribe(detailProduct.store)}>
                                                <p style={{fontWeight:'500', margin:'0'}}>Subscribed <i style={{marginLeft:'10px'}} class="fas fa-check"></i></p>
                                            </div>
                                        ) : (
                                            <div className="detail-sub-btn" onClick={() => handleSubscribe(detailProduct.store)}>
                                                <p style={{fontWeight:'500', margin:'0'}}>Subscribe <i style={{marginLeft:'10px'}} class="fas fa-plus"></i></p>
                                            </div>
                                        )}
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
                                            onClick={(e) =>todo(e, detailProduct._id, detailProduct)}
                                            disabled={cartLoading ? true : false} 
                                            style={{marginTop:'50px'}}
                                        >
                                            {cartLoading ? <ButtonSpinner /> : "Add To Cart"}
                                        </button>
                                        <div className="store-socials desktop" id="store-socials">
                                            {liked ? (
                                                <button 
                                                    onClick={() => addLike(detailProduct._id)} 
                                                    style={{background:'#ff4b2b', color:'#fff', borderColor:'#ff4b2b'}}
                                                >
                                                    Favorited 
                                                    <i 
                                                        style={{marginLeft:'10px', color:'#fff', outline:'none', fontSize:'13px'}} 
                                                        className="fas fa-heart"
                                                    ></i> 
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => addLike(detailProduct._id)} 
                                                    className="likeButton"
                                                >
                                                    Favorite 
                                                    <i 
                                                        style={{marginLeft:'10px', color:'#ff4b2b', fontSize:'13px'}} 
                                                        className="fas fa-heart"
                                                    ></i> 
                                                </button>
                                            )}
                                        </div>
                                        {detailProduct.likes.length > 2 && <div style={{width:'100%', textAlign:'center'}}><span style={{color:'#808080',}}> <span>{detailProduct.likes.length}</span> Others favorited</span></div>}
                                    {/* </div> */}
                                    {/* <TableDetails page="store" setModal={setModal} description={detailProduct.description} /> */}

                                    <div style={{marginTop:'50px'}}>
                                        <p style={{color:'#333', fontWeight:'bold'}}>Description</p>
                                        <hr style={{marginTop:'-0.5rem', background:'#dfe1e5', height:'1px'}}/>
                                        {descriptionState !== null && (<div dangerouslySetInnerHTML={{__html: descriptionState}} />)}
                                        
                                    </div>
                                    {/* <textarea
                                            disabled
                                            value={draftToHtml(convertFromRaw(JSON.parse(detailProduct.description)))}
                                        ></textarea> */}
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
                </div>
                <div style={{margin:'10px', background:'#fff', border: '1px solid rgb(214, 214, 214)'}}>
                    <ProductOverview shop title="You may also like..." products={products} link={`/collection?filter=${detailProduct.category}`} />
                </div>

                {store.stores.length > 0 && detailProduct && (
                    <div style={{margin:'10px', background:'#fff', border: '1px solid rgb(214, 214, 214)'}}>
                        <BrandOverview title={`Other Stores For ${detailProduct.category}`} stores={store.stores} profile={profile} />
                    </div>
                )}
    
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
                <div style={{maxWidth:'100vw', background:'rgb(247, 247, 247)'}}>
                    <div className="detail-container">
                        <ul class="home-underline store" style={{background:'#fff', margin:'0', border:'1px solid rgb(214, 214, 214)'}}>
                            <div onClick={e => handleTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                            <div onClick={e => handleTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                            <div onClick={e => handleTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
                        </ul>
                        
                        <div className="header-nav-container detail">
                            <div style={{padding:'10px'}}>
                                <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                                    Pick A Category
                                </h3>
                            </div>
                            <div style={{marginTop:'-2rem'}}>
                                <Header />
                            </div>
                        </div>
                        {detailItem}
                    </div>
                </div>
                
                {!auth.loading && !auth.isAuthenticated ? <AuthModal /> : null }
            </Fragment>
        )
}

Details.propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addView: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
    getStoresByTag: PropTypes.func.isRequired,
    favorite: PropTypes.func.isRequired,
    getCategoryProducts: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired,
    openCollectionModal: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    auth: state.auth,
    store: state.store,
    profile: state.profile
});

export default connect(
    mapStateToProps, { 
        getProductVariants, 
        addToCart, 
        clearProducts,
        addLike, 
        addView,
        getCart, 
        openModal, 
        addTotals, 
        handleDetail, 
        addReview, 
        getStoresByTag, 
        favorite,
        getCategoryProducts, 
        setNav1, 
        setMainNav,
        openCollectionModal, 
        setAlert 
    }
)(Details);
