import React from 'react';

import Overview from '../Overview';
import ImageOverviewItems from './ImageOverviewItems';

const ImageOverview = ({images, title, changeImage, showImage, detailProduct}) => (
    <Overview>
        <ImageOverviewItems images={images} changeImage={changeImage} showImage={showImage} detailProduct={detailProduct} />
    </Overview>
);

export default ImageOverview
