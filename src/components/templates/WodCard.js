import React, { useState } from "react";
import styled from "styled-components";


import { HiUsers, HiUserGroup } from "react-icons/hi"
import { isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import WodCardTemplate from "./WodCardTemplate";
import MovementsList from "./MovementsList";
import Button from "../atoms/Button";


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

// 기능 개발 후 렌더링 줄이는 방식(useRef)으로 변경
const WodCard = ({ wodData, setWodData, wodDataForm, setWodDataForm }) => {
    const { type, isTeam, movements } = wodData;
    const [btnClicked, setBtnClicked] = useState("users");

    const onClickTeam = (e) => {
        const userType = e.currentTarget.dataset.team;
        const userCount = userType === "users" ? 2 : 3;
        if(wodDataForm.teamOf === userCount) { return; }
        setBtnClicked(userType);
        setWodDataForm({...wodDataForm, teamOf: userCount});
    }

    const onClickRemove = (e) => {
        const key = e.currentTarget.dataset.target;
        console.log(wodData.movements);
        // const result = wodData.movements.filter(el => el.id !== key);
        // setWodData({...wodData, movements: result})
    }

    const onClickCreateWodDataForm = (e) => {
        setWodDataForm({...wodDataForm, type, isTeam})
        console.log(wodDataForm)
    }



    return (
        <WodCardTemplate title="Workout of the Day!" onClick={onClickCreateWodDataForm}>
            <div>
                <Label htmlFor="type-count">{type}</Label>
                <Input
                    type="number"
                    name="type-count"
                    id="type-count"
                    onChange={e => setWodDataForm({...wodDataForm, typeCount: isValidateCountNumber(e.target.value)})}
                    value={wodDataForm.typeCount} />
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
                <select id="level" name="level" onChange={e => setWodDataForm({...wodDataForm, level: e.target.value})} value={wodDataForm.level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                { movements.length !== 0
                    ? <MovementsList movements={movements} edit={true} onClickRemove={onClickRemove} wodDataForm={wodDataForm} setWodDataForm={setWodDataForm}/>
                    : <div>운동을 선택해주세요.</div>
                }
            </div>

        </WodCardTemplate>
    );
}

export default WodCard;