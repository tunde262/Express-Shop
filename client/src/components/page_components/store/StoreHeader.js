import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import Banner from '../../common/Banner';
import { CSSTransition } from 'react-transition-group';
import DefaultBanner from '../../../utils/imgs/placeholderimg.jpg';

import Modal from 'react-responsive-modal';
import { addBannerImg } from '../../../actions/storeActions';
import img1 from '../../../utils/imgs/img_soccer.jpg';
import img2 from '../../../utils/imgs/img_americanfootball.jpg';
import img3 from '../../../utils/imgs/img_soccer.jpg';
import img4 from '../../../utils/imgs/img_soccer.jpg';
import img5 from '../../../utils/imgs/img_fencing.jpg';
import img6 from '../../../utils/imgs/img_cyclingbmx.jpg';
import img7 from '../../../utils/imgs/img_volleyball.jpg';

import DragAndDrop from '../../admin/forms/utils/DragAndDrop';

import mixpanel from 'mixpanel-browser';

const StoreHeader = ({ 
    store: { 
        store, 
        loading 
    }, 
    product, 
    admin, 
    addBannerImg,
    tableShow1, 
    setTable 
}) => {

    const [files, setFiles] = useState([]);

    const [modalShow1, setModalShow1] = useState('upload');

    // Toggle
    const [displayModal, toggleModal] = useState(false);

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [tableShow2, setTableShow2] = useState('shop');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);

    const [menuHeight, setMenuHeight] = useState(null);

    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const fileChanged = e => {
        console.log(files)
        let fileList = [];
        files.map(file => fileList.push(file));
        for (var i = 0; i < e.target.files.length; i++) {
          if(!e.target.files[i]) return;
          fileList.push(e.target.files[i])
        }
        setFiles(fileList);
    }

    const handleDrop = newFiles => {
        console.log(files)
        let fileList = [];
        files.map(file => fileList.push(file));
        for (var i = 0; i < newFiles.length; i++) {
          if(!newFiles[i]) return;
          fileList.push(newFiles[i])
        }
        setFiles(fileList);
      }

    const setModal = () => {
        toggleModal(!displayModal);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // if(!detailProduct) {
        addBannerImg(files, store._id);
        // } else {
        //   editProduct(data, detailProduct._id, store._id, history);
        // }

        console.log('STORE IMG ID: ');
        console.log(store._id);
        
        let banner_value = false;

        if (store.banner_imgs.length > 0) {
            banner_value = true;
        }
        
        mixpanel.track("Store Banner Update", {
            // "Entry Point": "Home Landing",
            "# of Public Store Items": product.products.length,
            // "# of People Part of Store": "Home Landing",
            "Store Name": store.name,
            // "Store Category": "Home Landing",
            // "Store ID": store._id,
            "Banner Value": banner_value,
        });
    
        setModal();
    };


    // const handleMixpanel = () => {
    //     let banner_value = false;

    //     if (store.banner_imgs.length > 0) {
    //         banner_value = true;
    //     }
    //     mixpanel.track("Store Admin View", {
    //         // "Entry Point": "Home Landing",
    //         "# of Public Store Items": product.products.length,
    //         // "# of People Part of Store": "Home Landing",
    //         "Store Name": store.name,
    //         // "Store Category": "Home Landing",
    //         "Store ID": store._id,
    //         "Banner Value": banner_value,
    //     });
    // }

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }


    // if(admin === "true" && !sentMixpanel && store !== null && !product.loading && product.products !== null) {
    //     handleMixpanel();
    //     setSentMixpanel(true);
    // }

    let tableContent;

    if(modalShow1 === 'upload') {
        tableContent = (
            <Fragment>
                <DragAndDrop handleDrop={handleDrop}>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        multiple
                        className="form-control"
                        placeholder="Choose images or Drag/Drop"
                        onChange={fileChanged}
                    />
                    {files.length > 0 ? (
                        <div style={{minHeight: 300, width: 250}}>
                            {files.map((file, i) => (
                                <Fragment key={i}>
                                <div>{file.name}</div>
                                <br/>
                                </Fragment>
                            )
                            )}
                        </div>
                        ) : <h3><small>or</small> <br/>Drag / Drop</h3>
                    }
                </DragAndDrop>
            </Fragment>
        );
    } else if (modalShow1 === 'general') {
        tableContent = (
            <div className="wrapper">  
                <section style={{display: 'grid ', gridGap:'5px', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img2} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img3} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img4} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img5} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img6} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img7} alt="img" />
                    </div>
                </section>
                <button>Upload</button>
            </div>
        );
    } else if(modalShow1 === 'clothing') {
        tableContent = <h1>clothing</h1>; 
    } else if(modalShow1 === 'pets') {
        tableContent = <h1>pets</h1>; 
    } else if(modalShow1 === 'kids') {
        tableContent = <h1>kids</h1>; 
    } else if(modalShow1 === 'sports') {
        tableContent = <h1>sports</h1>; 
    }

    const isMobile = windowWidth <= 769;


    return (
        <Fragment>
            {store !== null ? (
                <Fragment>
                    <div style={{width:'100%'}}>
                        {store !== null && <Banner imgLarge={DefaultBanner} imgSmall={DefaultBanner} />} 
                    </div>
                    <div className="store-header admin" style={{width:'100%'}}>
                        <div style={{display: 'flex', boxSizing:'border-box'}}>
                            {store && <img className="store-img" src={`/api/stores/image/${store.img_name}`} alt="img" />}
                            {/* <div style={{display:'flex'}}>
                                <h3 style={{color: "black"}}>{store.store.name}</h3>
                                {store.store.social && (
                                    <div  class="social" onClick={() => setToggleSocial(!toggleSocial)}>
                                        <i className={toggleSocial ? "fas fa-minus social-toggle" : "fas fa-plus social-toggle"}></i>
                                        <div className={toggleSocial ? "social-drop social-drop-show" : "social-drop social-drop-hide"}>
                                            <ul>
                                                {store.store.social.twitter && <a href={`${store.store.social.twitter}`} target="_blank"><li class="fa fa-twitter tw"></li></a>}
                                                {store.store.social.facebook && <a href={`${store.store.social.facebook}`} target="_blank"><li class="fab fa-facebook"></li></a>}
                                                {store.store.social.instagram && <a href={`${store.store.social.instagram}`} target="_blank"><li class="fab fa-instagram"></li></a>}
                                                {store.store.social.youtube && <a href={`${store.store.social.youtube}`} target="_blank"><li class="fab fa-youtube"></li></a>}
                                            </ul>
                                            
                                        </div>
                                    </div>
                                )}
                            </div> */}
                            <div className="store-details">
                                <div id="store-titles" style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <h2 className="store-title">{store && store.name}</h2>
                                        {store && store.social && !isMobile ? (
                                            <div className="social-container desktop" style={{marginLeft:'1rem'}}>
                                                {store.social.instagram && <a href={`${store.social.instagram}`} className="social" target="_blank"><i class="fab fa-instagram"></i></a>}
                                                {store.social.facebook && <a href={`${store.social.facebook}`} className="social" target="_blank"><i class="fab fa-facebook-f"></i></a>}
                                                {store.social.twitter && <a href={`${store.social.twitter}`} className="social" target="_blank"><i class="fab fa-twitter"></i></a>}
                                            </div>
                                        ) : null}
                                    </div>
                                    
                                    <p style={{color:'#808080', fontWeight:'600'}}>Clothing & Fashion</p>
                                </div>
                                
                                <div style={{maxHeight:'40px', overflow:'hidden', lineHeight:'15px'}} className="desktop" id="store-description">
                                    <p className="line-clamp" style={{color:'#808080', textAlign:'start', fontFamily:' Arial, Helvetica,sans-serif'}}>{store && store.description}</p>
                                </div>
                                
                                <div className="store-socials desktop" id="store-socials">
                                    <a href={store && `https://www.cardboardexpress.com/admin/${store._id}?show=settings`}>
                                        <button onClick={() => setTable('edit')}>
                                            Edit Store
                                            <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-pen"></i>
                                        </button>
                                    </a>
                                    <div onClick={() => setDropdown(!dropdown)} style={{border:'1px solid #0098d3', background:'#0098d3', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'35px', borderRadius:'5px'}}>
                                        <i style={{fontSize:'14px'}}class="fas fa-chevron-down"></i>
                                    </div>
                              
                                    <div className={dropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                                        <div className="menu">
                                            <a href="https://www.cardboardexpress.com/profile/saved" className="menu-item">
                                                <i style={{color:'#0098d3', fontSize:'1.3rem', marginRight:'10px'}} class="fas fa-eye"></i>
                                                View Store
                                            </a>
                                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                                            <a onClick={setModal} className="menu-item">
                                                <i style={{color:'#0098d3', fontSize:'1.4rem', marginRight:'10px'}} class="far fa-image"></i>
                                                Update Banner
                                            </a>
                                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                                            <a href="https://www.cardboardexpress.com/profile/orders" className="menu-item">
                                                <i style={{color:'#0098d3', fontSize:'1.3rem', marginRight:'10px'}} class="fas fa-qrcode"></i>
                                                Qr Code
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* <svg style={{fill:'currentColor', strokeWidth:0, verticalAlign:'middle', color:'#333'}} height="20" width="20" viewBox="0 0 24 24" aria-label="Send" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg> */}
                                </div>
                            </div>
                        </div>
                        {isMobile && (
                            <Fragment>
                                <div id="store-description-mobile">
                                    <p style={{color:'#808080'}}>{store && store.description}</p>
                                </div>
                                <div className="store-socials" id="store-socials-mobile">
                                    <button>
                                        Edit Store
                                        <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-pen"></i>
                                    </button>

                                    <div style={{border:'1px solid #0098d3', fontSize:'1.3rem', color:'#0098d3', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'55px', borderRadius:'5px', marginLeft:'10px'}}>
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div style={{border:'1px solid #0098d3', background:'#0098d3', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'35px', borderRadius:'5px'}}>
                                        <i style={{fontSize:'14px'}}class="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                    {/* <ul class="profile-underline store admin">
                        <div onClick={e => setTable('shop')} className={tableShow1 === "shop" && "active"}><li><i class="fas fa-shopping-bag"></i><p>Shop</p></li></div>
                        <div onClick={e => setTable('info')} className={tableShow1 === "info" && "active"}><li><i class="fas fa-info-circle"></i><p>Info</p></li></div>
                        <div onClick={e => setTable('related')} className={tableShow1 === "related" && "active"}><li><i class="fas fa-clipboard-list"></i><p>Related</p></li></div>
                    </ul> */}
                </Fragment>
            ) : (
                null
            )}

            <Modal open={displayModal} onClose={setModal} center>
                <h1 style={{color:'#333', fontWeight:'300'}}>Gallery</h1>
                <ul class="modal-underline">
                    <li className={modalShow1 === "upload" && "active"} onClick={e => setModalShow1('upload')}><a>upload</a></li>
                    <li className={modalShow1 === "general" && "active"} onClick={e => setModalShow1('general')}><i class="fas fa-candy-cane"></i></li>
                    <li className={modalShow1 === "clothing" && "active"} onClick={e => setModalShow1('clothing')}><i class="fas fa-tshirt"></i></li>
                    <li className={modalShow1 === "pets" && "active"} onClick={e => setModalShow1('pets')}><i class="fas fa-paw"></i></li>
                    <li className={modalShow1 === "kids" && "active"} onClick={e => setModalShow1('kids')}><i class="fas fa-baby"></i></li>
                    <li className={modalShow1 === "sports" && "active"} onClick={e => setModalShow1('sports')}><i class="fas fa-basketball-ball"></i></li>
                </ul>
                {tableContent}
                <button onClick={onSubmit} class="btn btn-primary">Upload</button>
            </Modal>
        </Fragment>
    )
}

StoreHeader.propTypes = {
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    addBannerImg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
})

export default connect(mapStateToProps, { addBannerImg })(StoreHeader);