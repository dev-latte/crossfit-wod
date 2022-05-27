import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import PlusBtn from "../components/UI/PlusBtn";

const MyWod = () => {
    const [type, setType] = useState("");
    const [wodList, setWodList] = useState([]); 

    const addList = () => {
        console.log('add list');
        const list = Array.from(wodList);
        list.push(
            <>
            <td><input type="text" placeholder="횟수를 입력해주세요"/></td>
            <td><input type="text" placeholder="운동 종류를 입력해주세요."/></td>
            <td><input type="text" placeholder="무게를 입력해주세요."/></td>
            <td><button onClick={deleteList}><AiFillDelete/></button></td>
            </>
        );
        setWodList(list);
    }

    const deleteList = (e) => {
        console.log(wodList);
        const index = e.currentTarget.parentElement.parentElement.className.split("-")[2];
        // const list = wodList.splice(index-1, 1);
        // setWodList(list);
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
                <input type="text" />
                { type && <span>{type === "FT" ? "Round" : "Minutes"}</span> }
            </div>
            <div>
                <label htmlFor="level">난이도</label>
                <select id="level" name="level" onChange={e => console.log('')}>
                    <option value="">선택</option>
                    <option value="Rxd">Rx'd</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <div>
                    <table style={{borderTop: "1px solid black", borderCollapse: "collapse"}}>
                        <thead>
                           <tr>
                                <th>횟수</th>
                                <th>운동 이름</th>
                                <th>무게</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            { wodList.length !== 0
                                    &&  wodList.map((el, index) => <tr key={index+1} className={`wod-list-${index+1}`}>{el}</tr>)}
                        </tbody>
                    </table>
                    <PlusBtn onClick={addList}/>
                </div>
            </div>
        </fieldset>
        <button>기록하기!</button>
        </>
    );
}

export default MyWod;