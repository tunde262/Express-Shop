import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const Banner = ({imgLarge, imgSmall}) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-width: 760px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    let img;
    if(isTabletOrMobileDevice) {
        img = imgSmall;
    } else {
        img = imgLarge;
    }
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <BannerContainer className="banner p-2">
                <img src={img} alt="img" />
            </BannerContainer>
        </div>
    )
}

const BannerContainer = styled.div`
    width: 80%;
    height: 300px;
    overflow: hidden;
    display: flex;
    align-items: center;
    
    img {
        width: 100%;
        height: 300px;
        border-radius: 1rem;
    }
`;

Banner.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default Banner;
