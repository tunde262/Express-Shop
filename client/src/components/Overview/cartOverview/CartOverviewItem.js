import styled from 'styled-components';

export const CartOverviewItem = styled.div`
    height: 150px;
    width: 250px;
    display: inline-block;
    background: white;
    border: 0.05rem solid rgb(211,211,211);
    border-radius: 0.5rem;
    margin: 0 10px;
  

    .btn-container {
        margin: -15px 80px;
    }

    .btn-circle {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin: 0px 10px;
        padding: 6px 0px;
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
        transition: all 0.1s ease-out;

        &.inc {
            background: orange;
            color: white;
            border: 0.05rem solid none;

            &:hover {
                transform: scale(1.15);
                border-radius: 17.5px;
            }
        }
    
        &.num {
            background: white
            border: 0.05rem solid rgb(211,211,211);
        }
    }
`;