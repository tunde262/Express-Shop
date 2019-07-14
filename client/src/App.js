import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Landing from './pages/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';
import Footer from './components/layout/Footer/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/alert';
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
import Admin from './components/admin/Admin';
import AddProduct from './components/admin/AddProduct';
import ProductList from './components/admin/ProductList';
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
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
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
                <Route exact path="/" component={Landing} />
                <Route exact path="/all" component={ProductsPage} />
                <Route exact path="/apparel" component={ApparelPage} />
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
                <Route exact path="/brand" component={BrandPage} />
                <Route exact path="/explore" component={ExplorePage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/admin/all" component={ProductList} />
                <Route exact path="/admin/add" component={AddProduct} />
                {/* <Route exact path="/category/:category" component={CategoryPage} /> */}
                <Route exact path="/:id" component={Details} />
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
