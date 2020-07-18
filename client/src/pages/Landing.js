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
      <h1 style={{textAlign: 'center', color: '#aaa'}}>How You Benefit</h1>
      <div className={classes.how_works}>
        <div className={classes.how1}>
          <h1>Put your feet up and relax!</h1>
          <h2>Since you ship your products out in advance you never have to rush through or fall behind in your fulfillment process ever again. Take your time!</h2>
        </div>
        <div className={classes.picture1}></div>
        <div className={classes.how2}>
          <h1>Enjoy the love!!</h1>
          <h2>Since your products are already pre-packed and ready to go in multiple homes close to your customers, don't just suprise, but exceed your customers expectations with seemingly instant delivery!</h2>
        </div>
        <div className={classes.picture2}></div>
        <div className={classes.how3}>
          <h1>Peace of Mind:)</h1>
          <h2>Both you and customers can enjoy complete transparency when it come to the status and location of product in delivery. Cozzy up with your shoppers and watch in real-time as the package arrives at their doorstep!</h2>
        </div>
        <div className={classes.picture3}></div>
        <div className={classes.how4}>
          <h1>Count Your Savings!</h1>
          <h2>Save money on shipping by sending multiple items to one location at once.</h2>
        </div>
        <div className={classes.picture4}></div>
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
