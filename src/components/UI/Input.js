import React from "react";
import styledComponents from "styled-components";

const InputContainser = styledComponents.div`
    // border: 1px solid black;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
`;

const Input = ({ label, type, name, id, onChange, value }) => {
    return (
        <InputContainser>
            <input type={type} name={name} id={id} onChange={onChange} value={value} />
        </InputContainser>
    );
}

export default Input;