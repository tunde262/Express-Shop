import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ConditionBlock = ({
    isMobile,
    setConditionToggle,
    conditionToggle,
    conditionData,
    handleConditionChange,
    product,
    match
}) => {

    useEffect(() => {
        setCondition();
    }, [product.detailProduct]);

    const setCondition = () => {
        if(match.params.productId) {
            if (!product.loading && product.detailProduct) {
                handleConditionChange(product.detailProduct.condition)
            }
        }
    }

    return (
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0', textAlign:'flex-start'}}>Choose a condition</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <div id="dropdown-el" style={{width:'100%'}} class={conditionToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setConditionToggle(!conditionToggle)}>
                            {conditionData === '' ? (
                                <p>Select Condition</p>
                            ) : (
                                <p>{conditionData}</p>
                            )}
                            <i class="fas fa-caret-down"></i>
                        </div>
                        {conditionToggle ? (
                            <Fragment>
                                <div onClick={() => handleConditionChange('new')}><p>New (with tags)</p></div>
                                <div onClick={() => handleConditionChange('refurbished')}><p>Refurbished</p></div>
                                <div onClick={() => handleConditionChange('used (liked new)')}><p>Used (like new)</p></div>
                                <div onClick={() => handleConditionChange('type (good)')}><p>Used (good)</p></div>
                                <div onClick={() => handleConditionChange('bundle (fair)')}><p>Used (fair)</p></div>
                            </Fragment>
                        ) : null}
                    </div>
                    {/* <select name="category">
                        <option>* Item Condition</option>
                        <option value="clothing & fashion">New (with tags)</option>
                        <option value="bathroom">Refurbished</option>
                        <option value="household essentials">Used (like new)</option>
                        <option value="laundry">Used (good)</option>
                        <option value="men">Used (fair)</option>
                    </select> */}
                </div>
            </div>
        </div>
    )
}

ConditionBlock.propTypes = {
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, null)(withRouter(ConditionBlock));
