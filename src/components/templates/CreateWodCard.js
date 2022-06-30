import React, {useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import styled from "styled-components";
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
const CreateWodCard = ({ wodData, setWodData, movementList, wodDataForm, setWodDataForm }) => {
    const [type, setType] = useState("ft");
    const [isTeam, setIsTeam] = useState(false);



    // 같은 아이템 추가 가능
    // 같은 아이템(운동)을 어떻게 구별 할 것인지에 대한 고민이 필요함 > 삭제 / 수정등에 사용될 예정
    // 현재는 아이디나 index로 구별중임... 그치만 프론트에서 설정하는 것으로 유동적인 측면이 있어서 id로는 적합하지 않은듯?
    // 데이터 수정 고려해보기
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

        const movement = movementList.filter(el => el.id === e.currentTarget.dataset.movement).pop();
        const list = wodData["movements"];
        list.push(movement);
        setWodData({ ...wodData, movements: list });

        const movementInfo = wodDataForm.movementInfo;
        const defaultMovementInfo = {
            id: `${movement.id}-${movementInfo.length}`,
            goal: "",
            "goal-unit": movement.unit[0],
            weight: movement.weight,
            "weight-unit": "LB"
        }
        movementInfo.push(defaultMovementInfo);
        setWodDataForm({...wodDataForm, movementInfo});
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
        </CreateWodContainer>
    );
}

export default CreateWodCard;