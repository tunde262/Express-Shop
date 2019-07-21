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
                <h1>On Demand Anything.</h1>
                <p>Browse locally stored items available for delivery by selecting a city below.</p>
                <Dropdown />
                {/* <a href="#" className="button">Read More</a> */}
            </header>
        )
    }
}

export default Landing;