import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";


import { HiUsers, HiUserGroup } from "react-icons/hi"
import { isNull, isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import WodCardTemplate from "./WodCardTemplate";
import MovementsList from "./MovementsList";


const TeamCategoriesWrapper = styled.div`
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



const WodCard = ({ wodData, setWodData }) => {
    const { type, isTeam, movements } = wodData;
    const [typeCount, setTypeCount] = useState("");
    const [teamOf, setTeamOf] = useState(false);
    const [level, setLevel] = useState("rxd");
    const [btnClicked, setBtnClicked] = useState("users");
    const [movementRecord, setMovementRecord] = useState();

    console.log(movements);
    // movementRecord에 값이 
    // useEffect(() => {
    //     console.log(movements);
    //     const map = new Map();
    //     movements.forEach((el, index) => {
    //         const key = el.id;
    //         map.set(key, {
    //             index,
    //             goal: "",
    //             "goal-unit": el.unit[0],
    //             weight: false,
    //             "weight-unit": "lb"
    //         });
    //     });
    //     setMovementRecord(map);
    // }, [movements]);


    const onClickTeam = (e) => {
        const userType = e.currentTarget.dataset.team;
        const userCount = userType === "users" ? 2 : 3;
        setBtnClicked(userType);
        setTeamOf(userCount);
    }

    console.log(movementRecord);

    const onClickRemove = (e) => {
        const key = e.currentTarget.dataset.target;
        const result = movements.filter(el => el.id !== key);
        setWodData({...wodData, movements: result})
    }



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
                <TeamCategoriesWrapper>
                    <Label>Team of</Label>
                    <ul>
                        <li onClick={onClickTeam} data-team="users" className={btnClicked === "users" ? "clicked" : ""}>
                            <HiUsers />
                        </li>
                        <li onClick={onClickTeam} data-team="group" className={btnClicked === "group" ? "clicked" : ""}>
                            <HiUserGroup />
                        </li>
                    </ul>
                </TeamCategoriesWrapper>
            }
            <div>
                <Label htmlFor="level">난이도</Label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {/* 운동 종류 및 체크 단위부터 시작 */}
                { movements.size !== 0
                    && <MovementsList movements={movements} edit={true} movementRecord={movementRecord} setMovementRecord={setMovementRecord} onClickRemove={onClickRemove}/>
                }

                {/* <div>
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
                            <input type="number" name="minutes" id="minutes" onChange={onChangeRecord} />분
                            <input type="number" name="second" id="second" onChange={onChangeRecord} />초
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
                </div> */}
            </div>

        </WodCardTemplate>
    );
}

export default WodCard;