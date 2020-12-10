import styled from 'styled-components';

export const HorizontalNav = styled.div`
    background: ${props => props.background};
    padding 15px 15px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    white-space: ${props => props.nowrap};
    &::-webkit-scrollbar {
        display: none;
    }
`;