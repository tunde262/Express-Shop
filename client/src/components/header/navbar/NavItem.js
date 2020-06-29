import styled from 'styled-components';

export const NavItem = styled.button`
    font-size: 1.4rem;
    font-weight: bold;
    background: transparent;
    color: ${props => props.background};
    border-color: ${props => props.background};
    border-radius: 56px;
    padding: 0rem 2rem;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0 0;
    min-width: 100px;
    height: 56px;
    text-align: center;
    transition: all .1s ease-out;

    &:hover {
        transform: scale(1.05);
        color: white;
        border-color: transparent;
        background: ${props => props.background};
        
    }
`;