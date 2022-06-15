import React, { useLayoutEffect, useState } from "react";
import styledComponents from "styled-components";
import { selectWodDataFromDate, updateDeletedonWodData } from "../apis/FirebaseInstance";
import CompletedWodCard from "../components/Template/CompletedWodCard";
import CreateWodCard from "../feature/CreateWodCard";

const TemplateDiv = styledComponents.div`
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 1px solid black;
    margin: 21px;
    padding: 12px;
    align-items: center;
`;

const DisplayWod = () => {
    const [todayWodData, setTodayWodData] = useState();

    useLayoutEffect(() => {
        getTodayWodData();
    }, []);

    const getTodayWodData = () => {
        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;
        selectWodDataFromDate("recordWod", `uid-${date}`, setTodayWodData);
    }

    const deleteWodData = (e) => {
        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;
        const message = "데이터를 삭제하시겠습니까?";
        if(window.confirm(message)) {
            updateDeletedonWodData("recordWod", `uid-${date}`, setTodayWodData);
        }
    }

    return (
        <TemplateDiv>
            {
                todayWodData 
                    ? <CompletedWodCard wodData={todayWodData} deleteData={deleteWodData}/>
                    : <CreateWodCard/>
            }
        </TemplateDiv>
    );
}

export default DisplayWod;