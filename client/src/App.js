import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

// Google Analytics
import ReactGA from 'react-ga';

// Layout
import HomePage from './pages/HomePage';
import HomeLanding from './pages/HomeLanding';
import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import CartDrawer from './components/layout/SideDrawer/CartDrawer';
import AuthDrawer from './components/layout/SideDrawer/AuthDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';

import Routes from './components/routing/Routes';
import AddToCartModal from './components/modals/AddToCartModal';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const initializeReactGA = () => {
    ReactGA.initialize('UA-144191515-1');
    mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
  }

  const [cartStores, setStoresList] = useState([]);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
    initializeReactGA();
  }, []);
  
  const [sideDrawerOpen, setSideDrawer] = useState(false);

  const [cartDrawerOpen, setCartDrawer] = useState(false);

  const [authDrawerOpen, setAuthDrawer] = useState(false);

  const [drawer, showDrawer] = useState(false);

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
                <Route exact path="/" component={HomeLanding} />
                <Route component={Routes} />
              </Switch>
            </main>
          </div>
          <AddToCartModal />
        </Router>
      </StripeProvider>
    </Provider>
  );
}

export default App;
