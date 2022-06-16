import React from "react";
import styledComponents from "styled-components";

const StyledMovementCard = styledComponents.div`
    border: 1px solid blue;
    border-radius: 15px;;
    padding: 5px 10px;        
    margin: 5px 0px;
    >p{
        font-size: 15px;
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        margin-bottom: 5px;
    }
`;

const MovementCard = ({ children, name, goal, weight, edit }) => {
    return (
        <StyledMovementCard>
            <p>{name}</p>
            {
                edit 
                ?
                <>
                    {children}
                </>
                :
                <>
                    <span>목표 : {goal}</span>
                    { weight !== "" && <span>무게 : {weight}</span>}
                </>
                
            }
        </StyledMovementCard>
    );
}

export default MovementCard;