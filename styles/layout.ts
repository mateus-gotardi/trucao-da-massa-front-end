import styled from "styled-components";

export const Body = styled.body`
  height: 100vh;
  background-color: darkgray;
  display: flex;
  flex-direction: column;

  > header {
    background-color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  > main {
    flex: 1;
    display: flex;

    > section {
      background-color: white;
      border: 2px solid black;
      display: flex;
      flex: 1;
      padding: 1rem;
    }

    > aside {
      background-color: white;
      border: 2px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
  }

  > footer {
    background-color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;
