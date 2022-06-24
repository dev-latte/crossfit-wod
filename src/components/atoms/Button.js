import React from "react";
import styledComponents from "styled-components";

const StyledButton = styledComponents.button`
    width: ${(props) => props.width || "250px"};
    border: none;
    background-color: #23272b;
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
`;

const Button = ({ onClick, children, width }) => {
    return (
        <StyledButton onClick={onClick} width={width}>{children}</StyledButton>
    );
}

export default Button;