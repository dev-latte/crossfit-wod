import React from "react";
import styledComponents from "styled-components";

const StyledInput = styledComponents.input`
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    width: ${(props) => props.width || "50px"};
    margin: 0px 5px;
`;

const Input = ({ type, name, id, onChange, value, width }) => {
    return (
        <StyledInput type={type} name={name} id={id} onChange={onChange} value={value} width={width} />
    );
}

export default Input;