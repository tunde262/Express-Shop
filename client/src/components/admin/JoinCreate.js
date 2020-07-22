import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';


const JoinCreate = ({ auth: { user }, profile: { loading } }) => {

    return (
        <main id="home">
            {loading ? <Spinner /> : (
                <div className="box-container">
                    <h2>Welcome {user.name}, what would you like to do?</h2>
                    <div>
                        <Link to="/join-store"><div className="largeButton">Join A Store</div></Link>
                        <Link to="/create-store"><div className="largeButton">Create A Store</div></Link>
                    </div>
                </div>
            )}
      </main>
    )
}

JoinCreate.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(JoinCreate);
