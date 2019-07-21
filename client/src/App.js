import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReactGA from 'react-ga';

import './App.css';

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';
// Layout
import Landing from './pages/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';
import Footer from './components/layout/Footer/Footer';
// Auth & Alerts
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/alert';
// Pages
import CategoryPage from './pages/CategoryPage';
import ApparelPage from './pages/ApparelPage';
import ExplorePage from './pages/ExplorePage';
import ProductsPage from './pages/ProductsPage';
import BrandPage from './pages/BrandPage';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import Checkout from './components/Cart/checkout/Checkout';
// Admin pages
import Admin from './components/admin/Admin';
import AddProduct from './components/admin/AddProduct';
import ProductList from './components/admin/ProductList';
// Category Pages
import Baby from './pages/Baby';
import Beauty from './pages/Beauty';
import Health from './pages/Health';
import HomeDecor from './pages/HomeDecor';
import HouseholdEssentials from './pages/HouseholdEssentials';
import KitchenDining from './pages/KitchenDining';
import PartySupplies from './pages/PartySupplies';
import PersonalCare from './pages/PersonalCare';
import SchoolOffice from './pages/SchoolOffice';
import Sports from './pages/Sports';
import Toys from './pages/Toys';
import Pets from './pages/Pets';
import Tops from './pages/Tops';
import Bottoms from './pages/Bottoms';
import Hats from './pages/Hats';
import Socks from './pages/Socks';
// Profile Pages
import Profile from './components/profile/Profile';

import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import store from './store';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { getProducts, getCart } from './actions/productActions';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const initializeReactGA = () => {
    ReactGA.initialize('UA-144191515-1');
    ReactGA.pageview('/homepage');
  }

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
    initializeReactGA();
  }, []);
  
  const [sideDrawer, setSideDrawer] = useState({
    sideDrawerOpen: false 
  });

  const drawerToggleClickHandler = () => {
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
      <StripeProvider apiKey="pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac">
        <Router>
          <div style={{height: '100%'}}>
            <Navbar drawerClickHandler={drawerToggleClickHandler} />
            <SideDrawer show={sideDrawer.sideDrawerOpen} drawerClickHandler={drawerToggleClickHandler} />
            {backdrop}
            <main>
              <Alert />
              <Switch>
                {/* Category Pages */}
                {/* <Route exact path="/" component={Landing} /> */}
                <Route exact path="/" component={ProductsPage} />
                <Route exact path="/top" component={Tops} />
                <Route exact path="/bottom" component={Bottoms} />
                <Route exact path="/hat" component={Hats} />
                <Route exact path="/socks" component={Socks} />
                {/* <Route exact path="/apparel" component={ApparelPage} />
                <Route exact path="/baby" component={Baby} />
                <Route exact path="/beauty" component={Beauty} />
                <Route exact path="/health" component={Health} />
                <Route exact path="/home-decor" component={HomeDecor} />
                <Route exact path="/household-essentials" component={HouseholdEssentials} />
                <Route exact path="/pets" component={Pets} />
                <Route exact path="/kitchen-dining" component={KitchenDining} />
                <Route exact path="/party-supplies" component={PartySupplies} />
                <Route exact path="/personal-care" component={PersonalCare} />
                <Route exact path="/school-office" component={SchoolOffice} />
                <Route exact path="/sports" component={Sports} />
                <Route exact path="/toys" component={Toys} />
                <Route exact path="/brand" component={BrandPage} />*/}
                <Route exact path="/explore" component={ExplorePage} />
                {/* Auth Pages */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                {/* Cart & Checkout */}
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                <Route exact path="/admin" component={Admin} />
                {/* Profile  */}
                <PrivateRoute exact path="/profile" component={Profile} />
                {/* Admin Pages */}
                <Route exact path="/admin/all" component={ProductList} />
                <Route exact path="/admin/add" component={AddProduct} />
                {/* Product Page */}
                <Route exact path="/:id" component={Details} />
                {/* Page not found */}
                <Route component={Default} />
              </Switch>
            </main>
          </div>
          <Modal />
          <Footer />
        </Router>
      </StripeProvider>
    </Provider>
  );
}

export default App;
