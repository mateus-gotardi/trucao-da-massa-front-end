import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const HomeStyle = styled.div<{ colors: IColorProps }>`
    background-image: url('/photos/interior.png');
    width: 100vw;
    height: 100vh;
    height: 100svh;
    background-size: cover;
    background-position: top;
    color: ${({ colors }) => colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 2rem;
        border-radius: .8rem;
        background-color: rgba(17, 17, 17, 0.7);
    }
    h1{
        font-size: 2rem;
        text-align: center;
    }
    h2{
        font-size: 1.5rem;
        text-align: center;
    }
    p{
        font-size: 1rem;
        text-align: center;
    }
    a{
        color: ${({ colors }) => colors.red};
        text-decoration: none;
    }
    >footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        background-color: ${({ colors }) => colors.black};
        display: flex;
        align-items: center;
        justify-content: center;
        h4{
            font-size: .8rem;
        }
    }
    @media (max-width: 968px) {
        padding: 1rem;
        h1{
            font-size: 1.5rem;
        }
        h2{
            font-size: 1.2rem;
        }
        p{
            font-size: .8rem;
        }
    }
`