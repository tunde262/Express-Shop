import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StoresBlock = ({ store }) => {
    return (
        <Link to={`/store/${store._id}`}>
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
                <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div>
                            <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{store.name}</p>
                            <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                        </div>
                        
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

StoresBlock.propTypes = {

}

export default StoresBlock;
