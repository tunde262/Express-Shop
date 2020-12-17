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
import BuildStore from '../utils/imgs/CE_BUILD_STORE.png';
import PayMap from '../utils/imgs/CE_PAY_MAP.png';
import Invoice from '../utils/imgs/CE_INVOICE.png';
import StorageBins from '../utils/imgs/CE_STORAGE_BINS.png';
import Fulfillment from '../utils/imgs/CE_FULFILLMENT.png';
import StorageFlow from '../utils/imgs/CE_STORAGE_FLOW.png';
import DeliveryFlow from '../utils/imgs/CE-DELIVERY_FLOW.png';
import ComputerWarehouse from '../utils/imgs/CE_COMPUTER_WAREHOUSE.png';
import MapNotify from '../utils/imgs/CE_MAP_NOTIFY.png';



import ReactGA from 'react-ga';

const BusinessLanding = ({history, isAuthenticated, updateAuth}) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    signup: true
  });

  const [tableShow1, setTableShow1] = useState('create');

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

  let tableContent;

  if(tableShow1 === 'create') {
      tableContent = (
        <Fragment>
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
              <h1>Create A Store.<br/>Sell Online.<br/>Anywhere.<br/><span>For Free.</span></h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture1}>
              <img style={{width:'70%'}} src={BuildStore} alt="Build Store" />
            </div>
            <div className={classes.how2}>
              <h1>New Customers In Your City <span>AND</span> Thousands of Others.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture2}>
              <img style={{width:'60%'}} src={PayMap} alt="New Customers Anywhere" />
            </div>
            <div className={classes.how3}>
              <h1>Get Paid.<br/>Easily.<br/>Online.<br/><span>Anywhere.</span></h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture3}>
              <img style={{width:'60%'}} src={Invoice} alt="Invoice" />
            </div>
          </div>
        </Fragment>
      )
  } else if (tableShow1 === 'storage') {
      tableContent = (
        <Fragment>
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
              <h1><span>Local Storage.</span><br/>Close To Customers.<br/><span>Anywhere.</span><br/>As You Need It.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture1}>
              <img style={{width:'90%'}} src={StorageBins} alt="Local Storage" />
            </div>
            <div className={classes.how2}>
              <h1>Pick, Packed,<br/>and Shipped.<br/><span>By Us.</span></h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture2}>
              <img style={{width:'90%'}} src={Fulfillment} alt="Pick, Packed, and Shipped" />
            </div>
            <div className={classes.how3}>
              <h1>You Sell.<br/><span>From Anywhere.</span><br/>We Do The Rest.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture3}>
              <img style={{width:'90%'}} src={StorageFlow} alt="Storage Flow" />
            </div>
          </div>
        </Fragment>
      ) 
  } else if(tableShow1 === 'delivery') {
      tableContent = (
        <Fragment>
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
              <h1><span>Local Delivery.</span><br/>From You,<br/>To Your Customers.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture1}>
              <img style={{width:'90%'}} src={DeliveryFlow} alt="Local Delivery" />
            </div>
            <div className={classes.how2}>
              <h1><span>Click to Delivery.</span><br/>Schedule A<br/>Time and Place.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture2}>
              <img style={{width:'90%'}} src={ComputerWarehouse} alt="Click to schedule a delivery" />
            </div>
            <div className={classes.how3}>
              <h1><span>Track Your Delivery.</span><br/>Real Time<br/>Updates.</h1>
              <p>Learn More</p>
            </div>
            <div className={classes.picture3}>
              <img style={{width:'60%'}} src={MapNotify} alt="Track your delivery" />
            </div>
          </div>
        </Fragment>
      )
  }
  
  return (
    <div className="explore-container landing">
      <div className={classes.landing_banner}>
        <div className={classes.landing_banner_container}>
          <div class={classes.landing_banner_content}>
            <div>
                <h1 style={{fontSize:'3rem'}}>Selling Online Has Never Been Easier.<br/> Delivered On Time.</h1>
                <p style={{margin:'0', fontSize:'1rem', fontFamily:'Arial, Helvetica,sans-serif'}}>With Cardboard Express businesses get easy access to all the 
                  tools they need to sell online, find local storage for what they're sellin,
                  and quickly deliver to their customers.
                </p>
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
      <ul class="nav-underline">
        <li class={tableShow1 === "create" && "active"} onClick={e => setTableShow1('create')}><i className="fas fa-store"></i><p>Create A Store</p></li>
        <li class={tableShow1 === "storage" && "active"} onClick={e => setTableShow1('storage')}><i className="fas fa-boxes"></i><p>Need Storage?</p></li>
        <li class={tableShow1 === "delivery" && "active"} onClick={e => setTableShow1('delivery')}><i className="fas fa-truck"></i><p>Need Delivery?</p></li>
      </ul>
      {tableContent}
      <Footer />
    </div>
  )
}

BusinessLanding.propTypes = {
  updateAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { updateAuth })(withRouter(BusinessLanding));
