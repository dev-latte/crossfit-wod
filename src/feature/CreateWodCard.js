import React, { useLayoutEffect, useState } from "react";
import styledComponents from "styled-components";
import { selectMovementData } from "../apis/FirebaseInstance";

const MovementsTemplate = styledComponents.fieldset`
    display: flex;
    flex-wrap: wrap;
    div{
        padding: 2px 5px;
    }
`;

const CreateWodCard = () => {
    const [type, setType] = useState();
    const [isTeam, setIsTeam] = useState(false);
    const [movementList, setMovementList] = useState([]);


    useLayoutEffect(() => {
        getMovementsData();
    }, []);

    const getMovementsData = () => {
        selectMovementData("crossfitMovement")
            .then(response => { 
                setMovementList(response);
             })
            .catch(err => alert(err));
    }

    return (
        <>
            <fieldset>
                <legend>Carry Out</legend>
                    <select id="type" name="type" onChange={e => setType(e.target.value)} value={type}>
                        <option value="ft" defaultValue>For Time of</option>
                        <option value="amrap">AMRAP</option>
                        <option value="crosfit-total">Crossfit Total</option>
                    </select>
            </fieldset>

            <fieldset>
                <legend>Team of</legend>
                <input type="checkbox" name="team" id="team" onChange={e => setIsTeam(e.target.checked)}/>
                <label htmlFor="team">Team</label>
            </fieldset>

            <MovementsTemplate>
                <legend>Movements</legend>
                {
                    setMovementList.length !== 0 &&
                        movementList.map((el, index) => <div key={index}>
                                                            <input type="checkbox" name={el.id} id={el.id} />
                                                            <label htmlFor={el.id}>{el.name}</label>
                                                        </div>
                        )
                }
            </MovementsTemplate>
            <button>Create WOD CARD!</button>
        </>
    );
}

export default CreateWodCard;