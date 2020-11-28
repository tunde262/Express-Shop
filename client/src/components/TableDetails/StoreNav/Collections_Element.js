import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import sampleShoe from '../../../utils/imgs/20484728.jpeg';
import paperTowels from '../../../utils/imgs/paper_towels.jpeg';

const Collections_Element = ({
    setCollectionModal,
    displayCollectionModal,
}) => {

    const [active, setActive] = useState(false);

    return (
        <div style={{zIndex:'10', background:'#fff'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header">
                <h3 style={{fontWeight:'600'}}>Collections</h3>
                <small onClick={() => setCollectionModal(!displayCollectionModal)}><i class="fas fa-plus"></i>Create</small>
            </div>
            <div className={active ? "table-nav-dropdown active" : "table-nav-dropdown short"}>
                <Link to={{pathname:`/admin/`,search: "?show=store"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                1
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                    <h3>Payments</h3>
                    <p>Add payment methods</p>
                </div> */}
                <Link to={{pathname:`/admin/`,search: "?show=inventory"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={paperTowels}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                4
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
                <Link to={{pathname:`/admin/`,search: "?show=orders"}}>
                    <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                        <div className="store-nav-collection-img-container">
                            <div className="store-nav-collection-img">
                                <img 
                                    alt="" 
                                    style={{width:'100%'}}
                                    src={sampleShoe}
                                />
                            </div>
                            {/* <span style={{position:'absolute', top:'0', marginRight:'-10px', marginTop:'-10px', right:'0', width:'20px', height:'20px', color:'#fff', borderRadius:'50%', background:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                0
                            </span> */}
                        </div>
                        <h3 style={{fontWeight:'600'}}>
                            Home
                        </h3>
                    </div>
                </Link>
            </div>
            <div onClick={() => setActive(!active)} style={{display:'flex', alignItems:'center', color:'#808080'}} className="store-table-nav-items action">
                {active ? (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-up"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show less</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show 4 more</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

Collections_Element.propTypes = {

}

export default Collections_Element
