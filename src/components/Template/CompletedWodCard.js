import React from "react";
import styledComponents from "styled-components";
import MovementCard from "./MovementsCard";
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

const MovementsList = styledComponents.div`
    padding-bottom: 10px;
    >p{
        color: #fff;
        font-weight: 700;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
        background-color: #C77B7F;
        font-family: "Karla", 'Nanum Gothic Coding';
        padding: 5px 0px;
    }
`;

const CompletedWodCard = ({ wodData, deleteData }) => {
    const { type, count, complete, movements, level, record, teamOf } = wodData;
    const movementKey = Object.keys(movements);
    
    console.log(record);

    return (
        <WodCardTemplate type="record" onClickDelete={deleteData} title={complete ? "WOD CLEAR!" : "WOD FAILED"}>
            <InformationWod>
                <div>
                    <p>{type}</p>
                </div>
                { teamOf &&
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
            <MovementsList>
                <p>{movementKey.length}개의 수행한 운동 (scaling : {level === "rxd" ? "Rx'd" : level.toUpperCase()})</p>
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