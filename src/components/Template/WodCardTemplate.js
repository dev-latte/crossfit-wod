import React from "react";
import styledComponents from "styled-components";
import Button from "../UI/Button";
import Subject from "../UI/Subject";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CardTemplateContainer = styledComponents.div`
    width: 400px;
    height: auto;
    border: 1px solid black;
    text-align: center;
`;

const CardTemplateHeader = styledComponents.div`
    width: 100%;
    height: 27px;
    border-bottom: 1px solid black;
    text-align: right;
    // padding: 2px 10px;
`;

const CardTemplateBody = styledComponents.div`
    width: 100%;
    height: auto;
    border: 1px solid salmon;
    padding: 10px;
`;

const WodCardTemplate = ({ type, title, children, onClickDelete, edit, setEdit }) => {
    return (
        <CardTemplateContainer>
            <CardTemplateHeader>
                {type === "record" && <Button width="30px" onClick={(e) => setEdit(!edit)}><AiFillEdit /></Button>}
                <Button width="30px" onClick={onClickDelete}><AiFillDelete/></Button>
            </CardTemplateHeader>
            <Subject>{title}</Subject>
            <CardTemplateBody>
                {children}
            </CardTemplateBody>
        </CardTemplateContainer>
    );
}

export default WodCardTemplate;