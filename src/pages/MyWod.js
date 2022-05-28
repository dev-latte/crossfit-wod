import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { insertData } from "../apis/FirebaseInstance";
import PlusBtn from "../components/UI/PlusBtn";

const MyWod = () => {
    const [type, setType] = useState("");
    const [wodList, setWodList] = useState([]);
    const [count, setCount] = useState(0);
    const [exercise, setExercise] = useState("");
    const [weight, setWeight] = useState(0);
    const [weightUnit, setWeightUnit] = useState("");
    // const [data, setData] = useState();

    const insertWod = (e) => {
        if(count === 0 || exercise === "") {
            alert("운동 정보를 입력해주세요.");
            return;
        }

        console.log('insert');
        const data = {
            count, 
            exercise, 
            weight: `${weight}${weightUnit}`
        }
        // insertData("recordWod", data);
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
                <select id="level" name="level" onChange={e => console.log(e.target.value)}>
                    <option value="">선택</option>
                    <option value="Rxd">Rx'd</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>
            <div>
                <input type="number" onChange={e => setCount(e.target.value)} placeholder="횟수를 입력해주세요"/>
                <input type="text" onChange={e => setExercise(e.target.value)} placeholder="운동 종류를 입력해주세요."/>

                <input type="number" onChange={e => setWeight(e.target.value)} placeholder="무게를 입력해주세요."/>
                <select name="weight" onChange={e => setWeightUnit(e.target.value)}>
                    <option value="">무게</option>
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
            </div>
            <button>추가</button>
        </fieldset>
        <div>
            
            내용이 추가되는 필드

        </div>
        <button onClick={insertWod}>기록하기!</button>
        </>
    );
}

export default MyWod;