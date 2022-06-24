import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { selectMovementData} from "../apis/FirebaseInstance";
import Button from "../components/atoms/Button";
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
    const [wodData, setWodData] = useState({
        type: "For Time of",
        isTeam: false,
        movements: []
    });
    const [movementList, setMovementList] = useState([]);
    const [wodDataForm, setWodDataForm] = useState();



    // 1. 관리자가 wod data를 입력한다.
    // 2. 관리자가 만든 폼에 따라 유저가 입력한다. 

    // 1. 관리자가 wod data를 입력하지 않았으면 CreateWodCard를, 입력한 상태면 WodCard를 보여준다(수정 및 삭제 가능)
    // 2. 유저가 접속한 경우, 입력된 wod card가 보여지며, 입력되지 않았다면 준비중이라는 문구가 표시되어야 한다.
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
                        <CreateWodCard wodData={wodData} setWodData={setWodData} movementList={movementList}/>
                        <WodCard wodData={wodData} setWodData={setWodData}/>
                    </>
                }
            </TemplateWodContents>
            <Button>WOD 완료!</Button>

            {/* <TemplateDiv>
                {
                    todayWodData 
                        ? <CompletedWodCard wodData={todayWodData} deleteData={deleteWodData} />
                        : <CreateWodCard/>
                }
            </TemplateDiv> */}


        </>
    );
}

export default DisplayWod;