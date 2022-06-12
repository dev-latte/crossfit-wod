import React from "react";
import styledComponents from "styled-components";

const CheckboxContainer = styledComponents.div`
    display: flex;
    align-items: center;
    border-radius : 6px;
    margin: 1px;
    >input[type="checkbox"] {
        margin-right: 5px;
        cursor: pointer;
    }
    >label {
        font-family: "Karla", sans-serif;
        font-size: 15px;
        font-weight: 400;
        cursor: pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
`;

const Checkbox = ({ key, type, el, onChange, checked }) => {
    return (
        <CheckboxContainer key={key}>
            <input type={type} name={el.id} id={el.id} onChange={onChange} checked={checked} value={el.name}/>
            <label htmlFor={el.id}>{el.name}</label>
        </CheckboxContainer>
    );
}

export default Checkbox;