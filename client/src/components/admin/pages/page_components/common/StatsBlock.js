import React from 'react'
import PropTypes from 'prop-types'

const StatsBlock = ({
    setPageNav,
    pageNav
}) => {
    return (
        <section id="stats" className="stats">
            <div className="stats-box">
                <div>
                    <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2,000</h2>
                    <p>Active</p>
                </div>
                <div>  
                    <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2000</h2>
                    <p>Sold</p>
                </div>
                <div>   
                    <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2,056</h2>
                    <p>Shipping</p>
                </div>
                <div>   
                    <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2000</h2>
                    <p>Low Stock</p>
                </div>
            </div>
            <div>
                <ul className="profile-underline">
                    <div 
                        onClick={e => setPageNav('detail')} className={pageNav === "detail" && "active"}
                    >
                        <li><p>Item</p></li>
                    </div>
                    <div 
                        onClick={e => setPageNav('inventory')} className={pageNav === "inventory" && "active"}
                    >
                        <li><p>Inventory</p></li>
                    </div>
                </ul>
            </div>
        </section>
    )
}

StatsBlock.propTypes = {

}

export default StatsBlock;
