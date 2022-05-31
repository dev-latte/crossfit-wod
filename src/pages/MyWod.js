import React, { useLayoutEffect, useState } from "react";
import { insertData, selectDataFromDate } from "../apis/FirebaseInstance";
import { isValidateCountNumber } from "../apis/IsValidation";
import PlusBtn from "../components/UI/PlusBtn";

import { AiFillDelete } from "react-icons/ai";


const MyWod = () => {
    const [wod, setWod] = useState();

    const [type, setType] = useState("");
    const [round, setRound] = useState("");
    const [level, setLevel] = useState("");

    const [exerciseList, setExerciseList] = useState([]); // 운동 정보(exerciseData) 객체의 배열
    const [exerciseData, setExerciseData] = useState({
        count: "",
        exercise: "",
        weight: ""
    });
    const [weightUnit, setWeightUnit] = useState("");


    useLayoutEffect(() => {
        // 임시
        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;
        selectDataFromDate("recordWod", date)
            .then(response => setWod(response))
            .catch(err => console.log(err));
    }, []);


    // 임시 저장한 정보를 DB에 Insert하는 함수
    const insertWod = (e) => {
        if(type === "" || round === 0 || level === "" || exerciseList.length === 0) {
            alert("WOD 정보를 입력해주세요");
            return;
        }

        const roundUnit = type === "FT" ? "Round" : "Minutes";

        
        // 지금은 작성 날짜로 설정해두지만 후에 사용자가 원하는 날짜로 설정할 수 있도록 변경 예정
        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;

        const data = {
            type,
            round : `${round}${roundUnit}`,
            level,
            data: exerciseList,
            date
        }

        console.log('insert');
        insertData("recordWod", "test-uid", data)
            .then(el => {
                exerciseList([]);
                setType("");
                setRound("");
                setLevel("");
            });
    }

    // 운동 정보(횟수, 운동이름, 무게)의 변화를 체크하는 함수
    const onChangeExerciseData = (e) => {
        if(!isNaN(e.target.value)) {
            e.target.value = isValidateCountNumber(e.target.value);
        }

        const value = e.target.value.trim();
        const data = {...exerciseData, [e.target.name]: value};

        setExerciseData(data);
    }

    // 운동 정보(횟수, 운동이름, 무게)를 임시 추가하는 함수
    const addExercise = (e) => {
        if(exerciseData.count < 1 || !exerciseData.exercise) {
            alert("운동 정보를 입력해주세요.");
            return;
        }

        const data = {...exerciseData, weight: `${exerciseData.weight}${weightUnit}`};
        console.log(data);
        const list = Array.from(exerciseList);
        list.push(data);
        setExerciseList(list);

        // reset input and select box
        setExerciseData({
            count: "",
            exercise: "",
            weight: ""
        });
        setWeightUnit("");
    }

    // 추가한 운동 정보를 삭제하기 위한 함수
    const deleteExercise = (e) => {
        console.log(e.target.value);
    }




    return (
        <>
        {
            wod 
            ? wod.date // wod가 있을 때
            : // 없을 때
            <>
            <fieldset>
            <legend>Workout of the Day!</legend>
            <div>
                <label htmlFor="type">종류</label>
                <select id="type" name="type" onChange={e => setType(e.target.value)} value={type}>
                    <option value="">선택</option>
                    <option value="FT">For Time of</option>
                    <option value="AMRAP">AMRAP</option>
                </select>
                <input 
                    type="number" 
                    onChange={e => { e.target.value = isValidateCountNumber(e.target.value); setRound(e.target.value)}}
                    value={round}
                />
                { type && <span>{type === "FT" ? "Round" : "Minutes"}</span> }
            </div>
            <div>
                <label htmlFor="level">난이도</label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="">선택</option>
                    <option value="Rxd">Rx'd</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>
            <div>
            { exerciseList.length !== 0  
                && exerciseList.map((el, index) =>  
                                            <div key={index}>
                                                <span>{el.count}</span>
                                                <span>{el.exercise}</span>
                                                <span>{el.weight}</span>
                                                <button onClick={deleteExercise}><AiFillDelete/></button>
                                            </div>
            )}
            </div>
            <div>
                <label htmlFor="record">기록</label>
                <input
                    type="number"
                    id="record"
                    onChange={e => e.target.value = isValidateCountNumber(e.target.value)}
                    // value={setRecord()}
                    />
                <select name="record-unit" onChange={onChangeExerciseData}>
                    <option value="">기록 단위</option>
                    <option value="kg">Round</option>
                    <option value="lb">Minutes</option>
                </select>
            </div>
            <button onClick={insertWod}>수고하셨습니다!</button>
        </fieldset>

        <div>
            <div>
                <label htmlFor="count">카운트</label>
                <input 
                    type="number" 
                    id="count"
                    name="count"
                    onChange={onChangeExerciseData}
                    value={exerciseData.count}
                    placeholder="횟수를 입력해주세요"    
                />
                <span>회</span>
            </div>
            <div>
                <label htmlFor="exercise">운동</label>
                <input 
                    type="text"
                    id="exercise"
                    name="exercise"
                    onChange={onChangeExerciseData}
                    value={exerciseData.exercise}
                    placeholder="운동 종류를 입력해주세요."    
                />
            </div>
            <div>
                <label htmlFor="weight">무게</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    onChange={onChangeExerciseData}
                    value={exerciseData.weight}
                    placeholder="무게를 입력해주세요."
                />
                <select name="weight-unit" onChange={e => setWeightUnit(e.target.value)} value={weightUnit}>
                    <option value="">무게</option>
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
            </div>
            <PlusBtn onClick={addExercise}></PlusBtn>
        </div>
        </>
        }
        </>
    );
}

export default MyWod;