import React, { useState } from "react";
import { insertData } from "../apis/FirebaseInstance";
import { isValidateCountNumber } from "../apis/IsValidation";
import PlusBtn from "../components/UI/PlusBtn";

import { AiFillDelete } from "react-icons/ai";


const MyWod = () => {
    const [wodList, setWodList] = useState([]); // 운동 정보(exerciseData) 객체의 배열

    const [type, setType] = useState("");
    const [round, setRound] = useState(0);
    const [level, setLevel] = useState("");

    const [exerciseData, setExerciseData] = useState({
        count: 0,
        exercise: "",
        weight: ""
    });
    const [weightUnit, setWeightUnit] = useState("");


    // 임시 저장한 정보를 DB에 Insert하는 함수
    const insertWod = (e) => {
        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;

        console.log('insert');
        // insertData("recordWod", data);
    }

    // 운동 정보(횟수, 운동이름, 무게)의 변화를 체크하는 함수
    const onChangeExerciseData = (e) => {
        if(!isNaN(e.target.value)) {
            e.target.value = isValidateCountNumber(e.target.value);
        }

        const name = e.target.name;
        const value = e.target.value;
        const data = {...exerciseData};
        
        if(name === "weight") {
            data.weight = `${value}${weightUnit}`;
        } else if(name === "weight-unit") {
            setWeightUnit(value);
            data.weight = isNaN(Number(data.weight)) ? `${data.weight.substring(0, data.weight.length-2)}${value}` : `${data.weight}${value}`;
        } else {
            data[name] = value;
        }

        setExerciseData(data);
    }

    // 운동 정보(횟수, 운동이름, 무게)를 임시 추가하는 함수
    const addExercise = (e) => {
        if(type === "" || level === "" || exerciseData.count < 1 || !exerciseData.exercise) {
            alert("운동 정보를 입력해주세요.");
            return;
        }

        const list = Array.from(wodList);
        list.push(exerciseData);
        setWodList(list);
    }



    return (
        <>
        <fieldset>
            <legend>Workout of the Day!</legend>
            <div>
                <label htmlFor="type">종류</label>
                <select id="type" name="type" onChange={e => setType(e.target.value)}>
                    <option value="">선택</option>
                    <option value="FT">For Time of</option>
                    <option value="AMRAP">AMRAP</option>
                </select>
                <input type="number" onChange={e => { e.target.value = isValidateCountNumber(e.target.value); setRound(e.target.value)}}/>
                { type && <span>{type === "FT" ? "Round" : "Minutes"}</span> }
            </div>
            <div>
                <label htmlFor="level">난이도</label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)}>
                    <option value="">선택</option>
                    <option value="Rxd">Rx'd</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>
            <div>
                <input type="number" name="count" onChange={onChangeExerciseData} placeholder="횟수를 입력해주세요"/>
                <input type="text" name="exercise" onChange={onChangeExerciseData} placeholder="운동 종류를 입력해주세요."/>

                <input type="number" name="weight" onChange={onChangeExerciseData} placeholder="무게를 입력해주세요."/>
                <select name="weight-unit" onChange={onChangeExerciseData}>
                    <option value="">무게</option>
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
            </div>
            <PlusBtn onClick={addExercise}></PlusBtn>
        </fieldset>
        <div>
            { wodList.length !== 0  
                && wodList.map((el, index) =>  
                                            <div key={index}>
                                                <span>{el.count}</span>
                                                <span>{el.exercise}</span>
                                                <span>{el.weight}</span>
                                            </div>
            )}
        </div>
        <button onClick={insertWod}>기록하기!</button>
        </>
    );
}

export default MyWod;