import React, { Component } from 'react';
import Dropdown from '../components/common/Dropdown';

import ReactGA from 'react-ga';

class Landing extends Component {
    componentDidMount() {
        this.props.history.listen(location => ReactGA.pageview(location.pathname));
    }

    render() {
        return (
            <header id="landing">
                <h1>Same Day Delivery For All Clothing.</h1>
                <p>Get Your Order Delivered In As Little As 2 Hours!</p>
                <Dropdown />
                {/* <a href="#" className="button">Read More</a> */}
            </header>
        )
    }
}

export default Landing;