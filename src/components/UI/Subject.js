import React from "react";
import styledComponents from "styled-components";

const StyledSpan = styledComponents.span`
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Subject = ({ children }) => {
    return (
        <StyledSpan>{children}</StyledSpan>
    )   
}

export default Subject;