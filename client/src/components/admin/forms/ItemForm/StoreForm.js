import React, { Fragment } from 'react'

const StoreForm = ({nextStep, prevStep, onChange, values}) => {
    const next = e => {
        e.preventDefault();
        nextStep();
    }

    const back = e => {
        e.preventDefault();
        prevStep();
    }
    return (
        <Fragment>
            <h1>Add Item</h1>
            <p>Pricing and Storage</p>
            <form className="form">
                <label className="form-group">Price
                    <input
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={onChange}
                    />
                </label>
                <div className="line"></div>
                <label className="form-group">Compare at price
                    <input
                        type="number"
                        name="compareAtPrice"
                        value={values.compareAtPrice}
                        onChange={onChange}
                    />
                </label>
                <div className="line"></div>
                <label className="form-group">Weight
                <input
                    type="text"
                    placeholder="Enter Weight"
                    name="weight"
                    value={values.weight}
                    onChange={onChange}
                />
                </label>
                <div className="line"></div>
                <button onClick={back} className="btn btn-primary my-1">Back</button>
                <button onClick={next} className="btn btn-primary my-1">Continue</button>
            </form>
        </Fragment>
    )
}

export default StoreForm;
