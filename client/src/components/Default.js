import React, { Fragment } from 'react';

const Default = (props) => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <h3>the requested URL{" "}<span className="text-danger">{props.location.pathname}</span>{" "} was not found</h3>
      <p className='large'>Sorry, {" "}<span className="text-danger">{props.location.pathname}</span>{" "} does not exist</p>
    </Fragment>
  );
};

export default Default;