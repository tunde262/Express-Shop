import React, { useEffect, useState } from 'react';
import Dropdown from '../components/common/Dropdown';
import classes from '../components/layout/Landing.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth } from '../actions/authActions';

import StopwatchEmoji from '../utils/imgs/stopwatch.png';
import BoxEmoji from '../utils/imgs/box.png';
import MoneyBagEmoji from '../utils/imgs/moneybag.png';
import DiamondEmoji from '../utils/imgs/diamond.png';

import ReactGA from 'react-ga';

const Landing = ({history, isAuthenticated, updateAuth}) => {
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
    <div>
      <div style={{height: '100vh'}}>
        <div className={classes.container}>
          <div class={classes.landing_container}>
            <div>
              <h1>Shop Smart.<br/> Delivered On Time.<img style={{width: '40px', marginLeft: '.1rem', marginTop:'-.7rem'}} src={StopwatchEmoji} alt="img" /></h1>
              <p><img style={{width: '20px', marginRight: '.1rem'}} src={BoxEmoji} alt="img" />  Nationwide Shipping.<br/><br/>
              <img style={{width: '20px', marginRight: '.1rem'}} src={MoneyBagEmoji} alt="img" />  Low Prices.<br/><br/>
              <img style={{width: '20px', marginRight: '.1rem'}} src={DiamondEmoji} alt="img" />  Fashion. Shoes. Essentials. Care.</p>
            </div>
            <div class={classes.landing_form}>
              <input
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
      </div>
    </div>
  )
}

Landing.propTypes = {
  updateAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { updateAuth })(withRouter(Landing));
