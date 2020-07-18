import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: ${props => props.buy ? "#08a05c" : "#ff4b2b"};
    border: 0.05rem solid #ff4b2b;
    border-color: ${props => props.buy ? "#08a05c" : "#ff4b2b"};
    color: white;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover{
        background: transparent;
        color: ${props => props.buy ? "#08a05c" : "#ff4b2b"};
    }
    &:focus{
        outline: none;
    }
`;