import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const RoomsList = styled.div<{colors: IColorProps}>`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
> div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80vw;
}
 >h4, >p{
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        width: 80vw;
        >span{
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
        }
 }
 >p {
        cursor: pointer;
        border: 1.5px solid ${({colors}) => colors.black};
        border-radius: 0.3rem;
        background-color: ${({colors}) => colors.white};
        margin-bottom: .2rem;
        &:hover{
            background-color: ${({colors}) => colors.blue};
            color: ${({colors}) => colors.white};
            border: 1.5px solid ${({colors}) => colors.white};
        }
 }
 > h4 {
    color: ${({colors}) => colors.white};
 }
`