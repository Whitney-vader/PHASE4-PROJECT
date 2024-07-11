import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Global Typography */
  body {
    font-family: 'Roboto', sans-serif; /* Example font */
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  /* Common Layout Styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Button Styles */
  .button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    border: none;
    border-radius: 4px;
    background-color: #007bff; /* Example primary color */
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Darker shade on hover */
    }
  }
`;

export default GlobalStyle;
