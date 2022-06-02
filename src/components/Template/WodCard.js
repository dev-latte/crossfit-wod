import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";

const StyledWodCard = styledComponents.div`
    width: 350px;
    height: 600px;
    border: 1px solid black;
    border-radius: 16px;

`;

const WodCard = ({ data }) => {
    const { type, isTeam, movements } = data;
    const [teamOf, setTeamOf] = useState(2);
    const [typeCount, setTypeCount] = useState();
    const [level, setLevel] = useState();

    useEffect(() => {
        console.log(data);
    }, [])


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
                    <option value="Rxd">Rx'd</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                {/* 운동 종류 및 체크 단위부터 시작 */}
                { Array.from(movements).map((el, index) => 
                                                            <div key={index}> 
                                                                <label htmlFor="">{el[1].name}</label>
                                                                <input type="number" name={`${el[1].id}-${el[1].unit}`} id={`${el[1].id}-${el[1].unit}`}/>
                                                            </div>
                )}
            </div>
        
        </StyledWodCard>
    );
}

export default WodCard;