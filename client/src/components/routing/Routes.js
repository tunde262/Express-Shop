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
import Profile from '../profile/Profile';

// Admin pages
import Admin from '../admin/Admin';
import ExplorePage from '../../pages/ExplorePage';
import ProductPage from '../admin/pages/ProductPage';
import CollectionPage from '../admin/pages/CollectionPage';
import LocationPage from '../admin/pages/LocationPage';
import AddProduct from '../admin/forms/AddProduct';
import StoreForm from '../admin/forms/StoreForm';
import AddCollection from '../admin/forms/AddCollection';
import AddLocation from '../admin/forms/AddLocation';
import AddCustomer from '../admin/forms/AddCustomer';

// Store pages
import StoresPage from '../../pages/StoresPage';
import StorePage from '../../pages/StorePage';
import CategoryPage from '../../pages/CategoryPage';

import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <Fragment>
        <Alert />
        <Switch>
            <Route exact path="/home" component={ExplorePage} />
            {/* Category Pages */}
            <Route exact path="/categories" component={CategoryPage} />
            <Route exact path="/stores" component={StoresPage} />
            {/* Store Page */}
            <Route exact path="/store/:id" component={StorePage} />
            {/* Auth Pages */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* Cart & Checkout */}
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            {/* Profile  */}
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* Admin Pages */}
            <PrivateRoute exact path="/admin/add-product" component={AddProduct} />
            <PrivateRoute exact path="/admin/add-collection" component={AddCollection} />
            <PrivateRoute exact path="/admin/add-customer" component={AddCustomer} />
            <PrivateRoute exact path="/admin/add-location" component={AddLocation} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/admin/product/:id" component={ProductPage} />
            <PrivateRoute exact path="/admin/collection/:id" component={CollectionPage} />
            <PrivateRoute exact path="/admin/location/:id" component={LocationPage} />
            <PrivateRoute exact path="/create-store" component={StoreForm} />
            {/* Product Page */}
            <Route exact path="/details/:id" component={Details} />
            {/* Page not found */}
            <Route component={Default} />
        </Switch>
    </Fragment>
  );
};

export default Routes;