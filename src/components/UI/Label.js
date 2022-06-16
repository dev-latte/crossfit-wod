import React from "react";
import styledComponents from "styled-components";

const StyledLabel = styledComponents.label`
    font-family: "Karla", sans-serif;
    font-size: 15px;
    font-weight: 400;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
`;

const Label = ({ htmlFor, children}) => {
    return (
        <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
    );
}

export default Label;