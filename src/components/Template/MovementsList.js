import React from "react";
import styled from "styled-components";
import MovementCard from "./MovementsCard";

const MovementListTemplate = styled.div`
    padding-bottom: 10px;
    >p{
        color: #fff;
        font-weight: 700;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
        background-color: #C77B7F;
        font-family: "Karla", 'Nanum Gothic Coding';
        padding: 5px 0px;
    }
`;

const MovementsList = ({ movements, edit, movementData, setMovementData }) => {
    // console.log(movements);
    return (
        <MovementListTemplate>
            {Array.from(movements).map((el, index) =>
                <MovementCard
                    key={index}
                    name={el[1].name}
                    edit={edit}
                    el={el}
                    movementData={movementData}
                    setMovementData={setMovementData}
                />)}
        </MovementListTemplate>
    );

}

export default MovementsList;