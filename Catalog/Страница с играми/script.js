import { DATA } from "./data.js";

const menuDropdown = document.querySelector('.menu-dropdown')
const searh = document.querySelector('.searh-input');
const newBtn = document.querySelector('.new');

let funFilterGame = () => {
  let platform = [...menuDropdown.querySelectorAll('.platform input:checked')].map(n => n.value);
  let genre = [...menuDropdown.querySelectorAll('.genre input:checked')].map(n => n.value);
  let release = [...menuDropdown.querySelectorAll('.release input:checked')].map(n => n.value);
  let rating = [...menuDropdown.querySelectorAll('.rating input:checked')].map(n => n.value);

  funGameOutput(DATA.filter(n=> 
    (!platform.length || platform.includes(n.platform))&&
    (!genre.length || genre.includes(n.genre))&&
    (!release.length || release.includes(n.release))&&
    (!rating.length || rating.includes(n.rating))
    ))
}



menuDropdown.addEventListener('input', funFilterGame);

let funGameOutput = (data) => {
  document.querySelector('.container-game').innerHTML = data.map(n => `
<div class="game">
  <img class="img-game" src="${n.img}">
    <div class="option">
      <h5 class="name">${n.name}</h5>
      <p class="platform">Платформа: ${n.platform}</p>
      <p class="p-release">Год выхода: ${n.release}</p>
      <p class="genre">Жанр: ${n.genreRus}</p>
      <p class="p-rating">Оценка: ${n.rating}</p>
    </div>
</div>`).join('');
}
searh.addEventListener('keydown', ()=> {
  if (event.keyCode == 13) {
    funGameOutput(DATA.filter(n => 
      (searh.value == n.name)))
  }
})
let i = 1;
newBtn.addEventListener('click', ()=> {
  i++
  let k = i%2
  if (k === 0) {
    funGameOutput(DATA.filter(n => 
      (n.release === "2021")
      ))
  } else if (k === 1) {
    funGameOutput(DATA)
  }
  
})

funGameOutput(DATA);


 