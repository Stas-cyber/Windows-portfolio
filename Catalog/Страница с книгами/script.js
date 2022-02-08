import { DATA } from "./data.js";

const menuDropdown = document.querySelector('.menu-dropdown')
const searh = document.querySelector('.searh-input');
const newBtn = document.querySelector('.new');

let funFilterGame = () => {
  let platform = [...menuDropdown.querySelectorAll('.platform input:checked')].map(n => n.value);
  let genre = [...menuDropdown.querySelectorAll('.genre input:checked')].map(n => n.value);
  let release = [...menuDropdown.querySelectorAll('.release input:checked')].map(n => n.value);
  let rating = [...menuDropdown.querySelectorAll('.rating input:checked')].map(n => n.value);

  funGameOutput(DATA.filter(n =>
    (!platform.length || platform.includes(n.platform)) &&
    (!genre.length || genre.includes(n.genre)) &&
    (!release.length || release.includes(n.release)) &&
    (!rating.length || rating.includes(n.rating))
  ))
}

menuDropdown.addEventListener('input', funFilterGame);

let funGameOutput = (data) => {
  document.querySelector('.container-game').innerHTML = data.map(n => `
  <div class="game">
    <div class="img">
      <img class="img-game" src="${n.img}">
    </div>
        <div class="option">
          <h5 class="name">${n.name}</h5>
          <p class="platform">Автор: ${n.author}</p>
          <p class="p-release">Дата первой публикации: ${n.release}г.</p>
          <p class="genre">Жанр: ${n.genre}</p>
          <p class="p-rating">Оценка: ${n.rating}</p>
          <p class="p-annotation">Аннотация: ${n.annotation}</p>
        </div>
        
  </div>`).join('');

}

searh.addEventListener('keydown', () => {
  if (event.keyCode == 13) {
    funGameOutput(DATA.filter(n =>
      (searh.value == n.name)))
  }
})
let i = 1;
newBtn.addEventListener('click', () => {
  i++
  let k = i % 2
  if (k === 0) {
    funGameOutput(DATA.filter(n =>
      (n.release === "2012")
    ))
  } else if (k === 1) {
    funGameOutput(DATA)
  }

})

let funRead = () => {
  let i = 1;
  let annotation = document.querySelectorAll('.p-annotation');
  annotation.forEach(element => {
    element.addEventListener('click', () => {
      i++
      let k = i % 2
      if (k === 0) {
        element.style.overflow = "none";
        element.style.height = 'auto';
      } else if (k === 1) {
        element.style.overflow = "hidden";
        element.style.height = '3.6em';
      }
    })
  })
}

funGameOutput(DATA);

funRead();
