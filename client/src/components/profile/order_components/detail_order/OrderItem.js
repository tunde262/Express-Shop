import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import placeholderImg from '../../../../utils/imgs/placeholder_img.jpg';

const OrderItem = ({ order }) => {

    const [gotDetail, setGotDetail] = useState(false);
    const [orderImg, setOrderImg] = useState([]);

    let res = null;

    useEffect(() => {
        renderImg();
    }, [])

    const fetchDetail = async () => {
        try {
            res = await axios.get(`/api/products/${order.item.product}`);
            console.log(`ORD ITEM RETRIEVED: `);
            console.log(res.data);
            renderImg();
        } catch (err) {
            console.log(`FAILED TO RETRIEVE W ERR: ${err}`);
        }

        console.log('ORDER ITEM ID: ');
        console.log(order.item.product)
    };

    if(!gotDetail && order) {
        fetchDetail();
        setGotDetail(true);
    }

    const renderImg = () => {
        setOrderImg([]);
        console.log('RENDER IMG PROCESS')
        console.log(res)
        if(res) {
            if(res.data.img_gallery[0]) {
                let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);

                setOrderImg([(<img style={{height: '100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="img" />)]);
            } else {
                setOrderImg([(<img style={{height: '100%'}} src={placeholderImg} alt="img" />)]);
            }  
        } else {
            setOrderImg([(<img style={{height: '100%'}} src={placeholderImg} alt="img" />)]);
        } 
    }

    return (
        <Fragment>
            <div style={{display:'grid', width: '100%', gridGap:'4rem', gridTemplateColumns:'1fr 1fr'}}>
                <div style={{marginLeft:'2rem', borderBottom:'1px solid #e8e8e8', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100px', width:'100%'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div style={{fontSize: '1rem', color:'#cecece',margin: '10px', padding:'2px', width:'80px',height: '80px',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                            {!orderImg.length > 0 ? null : orderImg}
                        
                        </div>
                        <div style={{display:'flex', width:'100%', flexDirection:'column', alignItems:'flex-start'}}>
                            <div style={{height:'18px', marginLeft:'0', overflow:'hidden', color:'#808080'}}>
                                <p className="line-clamp-1" style={{margin:'0', color:'blue'}}>{order.item.name}</p>
                            </div>
                            <p style={{margin:'0 15px', color:'#808080'}}><span style={{color:'#ff4b2b'}}>M 12</span> / <span style={{color:'green'}}>Grey</span></p>
                        </div>
                    </div>
                    
                </div>
                <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
                    <p style={{margin:'0 1rem'}}>${order.item.price}</p>
                    <p style={{margin:'0 1rem'}}>x</p>
                    <p style={{margin:'0 1rem'}}>{order.qty}</p>
                    <p style={{margin:'0 1rem'}}>${order.price}</p>
                </div>
            </div>
        </Fragment>
    )
}

OrderItem.propTypes = {

}

export default OrderItem
