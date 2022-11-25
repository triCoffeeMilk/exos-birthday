import heros from './heros.json'
import birthDays from './birthdays.json'
import { deleteTable, showCalendar } from "./calendar.js"

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

const searchEl = document.querySelector(".search input");

searchEl.addEventListener("keyup", (e) => {
  if(e.keyCode === 13){
    const listEl = document.querySelector(".search-list .list");
    listEl.style.display = 'none';
    showSearchCalendar(searchEl.value);
  }
  else  showList();
});

function showSearchCalendar(name) {
  // const name = searchEl.value;
  var showMonth;
  var showYear;
  const resEl = document.querySelector(".search .search-result");
  // 이름을 가진 영웅이 있다면 그의 생일이 있는 해당 달을 표기해준다.
  // 여러명일 경우 아래에 리스트를 표기해준다.
  if(name in heros){
    resEl.textContent = "";
    let month, day, targetDay;
    for(month=1; month<=12; month++){
      for(day=0; day<birthDays[month].length; day++){
        if(birthDays[month][day][1]===name){
          showMonth = month-1;
          targetDay = birthDays[month][day][0];
          break;
        }
      }
    }
    if(thisMonth>showMonth)  showYear = thisYear+1;
    else  showYear = thisYear;

    deleteTable();
    showCalendar(showYear, showMonth);
    const dayEl = document.querySelector(`#date-${targetDay}`);
    // console.log(dayEl);
    dayEl.style.border = "3px solid #CB344D";
  }
  // 없으면 검색결과가 없음을 표기한다.
  else{
    console.log("검색결과가 없습니다.");
    resEl.textContent = "검색결과가 없습니다.";
  }
};

function delList(){
  var itemEl = document.querySelectorAll(".res");
  if(itemEl!=null){
    for(var i=0;i<itemEl.length;i++)
      itemEl[i].remove("div");
  }
  const listEl = document.querySelector(".search-list .list");
  listEl.style.display = 'none';
}

function showList(){
  const listEl = document.querySelector(".search-list .list");
  var itemEl;
  var lists = filter();

  delList();
  // console.log(itemEl);

  for(var i=0;i<lists.length;i++){
    itemEl = document.createElement("div");
    itemEl.classList.add("res");
    itemEl.textContent = lists[i];

    itemEl.addEventListener('click', function(){
      // console.log(this.textContent);
      showSearchCalendar(this.textContent);
      const searchEl = document.querySelector(".search input");
      searchEl.value = this.textContent;
      delList();
    });

    listEl.append(itemEl);
  };

  if(lists.length==0) listEl.style.display = 'none';
  else  listEl.style.display = 'block';
}

function filter(){
  const searchEl = document.querySelector(".search input");
  const name = searchEl.value;
  const heroNames = Object.keys(heros);
  var lists = [];
  const maxNum = 10;

  if(name!='')
  {
    for(var i=0;i<heroNames.length;i++){
      if(heroNames[i].indexOf(name) > -1){
        lists.push(heroNames[i]);
        if(lists.length==maxNum) break;
      }
    }
    lists.sort(function(a, b) {
      if(a.indexOf(name)>b.indexOf(name)) return 1;
      if(a.indexOf(name)===b.indexOf(name)) return 0;
      if(a.indexOf(name)<b.indexOf(name)) return -1;
    });
  }

  // console.log(lists);

  return lists;
}