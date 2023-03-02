import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const ButtonStyles = styled.button<{ inactive: boolean, colors:IColorProps, size: number[] }>`
  width: ${({ size }) => size[0]}rem;
  height: ${({ size }) => size[1]}rem;
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
    font-size: ${({ size }) => size[1]-2}rem;
    line-height: 0;

  }

  #transition {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 500ms;
    background-color: ${({ colors }) => colors.blue};
    border-radius: 9999px;
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  >span >svg{
    width: ${({ size }) => size[1]-0.7}rem;
    height: ${({ size }) => size[1]-0.7}rem;
  }

  ${({ inactive, size }) =>
    !inactive &&
    `
    cursor: pointer;
    :hover #transition {
      width: ${size[0]+2}rem;
      height: ${size[0]+2}rem;
    }
    :active {
      transform: scale(0.97);
    }
 `}
`;
