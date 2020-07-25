import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Team = () => {

    return (
        <Fragment>
            <h2 style={{color:'#333', fontWeight:'300'}} className="my-2">Team Member(s)</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Schools</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Harvard</td>
                        <td className="hide-sm">BS</td>
                        <td>
                            08/6/20 - 07/5.21
                        </td>
                        <td>
                            <i style={{transform: "scale(1.5)"}}  className="fas fa-trash"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

Team.propTypes = {

}

export default Team;
