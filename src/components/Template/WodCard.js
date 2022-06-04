import React, { useState } from "react";
import styledComponents from "styled-components";
import Button from "../UI/Button";

const StyledWodCard = styledComponents.div`
    width: 350px;
    height: 600px;
    border: 1px solid black;
    border-radius: 16px;

`;

const StyledMovementBox = styledComponents.div`
    border: 1px solid black;
    margin: 5px 5px;
    padding-bottom: 10px;
`;

const WodCard = ({ data }) => {
    const {type, isTeam, movements} = data;
    const [teamOf, setTeamOf] = useState(2);
    const [typeCount, setTypeCount] = useState();
    const [level, setLevel] = useState("rxd");
    const [recordData, setRecordData] = useState([]);   // wod 기록 
    
    const test = () => {
        // 내일은 와드 기록 insert부터 작업하기
        console.log(type, teamOf, typeCount, level);
    }

    // Crossfit Total 같은 경우는 다른 방식으로 카드를 보여줄 예정, 지금은 신경쓰지 않기
    return (
        <StyledWodCard>
            <p>Workout of the Day!</p>
            <div>
                <label htmlFor="type-count">{type}</label>
                <input type="number" name="type-count" id="type-count" onChange={e => setTypeCount(e.target.value)} value={typeCount}/>
                {type === "For Time of" ? "Round" : "Minute"}
            </div>
            {
                isTeam && 
                        <div>
                            {/* 나중에는 입력이 아니라 아이콘으로 선택하게(2명 혹은 3명 수준으로) */}
                            <label htmlFor="team-of">Team of </label>
                            <input type="number" name="team-of" id="team-of" onChange={e => setTeamOf(e.target.value)} value={teamOf}/>
                        </div>
            }
            <div>
                <p>movement list</p>
                <label htmlFor="level">난이도</label>
                <select id="level" name="level" onChange={e => setLevel(e.target.value)} value={level}>
                    <option value="rxd" defaultValue>Rx'd</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {/* 운동 종류 및 체크 단위부터 시작 */}
                { Array.from(movements).map((el, index) =>  <StyledMovementBox key={index}> 
                                                                <h4>{el[1].name}</h4>
                                                                <div>
                                                                    <label htmlFor={`${el[1].id}-unit`}>Goal</label>
                                                                    <input type="number" name={`${el[1].id}-unit`} id={`${el[1].id}-unit`}/>
                                                                    <select name="unit" id="unit">
                                                                        {el[1].unit.map((el, index) => <option key={index} value={el}>{el}</option>)}
                                                                    </select>
                                                                </div>
                                                                {
                                                                    el[1].weight &&
                                                                        <div>
                                                                            <label htmlFor="weight">Weight</label>
                                                                            <input type="number" name="weight" id="weight"/>
                                                                            <select name="weight-unit" id="weight-unit">
                                                                                <option value="lb" name="lb">lb</option>
                                                                                <option value="kg" name="kg">kg</option>
                                                                            </select>
                                                                        </div>
                                                                }
                                                            </StyledMovementBox>
                )}
                <div>
                    <label>Record WOD</label>
                    {
                    type === "For Time of" 
                        ? <><input type="number" name="" id="" />:<input type="number" name="" id="" /></>
                        : <><input type="number" name="" id="" /><span>Round</span></>
                    }
                </div>


            
            </div>
            <Button onClick={test} value="등록"/>
        </StyledWodCard>
    );
}

export default WodCard;