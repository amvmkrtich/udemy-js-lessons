'use strict';

const box = document.querySelector('.box'),
    btn = document.querySelector('button');

const width = box.clientWidth;
const height = box.clientHeight;

const offWidth = box.offsetWidth;
const offHeight = box.offsetHeight;

const scrollWidth = box.scrollWidth;
const scrollHeight = box.scrollHeight;

console.log(box.getBoundingClientRect());
console.log(window.getComputedStyle(box).height)

btn.addEventListener('click', function (){
    box.style.height = box.scrollHeight + 'px';
    console.log(box.getBoundingClientRect());
    setTimeout(() => {

        console.log(window.getComputedStyle(box).height);
    }, 1200);
});



// console.log(`width - ${width}, \n height - ${height}, \n offWidth - ${offWidth}, \n offHeight - ${offHeight}, \n scrollWidth - ${scrollWidth}, \n scrollHeight - ${scrollHeight}`)

