import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { joinStore } from '../../../actions/storeActions';
import PropTypes from 'prop-types';

import ReactGA from 'react-ga';

import { Container } from '../../auth/Form';

const JoinForm = ({joinStore, history}) => {
    const [formData, setFormData] = useState({
        code: ''
    });

    const { code } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        
        let data = new FormData();
        data.append('code', code);

        // joinStore(data, history);
    }

    return (
        <Fragment>
            <Container>
                <div className="container">
                    <h1>Join A Store</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <label>Store Code:</label>
                        <input
                            type="text"
                            name="code"
                            className="input_line"
                            placeholder="Enter Store Code"
                            value={code}
                            onChange={e => onChange(e)}
                        />
                        <button type="submit">Join Store</button>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

JoinForm.propTypes = {
    joinStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    store: state.store
});

export default connect(mapStateToProps)(
withRouter(JoinForm)
);
