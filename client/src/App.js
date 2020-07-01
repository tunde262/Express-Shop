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
import StoresPage from './pages/StoresPage';
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
import ProductPage from './components/admin/ProductPage';
import AddProduct from './components/admin/forms/AddProduct';
import StoreForm from './components/admin/forms/StoreForm';
import AddCollection from './components/admin/forms/AddCollection';
import ProductList from './components/admin/ProductList';

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
            <main>
              <Alert />
              <Switch>
                {/* Category Pages */}
                {/* <Route exact path="/" component={Landing} /> */}
                {/* <Route exact path="/" component={ProductsPage} /> */}
                <Route exact path="/top" component={Tops} />
                <Route exact path="/bottom" component={Bottoms} />
                <Route exact path="/hat" component={Hats} />
                {/* <Route exact path="/socks" component={Socks} />
                <Route exact path="/baby" component={Baby} />
                <Route exact path="/health" component={Health} />
                <Route exact path="/household-essentials" component={HouseholdEssentials} />
                <Route exact path="/pets" component={Pets} />
                <Route exact path="/kitchen-dining" component={KitchenDining} />
                <Route exact path="/party-supplies" component={PartySupplies} />
                <Route exact path="/personal-care" component={PersonalCare} />
                <Route exact path="/school-office" component={SchoolOffice} /> */}
                {/* <Route exact path="/apparel" component={ApparelPage} />
                <Route exact path="/beauty" component={Beauty} />
                <Route exact path="/home-decor" component={HomeDecor} />
                <Route exact path="/sports" component={Sports} />
                <Route exact path="/toys" component={Toys} />*/}
                <Route exact path="/stores" component={StoresPage} />
                <Route exact path="/" component={ExplorePage} />
                {/* Auth Pages */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                {/* Cart & Checkout */}
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                {/* Profile  */}
                <PrivateRoute exact path="/profile" component={Profile} />
                {/* Admin Pages */}
                <Route exact path="/admin/all" component={ProductList} />
                <Route exact path="/admin/add-product" component={AddProduct} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/admin/product/:id" component={ProductPage} />
                <Route exact path="/create-store" component={StoreForm} />
                <Route exact path="/admin/collection/add" component={AddCollection} />
                {/* Product Page */}
                <Route exact path="/:id" component={Details} />
                {/* Page not found */}
                <Route component={Default} />
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
