import React from "react";
import styledComponents from "styled-components";

const StyledCheckbox = styledComponents.input`
    margin-right: 5px;
    cursor: pointer;
`;

const Checkbox = ({ type, el, onChange, checked }) => {
    return (
        <StyledCheckbox type={type} name={el.id} id={el.id} onChange={onChange} checked={checked} value={el.name}/>
    );
}

export default Checkbox;