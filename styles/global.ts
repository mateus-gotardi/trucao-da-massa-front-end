import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Noto Serif Ahom', serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }
    body{
        background: rgb(0, 140, 13);
        background: radial-gradient(
            circle,
            rgba(0, 140, 13, 1) 0%,
            rgba(3, 74, 0, 1) 100%
        );
    }
`;
