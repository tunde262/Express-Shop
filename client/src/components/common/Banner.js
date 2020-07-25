import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const Banner = ({imgLarge, imgSmall, admin}) => {
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
        <Fragment>
            {admin === "true" && (
                <div style={{width:'80vw',height:0, display:'flex', justifyContent:'flex-end'}}>
                    <div 
                        style={{
                            background:'#ffbf00', 
                            height:'50px', 
                            width:'50px', 
                            borderRadius:'50px', 
                            marginTop:'-25px',
                            display:'flex',
                            zIndex:'3',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <i style={{color:'#fff', fontSize:'1.5rem'}} className="fas fa-pencil-alt"></i>
                    </div>
                </div>
            )}
            <div style={{display:'flex', justifyContent:'center'}}>
                <BannerContainer className="banner p-2"> 
                    <img src={img} alt="img" />
                </BannerContainer>
            </div>
        </Fragment>
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

    @media (max-width: 768px){
        width: 98%;
        height: 200px;

        img {
            height: 200px;
        }
    }
`;

Banner.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default Banner;
