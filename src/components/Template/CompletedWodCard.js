import React from "react";
import styledComponents from "styled-components";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";


const CardTemplate = styledComponents.div`
    width: 400px;
    height: auto;
    border: 1px solid black;
`;

const CardHeader = styledComponents.div`
    width: 100%;
    height: 27px;
    border-bottom: 1px solid black;
    text-align: right;
    padding: 2px 10px;
    >svg {
        font-size: 21px;
        margin-left: 5px;
    }
`;

const CardBody = styledComponents.div`
    width: 100%;
    height: auto;
    border: 1px solid salmon;
    padding: 0px 10px;
`;

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

const MovementCard = styledComponents.div`
    border: 1px solid blue;
    padding: 5px 10px;        
    margin: 5px 0px;
    >p{
        font-size: 15px;
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        margin-bottom: 5px;
}
`;

const CompletedWodCard = ({ wodData }) => {
    const { type, count, complete, movements, level, record, teamOf } = wodData;
    const movementKey = Object.keys(movements);
    
    return (
        <CardTemplate>
            <CardHeader>
                <AiFillEdit/>
                <AiFillDelete/>
            </CardHeader>
            <CardBody>
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
                            <MovementCard key={index}>
                                <p>{el.split("-").map(el => el.replace(el[0], char => char.toUpperCase())).join(" ")}</p>
                                <div>
                                    <span>목표 : </span>
                                    <span>{ `${movements[el]["goal"]}${movements[el]["goal-unit"]}` }</span>
                                </div>
                                <div>
                                    {
                                    movements[el]["weight"] 
                                        &&  <>
                                                <span>무게 : </span>
                                                <span>{`${movements[el]["weight"]}${movements[el]["weight-unit"]}`}</span>
                                            </>
                                    }
                                </div>
                            </MovementCard>
                        )
                    }
                 </MovementsList>
            </CardBody>
        </CardTemplate>
    );
}

export default CompletedWodCard;