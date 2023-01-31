'use strict';

const box = document.querySelector('.box');

let observer = new MutationObserver((mutationRecords) => {
    console.log('test')
});
