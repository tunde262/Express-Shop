import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../../common/Spinner';
import VariantTagList from '../common/VariantTagList';
import placeholderImg from '../../../../utils/imgs/placeholder_img.jpg';


const OrderItem = ({ 
    isTablet,
    orderItem
}) => {

    const [gotDetail, setGotDetail] = useState(false);
    const [orderImg, setOrderImg] = useState([]);

    let res = null;

    useEffect(() => {
        renderImg();
    }, [])

    const fetchDetail = async () => {
        try {
            res = await axios.get(`/api/products/${orderItem.item.product}`);
            console.log(`ORD ITEM RETRIEVED: `);
            console.log(res.data);
            renderImg();
        } catch (err) {
            console.log(`FAILED TO RETRIEVE W ERR: ${err}`);
        }

        console.log('ORDER ITEM ID: ');
        console.log(orderItem.item.product)
    };

    if(!gotDetail && orderItem) {
        fetchDetail();
        setGotDetail(true);
    }


    let rowClassName1;

    if(!isTablet) {
        rowClassName1 = "order-table-row";
            
    } else {
        rowClassName1 = "order-table-row-mobile"
    }

    const renderImg = () => {
        setOrderImg([]);
        console.log('RENDER IMG PROCESS')
        console.log(res)
        if(res) {
            if(res.data.img_gallery[0]) {
                let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);

                setOrderImg([(<img style={{width: '100%'}} src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="img" />)]);
            } else {
                setOrderImg([(<img style={{width: '100%'}} src={placeholderImg} alt="img" />)]);
            }  
        } else {
            setOrderImg([(<img style={{width: '100%'}} src={placeholderImg} alt="img" />)]);
        } 
    }

    return (
        <div  
            className={rowClassName1} 
        >
            {isTablet ? (
                <Fragment>
                    <div className="table-row-img">
                        {!orderImg.length > 0 ? null : orderImg}
                    </div>
                    <div>
                        <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                            {orderItem.item.name}
                        </div>
                        <div style={{marginLeft:'-5px'}}>
                            <VariantTagList variant={orderItem.item} />
                        </div>
                        <div style={{display:'flex', color:'#808080', alignItems:'center'}}>
                            <p style={{margin:'0'}}>Total: <span style={{color:'#ff4b2b', fontSize:'14px'}}>${orderItem.price}</span></p>
                        </div>
                        <div style={{display:'flex', color:'#808080', alignItems:'center'}}>
                            <p style={{margin:'0'}}>${orderItem.item.price} x {orderItem.qty}</p>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className="table-row-img">
                        {!orderImg.length > 0 ? null : orderImg}
                    </div>
                    <div>
                        <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                            {orderItem.item.name}
                        </div>
                        <VariantTagList variant={orderItem.item} />
                    </div>
                    <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
                        <p style={{margin:'0 1rem'}}>${orderItem.item.price}</p>
                        <p style={{margin:'0 1rem'}}>x</p>
                        <p style={{margin:'0 1rem'}}>{orderItem.qty}</p>
                    </div>
                    <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
                        <p style={{margin:'0 1rem'}}>${orderItem.price}</p>
                    </div>
                </Fragment>
            ) }
        </div>
        // <div style={{display:'grid', borderBottom:'1px solid #e8e8e8', width: '100%', gridGap:'4rem', gridTemplateColumns:'1fr 1fr'}}>
        //     <div style={{marginLeft:'2rem', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100px', width:'100%'}}>
        //         <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        //             <div style={{fontSize: '1rem', background:'yellow', color:'#cecece',margin: '10px 0', width:'80px',height: '80px',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
        //                 <img src={orderItem.item.img_gallery ? `/api/products/image/${orderItem.item.img_gallery[0].img_name}` : placeholderImg} style={{width:'100%'}} alt="product" />
        //             </div>
        //             <div style={{display:'flex', width:'100%', flexDirection:'column', alignItems:'flex-start'}}>
        //                 <div style={{height:'18px', marginLeft:'0', overflow:'hidden', color:'#808080'}}>
        //                     <p className="line-clamp-1" style={{margin:'0', color:'blue'}}>{orderItem.item.name}</p>
        //                 </div>
        //                 <p style={{margin:'0 15px', color:'#808080'}}><span style={{color:'#ff4b2b'}}>M 12</span> / <span style={{color:'green'}}>Grey</span></p>
        //             </div>
        //         </div>
                
        //     </div>
        //     <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
        //         <p style={{margin:'0 1rem'}}>${orderItem.item.price}</p>
        //         <p style={{margin:'0 1rem'}}>x</p>
        //         <p style={{margin:'0 1rem'}}>{orderItem.qty}</p>
        //         <p style={{margin:'0 1rem'}}>${orderItem.price}</p>
        //     </div>
        // </div>
    )
}

OrderItem.propTypes = {
    
}


export default OrderItem;
