import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { insertData } from "../apis/FirebaseInstance";
import PlusBtn from "../components/UI/PlusBtn";

const MyWod = () => {
    const [type, setType] = useState("");
    const [level, setLevel] = useState("");
    const [exerciseData, setExerciseData] = useState({
        count: 0,
        exercise: "",
        weight: ""
    });

    const [wodList, setWodList] = useState([]); // 운동 정보(exerciseData) 객체의 배열

    // 임시 저장한 정보를 DB에 Insert하는 함수
    const insertWod = (e) => {


        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;
        console.log(date)
        // eslint-disable-next-line no-undef
        // new Wod(type, level, wodList, new Date());

        console.log('insert');
        // insertData("recordWod", data);
    }

    // 운동 정보(횟수, 운동이름, 무게)의 변화를 체크하는 함수
    const onChangeExerciseData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = {...exerciseData};
        
        if(name === "weight-unit" && value !== "") {
            data.weight = `${data.weight.split(" ")[0]} ${value}`;
        } else if(name === "weight") {
            // 여기부터 작성하기 > 무게 단위까지 작성 후, 무게를 변경하면 무게 단위가 사라지는 현상처리
            data.weight = `${value}`;
        } else {
            data[name] = value;
        }

        setExerciseData(data);
    }


    // 운동 정보(횟수, 운동이름, 무게)를 임시 추가하는 함수
    const addExercise = (e) => {
        if(type === "" || level === "") {
            alert("운동 정보를 입력해주세요.");
            return;
        }

        console.log(exerciseData);
        // const wod = new Wod(type, level);

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
                <input type="number" />
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
            
            내용이 추가되는 필드

        </div>
        <button onClick={insertWod}>기록하기!</button>
        </>
    );
}

export default MyWod;