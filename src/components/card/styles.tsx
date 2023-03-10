import styled, { css } from "styled-components";
import { IColorProps } from "utils/interfaces";

interface ICardSuitProps {
  position: "start" | "end";
}

interface ICardValueProps {
  color: string;
}

interface IMiddleProps {
  cardValue?: number;
}
interface ICardProps {
  activable?: boolean;
  colors: IColorProps;
}

export const CardStyles = styled.div<ICardProps>`
  @media (max-height: 850px) {
    zoom: 0.8;
  }
  @media (max-width: 1400px) {
    zoom: 0.8;
  }
  z-index: 2;
  width: 6.7rem;
  height: 9.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 0.5rem 0.6rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  user-select: none;
  overflow: none;
  background-color: ${({ colors }) => colors.white};
  transition: all 0.1s ease-in-out;
  ${({ activable }) =>
    activable &&
    css`
      cursor: pointer;
      &:hover {
        position: relative;
        transform: scale(1.02);
        box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.75);
      }
      &:active {
        transform: scale(1.05);
        box-shadow: 5px 7px 5px 0px rgba(0,0,0,0.75);
      }
    `}
`;

export const CardValue = styled.div<ICardValueProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
  h1 {
    font-size: 5rem;
  }

  > h2 {
    font-size: 1.75rem;
  }

  h1,
  h2 {
    color: ${({ color }) => color};
  }
`;

export const CardSuit = styled.div<ICardSuitProps>`
  width: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ position }) => `flex-${position}`};
  height: 100%;
  ${({ position }) =>
    position === "start"
      ? css`
          .side {
            margin-right: 0.5rem;
            div {
              margin-bottom: -0.5rem;
            }
          }
        `
      : css`
          .side {
            margin-left: 0.5rem;
            div {
              margin-top: -0.5rem;
            }
          }
        `};

  .side {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const MiddleCard = styled.div<IMiddleProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  ${({ cardValue }) =>
    cardValue &&
    cardValue <= 3 &&
    css`
      flex-direction: column;
    `}
  > img {
    width: 100%;
  }
`;
