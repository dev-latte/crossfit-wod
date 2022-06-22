import React from "react";
import styledComponents from "styled-components";
import { isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../UI/Input";
import Label from "../UI/Label";
import Subject from "../UI/Subject";
import { IoMdCloseCircleOutline } from "react-icons/io";

const MovementCardContainer = styledComponents.div`
    background-color: #C77B7F;
    border-radius: 10px;;
    padding: 5px 10px;        
    margin: 10px 0px;
    &:last-of-type{
        margin: 0px 0px; 
    }
`;

const MovementTitleWrapper = styledComponents.div`
    padding: 3px 0px;
    text-align: left;
    border-bottom: 1.5px solid #fff;
    color: #fff;
    >div{
        display: flex;
        justify-content: space-between; 
        >p{ 
            font-size: 15px;
        }
        > svg{
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
`;

const MovementWrapper = styledComponents.ul`
    text-align: left;
    padding: 5px 0px 0px 15px;
    color: #fff;
    >li{
        list-style-type: square;
        padding: 3px 0px;
        >div{
            display:inline-block;
            vertical-align: middle;
        }
    }
`;

const MovementCard = ({ edit, el, movementRecord, setMovementRecord }) => {
    const key = el.id;

    console.log(movementRecord);


    // 여기부터 수정하기
    const onChangeMovementData = (e) => {
        const key = e.target.name;
        const target = e.target.id;

        let inputKey;
        if (target.includes("goal-unit")) {
            inputKey = "goal-unit";
        } else if (target.includes("goal")) {
            inputKey = "goal";
        } else if (target.includes("weight-unit")) {
            inputKey = "weight-unit";
        } else if (target.includes("weight")) {
            inputKey = "weight";
        }

        let result = isNaN(e.target.value) ? e.target.value : isValidateCountNumber(e.target.value);
        const data = new Map(movementRecord);
        data.set(key, {...(data.get(key)), [inputKey]: result});

        setMovementRecord(data);
    }

    return (
        <MovementCardContainer>
            <MovementTitleWrapper>
                    <div>
                        <Subject>{key.split("-").map(el => el.replace(el[0], char => char.toUpperCase())).join(" ")}</Subject>
                        <IoMdCloseCircleOutline onClick={e => console.log("delete")}/>
                    </div>
            </MovementTitleWrapper>
             <MovementWrapper>
                <li>
                    <Label>목표 : </Label>
                    {
                        edit
                            ?
                            <div>
                                <Input
                                    type="number"
                                    name={key}
                                    id={`${key}-goal`}
                                    min={1}
                                    width="auto"
                                    onChange={onChangeMovementData}
                                    defaultValue={movementRecord ? movementRecord.get(key)["goal"] : ""}
                                />
                                <select
                                    name={key}
                                    id={`${key}-goal-unit`}
                                    onChange={onChangeMovementData}
                                    defaultValue={movementRecord ? movementRecord.get(key)["goal-unit"] : ""}
                                >
                                    { el.unit.map((el, index) => <option key={index} value={el}>{el}</option>)}
                                </select>
                            </div>
                            :
                            <span>{`${el.goal} ${el["goal-unit"]}`}</span>
                    }
                </li>
                {
                    el?.weight &&
                    <li>
                        <Label htmlFor={el ? `${key}-weight` : "weight"}>무게 : </Label>
                        {edit ?
                            <div>
                                {
                                    el.weight &&
                                    <div>
                                        <Input
                                            type="number"
                                            name={key}
                                            id={`${key}-weight`}
                                            onChange={onChangeMovementData}
                                            defaultValue={movementRecord ? movementRecord.get(key)["weight"] : 1}
                                        />
                                        <select
                                            name={key}
                                            id={`${key}-weight-unit`}
                                            onChange={onChangeMovementData}
                                            defaultValue={movementRecord ? movementRecord.get(key)["weight-unit"] : ""}
                                        >
                                            <option value="lb" name="lb">lb</option>
                                            <option value="kg" name="kg">kg</option>
                                        </select>
                                    </div>
                                }
                            </div>
                            : <span>{`${el.weight} ${el["weight-unit"]}`}</span>
                        }
                    </li>
                }
            </MovementWrapper>
        </MovementCardContainer>
    );
}

export default MovementCard;