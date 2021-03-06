import React from "react";
import styled from "styled-components";
import MovementCard from "./MovementsCard";

const MovementListTemplate = styled.div`
    padding-bottom: 10px;
    margin-top: 10px;
    >p{
        color: #fff;
        font-weight: 700;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
        background-color: #C77B7F;
        font-family: "Karla", 'Nanum Gothic Coding';
        padding: 5px 0px;
    }
`;

const MovementsList = ({ movements, edit, onClickRemove, wodDataForm, setWodDataForm }) => {
    return (
        <MovementListTemplate>
            { movements.map((el, index) =>
                <MovementCard
                    key={`${el.id}-${index}`}
                    index={index}
                    el={el}
                    edit={edit}
                    onClickRemove={onClickRemove}
                    wodDataForm={wodDataForm}
                    setWodDataForm={setWodDataForm}
                />
            )}
        </MovementListTemplate>
    );

}

export default MovementsList;