window.addEventListener('DOMContentLoaded', function() {

// TABS

    
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function HideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });
           
        tabs.forEach(item=> {
            item.classList.remove('tabheader__item_active');
        });
    };
 


    function  ShowTabContent (i=0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show','fade');
        tabs[i].classList.add('tabheader__item_active');
    };

    
    HideTabContent();
    ShowTabContent();

tabsParent.addEventListener('click', function (event){
    if (event.target && event.target.classList.contains('tabheader__item')) {
        tabs.forEach((item,i) =>{
           if (event.target == item) {
               HideTabContent();
               ShowTabContent(i);
           };
        });
    };
});


// TIMER

const deadline = '2022-01-28';

function getTimeRemaining (endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t/(1000*60*60*24)),
          hours = Math.floor((t/(1000*60*60))%24),
          minutes = Math.floor((t/(1000*60))%60),
          seconds = Math.floor((t/1000)%60);

    return{
        'total' : t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    
};


function setClock (selector, endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds= timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();
    
    function updateClock(){
        const t = getTimeRemaining(endtime);
        if (t.total <= 0){
            clearInterval(timeInterval);
            console.log('time is off');
            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        }   else {
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    };


    // function updateClock(){
    //     const t = getTimeRemaining(endtime);
    //     days.innerHTML = getZero(t.days);
    //     hours.innerHTML = getZero(t.hours);
    //     minutes.innerHTML = getZero(t.minutes);
    //     seconds.innerHTML = getZero(t.seconds);
        
        
    //     if (t.total <= 0){
    //     clearInterval(timeInterval);
    //     };
    // };
};





setClock('.timer',deadline);

function getZero (num) {
 if (num >= 0 && num < 10) {
     return `0${num}`;
 } else {
     return num;
 }
};











// MODAl


const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

function openModal (){
    // modal.classList.add('show');
    // modal.classList.remove('shide');
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
};

function closeModal () {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
};

modalTrigger.forEach(btn =>{
    btn.addEventListener('click', openModal);
});

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) =>{
    if (e.target === modal) {
        closeModal();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

const modalTimerId = setInterval(openModal,5000);

function showModalByScroll (){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);

});