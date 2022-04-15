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

document.querySelectorAll(".featured__item_price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
})


document.querySelectorAll(".catalog__item_price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
})

var menu = document.querySelector('.header__container');
console.log(menu)
  document.addEventListener('scroll', function(e) {
    // var top = this.scrollTop();
    if ( scrollY  >= 450 ) {
      menu.style.background = "rgba(1,1,1, 0.5)";//    (background:'green');
    } else{
      menu.style.background = "rgba(1,1,1, 0)";
    }
  });