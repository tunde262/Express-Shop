import React from 'react'
import PropTypes from 'prop-types'

const OrderSummaryBlock = ({
    order
}) => {
    return (
        <div id="order-totals" style={{background:'#fff', margin:'10px 0', padding:'10px', height:'300px', border:'1px solid rgb(214, 214, 214)'}}>
            <p>Order Summary</p>
            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                <p>Item(s) Subtotal:</p>
                <p>${order.order && order.order.cart.totalPrice}</p>
            </div>
            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                <p>Shipping & Handling:</p>
                <p>$0.00</p>
            </div>
            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                <p>Estimated Tax:</p>
                <p>$3.98</p>
            </div>
            <div style={{display:'flex', color:'#ff4b2b', justifyContent:'space-between'}}>
                <p>Completed Total:</p>
                <p>${order.order && order.order.cart.totalPrice}</p>
            </div>
        </div>
    )
}

OrderSummaryBlock.propTypes = {

}

export default OrderSummaryBlock
