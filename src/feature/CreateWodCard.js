import React, { useLayoutEffect, useState } from "react";
import styledComponents from "styled-components";
import { insertData, selectMovementData } from "../apis/FirebaseInstance";
import { isNull } from "../apis/IsValidation";
import WodCard from "../components/Template/WodCard";
import Button from "../components/UI/Button";
import Checkbox from "../components/UI/Checkbox";
import Label from "../components/UI/Label";
import Subject from "../components/UI/Subject";

const MovementsTemplate = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
    padding: 10px 5px;
    div{
        padding: 2px 5px;
    }
`;

const CategoryContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid salmon;
    width: 100%;
    margin: 10px 0px;
    padding: 5px;
`;

const CheckboxContainer = styledComponents.div`
    display: flex;
    align-items: center;
    border-radius : 6px;
    margin: 1px;
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
        console.log('movements');
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

    // WodCard.js 에서 사용되는 함수
    const insertWod = (data) => {
        if(isNull(data)) {
            alert("데이터가 존재하지 않습니다.");
            return;
        }

        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;

        insertData("recordWod", `uid-${date}`, data)
            .then(el => {
                alert("WOD 기록이 완료되었습니다. 수고하셨습니다!");
                setWodData();
            });
    }

    return (
        <>
            <CategoryContainer>
                <Subject>Today is...</Subject>
                <select id="type" name="type" onChange={e => setType(e.target.value)} value={type}>
                    <option value="ft" defaultValue>For Time of</option>
                    <option value="amrap">AMRAP</option>
                    <option value="crosfit-total">Crossfit Total</option>
                </select>
            </CategoryContainer>
            <CategoryContainer>
                <Subject>Team of</Subject>
                <CheckboxContainer>
                    <Checkbox type="checkbox" el={{name: "team", id: "team"}} onChange={e => setIsTeam(e.target.checked)} checked={isTeam}/>
                    <Label htmlFor="team">Team</Label>
                </CheckboxContainer>
            </CategoryContainer>
            <CategoryContainer>
                <Subject>Movements</Subject>
                <MovementsTemplate>
                    {
                        setMovementList.length !== 0 
                            && movementList.map((el, index) =>
                            <CheckboxContainer key={index}>
                                <Checkbox type="checkbox" el={el} onChange={onCheckedMovement} checked={selectMovements.has(el.id)} />
                                <Label htmlFor={el.id}>{el.name}</Label>
                            </CheckboxContainer>
                        )
                    }
                </MovementsTemplate>
            </CategoryContainer>
            <Button onClick={createWodCard}>Create WOD CARD!</Button>
            {/* 첫 페이지의 선택 항목들 */}
            { wodData && <WodCard data={wodData} insertWod={insertWod}/> }
        </>
    );
}

export default CreateWodCard;