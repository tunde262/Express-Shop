import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Navbar.css';

const Navbar = props => (
    <header className="navbar">
        <nav className="navbar_navigation">
            <div className="navbar_logo"><Link to="/"><h3><i class="fas fa-home"></i></h3></Link></div>
            <div className="spacer" />
            <div className="navbar_navigation-items">
                <ul>
                    <li onClick={props.drawerClickHandler}><h3><i class="far fa-user"></i></h3></li>
                    <li>
                        <Link to="/cart">
                            <h3>
                                <i class="fas fa-shopping-cart"></i>
                            </h3>
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
