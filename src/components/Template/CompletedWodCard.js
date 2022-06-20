import React from "react";
import { useState } from "react";
import styledComponents from "styled-components";
import MovementCard from "./MovementsCard";
import MovementsList from "./MovementsList";
import WodCardTemplate from "./WodCardTemplate";

const InformationWod = styledComponents.div`
    text-align: center;
    margin-bottom: 10px;
    >div{
        font-family: "Karla", 'Nanum Gothic Coding';
        font-size: 15px;
        line-height: 25px;
        >p{
            font-size: 18px;
            font-weight: 700;
            color: #C77B7F;
            display: inline-block;
        }
        >span{
            font-weight: 400;
        }
    }
`;

const CompletedWodCard = ({ wodData, deleteData }) => {
    const { type, count, complete, movements, level, record, teamOf } = wodData;

    // firebase가 Map() 타입을 지원하지 않아 만든 임시방책. index 순서대로 정렬한다.
    const movementList = Object.keys(movements).map(key => [key, movements[key]]).sort((a, b) => a[1]["index"] - b[1]["index"]);
    const [edit, setEdit] = useState(false);

    return (
        <WodCardTemplate type="record" onClickDelete={deleteData} title={complete ? "WOD CLEAR!" : "WOD FAILED"} edit={edit} setEdit={setEdit} >
            <InformationWod>
                <div>
                    <p>{type}</p>
                </div>
                {teamOf &&
                    <div>
                        <span>Team of </span>
                        <p>{teamOf}</p>
                        <span> 의 구성으로</span>
                    </div>
                }
                <div>
                    <p>{count}</p>
                    <span> 수행했습니다.</span>
                </div>
                <div>
                    <span>기록은 </span>
                    <p>{record}</p>
                    <span> 입니다!</span>
                </div>
            </InformationWod>
            <p>{movementList.length}개의 수행한 운동 (scaling : {level === "rxd" ? "Rx'd" : level.toUpperCase()})</p>
            <MovementsList movements={movements} />
                {
                    movementList.map((el, index) =>
                        <MovementCard
                            key={index}
                            edit={edit}
                            el={el}
                            movementData={movements}
                        />
                    )
                }
        </WodCardTemplate>
    );
}

export default CompletedWodCard;