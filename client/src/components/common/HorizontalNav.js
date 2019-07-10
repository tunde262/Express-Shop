import styled from 'styled-components';

export const HorizontalNav = styled.div`
    background: ${props => props.background};
    padding 15px 15px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
        display: none;
    }
`;