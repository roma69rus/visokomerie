//Телефон для связи с менеджером через Whatsapp
const phoneNumber = "79811612280";

// Получаем данные из LocalStorage
var cartData = getCartData();

var cart_ul = document.getElementById("cart__list");

var cartText = document.getElementById('cart__text'); //селектор объекта "корзина пустая"
var cartTotal = document.getElementById('cart__grandtotal_text'); //ИТОГО

var shippingForm = document.getElementById('cart__shipping_wrapper'); //форма обратной связи (скрыть, показать)

var getPhoneStr = document.querySelectorAll('.phone');     //инпут номера телефона
var getNameStr = document.getElementById('clientname'); //инпут имени

var checkoutBtn = document.getElementById('cart__total_checkout'); //Кнопка ЗАКАЗАТЬ

document.addEventListener('DOMContentLoaded', function () {
  //ЗАПОЛНЯЕМ СТРАНИЦУ ТОВАРАМИ
  if(cartData !== null){
    var product_name = ''; 
    var price = ''; 
    var color = '';
    var price_num = 0;  //цена товара Number
    var quantity = 0; 
    var totalPrice = 0;
    for(var items in cartData){    
      var newli = document.createElement("li");
      newli.classList.add("cart__list-item");    

      product_name = cartData[items][0];
      price = cartData[items][1];
      quantity = cartData[items][2];   
      img = cartData[items][3];
      color = cartData[items][4];
      
      price_num = Number (price.substring(1) * quantity);   //обрезаем доллар substring, переводим в number и умножаем на количество
      totalPrice += price_num;   
      
      newli.innerHTML = writeli(product_name, price, color, quantity, img);      
      // console.log(newli);
      cart_ul.appendChild(newli);
    }
    cartText.style.display = "none";
    
    // console.log (totalPrice);
    cartTotal.innerHTML = "ИТОГО $" + totalPrice;
  } else {
      // если в корзине пусто, то сигнализируем об этом
      cartText.innerHTML = 'Корзина пустая';
      shippingForm.style.display = "none";
  }

  //Очистка корзины и localStorage по кнопке
  addEvent(document.getElementById('cart__clear'), 'click', function(e){
    cartText.style.display = "block";  
    cart_ul.style.display = "none";
    localStorage.removeItem('cart');
    cartText = document.getElementById('cart__text');
    cartText.innerHTML = 'Корзина пустая';
    shippingForm.style.display = "none";
    // cartText += "Корзина пуста";    
    // cartCont.innerHTML = 'Корзина очишена.';
  });

  //Установка маски на поле заполнения телефона
  maskPhone(getPhoneStr);

  //Окраска телефона в случае ошибки
  getPhoneStr[0].addEventListener("input", function (e) {
    if (!ValidPhone(this.value)) {
      getPhoneStr[0].style.border = '3px solid red';
    } else {
      getPhoneStr[0].style.border = '1px solid black';
      console.log("tyt");
    }
  })

  //Окраска Имени? если не заполнено
  getNameStr.addEventListener("change", function (e) {
  if (ValidName(getNameStr.value))
  {
    getNameStr.style.border = '1px solid black';
  } else
    getNameStr.style.border = '3px solid red';
  })
});

//Функция заполняет карточку данными
function writeli (name, price, color, quantity, img){
    var html_text = ""
    
    html_text += `<img src='${img}' alt='Man in hoody' width='262' height='306' class='cart__list-img'>`;
    html_text += "<div class='cart__list-wrapper'>";
    html_text += `<h3 class='cart__list-heading'>${name}</h3>`;
    html_text +=      `<p class='cart__list-text'>Price: ${price}</p>`;
    html_text +=      `<p class='cart__list-text'>Color: ${color}</p>`;                    
    html_text +=      "<div class='cart__list-subwrapper'>"
    html_text +=          "<label class='cart__list-text'>Quantity:</label>"
    html_text +=          "<input type='text' class='cart__list-qty' placeholder='" + quantity+ "'>"
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


// ОТПАРВИТЬ EMAIL по НАЖАТИЮ КНОПКИ
addEvent(document.getElementById('cart__total_checkout'), 'click', function(e){
  if (!ValidPhone(getPhoneStr[0].value)) {
    getPhoneStr[0].style.border = '2px solid red'
    getPhoneStr[0].addEventListener('click', function(e) {
      e.preventDefault();
    })
  } else {
    OpenWatsappModal (this)
  }

  //console.log(getPhoneStr[0].value);
  //console.log(ValidPhone(getPhoneStr[0].value));
  
});

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


var email_text = 'Сформирован заказ:' + "\n";
var whatsapp_text = "Привет, я хочу сделать заказ на сайте visokomerie.ru" + "\n";
for (var items in cartData){
  product_name = cartData[items][0];
  price = cartData[items][1];
  quantity = cartData[items][2];   
  img = cartData[items][3];
  color = cartData[items][4];

  email_text += product_name + " " + color + " Количество: " + quantity + " Цена: " + price + "\n";
  whatsapp_text += product_name + " " + color + " Количество: " + quantity + " Цена: " + price + "\n";
}
email_text+="Имя клиента " + getNameStr + "\n" + "Телефон :" + getPhoneStr;
whatsapp_text += "Меня зовут: " + getNameStr;


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



//Функция обработки 
function OpenWatsappModal (btn)
{
  var modalId = btn.getAttribute('data-modal'),
  modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]'),
  overlay = document.querySelector('#overlay-modal');

  // var modalElem = document.querySelector('#modal-1');
  modalElem.classList.add('active');
  overlay.classList.add('active');

  var watsup_btn = document.querySelector('#watsup_btn');
  watsup_btn.addEventListener('click', function(e) {
    var txt = "https://wa.me/" + phoneNumber +"?text=" + encodeURI(whatsapp_text);
    window.open(txt, "_blank");
    console.log(txt);
    console.log(whatsapp_text);
    console.log(getNameStr);
  })
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
