import React, { useState } from "react";
import styledComponents from "styled-components";
import Button from "../atoms/Button";

import { HiUsers, HiUserGroup } from "react-icons/hi"
import { isNull, isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../UI/Input";
import Label from "../UI/Label";
import WodCardTemplate from "./WodCardTemplate";
import MovementsList from "./MovementsList";
import { mapToObject } from "../../apis/FirebaseInstance";
import { useLayoutEffect } from "react";


const StyledTeamCategories = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px;
    >ul{
        display:flex;
        margin-left: 5px;
        >li {
            display:flex;
            align-items: center;
            justify-content: center;
            margin: 0px 0px 0px 5px;
            width: 50px;
            height: 25px;
            border: 1px solid salmon;
            border-radius: 6px;
            &.clicked {
                background-color: salmon;
                color: #fff;
            }
        }
    }
`;



const WodCard = ({ data, insertWod }) => {
    const { type, isTeam, movements } = data;
    const [teamOf, setTeamOf] = useState(false);
    const [typeCount, setTypeCount] = useState("");
    const [level, setLevel] = useState("rxd");
    
    const map = new Map();
    let i = 0;
    movements.forEach((value, key) => {
        i++;
        map.set(key, {
            index: i,
            goal: "",
            "goal-unit": value.unit[0],
            weight: false,
            "weight-unit": "lb"
        })
    });
    
    const [movementData, setMovementData] = useState(map); // record
    const [recordData, setRecordData] = useState("");
    const [complete, setComplete] = useState("");
    const [btnClicked, setBtnClicked] = useState("users");

    const onChangeRecord = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        if (target === "minutes") {
            setRecordData({ ...recordData, min: value });
            return;
        }

        // ?????? ?????? 60?????? ?????? ????????? ??????????????? ??????
        if (target === "second") {
            setRecordData({ ...recordData, sec: value });
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
            movements: Object.fromEntries(movementData),
            record,
            deleted: false
        }

        console.log(data);

        // CreateWodCard.js ??? ?????? ??????
        insertWod(data);
    }


    const checkedButton = (e) => {
        const userType = e.currentTarget.dataset.team;
        const userCount = userType === "users" ? 2 : 3;
        setBtnClicked(userType);
        setTeamOf(userCount);
    }

    // Crossfit Total ?????? ????????? ?????? ???????????? ????????? ????????? ??????, ????????? ???????????? ??????
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
                <StyledTeamCategories>
                    <Label>Team of</Label>
                    <ul>
                        <li onClick={checkedButton} data-team="users" className={btnClicked === "users" ? "clicked" : ""}>
                            <HiUsers />
                        </li>
                        <li onClick={checkedButton} data-team="group" className={btnClicked === "group" ? "clicked" : ""}>
                            <HiUserGroup />
                        </li>
                    </ul>
                </StyledTeamCategories>
            }
            <div>
                <Label htmlFor="level">?????????</Label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {/* ?????? ?????? ??? ?????? ???????????? ?????? */}
                { movementData.size !== 0
                    && <MovementsList movements={movements} edit={true} movementData={movementData} setMovementData={setMovementData} />
                }

                <div>
                    {
                        <>
                            <p>Did you go the distance?</p>
                            <div>
                                <input type="radio" name="complete" id="yes" value="yes" checked={complete === "yes"} onChange={e => setComplete(e.target.value)} />
                                <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div>
                                <input type="radio" name="complete" id="no" value="no" checked={complete === "no"} onChange={e => setComplete(e.target.value)} />
                                <Label htmlFor="no">No</Label>
                            </div>
                        </>
                    }
                    <p>Record WOD</p>
                    {
                        complete === "yes" && type === "For Time of" &&
                        <>
                            <input type="number" name="minutes" id="minutes" onChange={onChangeRecord} />???
                            <input type="number" name="second" id="second" onChange={onChangeRecord} />???
                        </>
                    }
                    {
                        complete === "yes" && type !== "For Time of" &&
                        <><input type="number" name="round" id="round" onChange={onChangeRecord} /><span>Round</span></>
                    }
                    {
                        complete === "no"
                        && <input type="text" name="result" id="result" onChange={onChangeRecord} />
                    }
                </div>
            </div>
            <Button onClick={createMovementData}>??????</Button>
        </WodCardTemplate>
    );
}

export default WodCard;