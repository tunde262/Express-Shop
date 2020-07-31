import React from 'react';
import buttonSpinner from './buttonSpinner.gif';

export default function ButtonSpinner() {
  return (
    <div>
      <img 
        src={buttonSpinner} 
        style={{width: '25px', margin: 'auto', display: 'block' }}
        alt="Loading..."
        />
    </div>
  )
}
