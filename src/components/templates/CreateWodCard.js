import React, {useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import styled from "styled-components";
import { isNull } from "../../apis/IsValidation";
import Subject from "../atoms/Subject";
import Checkbox from "../atoms/Checkbox";
import Label from "../atoms/Label";

const CreateWodContainer = styled.div`
    width: calc(100% - 400px - 50px);
    text-align: center;
    border: 1px solid #ccc;
`;

const MovementsWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
    padding: 10px;
    >li {
        display: flex;
        align-items: center;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        margin: 0px 0px 5px 5px;
        font-family: "Karla", monospace;
        font-size: 15px;
        font-weight: 400;
        cursor: pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        svg {
            margin-right: 3px;
        }
        &:hover {
            background-color: #ccc;
            color: #fff;
            transition: .5s;
        }
    }
`;

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid salmon;
    width: 100%;
    margin: 10px 0px;
    padding: 5px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius : 6px;
    margin: 1px;
`;

// 관리자 페이지와 회원 페이지를 분리할 것
const CreateWodCard = ({ wodData, setWodData, movementList }) => {
    const [type, setType] = useState("ft");
    const [isTeam, setIsTeam] = useState(false);

    const addWodData = (e) => {
        const id = e.target.id;

        if(id === "type") {
            setType(e.target.value);
            const type = e.target.value === "ft" ? "For Time of" : "AMRAP";
            setWodData({ ...wodData, type });
            return;
        }

        if(id === "team") {
            setIsTeam(e.target.checked);
            setWodData({ ...wodData, isTeam: e.target.checked });
            return;
        }

        const movements = wodData["movements"];
        movements.push(movementList.filter(el => el.id === e.currentTarget.dataset.movement).pop());
        setWodData({ ...wodData, movements });
    }


    // const onCheckedMovement = (e) => {
    //     const target = e.target.name;
    //     const set = new Set(selectMovements);
    //     if(set.has(target)) {
    //         set.delete(target);
    //     } else {
    //         set.add(target);
    //     }
    //     setSelectMovements(set);
    // }

    // const createWodCard = () => {
    //     console.log("create");
    //     const movements = new Map();
    //     selectMovements.forEach(el => {
    //         for(let i = 0; i < movementList.length; i++) {
    //             if(el === movementList[i].id) {
    //                 movements.set(el, movementList[i]);
    //                 break;
    //             }
    //         }
    //     })

    //     // set data
    //     setWodData({
    //         "type": type === "ft" ? "For Time of" : type === "amrap" ? "AMRAP" : "Crossfit Total",
    //         isTeam,
    //         movements
    //     });

    //     // reset data
    //     setType("ft");
    //     setIsTeam(false);
    //     setSelectMovements(new Set());
    // }

    // WodCard.js 에서 사용되는 함수
    // const insertWod = (data) => {
    //     if(isNull(data)) {
    //         alert("데이터가 존재하지 않습니다.");
    //         return;
    //     }

    //     const dateInstance = new Date();
    //     const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;

    //     insertData("recordWod", `uid-${date}`, data)
    //         .then(el => {
    //             alert("WOD 기록이 완료되었습니다. 수고하셨습니다!");
    //             setWodData();
    //         });
    // }

    

    return (
        <CreateWodContainer>
            <CategoryWrapper>
                <Subject>Today is...</Subject>
                <select id="type" name="type" onChange={addWodData} value={type}>
                    <option value="ft" defaultValue>For Time of</option>
                    <option value="amrap">AMRAP</option>
                    {/* <option value="crosfit-total">Crossfit Total</option> */}
                </select>
            </CategoryWrapper>
            <CategoryWrapper>
                <Subject>Team of</Subject>
                <CheckboxWrapper>
                    <Checkbox type="checkbox" id="team" el={{name: "team", id: "team"}} onChange={addWodData} checked={isTeam}/>
                    <Label htmlFor="team">Team</Label>
                </CheckboxWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <Subject>Movements</Subject>
                <MovementsWrapper>
                    {
                        movementList.length !== 0 
                            && movementList.map((el, index) =>
                                <li key={index} data-movement={el.id} onClick={addWodData}><AiOutlinePlusSquare/>{el.name}</li>
                        )
                    }
                </MovementsWrapper>
            </CategoryWrapper>
            
            {/* <Button onClick={createWodCard}>Create WOD CARD!</Button> */}
            {/* 첫 페이지의 선택 항목들 */}
            {/* { wodData && <WodCard data={wodData} insertWod={insertWod}/> } */}
        </CreateWodContainer>
    );
}

export default CreateWodCard;