import React from "react";
import styledComponents from "styled-components";

const StyledButton = styledComponents.button`
    padding: 5px 10px;
    border: none;
    color: #fff;
    font-family: "Karla", sans-serif;
    background-color: #23272b;
    width: 250px;
`;

const Button = ({ onClick, children }) => {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    );
}

export default Button;