import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';

// Layout
import ExplorePage from './pages/ExplorePage';
import Landing from './pages/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';
import Footer from './components/layout/Footer/Footer';

import Routes from './components/routing/Routes';
import Modal from './components/Modal';



// Category Pages
import Tops from './pages/Tops';
import Bottoms from './pages/Bottoms';
import Hats from './pages/Hats';

// Profile Pages
import Profile from './components/profile/Profile';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const initializeReactGA = () => {
    ReactGA.initialize('UA-144191515-1');
  }

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
    initializeReactGA();
  }, []);
  
  const [sideDrawer, setSideDrawer] = useState({
    sideDrawerOpen: false 
  });

  const clicked = () => {
    ReactGA.event({
      category: 'Account',
      action: 'Toggled'
    });
  }

  const drawerToggleClickHandler = () => {
    clicked();
    setSideDrawer((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  const backdropClickHandler = () => {
    setSideDrawer({sideDrawerOpen: false });
  }

  let backdrop;

  if (sideDrawer.sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  
  return (
    <Provider store={store}>
      <StripeProvider apiKey="pk_live_TGJb7MssdJJyke7Wg6WpDj1e00gVdDNGxd">
        <Router>
          <div style={{height: '100%'}}>
            <Navbar drawerClickHandler={drawerToggleClickHandler} />
            <SideDrawer show={sideDrawer.sideDrawerOpen} drawerClickHandler={drawerToggleClickHandler} />
            {backdrop}
            <main id="home">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
              </Switch>
            </main>
          </div>
          <Modal />
          {/* <Footer /> */}
        </Router>
      </StripeProvider>
    </Provider>
  );
}

export default App;
