import React from "react";
import styledComponents from "styled-components";

const LoadingContainer = styledComponents.div`
    height: 100px;
    position: relative;
    width: 100px;
    border-radius: 100%;
    &:hover {
        &.loading-1, &.loading-2{
            border-color: transparent #E45635 transparent #E45635;
        }

    }
`;


const LoadingProgress = () => {
    return (
        <LoadingContainer>
            <div className="loading-1"/>
            <div className="loading-2"/>
            <div className="loading-text">loading</div>
        </LoadingContainer>
    );
}

export default LoadingProgress;