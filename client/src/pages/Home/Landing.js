import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAuth, login, register } from '../../actions/authActions';

import logo from '../../components/common/logo.png';
import mapImg from '../../utils/imgs/map.png'

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Footer from './Footer';

import { SRLWrapper } from "simple-react-lightbox";

import headphonesImg from '../../utils/imgs/headphones-c.jpeg'
import earbudsImg from '../../utils/imgs/earbuds-b.jpeg'
import tieImg from '../../utils/imgs/tie-b.jpeg'
import bundleImg from '../../utils/imgs/bundle-b.jpeg'
import shoesImg from '../../utils/imgs/shoes-b.jpeg'
import shirtImg from '../../utils/imgs/sweater-b.jpeg'


const initialState = {
  name: '',
  email: '',
  password: '',
  password2: ''
};

const Landing = ({history, auth: { isAuthenticated, user, loading }, updateAuth, register, login}) => {
  // const [formData, setFormData] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  //   password2: '',
  //   signup: true
  // });

  const [sentMixpanel, setSentMixpanel] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

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
      history.push('/shop');
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

  if(user && !loading && isAuthenticated) {
    history.push('/home');
  } 
  // else {
  //   history.push('/login');
  // }

  const isMobile = windowWidth <= 769;

    const isTablet = windowWidth <= 1000;
  
  return (
    <div className="explore-container landing">
        {/* <div className="landing-banner">
            <div className="banner-inner">
                <div className="landing-banner-content">
                    <h1 className="landing-banner-text">
                        The Fastest<br/> Way To Shop
                    </h1>
                    <h3 className="landing-banner-sub-text">
                        Same-Day Delivery + Thousands of stores <br/> all in one place.
                    </h3>
                </div>
                <div className="landing-banner-img-container">
                    <img className="landing-banner-img" src="https://fastaf.com/static/media/hero-phone.d5fe33f9.png" alt="img" />
                </div>
            </div>
        </div> */}
        <main className="landing-main">
            <div className="shop-guide">
                <div className="shop-guide-content mobile display">
                    <h2 className="shop-guide-header">The Fastest <br/> Way To Shop.</h2>
                    <div className="top-text">
                        <p>Cardboard Express is your local online retail store. Enjoy Free Unlimited access to all your favorite stores in one place.</p>
                    </div>
                    <div className="store-socials store">
                        <button onClick={() => history.push('/register')} className="shop-guide-btn active">Start Shopping</button>
                    </div>
                </div>
                {/* <img className="shop-guide-img" src={isMobile ? "https://fastaf.com/static/media/holiday-cta-mobile.7970b79d.png" : "https://fastaf.com/static/media/holiday-cta-desktop.61b3471e.png"} alt="img" /> */}
                <div className="shop-guide-content desktop-column display">
                    <h2 className="shop-guide-header">The Fastest <br/> Way To Shop.</h2>
                    <div className="top-text">
                        <p>Cardboard Express is your local online retail store. Enjoy Free Unlimited access to all your favorite stores in one place.</p>
                    </div>
                    <div className="store-socials store">
                        <button onClick={() => history.push('/register')} className="shop-guide-btn active">Start Shopping</button>
                    </div>
                    {/* <h2 className="shop-guide-header">The Fastest <br/> Way To Shop.</h2>
                    <div className="store-socials store">
                        <button onClick={() => history.push('/home')} className="shop-guide-btn active">Start Shopping</button>
                    </div> */}
                </div>
            </div>
            {/* Overlay Text */}
            <section className="section-b">
                <div className="overlay">
                    <div className="section-b-inner">
                        <h3>Support Local Businesses.</h3>
                        <h2>Shop Local.<br/> Less waiting.</h2>
                        <p>We partner with sellers in your community to offer reliable same-delivery.</p>
                        <div className="store-socials store home">
                            <button style={{margin:'0', fontWeight:'500', fontSize:'18px'}}>Get Started</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <div className="section-c">
                <h3 className="heading">
                Shop Hot Deals at Best Prices
                </h3>
                <div className="heading-text">
                    <p>With hundreds of verified store owners and trusted marketplace sellers, shop now to discover the best deals and enjoy great savings.</p>
                </div>
                
                <SRLWrapper>
                    <div className="gallery">
                        <a href={headphonesImg} className="big">
                            <img src={headphonesImg} alt="" />
                        </a>
                        <a href={earbudsImg} className="big">
                            <img src={earbudsImg} alt="" />
                        </a>
                        <a href={tieImg} className="big">
                            <img src={tieImg} alt="" />
                        </a>
                        <a href={shoesImg} className="big">
                            <img src={shoesImg} alt="" />
                        </a>
                        <a href={shirtImg} className="big">
                            <img src={shirtImg} alt="" />
                        </a>
                        <a href={bundleImg} className="big">
                            <img src={bundleImg} alt="" />
                        </a>
                    </div>
                </SRLWrapper>
                <div style={{width:'100%', borderTop:'1px solid #f4f4f4', borderBottom:'1px solid #f4f4f4', height:'50px', color:'#808080', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <i style={{fontSize:'1rem', margin:'0 10px', color:'#0098d3'}} class="fab fa-instagram"></i>
                    <p style={{margin: '0', color:'#0098d3'}}>Shop Instagram</p>
                </div>
            </div>
            
            <div className="how-long-section">
                <div className="container xl">
                    <div className="headline">
                        <h3 className="heading">
                        Why shop with Cardboard Express?
                        </h3>
                    </div>
                    <div className="how-long-container">
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day soft-blue">
                                Smart Logistics
                            </div>
                            <div className="how-long-item home">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-sendinventory.svg" alt="img" />
                                </div>
                                <h5>Same-day Delivery</h5>
                                <p>
                                Choose pre-scheduled or on-demand deliveries, and track your orders from payment to delivery via up-to-date shipping information.
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day moderate-blue">
                                Support
                            </div>
                            <div className="how-long-item home">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why01.svg" alt="img" />
                                </div>
                                <h5>24/7 Customer Support</h5>
                                <p>
                                Track your orders from payment to delivery via up-to-date shipping information.
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day strong-cyan">
                                Hot Deals
                            </div>
                            <div className="how-long-item home">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why02.svg" alt="img" />
                                </div>
                                <h5>New Deals Daily</h5>
                                <p>
                                Shop limited time deals daily across all our categories.
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day cyan">
                                Security
                            </div>
                            <div className="how-long-item home">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-getstarted.svg" alt="img" />
                                </div>
                                <h5>Secure Payment Methods</h5>
                                <p>
                                Transact with your preferred method, whether it’s cash or credit card.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="store-socials store">
                            <button onClick={() => history.push('/home')} className="btn active">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="wh-apply">
                <div className="container">
                    <div className="box">
                        <div className="box-content">
                            <h3 className="box-heading">
                                Apply To Open A Store
                            </h3>
                            <div className="box-text">
                                <p>Increase your business, for FREE, without the headaches.</p>
                            </div>
                        </div>
                        <div className="box-button">
                            <a className="btn" href="">
                                Apply Now
                                <i className="far fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="hadvantage">
                <div className="container">
                    <div className="box">
                        <h3 className="box-heading home">Our Solutions</h3>
                    </div>
                </div>
                <div className="hadvantage-wrapper">
                    <div className="container">
                        <div className="box">
                            <div className="box-items">
                                <div className="box-item-wrapper">
                                    <div className="box-item home box-shadow-1" id="box-item-1">
                                        <div className="box-item-icon home">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p01.svg" alt="img" />
                                        </div>
                                        <h2 className="box-item-title home">Open A FREE Store</h2>
                                        <div className="box-item-content">
                                            <p>
                                                <ul>
                                                    <li>Thousands of local daily shoppers</li>
                                                    <li>Custom Built Inventory Location Managment Software</li>
                                                    <li>Local (same-day), and Nationwide (2-day) delivery to your customers</li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-item-wrapper">
                                    <div className="box-item home box-shadow-2" id="box-item-2">
                                        <div className="box-item-icon home">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p02.svg" alt="img" />
                                        </div>
                                        <h2 className="box-item-title home">Need Storage?</h2>
                                        <div className="box-item-content">
                                            <p>
                                            Cardboard Express offers temporary on-demand storage space, close to customers, to give sellers more flexibility and faster delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-item-wrapper">
                                    <div className="box-item home box-shadow-3" id="box-item-3">
                                        <div className="box-item-icon home">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p02.svg" alt="img" />
                                        </div>
                                        <h2 className="box-item-title home">Need Delivery?</h2>
                                        <div className="box-item-content">
                                            <p>
                                            We will deliver locally from you to your customer.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer full />
        </main>
    </div>
  )
}

Landing.propTypes = {
  updateAuth: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { updateAuth, register, login })(withRouter(Landing));
