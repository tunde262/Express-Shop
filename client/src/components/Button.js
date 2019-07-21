import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    border: 0.05rem solid var(--lightBlue);
    border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: white;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover{
        background: transparent;
        color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    }
    &:focus{
        outline: none;
    }
`;