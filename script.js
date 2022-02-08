import { modal } from "/modal/modal.js";

let windov = document.querySelectorAll('.window');
let block1 = document.querySelector('.block1')
let windows = document.querySelector('.windows');
let block2 = document.querySelector('.block2');
let data = document.querySelector('.date');
let time = document.querySelector('.time');
let contextMenu = document.querySelector('.contextmenu');
let context = document.querySelector('.context');
let close = document.querySelectorAll('.close-btn');
let fullScreen = document.querySelector('.fullscreen-img');
let fullScreenApp = document.querySelector('.fullscreen');
let fullScreenBtn = document.querySelectorAll('.fullscreen-btn');
let block = document.querySelectorAll('.block');
let app = document.querySelectorAll('.app');
let headerAll = document.querySelectorAll('.header-all');
let hide = document.querySelectorAll('.hide-btn');
let puskImg;
let iconArr = [`<img src="img/Папка с проектами.png" class="pusk-img pusk-folder-project">`,
    `<img src="img/Папка.png" class="pusk-img pusk-folder">`,
    `<img src="img/Текстовый файл.png" class="pusk-img pusk-text-app">`]

if (localStorage.getItem('fon') != undefined) {
    windows.style.backgroundImage = `url(${localStorage.getItem('fon')})`;
    document.querySelector('.background-block').style.backgroundImage = `url(${localStorage.getItem('fon')})`
}
let funAnimBlockEmerging = (element, opt1, opt2) => {
    element.animate([
        { opacity: opt1 },
        { opacity: opt2 }
    ], {
        duration: 250,
    });
}

let funAnimEmergingWindow = (element) => {
    element.animate(
        [
            { transform: 'scale(0.7)' },
            { transform: 'scale(1)' }
        ], {
        duration: 250,
    });
}

document.querySelector('.enter').addEventListener('click', () => {
    block1.style.display = 'none';
    block1.style.opacity = 0;
    block2.style.display = 'block';
    block2.style.opacity = 1;
    funAnimBlockEmerging(block1, 1, 0);
    funAnimBlockEmerging(block2, 0, 1);
})

document.querySelector('.header').addEventListener('contextmenu', () => {
    event.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
})
document.querySelector('.header').addEventListener('click', () => {
    contextMenu.style.display = 'none';
})

context.addEventListener('click', () => {
    contextMenu.style.display = 'none';
    modal(document.querySelector('.modal'), document.querySelector('.close'))
})

document.querySelector('.read').addEventListener('click', () => {
    let fon = document.querySelector('.fon');
    windows.style.backgroundImage = `url(${fon.value})`;
    localStorage.setItem('fon', fon.value)
    fon.value = '';
})

document.querySelector('.pc').addEventListener('dblclick', () => {
    funAnimBlockEmerging(block[0], 0, 1);
    block[0].style.display = 'block';
    block[0].style.opacity = 1;
})

app.forEach((element, index) => {
    element.addEventListener('dblclick', () => {
        if (block[index + 1].style.display != 'block') {

            funAnimBlockEmerging(block[index + 1], 0, 1);
            funAnimEmergingWindow(windov[index + 1]);
            block[index + 1].style.opacity = '1';
            block[index + 1].style.display = 'block';

            document.querySelector('.icons-pusk').insertAdjacentHTML('beforeend', `${iconArr[index]}`);
            puskImg = document.querySelectorAll('.pusk-img');
            puskImg.forEach(e => {
                funAnimBlockEmerging(e, 0, 1);
            })
            document.querySelector('.pusk-folder-project').addEventListener('click', () => {
                block[1].style.display = 'block'
                /*block[1].animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 250,
                });*/
            })
            document.querySelector('.pusk-folder').addEventListener('click', () => {
                block[2].style.display = 'block';
                /*block[2].animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 250,
                })*/
            })
            document.querySelector('.pusk-text-app').addEventListener('click', () => {
                block[3].style.display = 'block';
                
                /*block[3].animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 250,
                })*/
            }) 
        }

    })
})

