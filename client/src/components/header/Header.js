import React, { Component } from 'react';
import styled from 'styled-components';

import Navbar from './navbar/Navbar';
import CartOverview from '../Overview/cartOverview/CartOverview';

class Header extends Component {
    render() {
        return (
            <HeaderContainer>
                <CartOverview />
                {/* <Navbar /> */}
            </HeaderContainer>
        )
    }
}

const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    z-index: 200;
`;

export default Header;
