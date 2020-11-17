import React from 'react';
import PropTypes from 'prop-types';

import mixpanel from 'mixpanel-browser';

import { incImg, decImg, editProduct } from '../../../../../actions/productActions';

const ImageBlock = ({
    detailProduct,
    setImageModal
}) => {

    const imgBack = (imgId) => {
        console.log('DEC IMG');
        decImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const imgForward = (imgId) => {
        console.log('INC IMG');
        incImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const mixpanelImgOrderUpdate = () => {
        mixpanel.track("Img Order Update", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    } 

    const handleImgClick = () => {
        mixpanel.track("Item Img Click", {
            //   "Entry Point": "Home Landing",
              "Item Name": detailProduct.name,
              "Item Category": detailProduct.category,
              "Item Cost": detailProduct.price,
              "Store Name": detailProduct.store.name,
              "Total Imgs": detailProduct.img_gallery.length,
              "Total Likes": detailProduct.likes.length,
              "Total Comments": detailProduct.comments.length,
              
        });
    }

    let imageContent;
    let img_gallery = detailProduct.img_gallery.sort((a, b) => a.img_order - b.img_order);

    if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
        imageContent = img_gallery.map(image => (
            <div className="product-admin-image-container">
                <img className="product-admin-image-container-img" onClick={handleImgClick} src={`/api/products/image/${image.img_name}`} alt="img" />
                <div className="product-admin-image-container-actions">
                    <div onClick={() => imgBack(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div onClick={handleImgClick} className="admin-image-overlay">
                    <div onClick={() => imgBack(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        ))
    } else {
        imageContent = <h4>No Photos</h4>;
    }

    return (
        <div className="product-admin-main-container">
            <div className="addImage" onClick={setImageModal}>
                <i class="fas fa-plus"></i>
            </div>
            {imageContent}
        </div>
    )
}

ImageBlock.propTypes = {

}

export default ImageBlock
