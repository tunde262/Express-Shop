import React, { useEffect, useState } from 'react';
import Dropdown from '../components/common/Dropdown';
import classes from '../components/layout/Landing.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth } from '../actions/authActions';

import { setPage } from '../actions/navActions';

import StopwatchEmoji from '../utils/imgs/stopwatch.png';
import BoxEmoji from '../utils/imgs/box.png';
import MoneyBagEmoji from '../utils/imgs/moneybag.png';
import DiamondEmoji from '../utils/imgs/diamond.png';
import DesktopMobile from '../utils/imgs/CE_DESKTOP_MOBILE.png';

import ReactGA from 'react-ga';

const Landing = ({history, setPage, isAuthenticated, updateAuth}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    signup: true
  });

  useEffect(() => {
    setPage('landing');
    history.listen(location => ReactGA.pageview(location.pathname));
  }, [])

  const { name, email, password, password2, type } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});


  const clicked = (type) => {
    formData.signup = type;
    console.log(formData);
    updateAuth(formData);
    if(formData.email !== '') {
      history.push('/home');
    } else {
      if(type) {
        history.push('/register');
      } else {
        history.push('/login');
      }
    }
    // ReactGA.event({
    //     category: 'Account',
    //     action: 'Created An Account'
    // });
  }

  if(isAuthenticated) {
      history.push('/home');
  }
  
  return (
    <div>
      <div className={classes.landing_banner}>
        <div className={classes.landing_banner_container}>
          <div class={classes.landing_banner_content}>
            <div>
              <h1>Shop Smart.<br/> Delivered On Time.<img style={{width: '40px', marginLeft: '.1rem', marginTop:'-.7rem'}} src={StopwatchEmoji} alt="img" /></h1>
              <p><img style={{width: '20px', marginRight: '.1rem'}} src={BoxEmoji} alt="img" />  Nationwide Shipping.<br/><br/>
              <img style={{width: '20px', marginRight: '.1rem'}} src={MoneyBagEmoji} alt="img" />  Low Prices.<br/><br/>
              <img style={{width: '20px', marginRight: '.1rem'}} src={DiamondEmoji} alt="img" />  Fashion. Shoes. Essentials. Care.</p>
            </div>
            <div class={classes.landing_form}>
              <button>Get Started Now</button>
              {/* <input
                  type="email"
                  name="email"
                  className="input_line"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => onChange(e)}
              />
              <div class={classes.landing_form_buttons} style={{marginTop: '-.45rem'}} id="button-addon4">
                <button onClick={() => clicked(false)} class="btn btn-outline-secondary btn-success" style={{marginRight: '0'}} type="button">Log In</button>
                <button onClick={() => clicked(true)} class="btn btn-outline-secondary" style={{background: '#ff4b2b', color: 'white'}} type="button">Create Account</button>
              </div> */}
            </div>
          </div>
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img style={{width:'70%'}} src={DesktopMobile} alt="Selling online has never been easier" />
        </div>
      </div>
      <div className={classes.info}>
        <div>
          <i className="fas fa-shipping-fast"></i>
          <hr />
          <p>Ship your pre-packaged items to the homes of our fulfillers</p>
        </div>
        <div>
          <i className="fas fa-boxes"></i>
          <hr />
          <p>Our fulfillers will keep your items safe in there homes until they are ordered</p>
        </div>
        <div>
          <i className="fas fa-running"></i>
          <hr />
          <p>When an item has been ordered by your customer out fulfiller will deliver it straight to their doorstep</p>
        </div>
        <div>
          <i className="fas fa-search-location"></i>
          <hr />
          <p>Get instant updates about your items status and watch the items delivery on a map in realtime on your dashboard</p>
        </div>
      </div>
      <div className={classes.how_works}>
        <div className={classes.how1}>
          <h1>Create A Store.<br/>Sell Online.<br/>Anywhere.<br/>For Free.</h1>
          <p>Learn More</p>
        </div>
        <div className={classes.picture1}></div>
        <div className={classes.how2}>
          <h1>New Customers In Your City and Thousands of Others.</h1>
          <p>Learn More</p>
        </div>
        <div className={classes.picture2}></div>
        <div className={classes.how3}>
          <h1>Get Paid.<br/>Easily.<br/>Online.<br/>Anywhere.</h1>
          <p>Learn More</p>
        </div>
        <div className={classes.picture3}></div>
      </div>
    </div>
  )
}

Landing.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { updateAuth, setPage })(withRouter(Landing));
