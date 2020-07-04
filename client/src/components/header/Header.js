import React, { Component } from 'react';
import styled from 'styled-components';

import Navbar from './navbar/Navbar';
import CartOverview from '../Overview/cartOverview/CartOverview';

const Header = props => {
    return (
        <HeaderContainer>
            <CartOverview />
            <Navbar />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    top: 0;
    z-index: 200;
`;
// position: sticky;

export default Header;
