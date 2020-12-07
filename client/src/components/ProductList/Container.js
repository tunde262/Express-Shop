import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';


import ProductList from './ProductList';
import CategoryOverview from '../Overview/categoryOverview/CategoryOverview';
import Spinner from '../common/Spinner';
import Title from '../Title';

const Container = ({ product, getProducts, page }) => {

    const { products, sortedProducts, loading } = product;

    const [containerList, setContainerList] = useState([]);

    useEffect(() => {
        renderContainerList();
    }, [products])

    // const header = this.props.title;

    const renderContainerList = () => {
        setContainerList([]);
 
        if(products === null || loading) {
            setContainerList([(
                <Spinner />
            )])
        } else {
            setContainerList([(
                <Fragment>
                    {/* <CategoryOverview products={products} category={this.props.category} background={this.props.background} /> */}
                    {/* <div style={{marginBottom: '-3rem'}}><Title title={header} /></div> */}
                    <ProductList page={page} products={sortedProducts} />
                    {/* <Spinner /> */}
                </Fragment>
            )])
        }
    } 

    return (
        <Fragment>
            {!containerList.length > 0 ? <Spinner /> : containerList}
        </Fragment>
    )
}

Container.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(Container);
