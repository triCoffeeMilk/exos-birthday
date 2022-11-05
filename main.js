console.log('test');

// 오늘 날짜의 년, 달 출력
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

const yearEl = document.querySelector('.calendar .year');
const monthEl = document.querySelector('.calendar .month');

yearEl.textContent = thisYear+'년';
monthEl.textContent = (thisMonth+1)+'월';

const month1stDay = new Date(thisYear, thisMonth, 1).getDay();
console.log(new Date(thisYear, thisMonth+1, 0));

var days = new Date(thisYear, thisMonth+1, 0).getDate();
var dayArray = '';

const calendarEl = document.querySelector('.calendar .calendar-body');

// for (var i=1;i<=days;i++) {
//   if ((month1stDay+i-1)%7 == 1){
//     dayArray += "\n";
//   }
//   calendarEl.append('<div class="day">' + i + '</div>');
//   dayArray += i + " ";
// }


function showCalendar(year, month){
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month+1, 0).getDate();
  const weeks = (month1stDay+days-1)%7+1;
  const calendarEl = document.querySelector('.calendar .calendar-date');
  
  let date = 1;

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
        cellEl.append(date);
        rowEl.append(cellEl);
        date++;
      }
    }
    calendarEl.append(rowEl);
  }
  
}

// showCalendar(thisYear, thisMonth);
showCalendar(thisYear, 9);