import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const RoomsList = styled.div<{ colors: IColorProps }>`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 8rem;
> div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 80vw;
    margin-bottom: 1rem;
    
    >h3 {
        font-size: 1.5rem;
        color: ${({ colors }) => colors.white};
        background-color: ${({ colors }) => colors.black};
        padding: .2rem 1rem;
        border-radius: 0.5rem;
    }
}
 #showRooms{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
 }
 > h4 {
    color: ${({ colors }) => colors.white};
 }
 @media (max-width: 968px) {
        margin-top: .5rem;
        >div >h3 {
            font-size: 1.2rem;
        }
    }
`
export const RoomStyle = styled.div<{ colors: IColorProps, bcg: string }>`
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        align-items: center;
        flex-direction:column;
        padding: 0.5rem;
        width: 20rem;
        height: 20rem;
        cursor: pointer;
        border: 1.5px solid ${({ colors }) => colors.black};
        border-radius: 0.3rem;
        background-image: url('/photos/${({ bcg }) => bcg}');
        background-size: cover;
        background-position: center;
        background-blend-mode: screen;
        margin-bottom: .2rem;
        color: ${({ colors }) => colors.white};
        &:hover{
            background-color: ${({ colors }) => colors.blue};
            border: 1.5px solid ${({ colors }) => colors.white};
        }
        >p{
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 1.8rem;
            background-color: ${({ colors }) => colors.black};
            border-radius: 0.5rem;
            padding: 0 0.5rem;
            padding-top: .5rem;
        }
        @media (max-width: 968px) {
            width: 15rem;
            height: 15rem;
            >p{
                font-size: 1.2rem;
            }
        }
`