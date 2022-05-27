import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styledComponents from "styled-components";

const Button = styledComponents.button`
    border: none;
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const PlusBtn = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            <AiOutlinePlusCircle style={{fontSize: "30px", color: "#555"}}/>
        </Button>

    );
}

export default PlusBtn;