import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { HorizontalNav } from '../../common/HorizontalNav';
import { NavItem } from './NavItem';

class Navbar extends Component {
    render() {
        return (
            <HorizontalNav>
                {/* <Link to="/">
                    <NavItem background="var(--mainColor)">All</NavItem>
                </Link> */}
                <Link to="/">
                    <NavItem background="OrangeRed">
                        <i 
                            className="fab fa-wpexplorer" 
                            style={{
                                color: 'OrangeRed', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Explore
                    </NavItem>
                </Link>
                <Link to="/top">
                    <NavItem background="DeepSkyBlue">
                        <i 
                            className="fas fa-tshirt" 
                            style={{
                                color: 'DeepSkyBlue', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Clothing & Fashion
                    </NavItem>
                </Link>
                <Link to="/bottom">
                    <NavItem background="MediumSlateBlue">
                        <i 
                            className="fas fa-shoe-prints" 
                            style={{
                                color: 'MediumSlateBlue', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Shoes
                    </NavItem>
                </Link>
                <Link to="/hat">
                    <NavItem background="Fuchsia">
                        <i 
                            className="fas fa-graduation-cap" 
                            style={{
                                color: 'Fuchsia', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Household Essentials
                    </NavItem>
                </Link>
                <Link to="/socks">
                    <NavItem background="Tan">
                        <i 
                            className="fas fa-socks" 
                            style={{
                                color: 'Tan', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Personal Care
                    </NavItem>
                </Link>
                <Link to="/household-essentials">
                    <NavItem background="Teal">
                        <i 
                            className="fas fa-toilet-paper" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Pets
                    </NavItem>
                </Link>
                <Link to="/personal-care">
                    <NavItem background="MediumSlateBlue">
                        <i 
                            className="fas fa-shower" 
                            style={{
                                color: 'white', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}School & Office Supplies
                    </NavItem>
                </Link>
                <Link to="/pets">
                    <NavItem background="Fuchsia">
                        <i 
                            className="fas fa-paw" 
                            style={{
                                color: 'Fuchsia',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Women 
                    </NavItem>
                </Link>
                <Link to="/baby">
                    <NavItem background="DeepSkyBlue">
                        <i 
                            className="fas fa-baby-carriage" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Men
                    </NavItem>
                </Link>
                <Link to="/kitchen-dining">
                    <NavItem background="MediumSlateBlue">
                        <i 
                            className="fas fa-utensils" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Kitchen 3 Dining
                    </NavItem>
                </Link>
                <Link to="/party-supplies">
                    <NavItem background="Tan">
                        <i 
                            className="fas fa-glass-cheers" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Bathroom
                    </NavItem>
                </Link>
                <Link to="/school-office">
                    <NavItem background="OrangeRed">
                        <i 
                            className="fas fa-chalkboard-teacher" 
                            style={{
                                color: 'OrangeRed', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}School & Office Supplies
                    </NavItem>
                </Link>
                <Link to="/health">
                    <NavItem background="DeepSkyBlue">
                        <i 
                            className="fas fa-band-aid" 
                            style={{
                                color: 'DeepSkyBlue',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Laundry Items
                    </NavItem>
                </Link> 
                {/* <Link to="/apparel">
                    <NavItem background="DeepSkyBlue">
                        <i 
                            className="fas fa-tshirt" 
                            style={{
                                color: 'white', 
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Apparel
                    </NavItem>
                </Link>
                <Link to="/beauty">
                    <NavItem background="Magenta">
                        <i 
                            className="far fa-eye" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Beauty
                    </NavItem>
                </Link>
                <Link to="/sports">
                    <NavItem background="OrangeRed">
                        <i 
                            className="fas fa-basketball-ball" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Sports
                    </NavItem>
                </Link>
                <Link to="/toys">
                    <NavItem background="Gold">
                        <i 
                            className="fas fa-fan" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Toys
                    </NavItem>
                </Link>
                <Link to="/home-decor">
                    <NavItem background="Goldenrod">
                        <i 
                            className="fas fa-couch" 
                            style={{
                                color: 'white',
                                fontSize: '2rem'
                            }}>
                        </i>
                        {' '}Home Decor
                    </NavItem>
                </Link> */}
            </HorizontalNav>
        );
    }
}


export default Navbar;
