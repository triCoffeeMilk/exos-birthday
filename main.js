
import birthDays from './birthdays.json'
// import {createRequire} from "module";
// const require = createRequire(import.meta.url);
// birthDays = require('./birthdays.json');
console.log(birthDays);

// 오늘 날짜의 년, 달 출력
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

function showCalendar(year, month){
  let firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month+1, 0).getDate();
  const month1stDay = new Date(thisYear, thisMonth, 1).getDay();
  const weeks = (month1stDay+days+1)%7+1;
  const calendarEl = document.querySelector('.calendar .calendar-date');
  
  const yearEl = document.querySelector('.calendar .year');
  const monthEl = document.querySelector('.calendar .month');
  
  yearEl.textContent = year+'년';
  monthEl.textContent = (month+1)+'월';

  let date = 1;
  firstDay = firstDay==0? 7:firstDay;
  for(let i=0;i<=weeks;i++){
    const rowEl = document.createElement('tr');
    for(let j=1;j<=7;j++){
      let cellEl = document.createElement('td');
      if(i===0 && j<firstDay){
        cellEl.append(" ");
        rowEl.append(cellEl);
      }
      else if(date > days) break;
      else{
        if(year==thisYear&&month==thisMonth&&date==today.getDate()){
          cellEl.style.border = "1px solid #333";
        }
        cellEl.id = "date-"+date;
        cellEl.append(date);
        rowEl.append(cellEl);
        date++;
      }
    }
    calendarEl.append(rowEl);
  }
  addBirthday(month);
}

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
  console.log("prev click");
  deleteTable();
  showCalendar(currentYear, currentMonth);
});

nextEl.addEventListener('click', function(){
  if(currentMonth == 11){
    currentYear++;
    currentMonth = 0;
  }
  else  currentMonth++;
  console.log("next click");
  deleteTable();
  showCalendar(currentYear, currentMonth);
});

function deleteTable(){
  const calendarEl = document.querySelector('.calendar .calendar-date');
  while(calendarEl.rows.length!=0){
    calendarEl.deleteRow(0);
  }
}

function addBirthday(month){
  let cellEl;
  console.log(birthDays[month+1]);
  const monthBirth = birthDays[month+1]
  for(let i=0;i<monthBirth.length;i++){
    console.log(monthBirth[i]);
    cellEl = document.querySelector(`#date-${monthBirth[i][0]}`);
    console.log(cellEl);
    const birthEl = document.createElement('div');
    birthEl.append(monthBirth[i][1])
    cellEl.append(birthEl);
  }
}