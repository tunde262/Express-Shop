import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Extras_Element = props => {
    return (
        <div style={{zIndex:'30', background:'rgb(247, 247, 247)'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header-btn">
                <h3 style={{fontWeight:'600', color:'#808080'}}>Account</h3>
            </div>
            <a href={`https://www.cardboardexpress.com/history`}>
                <div className="store-table-nav-items secondary active">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'10px'}} className="fas fa-cog"></i>
                        </span>
                        Settings
                    </h3>
                </div>
            </a>
            {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                <h3>Payments</h3>
                <p>Add payment methods</p>
            </div> */}
            <a href={`https://www.cardboardexpress.com/history`}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-history"></i>
                        </span>
                        View History
                    </h3>
                </div>
            </a>
            
            <a href={`https://www.cardboardexpress.com/history`}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-question-circle"></i>
                        </span>
                        Help
                    </h3>
                </div>
            </a>
            <a href={`https://www.cardboardexpress.com/history`}>
                <div className="store-table-nav-items secondary">
                    <h3 style={{fontWeight:'600'}}>
                        <span>
                            <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-flag"></i>
                        </span>
                        Send Feedback
                    </h3>
                </div>
            </a>
            <div className="store-table-nav-items header"></div>
        </div>
    )
}

Extras_Element.propTypes = {

}

export default Extras_Element
