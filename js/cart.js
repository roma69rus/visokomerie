//Телефон для связи с менеджером через Whatsapp
const phoneNumber = "79811612280";

// Получаем данные из LocalStorage
var cartData = getCartData();

//список элементов
var cart_ul = document.getElementById("cart__list");

var cartText = document.getElementById('cart__text'); //селектор объекта "корзина пустая"
var cartTotal = document.getElementById('cart__grandtotal_text'); //ИТОГО

var shippingForm = document.getElementById('cart__shipping_wrapper'); //форма обратной связи (скрыть, показать)


var getPhoneStr = document.querySelectorAll('.phone');     //инпут номера телефона
var getNameStr = document.getElementById('clientname'); //инпут имени

var checkoutBtn = document.getElementById('cart__total_checkout'); //Кнопка ЗАКАЗАТЬ


// НЕРАБОТАЕТ!!!!!!!!!!!!!!!!!!!!!!!!1
// var closeBtn = document.querySelectorAll(".cart__list-wrapper::after");
// closeBtn.forEach(element => {
//   element.addEventListener('click', function (e) {
//     console.log("click");
//   }) 
// }) 
//console.log(JSON.stringify(closeBtn))



document.addEventListener('DOMContentLoaded', function () {
  
  loadCartItem ();

  //Очистка корзины и localStorage по кнопке
  addEvent(document.getElementById('cart__clear'), 'click', function(e){
    clearUl(cart_ul);
    localStorage.removeItem('cart');
    cartText = document.getElementById('cart__text');
    cartText.style.display = "block"; 
    cartText.innerHTML = 'Корзина пустая';
    shippingForm.style.display = "none";
    var shippingFormTxt = document.getElementById('cart__text-whatsapp');
    shippingFormTxt.style.display = "none";
    // cartText += "Корзина пуста";    
    // cartCont.innerHTML = 'Корзина очишена.';
  });

  //Установка маски на поле заполнения телефона
  maskPhone(getPhoneStr);

  //Окраска телефона в случае ошибки (Динамика - во время заполнения)
  getPhoneStr[0].addEventListener("input", function (e) {
    if (!ValidPhone(this.value)) {
      getPhoneStr[0].style.border = '3px solid red';
    } else {
      getPhoneStr[0].style.border = '1px solid black';
      // console.log("tyt");
    }
  })

  //Окраска Имени, если не заполнено (Динамика - во время заполнения)
  getNameStr.addEventListener("change", function (e) {
  if (ValidName(getNameStr.value))
  {
    getNameStr.style.border = '1px solid black';
  } else
    getNameStr.style.border = '3px solid red';
  })

  // ОТПАРВИТЬ EMAIL по НАЖАТИЮ КНОПКИ
  addEvent(document.getElementById('cart__total_checkout'), 'click', function(e){
    if ((!ValidPhone(getPhoneStr[0].value)) & (!ValidName(getNameStr.value))) {
      getPhoneStr[0].style.border = '2px solid red'
      getPhoneStr[0].addEventListener('click', function(e) {
        e.preventDefault();
      })
    } else {
      //sendEmail(getSendText().get("email"), getPhoneStr[0].value);     
      OpenWatsappModal (this, getSendText().get("whatsapp"))
    } 
  });

  document.querySelectorAll('.cart__list-qty').forEach(item => {
    item.oninput = function (e) {
      var qty = item.value;
      var id = item.closest('li').getAttribute("data-id");
      cartData[id][2] = qty;   //2 - qty
      setCartData(cartData);
    }
    item.addEventListener('focusout', function (e) {
      if (this.value == '')
        this.value = 1;
        var qty = item.value;
        var id = item.closest('li').getAttribute("data-id");
        cartData[id][2] = qty;
        setCartData(cartData);
    })
  })

  //Добавление пробела в цену
  document.querySelectorAll(".cart__price").forEach(item => {
    var formating = item.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); 
    item.innerHTML = formating;
  })

});

function loadCartItem ()
{
  cartData = getCartData();

  //ЗАПОЛНЯЕМ СТРАНИЦУ ТОВАРАМИ
  var totalPrice = 0; 
  for(var items in cartData) {
    if(cartData.hasOwnProperty(items)){
            
      var newli = document.createElement("li");
      newli.classList.add("cart__list-item");    
      //newli.id = items;
      newli.setAttribute("data-id", items);

      var product_name = cartData[items][0];
      var price        = cartData[items][1];
      var quantity     = cartData[items][2];   
      var img          = cartData[items][3];
      var color        = cartData[items][4];
      var price_num = Number (price.substring(0) * quantity);   //обрезаем доллар substring, переводим в number и умножаем на количество $100 -> 100
      totalPrice += price_num;   
      
      newli.innerHTML = writeTextli(product_name, price, color, quantity, img);      
      // console.log(newli);
      cart_ul.appendChild(newli);        
      
      //Добавляем обработку события - удаление конкретного товара из корзины по крестику
      document.querySelectorAll(".cart__list-close").forEach(item => {
        item.addEventListener('click', function (e) {
          var index = this.closest('li').getAttribute("data-id");
          console.log(index);
          delete cartData[index];
          setCartData(cartData);
          clearUl(cart_ul);        
          loadCartItem ();
        });
      })
      cartText.style.display = "none";
      cartTotal.innerHTML = "ИТОГО ₽ " + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");;
    } 
  } 

  var length = 0;
  for(var items in cartData) {
    length++
  }
  // console.log(length)
  
  if (length=='0'){
    // если в корзине пусто, то сигнализируем об этом
    cartText.style.display = "block"; 
    cartText.innerHTML = 'Корзина пустая';
    shippingForm.style.display = "none";
  }
    
}

