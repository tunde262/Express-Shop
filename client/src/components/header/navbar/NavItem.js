import styled from 'styled-components';

export const NavItem = styled.button`
    font-size: 14px;
    font-weight: 400;
    background: ${props => props.background};
    color: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 56px;
    padding: 0rem 2rem 0rem 5px;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0 0;
    width: auto;
    height: 60px;
    outline: none;
    text-align: center;
    transition: all .1s ease-out;
    text-transform: lowercase;

    &:active {
        outline: none;
        
    }

    &:hover {
        transform: scale(1.05);
        color: white;
        border-color: transparent;
        background: ${props => props.hover};
        
    }

    img {
        border-radius: 24px;
        height: 50px;
        overflow: hidden;
        width: 50px;
        margin: 2px 0;
    }

    i {
        font-size: 13px;
    }
`;