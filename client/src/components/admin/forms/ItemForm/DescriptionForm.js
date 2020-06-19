import React, { Fragment } from 'react'

const DescriptionForm = ({nextStep, onChange, values}) => {
    const next = e => {
        e.preventDefault();
        nextStep();
    }
    return (
        <Fragment>
            <h1>Add Item</h1>
            <p>Describe The Item</p>
            <form className="form">
                <label className="form-group">Name
                    <input
                        type="text"
                        placeholder="Enter item name..."
                        name="name"
                        value={values.name}
                        onChange={onChange}
                    />
                </label>
                <div className="line"></div>
                <label className="form-group">Category
                <input
                    type="text"
                    placeholder="Item Category Tags"
                    name="category"
                    value={values.category}
                    onChange={onChange}
                />
                <small className="form-text">
                    Seperate with commas
                </small>
                </label>
                <div className="line"></div>
                <label className="form-group">Description
                <input
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    value={values.description}
                    onChange={onChange}
                />
                </label>
                <div className="line"></div>
                <label className="form-group">Brand
                <input
                    type="text"
                    placeholder="Enter Item Brand..."
                    name="brand"
                    value={values.brand}
                    onChange={onChange}
                />
                </label>
                <div className="line"></div>
                <label className="form-group">Color
                <input
                    type="text"
                    placeholder="Color..."
                    name="color"
                    value={values.color}
                    onChange={onChange}
                />
                </label>
                <div className="line"></div>
                <button onClick={next} className="btn btn-primary my-1">Continue</button>
            </form>
        </Fragment>
    )
}

export default DescriptionForm;
