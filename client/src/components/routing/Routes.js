import React from 'react';
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
import ProductPage from '../admin/ProductPage';
import AddProduct from '../admin/forms/AddProduct';
import StoreForm from '../admin/forms/StoreForm';
import AddCollection from '../admin/forms/AddCollection';
import StoresPage from '../../pages/StoresPage';
import StorePage from '../../pages/StorePage';
import CategoryPage from '../../pages/CategoryPage';

import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
        <Alert />
        <Switch>
            {/* Category Pages */}
            <Route exact path="/categories" component={CategoryPage} />
            <Route exact path="/stores" component={StoresPage} />
            {/* Store Page */}
            <Route exact path="/store/:id" component={StorePage} />
            {/* Auth Pages */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* Cart & Checkout */}
            <Route exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            {/* Profile  */}
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* Admin Pages */}
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
    </section>
  );
};

export default Routes;