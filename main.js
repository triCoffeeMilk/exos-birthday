import birthDays from './birthdays.json'
import heros from './heros.json'
// import {createRequire} from "module";
// const require = createRequire(import.meta.url);
// birthDays = require('./birthdays.json');

// 오늘 날짜의 년, 달 출력
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

function showCalendar(year, month){
  let firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month+1, 0).getDate();
  let month1stDay = new Date(year, month, 1).getDay();
  month1stDay = month1stDay==0?7:month1stDay;
  const weeks = Math.ceil((month1stDay+days-1)/7);
  const calendarEl = document.querySelector('.calendar .calendar-date');
  
  const yearEl = document.querySelector('.calendar .year');
  const monthEl = document.querySelector('.calendar .month');
  
  yearEl.textContent = year+'년';
  monthEl.textContent = (month+1)+'월';

  let date = 1;
  firstDay = firstDay==0? 7:firstDay;
  for(let i=0;i<weeks;i++){
    const rowEl = document.createElement('tr');
    for(let j=1;j<=7;j++){
      let cellEl = document.createElement('td');
      if(i===0 && j<firstDay){
        cellEl.append(" ");
        rowEl.append(cellEl);
      }
      else if(date > days){
        rowEl.append(cellEl);
        date++;
      }
      else{
        if(year==thisYear&&month==thisMonth&&date==today.getDate()){
          cellEl.style.border = "3px solid #FF9999";
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

function setTier(hero) {

  if (!Object.hasOwn(heros, hero)) return "#000";
  if (!Object.hasOwn(heros[hero], "tier"))  return "#000";
  if (heros[hero].tier == "common")  return "#999";
  else if (heros[hero].tier == "magical") return "#32B04D";
  else if (heros[hero].tier == "rare") return "#309CDB";
  else if (heros[hero].tier == "legendary") return "#9D68E4";
  else if (heros[hero].tier == "fated") return "#E6BB11";
  else if (heros[hero].tier == "mythic") return "#CC3333";
  else  return "#000";

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

function deleteTable(){
  const calendarEl = document.querySelector('.calendar .calendar-date');
  while(calendarEl.rows.length!=0){
    calendarEl.deleteRow(0);
  }
}

function addBirthday(month){
  let cellEl;
  const monthBirth = birthDays[month+1]
  for(let i=0;i<monthBirth.length;i++){
    cellEl = document.querySelector(`#date-${monthBirth[i][0]}`);
    // make birthday
    const name = monthBirth[i][1];
    const birthEl = document.createElement('div');
    birthEl.append(name)
    birthEl.classList.add("birth");
    birthEl.style.color = setTier(name);
    // make tooltip
    const tipEl = document.createElement('div');
    tipEl.classList.add("tooltip");
    if (Object.hasOwn(heros, name)){
      const posEl = document.createElement('div');
      const elEl = document.createElement('div');
      posEl.append(heros[name]["position"]);
      elEl.append(heros[name]["element"]);
      tipEl.append(posEl);
      tipEl.append(elEl);
      // tipEl.append(heros[name]["position"]);
      // tipEl.append(heros[name]["element"]);
    }
    else  tipEl.append("준비중입니다");
    birthEl.append(tipEl);
  
    cellEl.append(birthEl);
  }
}