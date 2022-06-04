import React from "react";
import styledComponents from "styled-components";

const StyledButton = styledComponents.button`

`;

const Button = ({ onClick, value }) => {
    return (
        <StyledButton onClick={onClick}>{value}</StyledButton>
    );
}

export default Button;