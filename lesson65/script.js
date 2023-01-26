
const countries = ['Armenia', 'France', 'Russia', 'Germany'];
countries.forEach(item => {
    const timerId = setTimeout((text) => {
        // console.log(`Hello ${text}`)
    }, 2000, item);
});


let id = setTimeout(function log(){
    console.log('test');

    id = setTimeout(log, 500);
}, 500);


const btn = document.querySelector('.btn');
let timerId;

function myAnimation(){
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame(){
        if(pos == 300){
            clearInterval();
        }else{
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);