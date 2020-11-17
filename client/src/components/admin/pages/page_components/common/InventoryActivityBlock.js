import React from 'react'
import PropTypes from 'prop-types'

const InventoryActivityBlock = ({
    isMobile
}) => {
    return (
        <div className="inventory-activity-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div className="vertical-step-bar">
                <ul id="progress">
                    <li>
                        <div class="node green"></div>
                        <p>Order Placed</p>
                        <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>Collecting Items</p>
                        <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                    </li>
                    <li>
                        <div class="divider grey"></div></li>
                    <li>
                        <div class="node grey"></div>
                        <p>Awaiting Delivery</p>
                        <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>En Route Started</p>
                        <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>Left At Door</p>
                        <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                    </li>
                </ul>
            </div>

            <div style={{margin:'1rem 0 10px'}}>
                <input type="button" value="Next" id="next"/>
                <input type="button" value="Clear" id="clear"/>
            </div>
        </div>
    )
}

InventoryActivityBlock.propTypes = {

}

export default InventoryActivityBlock
