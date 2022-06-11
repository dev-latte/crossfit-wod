import React, { useLayoutEffect, useState } from "react";
import { selectWodDataFromDate } from "../apis/FirebaseInstance";
import CompletedWodCard from "../components/Template/CompletedWodCard";
import CreateWodCard from "../feature/CreateWodCard";



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

    return (
        <>
            {
                todayWodData 
                    ? <CompletedWodCard wodData={todayWodData}/>
                    : <CreateWodCard/>
            }
        </>
    );
}

export default DisplayWod;