//Функция создает текст верстки для списка товаров в корзине
function writeTextli (name, price, color, quantity, img){
    var html_text = "";
    
    html_text += `<img src='${img}' alt='Man in hoody' width='262' height='306' class='cart__list-img'>`;
    html_text += "<div class='cart__list-wrapper'>";
    html_text +=      `<h3 class='cart__list-heading'>${name}</h3>`;
    html_text +=      '<div class="cart__list-close"></div>';
    html_text +=      `<p class='cart__list-text'>Price: <span class='cart__price'>${price}</span></p>`;
    html_text +=      `<p class='cart__list-text'>Color: ${color}</p>`;                    
    html_text +=      "<div class='cart__list-subwrapper'>"
    html_text +=          "<label class='cart__list-text'>Quantity:</label>"
    html_text +=          "<input type='number' min='1' step='1' class='cart__list-qty' value='" + quantity+ "'>"
    html_text +=      "</div>"
    html_text +="</div>";

    return html_text;    
}

//Функция получания данных из localStorage
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

function sendEmail(mailText, subjecttext) {
  Email.send({
    SecureToken : "d3bf2e8a-47cd-46b0-a883-8db282bd0e5a",    
    To : 'admin@visokomerie.ru',
    // To : 'roma69rus@gmail.com',
    // To : 'pertuevr@gmail.com',
    From : "admin@visokomerie.ru",
    Subject : subjecttext,
    Body : mailText
  })//.then(
    //OpenWatsappModal (this)
  //); 
}

// Функция, которая генерирует текст для Email Whatsapp
function getSendText() {
  const arr = new Map();
  var email_text = 'Сформирован заказ:' + "<br>";
  var whatsapp_text = "Привет, я хочу сделать заказ на сайте visokomerie.ru: " + "\n";
  for (var items in cartData){
    var product_name = cartData[items][0];
    var price = cartData[items][1];
    var quantity = cartData[items][2];   
    // var img = cartData[items][3];
    var color = cartData[items][4];

    email_text += "- " + product_name + " " + color + " Количество: " + quantity + " Цена: " + price + ";<br>";
    whatsapp_text += "- " + product_name + " " + color + " Количество: " + quantity + " Цена: " + price + ";\n";
  }
  email_text+="Имя клиента: " + getNameStr.value + "<br>" + "Телефон :" + getPhoneStr[0].value;
  whatsapp_text += "Меня зовут " + getNameStr.value;
  
  //ассоциативный массив - коллекция Map
  arr
    .set("email", email_text)
    .set("whatsapp", whatsapp_text);

  return arr;
}

//валидация номера телефона
function ValidPhone(phoneNumber) {
  var re = /[^\w]{1}7\ \([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}$/; //https://regexr.com/
  var valid = re.test(phoneNumber);
  if (valid) 
    return true;
  else 
    return false;
}  

//валидация Имени клиента
function ValidName(ClientName) {
  if (ClientName != '') 
    return true;
  else 
    return false;
}  

//Модаьное окно и обработка кнопки whatsapp
function OpenWatsappModal (btn, whatsappTxt)
{
  var modalId = btn.getAttribute('data-modal'),
  modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]'),
  overlay = document.querySelector('#overlay-modal');

  // var modalElem = document.querySelector('#modal-1');
  modalElem.classList.add('active');
  overlay.classList.add('active');

  var watsup_btn = document.querySelector('#watsup_btn');
  watsup_btn.addEventListener('click', function(e) {
    var txt = "https://wa.me/" + phoneNumber +"?text=" + encodeURI(whatsappTxt);
    window.open(txt, "_blank");
    console.log(txt);
    console.log(whatsappTxt);
    console.log(getNameStr);


    cartText = document.getElementById('cart__text');
    cartText.style.display = "block"; 
    cartText.innerHTML = 'Заказ оформлен';
    shippingForm.style.display = "none";
    var shippingFormTxt = document.getElementById('cart__text-whatsapp');
    shippingFormTxt.style.display = "none";
    clearUl(cart_ul);
    localStorage.removeItem('cart');
  });

  overlay.addEventListener('click', function () {
    cartText = document.getElementById('cart__text');
    cartText.style.display = "block"; 
    cartText.innerHTML = 'Заказ оформлен';
    shippingForm.style.display = "none";
    var shippingFormTxt = document.getElementById('cart__text-whatsapp');
    shippingFormTxt.style.display = "none";
    clearUl(cart_ul);
    localStorage.removeItem('cart'); 
  });
  
  var closeButtons = document.querySelectorAll('.js-modal-close');
  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      cartText = document.getElementById('cart__text');
      cartText.style.display = "block"; 
      cartText.innerHTML = 'Заказ оформлен';
      shippingForm.style.display = "none";
      var shippingFormTxt = document.getElementById('cart__text-whatsapp');
      shippingFormTxt.style.display = "none";
      clearUl(cart_ul);
      localStorage.removeItem('cart');
    });

}); // end foreach
  
  
}

//Функция установки маски на поле заполнения телефона
function maskPhone(elems, masked = '+7 (___) ___-__-__') {
	//const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		// console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}
	}
	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
}

function clearUl (ul) {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  
  //localStorage.removeItem('cart');
  // ul.innerHTML = '';
}

