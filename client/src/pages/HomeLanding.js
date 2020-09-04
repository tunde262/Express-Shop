import React, { useEffect, useState, Fragment } from 'react';
import Dropdown from '../components/common/Dropdown';
import classes from '../components/layout/Landing.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth } from '../actions/authActions';

import Footer from '../components/layout/Footer/Footer';
import StopwatchEmoji from '../utils/imgs/stopwatch.png';
import BoxEmoji from '../utils/imgs/box.png';
import MoneyBagEmoji from '../utils/imgs/moneybag.png';
import DiamondEmoji from '../utils/imgs/diamond.png';
import DesktopMobile from '../utils/imgs/CE_DESKTOP_MOBILE.png';

import ReactGA from 'react-ga';

const HomeLanding = ({history, isAuthenticated, updateAuth}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    signup: true
  });

  useEffect(() => {
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
    <Fragment>
      <div className="jumbotron">
        <div className="jumbocontainer">
          <div className="jumbocontent">
            <div className="jumboheading">
                <h1 id="main-heading">Shop Local.<br/> Always On Time.</h1>
                <h1 id="sub-heading" className="desktop">Cardboard Shopping is a local online retail space, that gives you free unlimited access to your favorite stores and brands :)</h1>
            </div>
            <a href="#auth-form">
              <div className="scroll-down"></div>
            </a>
          </div>
          <div className="desktop">

          </div>
        </div>
        
        {/* <div className={classes.landing_banner}>
          <div className={classes.landing_banner_container}>
            <div class={classes.landing_banner_content}>
              <div>
                <h1>Shop Smart.<br/> Delivered On Time.<img style={{width: '40px', marginLeft: '.1rem', marginTop:'-.7rem'}} src={StopwatchEmoji} alt="img" /></h1>
                <p><img style={{width: '20px', marginRight: '.1rem'}} src={BoxEmoji} alt="img" />  Nationwide Shipping.<br/><br/>
                <img style={{width: '20px', marginRight: '.1rem'}} src={MoneyBagEmoji} alt="img" />  Low Prices.<br/><br/>
                <img style={{width: '20px', marginRight: '.1rem'}} src={DiamondEmoji} alt="img" />  Fashion. Shoes. Essentials. Care.</p>
              </div>
              <div class={classes.landing_form}>
                <button>Start Shopping Now</button>
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
                </div> 
              </div>
            </div>
          </div>
          <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <img style={{width:'70%'}} src={DesktopMobile} alt="Selling online has never been easier" />
          </div>
        </div>
        <Footer /> */}
      </div>
      <div className="jumbotron2">
        <div id="auth-form" style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}  className="jumbocontainer">
            <div className="jumbocontent">
              <div className="jumboheading">
                  <h1 id="main-heading">Sign Up To <br/> Start Shopping <br/>Local.</h1>
              </div>
              <a href="#auth-form">
                <div className="scroll-down"></div>
              </a>
            </div>
            <div className="desktop">

            </div>
        </div>
      </div>
    </Fragment>
  )
}

HomeLanding.propTypes = {
  updateAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { updateAuth })(withRouter(HomeLanding));
