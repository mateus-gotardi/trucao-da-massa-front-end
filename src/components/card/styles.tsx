import styled from "styled-components";

interface ICardSuitProps {
  position: "start" | "end";
}

interface ICardValueProps {
  color: string;
}

export const CardStyles = styled.div`
  width: 10rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.75);
  user-select: none;
  overflow: none;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

export const CardValue = styled.div<ICardValueProps>`
  display: flex;
  align-items: center;
  flex: 1;

  > h1 {
    font-size: 5rem;
  }

  > h2 {
    font-size: 1.75rem;
  }

  > h1,
  h2 {
    color: ${({ color }) => color};
  }
`;

export const CardSuit = styled.div<ICardSuitProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ position }) => `flex-${position}`};
  padding: 0.5rem 0;
`;
