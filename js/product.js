// --------------------------ADD TO CARD--------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  
  var itemBox = document.querySelectorAll('.product__desciption'); // блок каждого товара

  // Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
  for(var i = 0; i < itemBox.length; i++){
    addEvent(itemBox[i].querySelector('.product__addtocart'), 'click', addToCart);
  }

  // Добавляем товар в корзину
  function addToCart(){
    this.disabled = true; // блокируем кнопку на время операции с корзиной
    var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
        parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
        itemId = this.getAttribute('data-id'),                              // ID товара
        itemTitle = parentBox.querySelector('.product__heading').innerHTML, // название товара
        itemPrice = parentBox.querySelector('.product__price').innerHTML.replace(/\s/g, ''),   // стоимость товара
        itemImg = this.getAttribute('data-img'),                            // фото товара      
        itemColor = parentBox.querySelector('.product__text').innerHTML;    // цвет
    if(cartData.hasOwnProperty(itemId)){     // если такой товар уже в корзине, то добавляем +1 к его количеству
      cartData[itemId][2] += 1;
    } else { // если товара в корзине еще нет, то добавляем в объект
      cartData[itemId] = [itemTitle, itemPrice, 1, itemImg, itemColor];
    }
    if(setCartData(cartData)){ // Обновляем данные в LocalStorage
      this.disabled = false; // разблокируем кнопку после обновления LS
    }
    console.log(JSON.parse(localStorage.getItem('cart')));
    // return false;
  }
  
  // Получаем данные из LocalStorage
  function getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
  }
  // Записываем данные в LocalStorage
  function setCartData(data){
    localStorage.setItem('cart', JSON.stringify(data));
  }

  // Функция кроссбраузерной установка обработчика событий
  function addEvent(elem, type, handler){
    if(elem.addEventListener){
      elem.addEventListener(type, handler, false);
    } else {
      elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
  }

  document.querySelectorAll(".product__price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
  })

  

    
});
document.addEventListener('scroll', function(e) {
  var menuOp = document.querySelector('.header__container-opacity');
    if (scrollY  >= 600) {      
        
        var pos = scrollY/2-600/2-49;
        menuOp.style.background = "rgba(0,0,0, 0.5)";
        if (scrollY <= (600+49*2)){
            menuOp.style.top = `${pos}px`
        }
        if (scrollY >= (600+49*2)){
            menuOp.style.top = `0px`
        }
        
    } else {
        menuOp.style.background = "rgba(0,0,0, 0)";
            
    }
});
