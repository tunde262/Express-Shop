import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileCircle = ({auth: { user }, small, big}) => {
    let circleClasses;

    if(small) {
        circleClasses = "profile-circle small";
    } else if (big) {
        circleClasses = "profile-circle big";
    } else {
        circleClasses = "profile-circle";
    }

    let letter;

    if(user) {
        letter = user.first_name.charAt(0);
    }

    return (
        <div className={circleClasses}>
            <p style={{color:'#333', margin:'0'}}>{letter}</p>
        </div>
    )
}

ProfileCircle.propTypes = {
    auth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileCircle);
