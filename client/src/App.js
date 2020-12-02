import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

// CSS - controlled by /scss
import './css/main.css';

// Redux
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import store from './store';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { getProducts, getCart } from './actions/productActions';
import { getCurrentProfile } from './actions/profileActions';

// Google Analytics
import ReactGA from 'react-ga';

// Auth
import Register from './components/auth/registration/Register';
import Personalize from './components/auth/registration/personalize/Personalize';
import Login from './components/auth/Login';
import BusinessLanding from './pages/BusinessLanding';

// Layout
import HomePage from './pages/HomePage';
import HomeLanding from './pages/HomeLanding';
import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import CartDrawer from './components/layout/SideDrawer/CartDrawer';
import AuthDrawer from './components/layout/SideDrawer/AuthDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';

import StoreForm from './components/admin/forms/store_form/StoreForm';

import Routes from './components/routing/Routes';
import AddToCartModal from './components/modals/cart-modal/AddToCartModal';
import CreateCollectionModal from './components/modals/collection-modal/createNew/CreateCollectionModal';
import AddToCollectionModal from './components/modals/collection-modal/addTo/AddToCollectionModal';

import StoreNavElements from './components/TableDetails/StoreNav/Main_Store_Nav';
import CategoryNavElements from './components/TableDetails/CategoryNav/Main_Cat_Nav';
import ProfileNavElements from './components/TableDetails/ProfileNav/Main_Profile_Nav';
import AdminNavElements from './components/TableDetails/AdminNav/Main_Admin_Nav';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

// Collection Data
const initialState = {
  name: '',
  visible: true,
};

const App = () => {
  const initializeReactGA = () => {
    ReactGA.initialize('UA-144191515-1');
    mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
  }

  const [cartStores, setStoresList] = useState([]);
  

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
    store.dispatch(getCart());
    initializeReactGA();
  }, []);
  
  const [sideDrawerOpen, setSideDrawer] = useState(false);

  const [slideForm1, setSlideForm1] = useState(false);

  const [navValue, setNavValue] = useState('profile');

  const [cartDrawerOpen, setCartDrawer] = useState(false);

  const [authDrawerOpen, setAuthDrawer] = useState(false);

  const [drawer, showDrawer] = useState(false);

  const [displayCollectionModal, setCollectionModal] = useState(false);

  // START Collection Data & Handling
  const [formData, setFormData] = useState(initialState);

  const [collectionTags, setCollectionTags] = useState([]);

  const switchChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
  }

  const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onAddCollectionTag = (tag) => {
      setCollectionTags([...collectionTags, tag]);
      // filterItems(tag);
  }

  const loadCollectionTags = (tags) => {
      setCollectionTags(tags);
  }

  const onDeleteCollectionTag = (tag) => {
      // alert(`deleting ${tag}`);
      let remainingTags = collectionTags.filter ((t) => {
      return (t !== tag);
      });
      setCollectionTags([...remainingTags]);
      // unFilterItems(tag);
  }

  const handleModalClose = () => {
      setCollectionModal(false);
  }

  // END COLLECTION

  const clicked = () => {
    ReactGA.event({
      category: 'Account',
      action: 'Toggled'
    });
  }

  const drawerToggleClickHandler = () => {
    clicked();
    setSideDrawer(!sideDrawerOpen);
    showDrawer(true);
  };

  const toggleCartDrawer = () => {
    clicked();
    setCartDrawer(!cartDrawerOpen);
    showDrawer(true);
  };

  const toggleAuthDrawer = () => {
    clicked();
    setAuthDrawer(!authDrawerOpen);
    showDrawer(true);
  };


  const backdropClickHandler = () => {
    setSideDrawer(false );

    setCartDrawer(false);

    setAuthDrawer(false);

    showDrawer(false);
  }

  let backdrop;

  if (sideDrawerOpen || cartDrawerOpen || authDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  
  return (
    <Provider store={store}>
      <StripeProvider apiKey="pk_live_TGJb7MssdJJyke7Wg6WpDj1e00gVdDNGxd">
        <Router>
          <div style={{height: '100%'}}>
            <Navbar backdrop={drawer} backdropClickHandler={backdropClickHandler} drawerClickHandler={drawerToggleClickHandler} toggleAuthDrawer={toggleAuthDrawer} toggleCartDrawer={toggleCartDrawer} />
            <SideDrawer show={sideDrawerOpen} toggleAuthDrawer={toggleAuthDrawer} toggleCartDrawer={toggleCartDrawer} drawerClickHandler={drawerToggleClickHandler} />
            <CartDrawer cartStores={cartStores} setStoresList={setStoresList} show={cartDrawerOpen} toggleCartDrawer={toggleCartDrawer} drawerClickHandler={drawerToggleClickHandler} />
            <AuthDrawer show={authDrawerOpen} toggleAuthDrawer={toggleAuthDrawer} drawerClickHandler={drawerToggleClickHandler} />
            {backdrop}
            <main id="home">
              <Switch>
                {/* Landing Pages */}
                <Route exact path="/" component={HomeLanding} />
                <Route exact path="/business" component={BusinessLanding} />
                {/* Auth Pages */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/success" component={Personalize} />
                {/*Admin Forms */}
                <Route exact path="/create-store" component={StoreForm} />
                <div className="store-table">
                    <div style={{height:'100%'}} className="store-table-nav">
                      <div className="store-settings-transition">
                        {/** Transition 1 */}
                        <div className={!slideForm1 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-1">
                          {navValue === 'admin' ? 
                            <AdminNavElements setNavValue={setNavValue} navValue={navValue} setSlideForm1={setSlideForm1} slideForm1={slideForm1} /> 
                            : <StoreNavElements setCollectionModal={setCollectionModal} displayCollectionModal={displayCollectionModal} setNavValue={setNavValue} navValue={navValue} setSlideForm1={setSlideForm1} slideForm1={slideForm1} />
                          }
                        </div>
                        <div className={slideForm1 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-2">
                          {navValue === 'category' && <CategoryNavElements setSlideForm1={setSlideForm1} slideForm1={slideForm1} />}
                          {navValue === 'profile' && <ProfileNavElements setSlideForm1={setSlideForm1} slideForm1={slideForm1} />}
                        </div>
                      </div>
                        
                    </div>
                    <div className="store-table-main home">
                      <Route component={Routes} />
                    </div>
                </div>
              </Switch>
            </main>
          </div>
          <AddToCartModal />
          <CreateCollectionModal 
            displayCollectionModal={displayCollectionModal} 
            setCollectionModal={setCollectionModal} 
            formData={formData}
            switchChange={switchChange}
            onChange={onChange}
            onAddCollectionTag={onAddCollectionTag}
            loadCollectionTags={loadCollectionTags}
            onDeleteCollectionTag={onDeleteCollectionTag}
            handleModalClose={handleModalClose}
            collectionTags={collectionTags}
          />
          <AddToCollectionModal 
            formData={formData}
            switchChange={switchChange}
            onChange={onChange}
            onAddCollectionTag={onAddCollectionTag}
            loadCollectionTags={loadCollectionTags}
            onDeleteCollectionTag={onDeleteCollectionTag}
            collectionTags={collectionTags}
          />
        </Router>
      </StripeProvider>
    </Provider>
  );
}

export default App;
