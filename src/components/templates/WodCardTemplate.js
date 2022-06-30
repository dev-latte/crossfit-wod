import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Subject from "../atoms/Subject";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CardTemplateContainer = styled.div`
    width: 400px;
    height: auto;
    position: relative;
    border: 1px solid black;
    text-align: center;
`;

const CardTemplateHeader = styled.div`
    width: 100%;
    height: 28px;
    border-bottom: 1px solid black;
    text-align: right;
`;

const CardTemplateBody = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid salmon;
    padding: 10px;
`;

const CardTemplateFotter = styled.div`
    width: 100%;
    height: auto;
    display: block;
    position: absolute;
    bottom: 0;
    padding : 0 0 15px 0;
`;

const WodCardTemplate = ({ type, title, children, onClickDelete, edit, setEdit, onClick }) => {
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
            <CardTemplateFotter>
                <Button onClick={onClick}>WOD 만들기!</Button>
            </CardTemplateFotter>
        </CardTemplateContainer>
    );
}

export default WodCardTemplate;