import React, { Component, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import Overview from '../Overview';
import CollectionOverviewItems from './CollectionOverviewItems';

const CategoryOverview = ({ collections, title, link, shop }) => {
    // constructor(props) {
    //     super(props);

    //     this.getUnique = this.getUnique.bind(this);
    // }

    // getUnique(products, value) {
    //     let values = [];
    //     products.map(product => {
    //         product[value].map(item => values.push(item));
    //     });
    //     return [...new Set(values)]
    // }

    // async onFilterClick(filter) { 
    //     ReactGA.event({
    //         category: 'Filter',
    //         action: 'Category-Overview',
    //         label: filter
    //     });
          
    //     if (this.props.product.tags.includes(filter)) {
    //         await this.props.removeTags(filter);
    //         this.unFilterProducts();
    //     } else {
    //         await this.props.handleTags(filter);
    //         this.filterProducts();
    //     }
    // }

    // filterProducts() {
    //     let tempProd = [...this.props.product.sortedProducts];
    //     const tags = [...this.props.product.tags];
    //     let res;
    //     let sortProd = [];
    //     for(var i = 0; i < tags.length; i++) {
    //         res = tempProd.filter(prod => prod.tags.includes(tags[i]));
    //     }
    //     this.props.setSortedProducts(res);
    // }
    // unFilterProducts() {
    //     if (this.props.product.tags.length > 0) {
    //         let tempProd = [...this.props.products];
    //         const tags = [...this.props.product.tags];
    //         let res;
    //         let sortProd = [];
    //         for(var i = 0; i < tags.length; i++) {
    //             res = tempProd.filter(prod => prod.tags.includes(tags[i]));
    //         }
    //         this.props.setSortedProducts(res);
    //     } else {
    //         this.props.setSortedProducts(this.props.products);
    //     }
    //     // let res = [];
    //     // tempProd.map(product => tags.map(tag => product.tags.includes(tag) ? res.push(product) : null));
    //     // res = [...new Set(res)]
    //     // console.log(res);
    // }

    // handleOrders(show) {
    //     this.props.handleOrders(show);
    // }
    
    // // let tags = getUnique(props.products, 'tags');
    // let tags = [];

    // if(this.props.page === 'storage') {
    //     tags =  ["products", "inventory", "collections", "Low Stock", "locations"];
    // }

    // if(this.props.page === 'orders') {
    //     tags =  ["all orders", "not fulfilled", "not delivered", "delivering", "completed"];
    // }
    

    return (
        <Overview shop={shop} title={title} link={link}>
            <CollectionOverviewItems shop={shop} collections={collections} />
        </Overview>
    )
}

CategoryOverview.propTypes = {

}

export default CategoryOverview;
