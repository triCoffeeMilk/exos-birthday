import { showCalendar, deleteTable } from "./calendar.js"
import birthDays from './birthdays.json'
import heros from './heros.json'

// 오늘 날짜의 년, 달 출력
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

showCalendar(thisYear, thisMonth);

let currentYear = thisYear;
let currentMonth = thisMonth;
const prevEl = document.querySelector(".calendar .prev-month");
const nextEl = document.querySelector(".calendar .next-month");

prevEl.addEventListener('click', function(){
  if(currentMonth == 0){
    currentYear--;
    currentMonth = 11;
  }
  else  currentMonth--;
  deleteTable();
  showCalendar(currentYear, currentMonth);
});

nextEl.addEventListener('click', function(){
  if(currentMonth == 11){
    currentYear++;
    currentMonth = 0;
  }
  else  currentMonth++;
  deleteTable();
  showCalendar(currentYear, currentMonth);
});

const searchEl = document.querySelector(".search input");

searchEl.addEventListener("change", () => {
  const name = searchEl.value;
  const resEl = document.querySelector(".search .search-result");
  // 이름을 가진 영웅이 있다면 그의 생일이 있는 해당 달을 표기해준다.
  // 여러명일 경우 아래에 리스트를 표기해준다.
  if(name in heros){
    resEl.textContent = "";
    let month, day, targetDay;
    for(month=1; month<=12; month++){
      for(day=0; day<birthDays[month].length; day++){
        if(birthDays[month][day][1]===name){
          currentMonth = month-1;
          targetDay = birthDays[month][day][0];
          break;
        }
      }
    }
    if(thisMonth>currentMonth)  currentYear = thisYear+1;
    else  currentYear = thisYear;
    deleteTable();
    showCalendar(currentYear, currentMonth);
    const dayEl = document.querySelector(`#date-${targetDay}`);
    // console.log(dayEl);
    dayEl.style.border = "3px solid #CB344D";
  }
  // 없으면 검색결과가 없음을 표기한다.
  else{
    console.log("검색결과가 없습니다.");
    resEl.textContent = "검색결과가 없습니다.";
  }
});
