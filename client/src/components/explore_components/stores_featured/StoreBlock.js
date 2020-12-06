import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StoresBlock = ({ store }) => {
    return (
        <Link to={`/store/${store._id}`} style={{textDecoration:'none'}}>
            <div style={
                { 
                width:'100%', 
                borderBottom:'1px solid #e8e8e8', 
                background:'#fff', 
                height:'100px',
                display:'flex', 
                alignItems:'center'
                }
            }>
                <div className="store-block">
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div>
                            <img style={{border:'1px solid #e8e8e8', height:'4.1vw', width:'4.1vw', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                        </div>
                    </div>
                    <div style={{display:'flex', margin:'0 5px', justifyContent:'flex-start', alignItems:'center', height:'100%', width:'100%', overflow:'hidden'}}>
                        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                            <div style={{height:'1rem', lineHeight:'15px'}}>
                                <p className="line-clamp-1" style={{margin:'0'}}>{store.name}</p>
                            </div>
                            <div style={{maxHeight:'40px', lineHeight:'15px'}}>
                                <p className="line-clamp" style={{margin:'0', fontFamily:' Arial, Helvetica,sans-serif', color:'#808080'}}>{store.category}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div className="store-socials store">
                            <button style={{width:'100%', margin:'10px 0',}}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

StoresBlock.propTypes = {

}

export default StoresBlock;
