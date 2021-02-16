import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductSideDrawer from '../../admin/pages/page_components/product/SideDrawerProduct';
import CollectionSideDrawer from '../../admin/pages/page_components/collection/SideDrawerCollection';
import LocationSideDrawer from '../../admin/pages/page_components/location/SideDrawerLocation';

import addBookmark from '../../common/add-bookmarks.svg';

const Main_Admin_Nav = ({
    setNavValue,
    navValue,
    setSlideForm1, 
    slideForm1, 
    nav, 
    store, 
    match}) => {
    const [slideForm2, setSlideForm2] = useState(false);
    const [adminValue, setAdminValue] = useState(null);

    const [adminNav, setAdminNav] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    // Page
    const [navHighlight, setNavHighlight] = useState(null);


    useEffect(() => {
        if(
            nav.page === 'admin detail product' || 
            nav.page === 'admin detail collection' || 
            nav.page === 'admin detail location'
        ){
            setSlideForm2(true);
        }

        if(nav.page === 'admin shop') {
            setNavHighlight('shop');
        }
        if(nav.page === 'admin inventory') {
            setNavHighlight('inventory');
        }

        if(nav.page === 'admin orders') {
            setNavHighlight('orders');
        }

        if(nav.page === 'admin people') {
            setNavHighlight('people');
        }

        if(nav.page === 'admin settings') {
            setNavHighlight('settings');
        }

        if(nav.main === 'people') {
            setNavValue('people')
        }

        renderAdminNav();

      }, [nav.page, nav.main])

    const renderAdminNav = async () => {
        setAdminNav([]);
    }

    return (
        <div className="store-settings-transition">
            {/** Transition 1 */}
            <div className={!slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-1">
                {nav.page === 'admin detail product' || nav.page === 'admin detail collection' || nav.page === 'admin detail location' ? (
                    <div style={{marginBottom:'5px', cursor:'pointer'}} onClick={() => setSlideForm2(!slideForm2)}>
                        <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-end'}}>
                            <p style={{margin:'0', color:'#808080'}}>View Inventory<span style={{margin:'0 10px'}}><i className="fas fa-arrow-right"></i></span></p>
                        </div>
                    </div>
                ) : null} 

                <a style={{margin:'5px 0'}}  href={store.store ? `https://www.cardboardexpress.com/admin/${store.store._id}?show=store` : "#"}>
                    <div className={navHighlight === "shop" ? "store-table-nav-items main active": "store-table-nav-items main"}>
                        <h3 style={{fontWeight:'600'}}>
                        <span>
                            {/* <img src={addBookmark} style={{width:'20px', marginRight:'1rem'}} alt="subscribe" />*/}
                            <i style={{fontSize:'20px', marginRight:'10px'}} className="fas fa-store"></i> 
                        </span>
                        My Store
                        </h3>
                    </div>
                </a>
                <a style={{margin:'5px 0'}} href={store.store ? `https://www.cardboardexpress.com/admin/${store.store._id}?show=inventory` : "#"}>
                    <div className={navHighlight === "inventory" ? "store-table-nav-items main active": "store-table-nav-items main"}>
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'20px', marginRight:'10px'}} className="fas fa-boxes"></i></span>Inventory</h3>
                    </div>
                </a>
                {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                    <h3>Payments</h3>
                    <p>Add payment methods</p>
                </div>  */}
                <a style={{margin:'5px 0'}} href={store.store ? `https://www.cardboardexpress.com/admin/${store.store._id}?show=orders` : "#"}>
                    <div className={navHighlight === "orders" ? "store-table-nav-items main active": "store-table-nav-items main"}>
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-cash-register"></i></span>Orders</h3>
                    </div>
                </a>
                
                <a style={{margin:'5px 0'}} href={store.store ? `https://www.cardboardexpress.com/admin/${store.store._id}?show=people` : "#"}>
                    <div className={navHighlight === "customers" ? "store-table-nav-items main active": "store-table-nav-items main"}>
                        <h3 style={{fontWeight:'600'}}>
                        <span>
                            {/* <img src={addBookmark} style={{width:'20px', marginRight:'1rem'}} alt="subscribe" /> */}
                            <i style={{fontSize:'22px', marginRight:'9px'}} className="fas fa-user-tag"></i>
                        </span>
                        Customers
                        </h3>
                    </div>
                </a>

                <a style={{margin:'5px 0'}} href={store.store ? `https://www.cardboardexpress.com/admin/${store.store._id}?show=settings` : "#"}>
                    <div className={navHighlight === "settings" ? "store-table-nav-items main active": "store-table-nav-items main"}>
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-cog"></i></span>Settings</h3>
                    </div>
                </a>
    
            </div>
            <div className={slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-2">
                <div style={{marginBottom:'5px'}} onClick={() => setSlideForm2(!slideForm2)}>
                    <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                        <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back to menu</p>
                    </div>
                </div>
                {nav.page === 'admin detail product' && (
                    <ProductSideDrawer setSlideForm1={setSlideForm1} storeId={store.store ? store.store._id : undefined} /> 
                )}
                {nav.page === 'admin detail collection' && (
                    <CollectionSideDrawer setSlideForm1={setSlideForm1} storeId={store.store ? store.store._id : undefined} /> 
                )}
                {nav.page === 'admin detail location' && (
                    <LocationSideDrawer setSlideForm1={setSlideForm1} storeId={store.store ? store.store._id : undefined} /> 
                )}
                <div className="store-table-nav-items secondary" style={{width:'234px', margin:'5px 0', padding:'0'}}>
                </div>
            </div>
        </div>
    )
}

Main_Admin_Nav.propTypes = {
    nav: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav,
    store: state.store
});

export default connect(mapStateToProps, null)(withRouter(Main_Admin_Nav));
