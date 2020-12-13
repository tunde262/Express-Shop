import React, {  useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({ alerts }) => {

    let alertList;

    if(alerts !== null && alerts.length > 0) {
        alertList = alerts.map(alert => (
            <div className={`alert showAlert show`}>
                <span className="fas fa-exclamation-circle"></span>
                <span className="msg">Warning: { alert.msg }.</span>
                <div className="close-btn">
                    <span className="fas fa-times"></span>
                </div>
            </div>
        ))  
                    
    }



    return (
        <div className="alert-container">
            {alertList}
        </div> 
        
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert)
