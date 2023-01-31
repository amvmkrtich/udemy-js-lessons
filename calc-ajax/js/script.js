'use struct';

const inputRub = document.querySelector('#rub'),
     inputUSD = document.querySelector('#usd');

inputRub.addEventListener('input', (e) => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
/*
    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.response);
            inputUSD.value =  (+e.target.value / data.current.usd).toFixed(2);
        }else{
            inputUSD.value = 'Something went wrong, please try again';
        }
    });*/

    request.addEventListener('load', () => {
        if(request.status === 200){
            const data = JSON.parse(request.response);
            inputUSD.value = (+inputRub.value / data.current.usd).toFixed(2);
        }else{
            inputUSD.value = 'Something went wrong...';
        }
    });
});
