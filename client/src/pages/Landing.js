import React, { Component } from 'react';
import Dropdown from '../components/common/Dropdown';

class Landing extends Component {
    render() {
        return (
            <header id="landing">
                <h1>On Demand Anything.</h1>
                <p>Browse locally stored items available for delivery by entering your address below.</p>
                <Dropdown />
                {/* <a href="#" className="button">Read More</a> */}
            </header>
        )
    }
}

export default Landing;