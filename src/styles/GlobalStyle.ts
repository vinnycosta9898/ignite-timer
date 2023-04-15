import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${props => props.theme["green-500"]};
    }

    body{
        background: ${props => props.theme["gray-900"]};
        color: ${props => props.theme["gray-300"]};
        margin: 0 10rem;
        -webkit-font-smoothing: anti-aliased;
    }

    body, button, input, textarea {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`