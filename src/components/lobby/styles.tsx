import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const LobbyStyle = styled.div<{ colors: IColorProps }>`
    background-image: url('/photos/interior.png');
    width: 100vw;
    min-height: 100vh;
    min-height: 100svh;
    max-height: fit-content;
    background-size: cover;
    background-position: top;
    display: flex;
    #joinform{
        border-radius: .8rem;
        background-color: rgba(17, 17, 17, 0.7);
        height: fit-content;
        padding: 1rem;
        color: ${({ colors }) => colors.white};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        > select, >input {
            width: 100%;
            height: 2.2rem;
            font-size: 1rem;
            border-radius: .5rem;
            padding: 0 0.5rem;
            margin-bottom: .5rem;
        }
        >label{
            font-size: 1rem;
            font-weight: 600;
            text-shadow: 1px 0px 2px ${({ colors }) => colors.black};
        }
        margin-left: 3rem;
        margin-top: 1rem;
        > button {
            width: 6rem;
            height: 3rem;
            font-weight: 700;
            background: ${({ colors }) => colors.black};
            color: ${({ colors }) => colors.white};
            border: none;
            position: relative;
            overflow: hidden;
            border-radius: 0.6em;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.5rem;
            #gradient {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                border-radius: 0.6em;
                margin-top: -0.25em;
                background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
            }

            #label {
                position: relative;
                font-size: 1.2rem;
                line-height: 0;

            }

            #transition {
                transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
                transition-duration: 500ms;
                background-color: ${({ colors }) => colors.blue};
                border-radius: 9999px;
                width: 0.1rem;
                height: 0.1rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                display: hidden;
            }
            cursor: pointer;
            :hover{
                #transition {
                    display: block;
                    transform: scale(100)
                }
            }
            :active {
                transform: scale(0.97);
            }
        }
    }
    @media (max-width: 968px) {
        flex-direction: column;
        #joinform{
            margin-left: 0;
        }
    }
`