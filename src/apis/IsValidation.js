export const isValidateCountNumber = (number) => {
    let result = number;
  
    if(result < 0) result = Math.abs(result);           // 음수 체크
    if(result % 1 !== 0) result = Math.floor(result);   // 소수점 체크

    return result;
}