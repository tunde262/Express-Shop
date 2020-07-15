import styled from 'styled-components';

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;

    .mainLogo {
        @media (max-width: 768px){
            display: none;
        }
    }

    .smallLogo {
        display: none
        @media (max-width: 768px){
            display: flex;
            justify-content: center;
            margin-top: -2rem;
        }
    }
`;