/* preloader + задержка */ 
// window.onload = function () {
// document.addEventListener('DOMContentLoaded', function () {
//     setTimeout(() => {
//         document.body.classList.add('loaded_hiding');
//         window.setTimeout(function () {
//             document.body.classList.add('loaded');
//             document.body.classList.remove('loaded_hiding');
//         }, 800);
//     }, 800);

// } 

document.addEventListener('DOMContentLoaded', function () {
    /* preloader + задержка */ 
    setTimeout(() => {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 800);
    }, 800);
   
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
    var overlay = document.querySelector('#overlay-menu');
    console.log(overlay)

    burgerBtn.addEventListener('click', () => {
        menuBurger.classList.add('burger-active');
        overlay.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        menuBurger.classList.remove('burger-active');
        overlay.classList.remove('active');     //и у overlay
    });

    overlay.addEventListener('click', function () {
        menuBurger.classList.remove('burger-active');
        this.classList.remove('active');                                 
    });
})


document.querySelectorAll(".featured__item_price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
})


document.querySelectorAll(".catalog__item_price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
})

var menuOpacity = document.querySelector('.header__container-opacity');
console.log(menuOpacity)
  document.addEventListener('scroll', function(e) {
    if(window.location.toString().indexOf('index.htm')>0) {    
        if ( scrollY  >= 460 ) {
            var pos = scrollY/2-460/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(0,0,0, 0.5)";
            menuOpacity.style.display = "block";
            if (scrollY <= (460+49*2)){
                menuOpacity.style.top = `${pos}px`
            }
            if (scrollY >= (460+49*2)){
                menuOpacity.style.top = `0px`
            }
            
            } else{
                menuOpacity.style.background = "rgba(0,0,0, 0)";
            }
    }
    if(window.location.toString().indexOf('/')>0) {    
        if ( scrollY  >= 460 ) {
            var pos = scrollY/2-460/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(0,0,0, 0.5)";
            menuOpacity.style.display = "block";            
            if (scrollY <= (460+49*2)){
                menuOpacity.style.top = `${pos}px`
            }
            if (scrollY >= (460+49*2)){
                menuOpacity.style.top = `0px`
            }
            
            } else{
                menuOpacity.style.background = "rgba(0,0,0, 0)";
            }
            console.log(menuOpacity.style.background);
            console.log("top", menuOpacity.style.top);
            console.log(scrollY);
    }

    if(window.location.toString().indexOf('catalog.htm')>0) {    
        if ( scrollY  >= 140 ) {
            var pos = scrollY/2-140/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(255,255,255, 0.5)";
            menuOpacity.style.display = "block";
            if (scrollY <= (140+49*2)){
                menuOpacity.style.top = `${pos}px`
            }
            if (scrollY >= (140+49*2)){
                menuOpacity.style.top = `0px`
            }
            
            } else{
                menuOpacity.style.background = "rgba(255,255,255, 0)";
            }
    }

    if(window.location.toString().indexOf('delivery.htm')>0) {    
        var header = document.querySelector('.header__logo_text');
        if ( scrollY  >= 10 ) {
            var pos = scrollY/2-10/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(0,0,0, 0.5)";
            menuOpacity.style.display = "block";
            if (scrollY <= (10+49*2)){
                menuOpacity.style.top = `${pos}px`
                header.classList.add("black");
            }
            if (scrollY >= (10+49*2)){
                menuOpacity.style.top = `0px`
                header.classList.remove("black");
            }
            
            } else{
                menuOpacity.style.background = "rgba(0,0,0, 0)";
                
            }
    }
    if(window.location.toString().indexOf('about.htm')>0) {    
        var header = document.querySelector('.header__logo_text_cat');
        if ( scrollY  >= 10 ) {
            var pos = scrollY/2-10/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(0,0,0, 0.5)";
            menuOpacity.style.display = "block";
            if (scrollY <= (10+49*2)){
                menuOpacity.style.top = `${pos}px`
                header.classList.add("black");
            }
            if (scrollY >= (10+49*2)){
                menuOpacity.style.top = `0px`
                header.classList.remove("black");
            }
            
            } else{
                menuOpacity.style.background = "rgba(0,0,0, 0)";
                
            }
    }
    if(window.location.toString().indexOf('cart.htm')>0) {    
        var header = document.querySelector('.header__logo_text');
        if ( scrollY  >= 10 ) {
            var pos = scrollY/2-10/2-49;
            // console.log(pos);
            menuOpacity.style.background = "rgba(0,0,0, 0.5)";
            menuOpacity.style.display = "block";
            if (scrollY <= (10+49*2)){
                menuOpacity.style.top = `${pos}px`
                header.classList.add("black");
            }
            if (scrollY >= (10+49*2)){
                menuOpacity.style.top = `0px`
                header.classList.remove("black");
            }
            
            } else{
                menuOpacity.style.background = "rgba(0,0,0, 0)";
                
            }
    }
});

