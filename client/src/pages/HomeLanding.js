import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../components/common/Dropdown';
import classes from '../components/layout/Landing.module.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth, login, register } from '../actions/authActions';

import Footer from '../components/layout/Footer/Footer';
import StopwatchEmoji from '../utils/imgs/stopwatch.png';
import BoxEmoji from '../utils/imgs/box.png';
import MoneyBagEmoji from '../utils/imgs/moneybag.png';
import DiamondEmoji from '../utils/imgs/diamond.png';
import DesktopMobile from '../utils/imgs/CE_DESKTOP_MOBILE.png';
import logo from '../components/common/logo.png';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';


const initialState = {
  name: '',
  email: '',
  password: '',
  password2: ''
};

const HomeLanding = ({history, isAuthenticated, updateAuth, register, login}) => {
  // const [formData, setFormData] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  //   password2: '',
  //   signup: true
  // });

  const [sentMixpanel, setSentMixpanel] = useState(false);

  useEffect(() => {
    history.listen(location => ReactGA.pageview(location.pathname));
  }, []);

  // const { name, email, password, password2, type } = formData;

  // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});


  const handleMixpanel = () => {
    mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
    mixpanel.track("Landing Visit", {
      "Page Name": "Home Landing",
      "Page Variant": "A"
    });
  }

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

  const [formData, setFormData] = useState(initialState);

  const [rightPanelActive, setPanel] = useState(false);

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const signIn = async e => {
      e.preventDefault();
      login(email, password);
  }

  const signUp = async e => {
      e.preventDefault();

      const first_name = name.split(' ').slice(0, -1).join(' ');
      const last_name = name.split(' ').slice(-1).join(' ');

      console.log('FIRST NAME');
      console.log(first_name)
      console.log('LAST NAME');
      console.log(last_name);

      register({ 
          first_name, 
          last_name, 
          email, 
          password, 
          history 
      });

      setFormData(initialState);

      register({ name, email, password });
  }

  const formChange = e => {
      const jumbotron = document.getElementById('jumbotron');

      if(!rightPanelActive) {
          jumbotron.classList.add('right-panel-active');

          // Set Active Form State
          setPanel(!rightPanelActive);
      } else {
          jumbotron.classList.remove('right-panel-active');

          // Set Active Form State
          setPanel(!rightPanelActive);
      }
  }

  if(!sentMixpanel) {
    handleMixpanel();
    setSentMixpanel(true);
  }

  if(isAuthenticated) {
    history.push('/home');
  } else {
    history.push('/login');
  }
  
  return (
    <div className="explore-container">
      <div className="jumbotron">
        <div className="jumbocontainer">
          <div className="jumbocontent">
            <div className="jumboheading">
                <h1 id="main-heading">The Fastest Place To Shop Online.</h1>
                <h1 id="sub-heading">Cardboard Express is your local online retail store. Enjoy Free Unlimited access to all your favorite stores in one place.</h1>
            </div>
            <div className="desktop">
              <div className="scroll-down"></div>
            </div>
            <div className="mobile">
              <div className="scroll-down"></div>
            </div>
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
      <div className="jumbotron-slide-form desktop" id="jumbotron">
        <div className="form-container sign-in-container">
            <form id="auth-form" onSubmit={e => signIn(e)}>
                <h1>Sign In</h1>
                <span>Welcome back to our Circle :)</span>
                <input
                  type="email"
                  name="email"
                  className="input_line"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => onChange(e)}
                  style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                <input
                    type="password"
                    name="password"
                    className="input_line"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => onChange(e)}
                    style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                <button onClick={(e) => signIn(e)} style={{width: '100%'}} type="submit">Log In</button>
                <div className="desktop">
                    <span style={{cursor: "pointer", color:'#808080'}} onClick={e => formChange(e)}>Don't have an account?</span>
                </div>
            </form>
        </div>
        <div className="form-container sign-up-container" id="sign-up-container">
            <form id="auth-form" onSubmit={e => signUp(e)}>
                <h1>Create Account</h1>
                <span>Welcome to the fastest place to shop online!</span>
                <input
                  type="text"
                  name="name"
                  className="input_line"
                  placeholder="Enter Name"
                  value={name}
                  onChange={e => onChange(e)}
                  style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                <input
                  type="email"
                  name="email"
                  className="input_line"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => onChange(e)}
                  style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                <input
                    type="password"
                    name="password"
                    className="input_line"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => onChange(e)}
                    style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                {/* <input
                    type="password"
                    name="password2"
                    className="input_line"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={e => onChange(e)}
                    style={{margin:'10px 0', width:'100%', height:'50px'}}
                /> */}
                <button onClick={(e) => signUp(e)} style={{width: '100%'}} type="submit">Create An Account</button>
                <div className="desktop">
                    <span style={{cursor: "pointer", color:'#808080'}} onClick={e => formChange(e)}>Already have an account?</span>
                </div>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    {/* <p>
                        Continue to stay connected within the hacker community.
                    </p> */}
                    <div className="desktop">
                        <button style={{marginTop:'2rem'}} className="ghost" id="signUp" onClick={e => formChange(e)}>Sign Up</button>
                    </div>
                    <div className="mobile">
                        <button className="ghost" id="exploreBtn">Sign In</button>
                        <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Don't have an account?</span>
                    </div>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Sign Up For Free Unlimited Shopping!</h1>
                    {/* <p>
                        A community driven place to share your ideas and creations with the world.
                    </p> */}
                    <button style={{marginTop:'2rem'}} className="ghost" onClick={e => formChange(e)}>Log In</button>
                    {/* <div className="desktop">
                        <button onClick={e => formChange(e)}>Sign In</button>
                    </div> */}
                    <div className="mobile">
                        <a href="#sign-up-container"><button className="ghost" id="signUp">Sign Up</button></a>
                        <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Already have an account?</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="jumbotron-slide-form mobile" id="auth-form2">
        {/* <form style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: '-2rem'}} onSubmit={e => signIn(e)}>
            <img src={logo} style={{maxHeight: '60px', marginBottom: '-2rem'}} alt="cardboard express logo" />
            <h1>Sign In</h1>
            <span>Welcome back to our Circle :)</span>
            <input
              type="email"
              name="email"
              className="input_line"
              placeholder="Enter Email"
              value={email}
              onChange={e => onChange(e)}
              style={{margin:'10px 0', width:'100%', height:'50px'}}
            />
            <input
                type="password"
                name="password"
                className="input_line"
                placeholder="Enter Password"
                value={password}
                onChange={e => onChange(e)}
                style={{margin:'10px 0', width:'100%', height:'50px'}}
            />
            <button style={{width: '100%'}} type="submit">Log In</button>
            <div className="mobile">
                <Link to="/register">Don't have an account?</Link>
            </div>
        </form> */}
        <div className="form-container sign-up-container" id="sign-up-container">
          <form style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: '-2rem'}} id="auth-form" onSubmit={e => signUp(e)}>
            <img src={logo} style={{maxHeight: '60px', marginBottom: '2rem'}} alt="cardboard express logo" />
            <h3>Create Account</h3>
            <span>Welcome to the fastest place to shop online!</span>
            <input
              type="text"
              name="name"
              className="input_line"
              placeholder="Enter Name"
              value={name}
              onChange={e => onChange(e)}
              style={{margin:'10px 0', width:'100%', height:'50px'}}
            />
            <input
              type="email"
              name="email"
              className="input_line"
              placeholder="Enter Email"
              value={email}
              onChange={e => onChange(e)}
              style={{margin:'10px 0', width:'100%', height:'50px'}}
            />
            <input
                type="password"
                name="password"
                className="input_line"
                placeholder="Enter Password"
                value={password}
                onChange={e => onChange(e)}
                style={{margin:'10px 0', width:'100%', height:'50px'}}
            />
            {/* <input
                type="password"
                name="password2"
                className="input_line"
                placeholder="Confirm Password"
                value={password2}
                onChange={e => onChange(e)}
                style={{margin:'10px 0', width:'100%', height:'50px'}}
            /> */}
            <button style={{width: '100%'}} type="submit">Create An Account</button>
            <Link to="/login" style={{color:'#808080', marginTop:'1rem'}}>Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

HomeLanding.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { updateAuth, register, login })(withRouter(HomeLanding));
