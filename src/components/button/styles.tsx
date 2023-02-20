import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const ButtonStyles = styled.button<{ inactive: boolean, colors:IColorProps }>`
  border: none;
  border-radius: 0.2rem;
  width: 12rem;
  height: 3.5rem;
  ${({ inactive }) => inactive && "opacity: 0.5;"}
  background-color: ${({colors})=>colors.blue};
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
  transition: all 0.1s ease-in-out;
  ${({ inactive }) =>
    !inactive &&
    `
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }
    &:active {
      transform: scale(1.01);
      box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
    }
 `}

  > p {
    margin: 0;
    font-size: 1rem;
  }
`;
