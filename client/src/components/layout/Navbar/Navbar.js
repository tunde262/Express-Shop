import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Navbar.css';

const Navbar = props => (
    <header className="navbar">
        <nav className="navbar_navigation">
            <div className="navbar_logo"><Link to="/"><i class="fas fa-home"></i></Link></div>
            <div className="spacer" />
            <div className="navbar_navigation-items">
                <ul>
                    <li onClick={props.drawerClickHandler}><i class="far fa-user"></i></li>
                    <li>
                        <Link to="/cart">
                            <i class="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

Navbar.propTypes = {
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps)(Navbar);
