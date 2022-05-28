# Cross-fit WOD 기록용 어플리케이션 (임시)

## 1. 개요

### 기능
- 로그인
1. 회원가입 및 로그인 방식
2. (고려중) 소셜 로그인 방식
3. (추후) 각각 크로스핏 지부마다 다른 정보가 보이도록 할 것 (슬랙 초기 가입 방식)

- 와드 기록
1. 크로스핏 와드 기록을 저장할 수 있게 할 것(초기에는 단순히 직접 적고 저장하는 방식)
2. (추후) 달력을 이용하여 wod 기록을 보여주고, 저장할 수 있게 한다. > 날짜 클릭시, 그 날의 와드를 보여줌
3. (추후) 크로스핏 와드 기록시, 사용한 기구 및 무게를 선택할 수 있게 하고, 그를 토대로 총 무게를 계산하도록 한다.
4. (추후) 크로스핏 와드 기록 저장시, 와드 내용을 선택하여 "카드"를 구성할 수 있도록 변경
5. (추후) 다른 회원과 기록 공유 가능하도록 추가
6. (추후) 개인 프로필 및 정보를 추가할 수 있도록 한다. (최고 기록 기록용)

### 사용 기술 및 라이브러리
1. 라이브러리
 - create-react-app (npx create-react-app crossfit-wod)
 - styled-components (npm i styled-components)
 - react-icons (npm i react-icons)
2. Database
 - firebase (npm install firebase)
3. 기타 API
 - 

### 프로젝트 구성
 ㅡ public  
 ㅡㅡ assets  
 ㅡㅡㅡ images  
 ㅡㅡㅡㅡ bg  
 ㅡㅡㅡㅡ logo  
 ㅡㅡㅡㅡ ui  
 ㅡ src  
 ㅡㅡ apis  
 ㅡㅡ components  
 ㅡㅡ data  
 ㅡㅡ feature  
 ㅡㅡ pages  