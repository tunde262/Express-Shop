import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth, login, register } from '../actions/authActions';


import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Footer from './Home/Footer';

const ContactPage = () => {

  const [sentMixpanel, setSentMixpanel] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

  const handleMixpanel = () => {
    mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
    mixpanel.track("Contact Page Visit", {
      "Page Name": "Contact",
      "Page Variant": "A"
    });
  }

  if(!sentMixpanel) {
    handleMixpanel();
    setSentMixpanel(true);
  }

  const isMobile = windowWidth <= 769;

    const isTablet = windowWidth <= 1000;
  
  return (
    <div className="explore-container landing">
        <main className="landing-main">
            <div className="layout-centered">
                <div className="layout-centered-content">
                    <h1>Thanks for using Trello.</h1>
                    <p> You’re all logged out. So now what? </p>
                </div>
            </div>
            <div className="layout-two-up" style={{backgroundColor:'#FDFAE5'}}>
                <div className="layout-centered-content">
                    <h2>Using a Shared Computer?</h2>
                    <p> We've saved some of your preferences for the next time you log in, but if you'd like you can clear those now. </p>
                    <p>
                        <a className="contact-button">
                        Remove Saved Preferences
                        </a>
                    </p>
                </div>
            </div>
            <div className="layout-centered">
                <div className="layout-centered-content">
                    <h2>Follow us</h2>
                    <p>
                        …on the{" "}
                        <a href="#">Trello Blog</a>,
                        <a href="#">Twitter</a>,
                        <a href="#">Facebook</a>.
                        <br/>{" "}
                        We post all kinds of tips and updates, but not an annoying amount.
                    </p>
                </div>
            </div>
            <div className="layout-centered" style={{backgroundColor:'#F5EA92'}}>
                <div className="layout-centered-content">
                    <h2>Share Trello to get free Trello Gold.</h2>
                    <p> That’s right. For every member you get to sign up, you’ll get a free month of Trello Gold, up to 12 months. With Trello Gold you get three Power-Ups per board, custom backgrounds, stickers and emoji, 250MB attachments, and saved searches.</p>
                    <p>
                        <a className="contact-button">
                            Share Trello
                        </a>
                    </p>
                    <p style={{color:'hsl(0,0%,55%)'}}>
                        You’ll have to log in again.
                    </p>
                </div>
            </div>
            <div className="layout-centered" style={{color:'#fff', backgroundColor:'#0079BF'}}>
                <div className="layout-centered-content">
                    <h2>“Thanks, Trello, but I’m done for the day.”</h2>
                    <p>
                        <a href="#" style={{color:'#fff', textDecoration:'underline'}}>
                            Here’s a game we made featuring Taco, our spokes-husky.
                        </a>
                    </p>
                    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/23d8d991ae99511497ef8f51a12acca5/pixel-taco.png" alt="Pixel Taco" />
                </div>
            </div>
            <Footer full />
        </main>
    </div>
  )
}

ContactPage.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { updateAuth, register, login })(withRouter(ContactPage));
