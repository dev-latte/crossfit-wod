import React from "react";
import styledComponents from "styled-components";

const StyledSubject = styledComponents.p`
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Subject = ({ children }) => {
    return (
        <StyledSubject>{children}</StyledSubject>
    )   
}

export default Subject;