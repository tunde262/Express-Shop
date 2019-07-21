import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, setSortedProducts, removeTags } from '../../../actions/productActions';

import { HorizontalNav } from '../../common/HorizontalNav';

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

    render() {
        let tags = this.getUnique(this.props.products, 'tags');
        
        tags = tags.map((item, index) => {
            return (
                <CategoryItem 
                    style={this.props.product.tags.includes(item) ? 
                        {border: "0.05rem solid orange", fontWeight: "bold", color: 'orange'} : 
                        {border: "0.05rem solid #5f6368", fontWeight: '200', color: "#5f6368"}} 
                    key={index} 
                    onClick={this.onFilterClick.bind(this, item)}>
                    <p>{item}</p>
                </CategoryItem>
            );
        })
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
    background: white;
    border-radius: 0.5rem;
    margin: 0 10px;
    text-align: center;
    font-size: 1rem;

`;

export default connect(mapStateToProps, { handleTags, setSortedProducts, removeTags })(CategoryOverview);
