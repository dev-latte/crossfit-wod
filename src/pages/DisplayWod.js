import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { selectMovementData} from "../apis/FirebaseInstance";
import CreateWodCard from "../components/templates/CreateWodCard";
import WodCard from "../components/templates/WodCard";

const TemplateWodContents = styled.div`
    width: 1240px;
    display: flex;
    border: 1px solid black;
    margin: 21px;
    padding: 20px;
    justify-content: space-between;
`;

const ToggleWrapper = styled.div`
    border: 1px solid salmon;
    width: 100%;
    height: auto;
    >ul{
        display: flex;
        justify-content: center;
        align-items: center;
        >li {
            border 1px solid black;
            padding: 10px;
            margin: 0px 10px 0px 0px;
        }
    }
`;

const DisplayWod = () => {
    const [todayWodData, setTodayWodData] = useState();
    const [admin, setAdmin] = useState(false);    // true : 관리자 페이지, false: 유저 페이지 > 후에 UID를 통해 가져온 유저 정보로 체크하도록 수정
    
    // 와드 카드에 적용되는 와드카드
    const [wodData, setWodData] = useState({
        type: "For Time of",
        isTeam: false,
        movements: []
    });
    const [movementList, setMovementList] = useState([]);

    // 관리자가 작성하는 와드
    const [wodDataForm, setWodDataForm] = useState({
        type: "정해짐",
        typeCount: 1,
        isTeam: false,
        teamOf: 2,
        level: "rxd",
        movementInfo: []
    });

    useLayoutEffect(() => {
        getMovementsData();
        // const dateInstance = new Date();
        // const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth() + 1}-${dateInstance.getDate()}`;
        // selectWodDataFromDate("wodDataForm", date, setWodDataForm);
        // selectWodDataFromDate("recordWod", `uid-${date}`, setTodayWodData); 

    }, []);

    // get wod movement list data
    const getMovementsData = () => {
        selectMovementData("crossfitMovement")
            .then(response => { 
                setMovementList(response);
             })
            .catch(err => alert(err));
    }

    const onToggleCard = (e) => {
        setAdmin(JSON.parse(e.currentTarget.dataset.admin));
    }

    return (
        <>
            <ToggleWrapper>
                <ul>
                    <li onClick={onToggleCard} data-admin={true}>admin</li>
                    <li onClick={onToggleCard} data-admin={false}>user</li>
                </ul>
            </ToggleWrapper>
            <TemplateWodContents>
                {
                    admin &&
                    <>
                        <CreateWodCard wodData={wodData} setWodData={setWodData} movementList={movementList} wodDataForm={wodDataForm} setWodDataForm={setWodDataForm} />
                        <WodCard wodData={wodData} setWodData={setWodData} wodDataForm={wodDataForm} setWodDataForm={setWodDataForm}/>
                    </>
                }
            </TemplateWodContents>
        </>
    );
}

export default DisplayWod;