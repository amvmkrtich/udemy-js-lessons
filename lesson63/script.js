const btns = document.querySelectorAll('button'),
        wrapper = document.querySelector('.btn-block');;


console.log(btns[0].classList.item(0));
console.log(btns[0].classList);

btns[0].addEventListener('click', () => {
    btns[1].classList.toggle('red')
});


wrapper.addEventListener('click', (e) => {
    if(e.target && e.target.matches('.blue')){
        console.log('this is a button')
    }
});


