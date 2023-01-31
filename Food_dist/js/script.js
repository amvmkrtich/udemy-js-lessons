document.addEventListener('DOMContentLoaded', () => {
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
            
            days.innerHTML = t.days < 10 ? '0' + t.days : t.days;
            hours.innerHTML = t.hours < 10 ? '0' + t.hours : t.hours;
            minutes.innerHTML = t.minutes < 10 ? '0' + t.minutes : t.minutes;
            seconds.innerHTML = t.seconds < 10 ? '0' + t.seconds : t.seconds;
            
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

    const modalTimerId = setTimeout(openModal, 22000);

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

    new MenuCart(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCart(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container',
        'menu-item-has-children',
        'menu__item'
    ).render();

    new MenuCart(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        16,
        '.menu .container'
    ).render();
    
    
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
});