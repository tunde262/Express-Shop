import styled from 'styled-components';

export const NavItem = styled.button`
    font-size: 1.4rem;
    font-weight: bold;
    background: ${props => props.background};
    color: white;
    border-color: transparent;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0 0;
    min-width: 100px;
    height: 4rem;
    text-align: center;
    transition: all .1s ease-out;

    &:hover {
        transform: scale(1.05);
    }
`;