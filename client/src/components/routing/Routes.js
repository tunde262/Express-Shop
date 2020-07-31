import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Auth & Alerts
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/alert';

// Pages
import Details from '../Details';
import Cart from '../Cart/Cart';
import Default from '../Default';
import Checkout from '../Cart/checkout/Checkout';

// Profile Pages
import Profile from '../profile/Profile';
import ProfileOrders from '../profile/Orders';
import LikePage from '../../pages/LikePage';

// Admin pages
import Admin from '../admin/Admin';
import ProductPage from '../admin/pages/ProductPage';
import CollectionPage from '../admin/pages/CollectionPage';
import LocationPage from '../admin/pages/LocationPage';
import AddProduct from '../admin/forms/AddProduct';
import StoreForm from '../admin/forms/StoreForm';
import JoinForm from '../admin/forms/JoinForm';
import AddCollection from '../admin/forms/AddCollection';
import AddLocation from '../admin/forms/AddLocation';
import AddCustomer from '../admin/forms/AddCustomer';

// Store pages
import HomePage from '../../pages/HomePage';
import ExplorePage from '../../pages/ExplorePage';
import StoresPage from '../../pages/StoresPage';
import StorePage from '../../pages/StorePage';
import LocationShopPage from '../../pages/LocationPage';
import CategoryPage from '../../pages/CategoryPage';
import Dashboard from '../admin/pages/Dashboard';

import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <Fragment>
        <Alert />
        <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/explore" component={ExplorePage} />
            {/* Category Pages */}
            <Route exact path="/categories" component={CategoryPage} />
            <Route exact path="/stores" component={StoresPage} />
            {/* Store Shop Page */}
            <Route exact path="/store/:id" component={StorePage} />
            {/* Location Shop Page */}
            <Route exact path="/location/:id" component={LocationShopPage} />
            {/* Auth Pages */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* Cart & Checkout */}
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            {/* Profile  */}
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/orders" component={ProfileOrders} />
            <PrivateRoute exact path="/profile/saved" component={LikePage} />
            {/* Admin Pages */}
            <PrivateRoute exact path="/admin/add-product" component={AddProduct} />
            <PrivateRoute exact path="/admin/edit-product" component={AddProduct} />
            <PrivateRoute exact path="/admin/add-collection" component={AddCollection} />
            <PrivateRoute exact path="/admin/add-customer" component={AddCustomer} />
            <PrivateRoute exact path="/admin/add-location" component={AddLocation} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/admin/:storeId/:id" component={ProductPage} />
            <PrivateRoute exact path="/admin/collection/:id" component={CollectionPage} />
            <PrivateRoute exact path="/admin/location/:id" component={LocationPage} />
            <PrivateRoute exact path="/admin/:id" component={Dashboard} />
            <PrivateRoute exact path="/create-store" component={StoreForm} />
            <PrivateRoute exact path="/join-store" component={JoinForm} />
            {/* Product Page */}
            <Route exact path="/details/:id" component={Details} />
            {/* Page not found */}
            <Route component={Default} />
        </Switch>
    </Fragment>
  );
};

export default Routes;