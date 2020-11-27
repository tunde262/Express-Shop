import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import gainLogo from '../../../utils/imgs/gainlogo.jpg';

const Subs_Element = props => {
    const [active, setActive] = useState(false);

    return (
        <div style={{zIndex:'20', background:'#fff'}}>
            <div className="store-table-nav-items header">
                <h3 style={{fontWeight:'600'}}>Subscriptions</h3>
            </div>
            <div className={active ? "table-nav-dropdown active" : "table-nav-dropdown short"}>
                <Link to={{pathname:`/admin/`,search: "?show=store"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary active">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=inventory"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            className="store-nav-img"
                            src={gainLogo}
                        />
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
            </div>
            <div onClick={() => setActive(!active)} style={{display:'flex', alignItems:'center', color:'#808080'}} className="store-table-nav-items action">
                {active ? (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-up"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show less</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show 4 more</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

Subs_Element.propTypes = {

}

export default Subs_Element
