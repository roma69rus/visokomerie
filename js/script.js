/* preloader + задержка */ 
window.onload = function () {
    setTimeout(() => {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 800);
    }, 800);

}

document.addEventListener('DOMContentLoaded', function () {
    //SLIDER
    var swiper = new Swiper('.swiper-container', {  //объект слайдера
        autoplay: {
            delay: 10000,                           //время переключения 10сек
        },
        pagination: {
            el: '.swiper-pagination',
        },
        allowTouchMove: true,
        loop: true,
    });


    //BURGER

    const burgerBtn = document.querySelector('.burger');
    const menuClose = document.querySelector('.menu-close');
    const menuBurger = document.querySelector('.nav');

    burgerBtn.addEventListener('click', () => {
        menuBurger.classList.add('burger-active');
    });

    menuClose.addEventListener('click', () => {
        menuBurger.classList.remove('burger-active');
    });
});
