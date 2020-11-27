import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Extras_Element = props => {
    return (
        <div style={{zIndex:'30', background:'#fff'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header">
                <h3 style={{fontWeight:'600', color:'#808080'}}>Account</h3>
            </div>
            <Link to={{pathname:`/admin/`,search: "?show=store"}}>
                <div className="store-table-nav-items secondary active">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'10px'}} className="fas fa-cog"></i>
                        </span>
                        Settings
                    </h3>
                </div>
            </Link>
            {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                <h3>Payments</h3>
                <p>Add payment methods</p>
            </div> */}
            <Link to={{pathname:`/admin/`,search: "?show=inventory"}}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-history"></i>
                        </span>
                        View History
                    </h3>
                </div>
            </Link>
            
            <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-question-circle"></i>
                        </span>
                        Help
                    </h3>
                </div>
            </Link>
            <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-flag"></i>
                        </span>
                        Send Feedback
                    </h3>
                </div>
            </Link>
            <div className="store-table-nav-items header"></div>
        </div>
    )
}

Extras_Element.propTypes = {

}

export default Extras_Element
