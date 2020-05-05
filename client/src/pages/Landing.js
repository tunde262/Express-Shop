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
                <h1>Same Day Delivery On All Clothing.</h1>
                <p>Don't let social distancing stop you from looking good:)</p>
                <Dropdown />
                {/* <a href="#" className="button">Read More</a> */}
            </header>
        )
    }
}

export default Landing;