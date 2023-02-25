import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const ButtonStyles = styled.button<{ inactive: boolean, colors:IColorProps, size: number[] }>`
  border: none;
  border-radius: 0.2rem;
  width: ${({size})=>size[0]}rem;
  height: ${({size})=>size[1]}rem;
  ${({ inactive }) => inactive && "opacity: 0.7;"}
  background-color: ${({colors})=>colors.blue};
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
  transition: all 0.1s ease-in-out;
  margin: .5rem;
  ${({ inactive }) =>
    !inactive &&
    `
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
    }
    &:active {
      transform: scale(1.01);
      box-shadow: 1px 1px 0px 0px rgba(0,0,0,1);
    }
 `}

  > p {
    margin: 0;
    font-size: 1rem;
  }
`;