close.forEach((element, indexClose) => {
    element.addEventListener('click', () => {

        if (indexClose == 0) {
            indexClose = indexClose + 1;
        }
        block[indexClose - 1].style.opacity = 0;
        funAnimBlockEmerging(block[indexClose - 1], 1, 0);
        setTimeout(() => {
            if (block[indexClose - 1].style.opacity == '0') {
                block[indexClose - 1].style.display = 'none';
            }
        }, 300)


        puskImg.forEach(e => {
            funAnimBlockEmerging(e, 1, 0);

        })
        setTimeout(() => {
            switch (indexClose) {
                case 2:
                    document.querySelector('.pusk-folder-project').remove();
                    break;
                case 3:
                    document.querySelector('.pusk-folder').remove();
                    break;
                case 4:
                    document.querySelector('.pusk-text-app').remove();
                    break;
            }
        }, 250)
    })
})

let dateFun = () => {
    let date = new Date();
    if (date.getMonth() + 1 <= 10 && date.getDate() <= 10) {
        data.innerHTML = `0${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`;
    } else if (date.getMonth() + 1 <= 10 && date.getDate() >= 10) {
        data.innerHTML = `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`;
    } else if (date.getMonth() + 1 >= 10 && date.getDate() <= 10) {
        data.innerHTML = `0${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    } else if (date.getMonth() + 1 >= 10 && date.getDate() >= 10) {
        data.innerHTML = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

}

setInterval(dateFun, 1000);

let timeFun = () => {
    let date = new Date();
    if (date.getHours() < 10 && date.getMinutes() < 10) {
        time.innerHTML = `0${date.getHours()}:0${date.getMinutes()}`;
    } else if (date.getHours() > 10 && date.getMinutes() < 10) {
        time.innerHTML = `${date.getHours()}:0${date.getMinutes()}`;
    } else if (date.getHours() < 10 && date.getMinutes() > 10) {
        time.innerHTML = `0${date.getHours()}:${date.getMinutes()}`;
    } else if (date.getHours() > 10 && date.getMinutes() > 10) {
        time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    }

}

setInterval(timeFun, 1000);

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        block1.style.display = 'none';
        block1.style.opacity = 0;
        block2.style.display = 'block';
        block2.style.opacity = 1;
        funAnimBlockEmerging(block1, 1, 0);
        funAnimBlockEmerging(block2, 0, 1);
    }
}, false);
fullScreen.addEventListener("click", function (e) {

    toggleFullScreen();

}, false);
fullScreenApp.addEventListener("dblclick", function (e) {

    toggleFullScreen();

}, false);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.querySelector('.fullscreen-icon').src = '/img/expand (2).png';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            document.querySelector('.fullscreen-icon').src = '/img/expand (1).png';
        }
    }
}

fullScreenBtn.forEach((element, index) => {
    console.log(fullScreenBtn)
    element.addEventListener('click', () => {

        if (windov[index + 1].style.top != '0px') {
            windov[index + 1].style.width = '99.5%';
            windov[index + 1].style.height = '99%';
            windov[index + 1].style.top = '0px';
            windov[index + 1].style.left = '0px';
            windov[index + 1].style.gridTemplateRows = '3% 3% 86% 5%';
            headerAll.forEach(elem => {
                elem.style.gridTemplateColumns = '3% 86.8% 52px 52px 52px';
            })
            setTimeout(fun1())
        } else {
            windov[index + 1].style.width = '750px';
            windov[index + 1].style.height = '365px';
            windov[index + 1].style.left = '20%';
            windov[index + 1].style.top = '20%';
            windov[index + 1].style.gridTemplateRows = '7% 5% 83% 5%';
            headerAll.forEach(elem => {
                elem.style.gridTemplateColumns = '3% 76% 52px 52px 52px';
            })
            setTimeout(fun1('px'))
        }
    })
})


hide.forEach((element, index) => {
    element.addEventListener('click', () => {

        funAnimBlockEmerging(block[index + 1], 1, 0);

        setTimeout(() => {
            block[index + 1].style.display = 'none';
        }, 250)

    })
})
let puskOpenWindow = () => {
    
}

let i = 10;
windov.forEach(elem => {
    elem.addEventListener('click', () => {
        elem.style.zIndex = i++;
    })
})
let fun1 = (text) => {
    windov.forEach((element) => {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + text;
            element.style.left = (element.offsetLeft - pos1) + text;
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    })
}
setTimeout(fun1('px'))