import React, { useLayoutEffect, useRef, useState } from "react";
import styledComponents from "styled-components";
import { selectMovementData } from "../apis/FirebaseInstance";
import WodCard from "../components/Template/WodCard";

const MovementsTemplate = styledComponents.fieldset`
    display: flex;
    flex-wrap: wrap;
    div{
        padding: 2px 5px;
    }
`;

const CreateWodCard = () => {
    const [movementList, setMovementList] = useState([]);

    const [type, setType] = useState("ft");
    const [isTeam, setIsTeam] = useState(false);
    const [selectMovements, setSelectMovements] = useState(new Set());
    const [wodData, setWodData] = useState();


    useLayoutEffect(() => {
        getMovementsData();
    }, []);

    // get wod movement list data
    const getMovementsData = () => {
        selectMovementData("crossfitMovement")
            .then(response => { 
                setMovementList(response);
             })
            .catch(err => alert(err));
    }

    const onCheckedMovement = (e) => {
        const target = e.target.name;
        const set = new Set(selectMovements);
        if(set.has(target)) {
            set.delete(target);
        } else {
            set.add(target);
        }
        setSelectMovements(set);
    }

    const createWodCard = () => {
        console.log("create");
        const movements = new Map();
        selectMovements.forEach(el => {
            for(let i = 0; i < movementList.length; i++) {
                if(el === movementList[i].id) {
                    movements.set(el, movementList[i]);
                    break;
                }
            }
        })

        // set data
        setWodData({
            "type": type === "ft" ? "For Time of" : type === "amrap" ? "AMRAP" : "Crossfit Total",
            isTeam,
            movements
        });

        // reset data
        setType("ft");
        setIsTeam(false);
        setSelectMovements(new Set());
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
                <input type="checkbox" name="team" id="team" onChange={e => setIsTeam(e.target.checked)} checked={isTeam}/>
                <label htmlFor="team">Team</label>
            </fieldset>

            <MovementsTemplate>
                <legend>Movements</legend>
                {
                    setMovementList.length !== 0 &&
                        movementList.map((el, index) => <div key={index}>
                                                            <input type="checkbox" name={el.id} id={el.id} onChange={onCheckedMovement} checked={selectMovements.has(el.id)} value={el.name}/>
                                                            <label htmlFor={el.id}>{el.name}</label>
                                                        </div>
                        )
                }
            </MovementsTemplate>
            <button onClick={createWodCard}>Create WOD CARD!</button>

            {
                wodData && <WodCard data={wodData}/>
            }

        </>
    );
}

export default CreateWodCard;