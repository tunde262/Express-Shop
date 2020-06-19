import React, { Fragment } from 'react'
import c from 'config';

const Confirm = ({nextStep, prevStep, values, submit}) => {
    const addAndContinue = e => {
        e.preventDefault();
        submit();
        nextStep()
    }

    const back = e => {
        e.preventDefault();
        prevStep();
    }

    const { name, category, description, brand, color, price, compareAtPrice, weight, file } = values;

    return (
        <Fragment>
            <ul>
                <li>{file}</li>
                <li>{name}</li>
                <li>{category}</li>
                <li>{description}</li>
                <li>{brand}</li>
                <li>{color}</li>
                <li>{price}</li>
                <li>{compareAtPrice}</li>
                <li>{weight}</li>
            </ul>
            <div className="line"></div>
            <button onClick={back} className="btn btn-primary my-1">Back</button>
            <button onClick={addAndContinue} className="btn btn-primary my-1">Add & Continue</button>
        </Fragment>
    )
}

export default Confirm
