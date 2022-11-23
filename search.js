import heros from './heros.json'

export function showList(){
  const listEl = document.querySelector(".search-list");
  var itemEl;
  var lists = filter();
  
  itemEl = document.querySelectorAll(".res");
  if(itemEl!=null){
    for(var i=0;i<itemEl.length;i++)
      itemEl[i].remove("div");
  }

  console.log(itemEl);

  for(var i=0;i<lists.length;i++){
    itemEl = document.createElement("div");
    itemEl.classList.add("res");
    itemEl.textContent = lists[i];
    listEl.append(itemEl);
  };

}

export function filter(){
  const searchEl = document.querySelector(".search input");
  const name = searchEl.value;
  const heroNames = Object.keys(heros);
  var lists = [];
  // const maxNum = 10;
  // var num = heroNames.length>maxNum?maxNum:heroNames.length;

  for(var i=0;i<heroNames.length;i++){
    if(heroNames[i].indexOf(name) > -1){
      lists.push(heroNames[i]);
      // if(lists.length==num) break;
    }
  }

  console.log(lists);

  return lists;
}