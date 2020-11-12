import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Inventory = ({store, setItemModal, setCollectionModal, setLocationModal, inventoryNav, setTable, auth: { user }, profile: {profile, loading }}) => { 
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    const [menuHeight, setMenuHeight] = useState(null);

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

    const todo = () => {
        setItemModal(true)
        setDropdown(!dropdown)
    }

    const todo2 = () => {
        setCollectionModal(true)
        setDropdown(!dropdown)
    }

    const todo3 = () => {
        setLocationModal(true)
        setDropdown(!dropdown)
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p><span style={{color:'#ff4b2b'}}>Cera Ve</span> / Inventory</p>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <h3>Store Inventory</h3>
                <div>
                    <button onClick={() => setDropdown(!dropdown)} style={{width:'300px', background:'#0098d3', borderColor:'#0098d3', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        Create New
                        <i style={{margin:'0 10px'}} class="fas fa-plus"></i>
                    </button>
                    <div className={dropdown ? "create-dropdown active" : "create-dropdown"} style={{height: menuHeight}}>
                        <div className="menu">
                            <div onClick={todo} className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-tag"></i>
                                Add Item
                            </div>
                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                            <div onClick={todo2} className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-layer-group"></i>
                                 New Collection
                            </div>
                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                            <div onClick={todo3} className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-map-marker-alt"></i>
                                 New Location
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ul class="admin-underline">
                    <div 
                        onClick={e => setTable('products')} className={inventoryNav === "products" && "active"}
                    >
                        <li><p>Items</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('collections')} className={inventoryNav === "collections" && "active"}
                    >
                        <li><p>Collections</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('locations')} className={inventoryNav === "locations" && "active"}
                    >
                        <li><p>Locations</p></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

Header_Inventory.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Inventory);
