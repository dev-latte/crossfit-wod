import React from "react";
import { isValidateCountNumber } from "../../apis/IsValidation";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Subject from "../atoms/Subject";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

const MovementCardContainer = styled.div`
    background-color: #C77B7F;
    border-radius: 10px;;
    padding: 5px 10px;        
    margin: 10px 0px;
    &:last-of-type{
        margin: 0px 0px; 
    }
`;

const MovementTitleWrapper = styled.div`
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

const MovementWrapper = styled.ul`
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

const MovementCard = ({ index, el, edit, onClickRemove, wodDataForm, setWodDataForm }) => {
    const key = el.id;
    console.log(el, key);

    console.log("DataForm>>", wodDataForm);

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
        const data = wodDataForm.movementInfo;

        console.log(key, target);
        // data.push()
        // data.set(key, {...(data.get(key)), [inputKey]: result});

        // setMovementRecord(data);
    }

    console.log(el);

    return (
        <MovementCardContainer>
            <MovementTitleWrapper>
                    <div>
                        <Subject>{key.split("-").map(el => el.replace(el[0], char => char.toUpperCase())).join(" ")}</Subject>
                        <IoMdCloseCircleOutline data-target={`${key}-${index}`} onClick={onClickRemove}/>
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
                                    // onChange={onChangeMovementData}
                                    // defaultValue={movementRecord ? movementRecord.get(key)["goal"] : ""}
                                />
                                <select
                                    name={key}
                                    id={`${key}-goal-unit`}
                                    // onChange={onChangeMovementData}
                                    // defaultValue={movementRecord ? movementRecord.get(key)["goal-unit"] : ""}
                                >
                                    {/* { el.unit.map((el, index) => <option key={index} value={el}>{el}</option>)} */}
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
                                            // onChange={onChangeMovementData}
                                            // defaultValue={movementRecord ? movementRecord.get(key)["weight"] : 1}
                                        />
                                        <select
                                            name={key}
                                            id={`${key}-weight-unit`}
                                            // onChange={onChangeMovementData}
                                            // defaultValue={movementRecord ? movementRecord.get(key)["weight-unit"] : ""}
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