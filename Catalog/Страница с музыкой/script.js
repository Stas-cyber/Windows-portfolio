import { DATA } from "./data.js";

let number = 0;

const menuDropdown = document.querySelector('.menu-dropdown'),
  searh = document.querySelector('.searh-input'),
  newBtn = document.querySelector('.new'),
  play = document.querySelector('.play'),
  pause = document.querySelector('.pause'),
  player = document.querySelector('audio'),
  prev = document.querySelector('.btn-prev'),
  next = document.querySelector('.btn-next'),
  volume = document.querySelector('.in-volume'),
  time = document.querySelector('.time'),
  timeP = document.querySelector('.p-time'),
  audioTrack = document.querySelector('.audio-track');
  

let funFilterGame = () => {
  let genre = [...menuDropdown.querySelectorAll('.genre input:checked')].map(n => n.value);
  let release = [...menuDropdown.querySelectorAll('.release input:checked')].map(n => n.value);
  let rating = [...menuDropdown.querySelectorAll('.rating input:checked')].map(n => n.value);

  funGameOutput(DATA.filter(n =>
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
  <button class="pause btn-pause">
    <svg class="plyr-pause">
      <path d="M6 1H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm6 0c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1h-3z"></path>
    </svg>
  </button>
  <button class="play btn-play-track">
    <svg class="plyr-play track-play">
      <path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path>
    </svg>
  </button>
      <div class="option">
        <h5 class="name">${n.number}. ${n.name}</h5>
        <p class="name">Альбом: ${n.nameAlbum}</p>
        <p class="p-genre">Жанр: ${n.genre}</p>
        <p class="p-time">Год выхода альбома: ${n.release}г.</p>
        <p class="p-time">Оценка: ${n.rating}</p>
      </div>
      
</div>`).join('');
funPlayTrack();
}
/**/
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
      (n.release === "2021")
    ))
  } else if (k === 1) {
    funGameOutput(DATA)
  }

})

let playPause = (style1, style2) => {
  play.style.display = style1;
  pause.style.display = style2;
}

let timeFun = () => {
  setInterval(() => {
    let timeSec = Math.floor(player.currentTime % 60);
    let timeMin = Math.floor(player.currentTime / 60);

    if (timeSec < 10) {
      timeP.innerHTML = `0:0${timeSec}`;
    } else {
      timeP.innerHTML = `${timeMin}:${timeSec}`;
    }

  }, 1000)
}
let funPlay = () => {
  player.play();
  playPause('none', 'block');
  timeFun();
  document.querySelector('.track').innerHTML = `
    <img class="img-track" src="${DATA[number].img}">
    <p class="name-track">${DATA[number].name}</p>`
}
play.addEventListener('click', () => {
  funPlay()
})
pause.addEventListener('click', () => {
  player.pause();
  playPause('block', 'none');
})

next.addEventListener('click', () => {
  number++;
  if (number >= 5) {
    number = 0;
  }
  player.src = 'music/' + DATA[number].file;
  funPlay()

})
prev.addEventListener('click', () => {
  number--;
  if (number <= 0) {
    number = 4;
  }
  player.src = 'music/' + DATA[number].file;
  funPlay()

})

player.addEventListener('timeupdate', () => {
  let currentTime = player.currentTime;
  let duration = player.duration;
  let progress = (currentTime / duration) * 100;
  time.style.width = `${progress}%`
})
audioTrack.addEventListener('click', (e) => {
  let progressWidth = audioTrack.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = player.duration;

  player.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  funPlay()
})

volume.addEventListener('mousemove', () => {
  player.volume = volume.value / 100;
})

let funPlayTrack = () => {
  let playTrack = document.querySelectorAll('.btn-play-track');
  playTrack.forEach((element, index) => 
  element.addEventListener('click', () => {
    number = index;
    player.src = 'music/' + DATA[index].file;;
    playPause('none', 'block');
    timeFun();
    document.querySelector('.track').innerHTML = `
      <img class="img-track" src="${DATA[number].img}">
      <p class="name-track">${DATA[number].name}</p>`
    player.play();
  })
)
}


funGameOutput(DATA);




