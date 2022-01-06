import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';


const GlobalStyle = createGlobalStyle`
  ${normalize};
  *, *:before, *:after {  box-sizing: border-box; }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  

  body {
    font-family:  Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    background: white;
    color: #222222;
  }
`;

export default GlobalStyle;