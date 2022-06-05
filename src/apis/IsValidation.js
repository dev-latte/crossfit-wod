export const isValidateCountNumber = (number) => {
    let result = number;
    
    console.log(number);
    // 후에 input type="number"값에 e, E가 삽입되는 현상 수정할 것
    if(result === "0") result = "";                     // 초기값 세팅
    if(result < 0) result = Math.abs(result);           // 음수 체크
    if(result % 1 !== 0) result = Math.floor(result);   // 소수점 체크

    return result;
}

export const isNull = (object) => {
    return typeof object === "undefined" || object === undefined || object === null; 
}