import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";
import Button from "../UI/Button";

import { HiUsers, HiUserGroup } from "react-icons/hi"
import { isNull, isValidateCountNumber } from "../../apis/IsValidation";

const StyledWodCard = styledComponents.div`
    width: 350px;
    height: auto;
    border: 1px solid black;
    border-radius: 16px;
    padding: 10px;
`;

const StyledMovementBox = styledComponents.div`
    border: 1px solid black;
    margin: 5px 5px;
    padding-bottom: 10px;
`;

const WodCard = ({ data }) => {
    const {type, isTeam, movements} = data;
    const [teamOf, setTeamOf] = useState();
    const [typeCount, setTypeCount] = useState(1);
    const [level, setLevel] = useState("rxd");

    const movementDataDefault = {};
    movements.forEach((value, key) => movementDataDefault[key] = {
        goal: 1,
        "goal-unit": value.unit[0],
        weight: 1,
        "weight-unit": "lb"
    });

    const [movementData, setMovementData] = useState(movementDataDefault);
    const [recordData, setRecordData] = useState({});   // wod 기록

    const test = () => {


        if(isTeam && isNull(teamOf)) {
            alert("인원을 선택해주세요");
            return;
        }

        if(isNull(typeCount)) {
            alert("와드 정보를 입력해주세요.");
        }


        // 내일은 와드 기록 insert부터 작업하기
        console.log(type, teamOf, typeCount, level, teamOf);
    }

    const onChangeMovementData = (e) => {
        //원하는 데이터 map / key = movement id / value = { goal, goal-unit, weight, weight-unit }
        const key = e.target.name;
        const target = e.target.id;
        console.log(e.target.name);
        console.log(movementData);

        let inputKey;
        
        if(target.includes("goal-unit")){
            inputKey = "goal-unit";
        } else if(target.includes("goal")){
            inputKey = "goal";
        } else if(target.includes("weight-unit")) {
            inputKey = "weight-unit";
        } 
        else if(target.includes("weight")) {
            inputKey = "weight";
        }

        let result = isNaN(e.target.value) ? e.target.value : isValidateCountNumber(e.target.value);

        const data = {...movementData, [key]: {...movementData[key], [inputKey]: result}};
        setMovementData(data);
    }

    const createMovementData = (e) => {
        console.log(type, isTeam, typeCount, level, movementData);

    }

    // Crossfit Total 같은 경우는 다른 방식으로 카드를 보여줄 예정, 지금은 신경쓰지 않기
    return (
        <StyledWodCard>
            <p>Workout of the Day!</p>
            <div>
                <label htmlFor="type-count">{type}</label>
                <input 
                    type="number" 
                    name="type-count" 
                    id="type-count" 
                    onChange={e => setTypeCount(isValidateCountNumber(e.target.value))}
                    value={typeCount}/>
                {type === "For Time of" ? "Round" : "Minute"}
            </div>
            {
                isTeam && 
                        <div>
                            <label htmlFor="team-of">Team of </label>
                            <button onClick={e => setTeamOf(2)}><HiUsers/></button>
                            <button onClick={e => setTeamOf(3)}><HiUserGroup/></button>
                        </div>
            }
            <div>
                <label htmlFor="level">난이도</label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {/* 운동 종류 및 체크 단위부터 시작 */}
                { Array.from(movements).map((el, index) =>  <StyledMovementBox key={index}> 
                                                                <h4>{el[1].name}</h4>
                                                                <div>
                                                                    <label htmlFor={`${el[1].id}-goal`}>Goal</label>
                                                                    <input 
                                                                        type="number" 
                                                                        name={el[1].id} 
                                                                        id={`${el[1].id}-goal`}
                                                                        min={1}
                                                                        onChange={onChangeMovementData} 
                                                                        value={movementData ? movementData[el[1].id]["goal"] : 1}
                                                                    />
                                                                    <select 
                                                                        name={el[1].id} 
                                                                        id={`${el[1].id}-goal-unit`} 
                                                                        onChange={onChangeMovementData} 
                                                                        value={movementData ? movementData[el[1].id]["goal-unit"] : ""}
                                                                    >
                                                                        {el[1].unit.map((el, index) => <option key={index} value={el}>{el}</option>)}
                                                                    </select>
                                                                </div>
                                                                {
                                                                    el[1].weight &&
                                                                        <div>
                                                                            <label htmlFor={`${el[1].id}-weight`}>Weight</label>
                                                                            <input 
                                                                                type="number" 
                                                                                name={el[1].id} 
                                                                                id={`${el[1].id}-weight`}
                                                                                onChange={onChangeMovementData}
                                                                                value={movementData ? movementData[el[1].id]["weight"] : 1}
                                                                            />
                                                                            <select 
                                                                                name={el[1].id}
                                                                                id={`${el[1].id}-weight-unit`}
                                                                                onChange={onChangeMovementData}
                                                                                value={movementData ? movementData[el[1].id]["weight-unit"] : ""}
                                                                            >
                                                                                <option value="lb" name="lb">lb</option>
                                                                                <option value="kg" name="kg">kg</option>
                                                                            </select>
                                                                        </div>
                                                                }
                                                            </StyledMovementBox>
                )}
                <div>
                    <label htmlFor={type === "For Time of" ? "minutes" : "round"}>Record WOD</label>
                    {
                        type === "For Time of" 
                            ? <><input type="number" name="minutes" id="minutes" />:<input type="number" name="second" id="second" /></>
                            : <><input type="number" name="round" id="round" /><span>Round</span></>
                    }
                </div>
            </div>
            <Button onClick={createMovementData} value="등록"/>
        </StyledWodCard>
    );
}

export default WodCard;