import React, { useLayoutEffect, useState } from "react";
import styledComponents from "styled-components";
import { insertData, selectMovementData, selectWodDataFromDate } from "../apis/FirebaseInstance";
import { isNull } from "../apis/IsValidation";
import WodCard from "../components/Template/WodCard";

const MovementsTemplate = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
    width: 50%;
    div{
        padding: 2px 5px;
    }
`;

const CreateWodCard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movementList, setMovementList] = useState([]);
    const [type, setType] = useState("ft");
    const [isTeam, setIsTeam] = useState(false);
    const [selectMovements, setSelectMovements] = useState(new Set());
    const [wodData, setWodData] = useState();

    const [wodCard, setWodCard] = useState();       // 저장되어있는 (날짜 기준) wod 값

    useLayoutEffect(() => {
        if(isLoading) { getMovementsData(); }

        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;
        getWodData(date);

        return () => { setIsLoading(false); }
    }, [wodData]);

    // get wod movement list data
    const getMovementsData = () => {
        selectMovementData("crossfitMovement")
            .then(response => { 
                setMovementList(response);
             })
            .catch(err => alert(err));
    }

    const onCheckedMovement = (e) => {
        const target = e.target.name;
        const set = new Set(selectMovements);
        if(set.has(target)) {
            set.delete(target);
        } else {
            set.add(target);
        }
        setSelectMovements(set);
    }

    const createWodCard = () => {
        console.log("create");
        const movements = new Map();
        selectMovements.forEach(el => {
            for(let i = 0; i < movementList.length; i++) {
                if(el === movementList[i].id) {
                    movements.set(el, movementList[i]);
                    break;
                }
            }
        })

        // set data
        setWodData({
            "type": type === "ft" ? "For Time of" : type === "amrap" ? "AMRAP" : "Crossfit Total",
            isTeam,
            movements
        });

        // reset data
        setType("ft");
        setIsTeam(false);
        setSelectMovements(new Set());
    }

    // WodCard.js 에서 사용되는 함수
    const insertWod = (data) => {
        if(isNull(data)) {
            alert("데이터가 존재하지 않습니다.");
            return;
        }

        const dateInstance = new Date();
        const date = `${dateInstance.getFullYear()}-${dateInstance.getMonth()+1}-${dateInstance.getDate()}`;

        insertData("recordWod", `uid-${date}`, data)
            .then(el => {
                alert("WOD 기록이 완료되었습니다. 수고하셨습니다!");
                setWodData();
                // DB에 값이 있으면 DB정보를 띄우고, 없을 시 작성할 수 있는 폼을 출력하도록 수정
                // 이 경우, WOD Card를 재사용 할 수 있을지 고민해보기
                // UI 컴포넌트 분리해서 재사용 시도
                // 스타일링 적용하기(css)
                // movements에 검색기능 추가하기(잘 안보여서)
            });
    }

    const getWodData = (date) => {
        selectWodDataFromDate("recordWod", `uid-${date}`, setWodCard);
    }

    return (
        <>
            <div>
                <p>Carry Out</p>
                <select id="type" name="type" onChange={e => setType(e.target.value)} value={type}>
                    <option value="ft" defaultValue>For Time of</option>
                        <option value="amrap">AMRAP</option>
                    <option value="crosfit-total">Crossfit Total</option>
                </select>
            </div>
            <div>
                <p>Team of</p>
                <input type="checkbox" name="team" id="team" onChange={e => setIsTeam(e.target.checked)} checked={isTeam}/>
                <label htmlFor="team">Team</label>
            </div>
            <div>
                <p>Movements</p>
                <MovementsTemplate>
                    {
                        setMovementList.length !== 0 &&
                            movementList.map((el, index) => <div key={index}>
                                                                <input type="checkbox" name={el.id} id={el.id} onChange={onCheckedMovement} checked={selectMovements.has(el.id)} value={el.name}/>
                                                                <label htmlFor={el.id}>{el.name}</label>
                                                            </div>
                            )
                    }
                </MovementsTemplate>
            </div>
            <button onClick={createWodCard}>Create WOD CARD!</button>
            { wodData && <WodCard data={wodData} insertWod={insertWod}/> }
        </>
    );
}

export default CreateWodCard;