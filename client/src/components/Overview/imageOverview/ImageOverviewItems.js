import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HorizontalNav } from '../../common/HorizontalNav';
import Spinner from '../../common/Spinner';

const ImageOverviewItems = ({images, changeImage, showImage, detailProduct}) => {
    let imageList;

    if(images && images.length > 0) {
        imageList = images.map((image, index) => (
            <ImageOverviewItem>
                <div className="mobile-detail-image-container">
                    <img key={index} style={index === showImage ? {border:'2px solid #0000FF', height:'100%'} : {height:'100%'}} onClick={() => changeImage(index)} src={`/api/products/image/${image.img_name}`} alt={detailProduct.name} />
                    <div className="detail-image-overlay" onClick={() => changeImage(index)}></div>
                </div>
            </ImageOverviewItem>
        ));
    }
    else {
        imageList = <p style={{margin:0}}>No more photos...</p>
    }

    return (
        <HorizontalNav background="white">
            {imageList}
            {images && images.length > 0 ? (
                <ImageOverviewItem>
                    <div style={{height:'200px', width:'200px'}}></div>
                </ImageOverviewItem>
            ) : null}
            {/* <ImageOverviewItem>
                <div class="card__container" style={{color:'#808080', justifyContent: 'center', textAlign:'center'}}>
                    <h4>See <br/> Others</h4>
                </div>
            </ImageOverviewItem> */}
        </HorizontalNav>
    )
}

const ImageOverviewItem = styled.div`
    display: inline-box;
    margin: 0 5px;
`;

export default ImageOverviewItems;
