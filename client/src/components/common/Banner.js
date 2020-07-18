import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Banner = ({img}) => {
    return (
        <BannerContainer className="banner p-2">
            <img src={img} alt="img" />
        </BannerContainer>
    )
}

const BannerContainer = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    align-items: center;
    
    img {
        width: 100%;
        height: 300px;
        border-radius: 3rem;
    }
`;

Banner.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default Banner;
