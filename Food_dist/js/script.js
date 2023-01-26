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
    const deadLine = '2023-03-01';
    
    function getTimeRemaining(endTime){
        let now = new Date();
        const t = Date.parse(endTime) - Date.parse(now),
            days = Math.floor(t/(60 * 60 * 1000 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor( (t/(1000 * 60)) % 60 ),
            seconds = Math.floor((t/1000) % 60);
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
            
            days.innerHTML = t.days < 10 ? '0' + t.days : t.days;
            hours.innerHTML = t.hours < 10 ? '0' + t.hours : t.hours;
            minutes.innerHTML = t.minutes < 10 ? '0' + t.minutes : t.minutes;
            seconds.innerHTML = t.seconds < 10 ? '0' + t.seconds : t.seconds;
            
            if(t.total <= 0) clearInterval(timeInterval);
        }
    }

    setClock('.timer', deadLine);
});