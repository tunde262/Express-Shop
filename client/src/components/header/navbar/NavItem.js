import styled from 'styled-components';

export const NavItem = styled.button`
    font-size: 1rem;
    font-weight: bold;
    background: ${props => props.background};
    color: white;
    border-color: transparent;
    border-radius: 56px;
    padding: 0rem 2rem;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0 0;
    width: auto;
    height: 2rem;
    text-align: center;
    transition: all .1s ease-out;

    &:hover {
        transform: scale(1.05);
        color: white;
        border-color: transparent;
        background: ${props => props.background};
        
    }

    i {
        color: white;
        font-size: 1rem;
    }
`;