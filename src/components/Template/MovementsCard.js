import React from "react";
import styledComponents from "styled-components";
import { isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../UI/Input";
import Label from "../UI/Label";
import Subject from "../UI/Subject";

const StyledMovementCard = styledComponents.div`
    background-color: #C77B7F;
    border-radius: 10px;;
    padding: 5px 10px;        
    margin: 10px 0px;
    &:last-of-type{
        margin: 0px 0px; 
    }
`;

const MovementTitleContainder = styledComponents.div`
    padding: 3px 0px;
    text-align: left;
    border-bottom: 1.5px solid #fff;
    color: #fff;
    >p{ 
        font-size: 15px;
    }
`;

const MovementList = styledComponents.ul`
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

const MovementCard = ({ edit, el, movementData, setMovementData }) => {
    const key = el[0];
    const value = el[1];

    console.log(movementData);

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
        const data = new Map(movementData);
        data.set(key, {...(data.get(key)), [inputKey]: result});

        setMovementData(data);
    }

    return (
        <StyledMovementCard>
            <MovementTitleContainder>
                <Subject>{key.split("-").map(el => el.replace(el[0], char => char.toUpperCase())).join(" ")}</Subject>
            </MovementTitleContainder>
            <MovementList>
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
                                    defaultValue={movementData ? movementData.get(key)["goal"] : ""}
                                />
                                <select
                                    name={key}
                                    id={`${key}-goal-unit`}
                                    onChange={onChangeMovementData}
                                    defaultValue={movementData ? movementData.get(key)["goal-unit"] : ""}
                                >
                                    { value.unit.map((el, index) => <option key={index} value={el}>{el}</option>)}
                                </select>
                            </div>
                            :
                            <span>{`${value.goal} ${value["goal-unit"]}`}</span>
                    }
                </li>
                {
                    el && value.weight &&
                    <li>
                        <Label htmlFor={el ? `${key}-weight` : "weight"}>무게 : </Label>
                        {edit ?
                            <div>
                                {
                                    el[1].weight &&
                                    <div>
                                        <Input
                                            type="number"
                                            name={key}
                                            id={`${key}-weight`}
                                            onChange={onChangeMovementData}
                                            defaultValue={movementData ? movementData.get(key)["weight"] : 1}
                                        />
                                        <select
                                            name={key}
                                            id={`${key}-weight-unit`}
                                            onChange={onChangeMovementData}
                                            defaultValue={movementData ? movementData.get(key)["weight-unit"] : ""}
                                        >
                                            <option value="lb" name="lb">lb</option>
                                            <option value="kg" name="kg">kg</option>
                                        </select>
                                    </div>
                                }

                            </div>
                            : <span>{`${value.weight} ${value["weight-unit"]}`}</span>
                        }
                    </li>
                }
            </MovementList>
        </StyledMovementCard>
    );
}

export default MovementCard;