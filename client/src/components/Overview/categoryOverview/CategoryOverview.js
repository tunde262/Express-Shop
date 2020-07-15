import React, { Component, useState, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, setSortedProducts, removeTags } from '../../../actions/productActions';

import ReactGA from 'react-ga';

import { HorizontalNav } from '../../common/HorizontalNav';
import { NavItem } from '../../header/navbar/NavItem';

class CategoryOverview extends Component {
    constructor(props) {
        super(props);

        this.getUnique = this.getUnique.bind(this);
    }

    getUnique(products, value) {
        let values = [];
        products.map(product => {
            product[value].map(item => values.push(item));
        });
        return [...new Set(values)]
    }

    async onFilterClick(filter) { 
        ReactGA.event({
            category: 'Filter',
            action: 'Category-Overview',
            label: filter
        });
          
        if (this.props.product.tags.includes(filter)) {
            await this.props.removeTags(filter);
            this.unFilterProducts();
        } else {
            await this.props.handleTags(filter);
            this.filterProducts();
        }
    }

    filterProducts() {
        let tempProd = [...this.props.product.sortedProducts];
        const tags = [...this.props.product.tags];
        let res;
        let sortProd = [];
        for(var i = 0; i < tags.length; i++) {
            res = tempProd.filter(prod => prod.tags.includes(tags[i]));
        }
        this.props.setSortedProducts(res);
    }
    unFilterProducts() {
        if (this.props.product.tags.length > 0) {
            let tempProd = [...this.props.products];
            const tags = [...this.props.product.tags];
            let res;
            let sortProd = [];
            for(var i = 0; i < tags.length; i++) {
                res = tempProd.filter(prod => prod.tags.includes(tags[i]));
            }
            this.props.setSortedProducts(res);
        } else {
            this.props.setSortedProducts(this.props.products);
        }
        // let res = [];
        // tempProd.map(product => tags.map(tag => product.tags.includes(tag) ? res.push(product) : null));
        // res = [...new Set(res)]
        // console.log(res);
    }

    handleOrders(show) {
        this.props.handleOrders(show);
    }

    render() {
    
        // let tags = getUnique(props.products, 'tags');
        let tags = [];
        if(this.props.category === 'socks') {
            tags =  ["boats", "french fries", "tacos", "dotted", "striped", "USA"];
        }

        if(this.props.category === 'hats') {
            tags =  ["white", "red", "black", "dad cap"];
        }
        if(this.props.category === 'bottoms') {
            tags =  ["men", "women", "small", "medium", "large", "shorts", "pants", "joggers", "activewear", "swim", "leggings", "denim", "white", "black", "red", "grey", "blue", "navy", "floral", "fruit"];
        }
        if(this.props.category === 'tops') {
            tags =  ["men", "women", "small", "medium", "large", "pink", "white", "black", "yellow", "brown", "short-sleeve", "long-sleeve", "shirt", "tank top", "graphic tee"];
        }
        if(this.props.category === 'admin') {
            tags =  ["products", "inventory", "orders", "collections", "customers", "storage locations"];
        }

        // if(products === null || loading) {
        //     productList = <Spinner />;
        // }
        // else {
        //     if(products.length > 0) {
        //         productList = products.map(product => (
        //             <ProductCard key={product._id} product={product} />
        //         ))
        //     }
        //     else {
        //         productList = <Title name="No Products" title="Available" />
        //     }
        // }
        
        if(this.props.category === 'admin') {
            tags = tags.map((item, index) => {
                return (
                    <NavItem 
                        style={this.props.product.tags.includes(item) ? 
                            {background: `${this.props.background}`, color: 'white'} : 
                            {borderColor: `${this.props.background}`, fontWeight: '200'}} 
                        key={index} 
                        background={this.props.background}
                        onClick={this.handleOrders.bind(this, item)}>
                        <b>{item}</b>
                    </NavItem>
                );
            })
        } else {
            tags = tags.map((item, index) => {
                return (
                    <NavItem 
                        style={this.props.product.tags.includes(item) ? 
                            {background: `${this.props.background}`, color: 'white'} : 
                            {borderColor: `${this.props.background}`, fontWeight: '200'}} 
                        key={index} 
                        background={this.props.background}
                        onClick={this.onFilterClick.bind(this, item)}>
                        <b>{item}</b>
                    </NavItem>
                );
            })
        }
    
        return (
            <HorizontalNav background="white">
                {tags}
            </HorizontalNav>
        )
    }
}

CategoryOverview.propTypes = {
    handleTags: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
});

const CategoryItem = styled.div`
    padding: 15px 10px 0 10px;
    min-width: 70px;
    display: inline-block;
    border-width: 2px;
    border-style: solid;
    color: ${props => props.background}
    border-color: ${props => props.background};
    border-radius: 56px;
    margin: 0 10px;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
        transform: scale(1.05);
        color: white;
        background: ${props => props.background};
    }
`;

export default connect(mapStateToProps, { handleTags, setSortedProducts, removeTags })(CategoryOverview);
