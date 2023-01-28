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
    const deadLine = '2023-01-30';
    
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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    
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

        if(e.target.matches('.modal')){
            closeModal();
        }
    });
    modalCloseBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' || modal.matches('.show')){
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

});