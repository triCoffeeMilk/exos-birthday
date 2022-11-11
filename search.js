import birthDays from './birthdays.json'
import heros from './heros.json'

const searchEl = document.querySelector(".search input");

searchEl.addEventListener("change", () => {
  const name = searchEl.value;
  const resEl = document.querySelector(".search .search-result");
  // 이름을 가진 영웅이 있다면 그의 생일이 있는 해당 달을 표기해준다.
  // 여러명일 경우 아래에 리스트를 표기해준다.
  if(name in heros){
    console.log(name);
    resEl.textContent = "";
    
  }
  // 없으면 검색결과가 없음을 표기한다.
  else{
    console.log("검색결과가 없습니다.");
    resEl.textContent = "검색결과가 없습니다.";
  }
});
