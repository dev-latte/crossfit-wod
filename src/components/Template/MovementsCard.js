import React from "react";
import styledComponents from "styled-components";
import Subject from "../UI/Subject";

const StyledMovementCard = styledComponents.div`
    background-color: #C77B7F;
    border-radius: 10px;;
    padding: 5px 10px;        
    margin: 10px 0px;
    &:last-of-type{
        margin: 0px 0px; 
    }
`;

const MovementTitleContainder = styledComponents.div`
    padding: 3px 0px;
    text-align: left;
    border-bottom: 1.5px solid #fff;
    color: #fff;
    >p{ 
        font-size: 15px;
    }
`;

const MovementList = styledComponents.ul`
    text-align: left;
    padding: 5px 0px 0px 15px;
    color: #fff;
    >li{
        list-style-type: square;
        padding: 3px 0px;
    }
`;

const MovementCard = ({ children, name, goal, weight, edit }) => {
    return (
        <StyledMovementCard>
            <MovementTitleContainder>
                <Subject>{name}</Subject>
            </MovementTitleContainder>
            <MovementList>
                <li>
                    <span>목표 : </span>
                    <span>{goal}</span>
                </li>
                { weight !== "" && 
                <li>
                    <span>무게 : </span>
                    <span>{weight}</span>
                </li>}
            </MovementList>
        </StyledMovementCard>
    );
}

export default MovementCard;