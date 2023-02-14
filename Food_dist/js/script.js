document.addEventListener('DOMContentLoaded', () => {
    function numberFormatting(num){
        return num < 10 ? '0' + num : num;
    }
    function str2num(str){
        return +(str.replace(/\D+/, ''));
    }

    
    // Tabs
    function tabRealization() {
        const tabContent = document.querySelectorAll('.tabcontent'),
            tabWrapper = document.querySelector('.tabheader__items'),
            tabs = tabWrapper.querySelectorAll('.tabheader__item');

        function hideTabContents(){
            tabContent.forEach((item) => item.style.display = 'none');

            tabs.forEach((item => item.classList.remove('tabheader__item_active')));
        }

        function showTabContent(i = 0){
            tabContent[i].style.display = 'block';
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContents();
        showTabContent();

        tabWrapper.addEventListener('click', (e) => {
            if(e.target && e.target.matches('.tabheader__item')){
                tabs.forEach((item, i) => {
                    if(e.target == item){
                        hideTabContents();
                        showTabContent(i);
                    }
                });
            }
        });
    }
    tabRealization();
    
    // Timer
    const deadLine = '2023-03-03';
    
    function getTimeRemaining(endTime){
        let now = new Date();
        const t = Date.parse(endTime) - Date.parse(now),
            days = t > 0 ? Math.floor(t/(60 * 60 * 1000 * 24)) : 0,
            hours = t > 0 ? Math.floor((t / (1000 * 60 * 60)) % 24) : 0,
            minutes = t > 0 ? Math.floor( (t/(1000 * 60)) % 60 ) : 0,
            seconds = t > 0 ? Math.floor((t/1000) % 60) : 0;

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    
    function setClock(sel, endTime){
        const timer = document.querySelector(sel),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000)
        ;
        updateClock();
        function updateClock(){
            const t = getTimeRemaining(endTime);

            // if(t.total <= 0){
            //     t.days = '0';
            //     t.hours = '0';
            //     t.minutes = '0';
            //     t.seconds = '0';
            // }
            
            days.innerHTML = numberFormatting(t.days);
            hours.innerHTML = numberFormatting(t.hours);
            minutes.innerHTML = numberFormatting(t.minutes);
            seconds.innerHTML = numberFormatting(t.seconds);
            
            if(t.total <= 0) clearInterval(timeInterval);
        }
    }

    setClock('.timer', deadLine);
    
    
    // modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    
    function openModal(){
        document.body.style.overflowY = 'hidden';
        modal.classList.add('show');
        modal.classList.remove('hide');
        clearInterval(modalTimerId);
    }
    function closeModal(){
        document.body.style.overflowY = '';
        modal.classList.add('hide');
        modal.classList.remove('show');
    }
    
    document.addEventListener('click', (e) => {
        if(e.target.hasAttribute('data-modal')){
            openModal();
        }

        if(e.target.matches('.modal') || e.target.hasAttribute('data-close')){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.matches('.show')){
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 22000);

    function showModalOnScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.body.scrollHeight - 5){
            openModal();

            window.removeEventListener('scroll', showModalOnScroll);
        }
    }

    window.addEventListener('scroll', showModalOnScroll);

    // menu perd day
    const menu = document.querySelector('.menu__field'),
        container = menu.querySelector('.container');

    class Cart{
        constructor(imgUrl, title, text, pricePerDay) {
            this.imgUrl = imgUrl;
            this.title = title;
            this.text = text;
            this.pricePerDay = pricePerDay;
        }

        createHTML(){
            const cart = document.createElement('div');
            cart.classList.add('menu__item');

            const img = document.createElement('img');
            img.setAttribute('src', `img/tabs/${this.imgUrl}.jpg`);
            img.setAttribute('alt', this.imgUrl);
            cart.append(img);

            const title = document.createElement('h3');
            title.classList.add('menu__item-subtitle');
            title.innerText = this.title;
            cart.append(title);

            const desc = document.createElement('div');
            desc.classList.add('menu__item-descr');
            desc.innerText = this.text;
            cart.append(desc);

            const divider = document.createElement('div');
            divider.classList.add('menu__item-divider');
            cart.append(divider);

            const price = document.createElement('div');
            price.classList.add('menu__item-price');
            price.innerHTML = `
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.pricePerDay}</span> грн/день</div>
            `;
            cart.append(price);

            return cart;
        }
    }


    // menu cart from lesson
    class MenuCart{
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.classes = classes;
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
        }

        changeUAH(){
            return +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(clas => element.classList.add(clas));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeUAH()}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    const getResources = async (url) => {
          const res = await fetch(url);

          if(!res.ok){
              throw new Error(`Cound not fetch ${url}, status: ${res.status}`);
          }

          return await res.json();
    };

    /*getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, alt, title, descr, price}) => {
                // let {img, alt, title, desc, price} = obj;
                new MenuCart( img, alt, title, descr, price, '.menu .container' ).render();
            });
        });*/

    axios.get('http://localhost:3000/menu')
        .then(resp => {
            resp.data.forEach(({img, alt, title, descr, price}) => {
                new MenuCart(img, alt, title, descr, price, '.menu .container').render();
            });
        });

    // Forms
    const forms = document.querySelectorAll('form'),
        message = {
            loading: 'img/spinner.svg',
            success: 'Thank you we will contact to you',
            fail: 'Something went wrong'
        };

    forms.forEach(form => {
        postData(form);
    });


    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submit = form.querySelector('button.btn');
            const statusMsg = document.createElement('img');
            statusMsg.setAttribute('src', message.loading);
            submit.append(statusMsg);

            const r = new XMLHttpRequest();
            r.open('POST', 'server.php');

            r.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach((val, key) => {
                object[key] = val;
            });
            const json = JSON.stringify(object);

            r.send(json);

            r.addEventListener('load', (e) => {
                if(r.status === 200){
                    console.log(r.response);
                    showThanksModal(message.success);
                    form.reset();
                        statusMsg.remove();
                    setTimeout(() => {
                    }, 2000);
                }else{
                    showThanksModal(message.fail);
                }
            });
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>                
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        },3000);
    }

    // slider
    const slider = document.querySelector('.offer__slider'),
        prev = slider.querySelector('.offer__slider-prev'),
        next = slider.querySelector('.offer__slider-next'),
        slides = slider.querySelectorAll('.offer__slide'),
        slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
        slidesField = slider.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1,
        offset = 0;

    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.cssText = `
        display: flex;
        width: ${slides.length*100}%;
        transition: all .5s ease;
    `;
    slider.style.position = 'relative';
    slides.forEach(item => item.style.width = width);
    slider.querySelector('#current').textContent = numberFormatting(slideIndex);
    slider.querySelector('#total').textContent = numberFormatting(slides.length);

    /*showSlide(slideIndex);


    function showSlide(n){
        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        slider.querySelector('#current').textContent = numberFormatting(slideIndex);
    }

    function changeSlides(n){
        showSlide(slideIndex += n);
    }
*/

    // dots
    const dots = document.createElement('ol');
    dots.classList.add('carousel-dots');
    let dotsInner = '';
    for(let i = 0; i < slides.length; i++){
        let isActive = '';
        if(i+1 === slideIndex){
            isActive = 'is-active';
        }
        dotsInner += `
            <li class="dot ${isActive}" data-dot-index="${i+1}"></li>
        `;
    }
    dots.innerHTML = dotsInner;
    slider.append(dots);

    function setDotActive(dotIndex){
        dots.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.remove('is-active');
            if(i+1 == dotIndex) {
                dot.classList.add('is-active');
            }
        });
    }

    dots.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.closest('.dot')){
            slideIndex = e.target.dataset.dotIndex;
            setDotActive(slideIndex);
            offset = str2num(width) * (slideIndex - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slider.querySelector('#current').textContent = numberFormatting(slideIndex);
        }
    });

    slider.querySelector('.offer__slider-counter').addEventListener('click', (e) => {
        e.preventDefault();

        if( e.target.closest('.offer__slider-prev') ){
            if(offset == 0){
                offset = str2num(width) * (slides.length - 1);
            }else{
                offset -= str2num(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == 1){
                slideIndex = slides.length;
            }else{
                slideIndex--;
            }
            slider.querySelector('#current').textContent = numberFormatting(slideIndex);
            setDotActive(slideIndex);
        }
        if( e.target.closest('.offer__slider-next') ){
            if(offset === str2num(width) * (slides.length - 1)){
                offset = 0;
            }else{
                offset += str2num(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == slides.length){
                slideIndex = 1;
            }else{
                slideIndex++;
            }
            slider.querySelector('#current').textContent = numberFormatting(slideIndex);
            setDotActive(slideIndex);
        }
    });

    // calculator
    const result = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
        height,
        weight,
        age,
        ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;
    localStorage.setItem('sex', sex);
    localStorage.setItem('ratio', ratio);

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if(sex === 'female'){
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
        }else{
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
        }
    }

    function initLocalSettings(selector, activeClass){
        const elems = document.querySelectorAll(selector);

        elems.forEach(el => {
            el.classList.remove(activeClass);
            if(el.getAttribute('id') === localStorage.getItem('sex')){
                el.classList.add(activeClass);
            }
            if(el.dataset.ratio === localStorage.getItem('ratio')){
                el.classList.add(activeClass);
            }
        });
    }
    
    calcTotal();

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInfo('#gender');
    getStaticInfo('.calculating__choose_big');

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

    function getStaticInfo(parent, activeClass='calculating__choose-item_active'){
        const elems = document.querySelectorAll(`${parent} div`);
        document.querySelector(parent).addEventListener('click', (e) => {
            if(!e.target.closest('.calculating__choose-item')) return false;

            if(e.target.hasAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            }else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            elems.forEach(el => {
                el.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);

            calcTotal();
        });

    }

    function getDynamicInfo(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input', (e) => {
            if(input.value.search(/\D/) !== -1){
                input.style.backgroundColor = '#f00';
            }else{
                input.style.backgroundColor = '';
            }
            switch (input.getAttribute('id')){
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }
});

