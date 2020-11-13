import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';


const ShortVariant = ({ detailVariant, handleClick, variantList }) => {  
    const [selected, setSelected] = useState(false);

    const [varImg, setVarImg] = useState(null);

    useEffect(() => {
        renderVarImg();
    }, []);

    const itemClick = () => {
        // handleClick(detailItem._id);
        setSelected(!selected)
    }


    const renderVarImg = async () => {
        setVarImg(null);
        try {
            const res = await axios.get(`/api/products/${detailVariant.product}`);
            setVarImg(res.data);
        } catch (err) {
            console.log(err);
        }          
    }

    return (
        <div 
            key={detailVariant._id}  
            className="inventory-table-row-mobile"
            style={selected ? {background: 'rgb(247,247,247)'} : {background: 'rgb(0,0,0,0)'}} 
            onClick={itemClick}
        >
            {/* <td>
                <input checked={selected} class="edit_info" type="checkbox" style={{width:'15px'}}/>
            </td> */}
            <div className="table-row-img">{varImg !== null && (varImg.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${varImg.img_gallery[0].img_name}`} alt="img" />)}</div>
            <div>
                <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{detailVariant.name}</div>
                <div className="tag-list">
                    {detailVariant.color && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.color} </p></div>)}
                    {detailVariant.size && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.size} </p></div>)}
                    {detailVariant.weight && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.weight} </p></div>)}
                    {detailVariant.bundle && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.bundle} </p></div>)}
                    {detailVariant.type && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.type} </p></div>)}
                    {detailVariant.scent && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.scent} </p></div>)}
                    {detailVariant.fit && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.fit} </p></div>)}
                    {detailVariant.flavor && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.flavor} </p></div>)}
                    {detailVariant.material && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.material} </p></div>)}
                </div>
            </div>
        </div>
    )
}

ShortVariant.propTypes = {

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, null)(ShortVariant);
