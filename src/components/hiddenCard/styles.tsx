import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const HiddenStyle = styled.div<{colors: IColorProps}>`
  @media (max-height: 850px) {
    zoom: 0.8;
  }
  @media (max-width: 1400px) {
    zoom: 0.8;
  }
  width: 6.7rem;
  height: 9.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: -1px -1px 0px 0px rgba(0,0,0,1);
  user-select: none;
  overflow: hidden;
  background-color: ${({ colors }) => colors.white};
  z-index: 10;
  img {
    width: 6.7rem;
    height: 9.6rem;
  }
`;
