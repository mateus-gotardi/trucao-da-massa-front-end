import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const HiddenStyle = styled.div<{colors: IColorProps}>`
  width: 6.4rem;
  height: 9.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: -1px -1px 0px 0px rgba(0,0,0,1);
  user-select: none;
  overflow: none;
  background-color: ${({ colors }) => colors.white};
  z-index: 10;
  img {
    width: 6rem;
  }
`;
