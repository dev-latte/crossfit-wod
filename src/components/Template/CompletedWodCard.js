import React from "react";
import styledComponents from "styled-components";
import MovementCard from "./MovementsCard";
import WodCardTemplate from "./WodCardTemplate";

// 후에 화면 구성에 맞게 h1을 다른 태그로 변경할 것
const CardTitle = styledComponents.h1`
    font-size: 18px;
    text-align: center;
    padding: 10px 0px;
`;

const InformationWod = styledComponents.div`
    text-align: center;
    margin-bottom: 10px;
`;

const MovementsList = styledComponents.div`
    padding-bottom: 10px;
`;

const CompletedWodCard = ({ wodData, deleteData }) => {
    const { type, count, complete, movements, level, record, teamOf } = wodData;
    const movementKey = Object.keys(movements);
    
    return (
        <WodCardTemplate type="record" onClickDelete={deleteData}>
            <CardTitle>WOD 기록표</CardTitle>
            <InformationWod>
                <div>
                    <p>{ complete ? "WOD CLEAR!" : "WOD FAILED" }</p>
                    <p>{type} {count}를 수행했으며,</p>
                    <span>기록은 {record} 입니다!</span>
                </div>
                {teamOf && <p>"Team of ${teamOf}"</p>}
            </InformationWod>
            <MovementsList>
                <p>수행한 운동 목록 (총 {movementKey.length}개)</p>
                <span>scaling : {level === "rxd" ? "Rx'd" : level.toUpperCase()}</span>
                {
                    movementKey.map((el, index) =>
                        <MovementCard 
                            key={index} 
                            name={el.split("-").map(el => el.replace(el[0], char => char.toUpperCase())).join(" ")} 
                            goal={`${movements[el]["goal"]}${movements[el]["goal-unit"]}`}
                            weight={movements[el]["weight"] ? `${movements[el]["weight"]}${movements[el]["weight-unit"]}` : ""}
                        />
                    )
                }
            </MovementsList>
        </WodCardTemplate>
    );
}

export default CompletedWodCard;