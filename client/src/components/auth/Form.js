import styled from 'styled-components';

export const Container = styled.div`
    h1, h2 {
        font-weight: 200;
        margin: 0.4rem;
    }

    h1 {
        font-size: 3.5rem;
    }

    h2 {
        font-size: 2rem;
        color: #aaa;
    }

    .invalid_feedback {
    color: red;
    }

    .container {
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 400px;
        background: #FFF;
        border-radius: 10px;
        text-align: center;
        padding: 15px 0;
        margin-bottom: 34%;
    }
    
    .container span {
        display: inline-block;
        padding: 10px 0;
        font-size: 25px;
    }
    .container a {
        display: block;
        margin-top: 10px;
        text-align: right;
        color: #9FB1BC;
        font-size: 1rem;
    }
    .container a:hover {
        color: #000;
    }
    .container form {
        padding: 0 35px;
    }
    .container .input_line {
        font-family: 'Hammersmith One', sans-serif;
        width: 100%;
        padding: 10px 0;
        margin-bottom: 10px;
        border: none;
        font-size: 14px;
        border-bottom: 2px solid #9FB1BC;
    }
    .container input.is_invalid {
        border-bottom: 2px solid red;
    }
    .container .input_line:focus {
        outline: none;
        border-color: #ffbf00;
    }
    .container form label {
        display: block;
        text-align: left;
        text-transform: uppercase;
        font-size: 9px;
        margin-top: 20px;
        letter-spacing: 2px;
        color: #9FB1BC;
    }
    .container form label.is_invalid{
        color: red;
    }
    
    .container button[type="submit"] {
        width: 100%;
        font-family: 'Hammersmith One', sans-serif;
        text-transform: uppercase;
        margin-top: 30px;
        padding: 10px;
        border: 2px solid #ffbf00;
        border-radius: 5px;
        background: #ffbf00;
        color: #FFF;
        cursor: pointer;
        transition: opacity .5s;
    }
    .container button[type="submit"]:hover {
        opacity: .8;
    }
    .container form a {
        display: block;
        margin-top: 10px;
        text-align: right;
        color: #9FB1BC;
        font-size: 1rem;
    }
    .container form a:hover {
        color: #000;
    }

    @media(min-width: 1200px) {
        h1 {
        font-size: 5rem; 
        }
    }

    @media(max-width: 800px) {

        h1 {
        font-size: 3rem; 
        }
    }

    @media(max-width: 500px) {
        h1 {
        font-size: 2.5rem; 
        }

        h2 {
            font-size: 1.5rem;
        }
    }
    
`;