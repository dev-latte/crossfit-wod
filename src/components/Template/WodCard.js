import React, { useState } from "react";
import styledComponents from "styled-components";
import Button from "../UI/Button";

import { HiUsers, HiUserGroup } from "react-icons/hi"
import { isNull, isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../UI/Input";
import Label from "../UI/Label";
import WodCardTemplate from "./WodCardTemplate";
import MovementCard from "./MovementsCard";

// const StyledMovementBox = styledComponents.div`
//     // border: 1px solid black;
//     padding-bottom: 10px;
// `;

const WodCard = ({ data, insertWod }) => {
    const {type, isTeam, movements} = data;
    const [teamOf, setTeamOf] = useState(false);
    const [typeCount, setTypeCount] = useState("");
    const [level, setLevel] = useState("rxd");

    const movementDataDefault = {};
    movements.forEach((value, key) => movementDataDefault[key] = {
        goal: "",
        "goal-unit": value.unit[0],
        weight: false,
        "weight-unit": "lb"
    });

    const [movementData, setMovementData] = useState(movementDataDefault);
    const [recordData, setRecordData] = useState("");
    const [complete, setComplete] = useState("");

    const onChangeMovementData = (e) => {
        const key = e.target.name;
        const target = e.target.id;

        let inputKey;        
        if(target.includes("goal-unit")){
            inputKey = "goal-unit";
        } else if(target.includes("goal")){
            inputKey = "goal";
        } else if(target.includes("weight-unit")) {
            inputKey = "weight-unit";
        } else if(target.includes("weight")) {
            inputKey = "weight";
        }

        let result = isNaN(e.target.value) ? e.target.value : isValidateCountNumber(e.target.value);

        const data = {...movementData, [key]: {...movementData[key], [inputKey]: result}};
        setMovementData(data);
    }

    const onChangeRecord = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        if(target === "minutes") {
            setRecordData({...recordData, min: value});
            return;
        }

        // 초의 경우 60초를 넘는 입력은 불가하도록 추가
        if(target === "second") {
            setRecordData({...recordData, sec: value});
            return;
        }

        setRecordData(value);
    }

    const createMovementData = (e) => {
        const count = `${typeCount} ${type === "For Time of" ? "Round" : "Minute"}`;
        const record = !isNull(recordData.min) ? `${recordData.min}:${recordData.sec}` : recordData; 

        const data = {
            type,
            count,
            teamOf,
            level,
            complete,
            movements: movementData,
            record,
            deleted: false
        }

        // CreateWodCard.js 에 있는 함수
        insertWod(data);
    }

    // Crossfit Total 같은 경우는 다른 방식으로 카드를 보여줄 예정, 지금은 신경쓰지 않기
    return (
        <WodCardTemplate title="Workout of the Day!">
            <div>
                <Label htmlFor="type-count">{type}</Label>
                <Input
                    type="number" 
                    name="type-count" 
                    id="type-count" 
                    onChange={e => setTypeCount(isValidateCountNumber(e.target.value))}
                    value={typeCount} />
                <span>{type === "For Time of" ? "Round" : "Minute"}</span>
            </div>
            {
                isTeam &&
                        <div>
                            <Label htmlFor="team-of">Team of </Label>
                            <button onClick={e => setTeamOf(2)}><HiUsers/></button>
                            <button onClick={e => setTeamOf(3)}><HiUserGroup/></button>
                        </div>
            }
            <div>
                <Label htmlFor="level">난이도</Label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {/* 운동 종류 및 체크 단위부터 시작 */}
                { Array.from(movements).map((el, index) =>  <MovementCard key={index} name={el[1].name} edit={true}> 
                                                                <div>
                                                                    <Label htmlFor={`${el[1].id}-goal`}>count</Label>
                                                                    <input 
                                                                        type="number" 
                                                                        name={el[1].id} 
                                                                        id={`${el[1].id}-goal`}
                                                                        min={1}
                                                                        onChange={onChangeMovementData} 
                                                                        value={movementData ? movementData[el[1].id]["goal"] : ""}
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
                                                                            <Label htmlFor={`${el[1].id}-weight`}>Weight</Label>
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
                                                            </MovementCard>
                )}
                <div>
                    {
                        <>
                            <p>Did you go the distance?</p>
                            <div>
                                <input type="radio" name="complete" id="yes" value="yes" checked={complete === "yes"} onChange={e => setComplete(e.target.value)}/>
                                <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div>
                                <input type="radio" name="complete" id="no" value="no" checked={complete === "no"} onChange={e => setComplete(e.target.value)}/>
                                <Label htmlFor="no">No</Label>
                            </div>
                        </>
                    }
                    <p>Record WOD</p>
                    {
                        complete === "yes" && type === "For Time of" &&
                            <>
                                <input type="number" name="minutes" id="minutes" onChange={onChangeRecord}/>분
                                <input type="number" name="second" id="second" onChange={onChangeRecord}/>초
                            </>
                    }
                    {
                        complete === "yes" && type !== "For Time of" &&
                            <><input type="number" name="round" id="round" onChange={onChangeRecord}/><span>Round</span></>
                    }
                    {
                        complete === "no" 
                            && <input type="text" name="result" id="result" onChange={onChangeRecord}/>
                    }
                </div>
            </div>
            <Button onClick={createMovementData}>등록</Button>
        </WodCardTemplate>
    );
}

export default WodCard;