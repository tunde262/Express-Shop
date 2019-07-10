import React, { Component } from 'react';
import styled from 'styled-components';

import { HorizontalNav } from '../../common/HorizontalNav';

class CategoryOverview extends Component {
    render() {
        return (
            <HorizontalNav background="white">
                <CategoryItem>
                    <p>Deodarent</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Textured Hair Care</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Laundry Care</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Cleaning Supplies</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Toilet Paper</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Food Storage Bags & Containers</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Sun & Tanning</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Skin Care</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Bath & Body</p>
                </CategoryItem>
                <CategoryItem>
                    <p>Men's Grooming</p>
                </CategoryItem>
            </HorizontalNav>
        )
    }
}

const CategoryItem = styled.div`
    padding: 15px 10px 0 10px;
    display: inline-block;
    background: white;
    border: 0.05rem solid #5f6368;
    border-radius: 0.5rem;
    margin: 0 10px;
    text-align: center;

    p {
        font-weight: 200;
        color: #5f6368;
        font-size: 1rem;
    }
`;

export default CategoryOverview;
