// Открываем корзину со списком добавленных товаров
var cartData = getCartData();
var d = document;
var cart_ul = d.getElementById("cart__list");

const phoneNumber = "79811612280";

// cart_ul.appendChild(newli);
var text = d.getElementById('cart__text'); //корзина пустая
var totalForm = d.getElementById('cart__grandtotal_text');

var shippingForm = d.getElementById('cart__shipping_wrapper'); //форма отправки (скрыть, показать)

if(cartData !== null){
    var product_name = ''; 
    var price = ''; 
    var color = '';
    var price_num = 0;  //цена товара Number
    var quantity = ''; 
    var totalPrice = 0;
    for(var items in cartData){    
      var newli = document.createElement("li");
      // newli.innerHTML = '';
      product_name = cartData[items][0];
      price = cartData[items][1];
      quantity = cartData[items][2];   
      img = cartData[items][3];
      color = cartData[items][4];
      
      price_num = Number (price.substring(1) * quantity);   //обрезаем доллар, переводим в number и умножаем на количество
      // price_num = price_num * quantity;
      totalPrice += price_num;   
      newli.classList.add("cart__list-item");    
      newli.innerHTML = writeli(product_name, price, color, quantity, img);      
      // console.log(newli);
      cart_ul.appendChild(newli);
    }
    text.style.display = "none";
    
    // console.log (totalPrice);
    totalForm.innerHTML = "ИТОГО $" + totalPrice;
} else {
    // если в корзине пусто, то сигнализируем об этом
    text.innerHTML = 'Корзина пустая';
    shippingForm.style.display = "none";
}


function writeli (name, price, color, quantity, img){
    var html_text = ""
    
    html_text += "<img src='" + img + "' alt='Man in hoody' width='262' height='306' class='cart__list-img'>";
    html_text += "<div class='cart__list-wrapper'>";
    html_text += "<h3 class='cart__list-heading'>" + name + "</h3>";
    html_text +=      "<p class='cart__list-text'>Price: " + price+ "</p>";
    html_text +=      "<p class='cart__list-text'>Color: " + color + "</p>";                    
    html_text +=      "<div class='cart__list-subwrapper'>"
    html_text +=          "<label class='cart__list-text'>Quantity:</label>"
    html_text +=          "<input type='text' class='cart__list-qty' placeholder='" + quantity+ "'>"
    html_text +=      "</div>"
    html_text +="</div>";

    return html_text;
    
}

function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}

function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

addEvent(d.getElementById('cart__list-button'), 'click', function(e){
  text.style.display = "block";  
  cart_ul.style.display = "none";
  localStorage.removeItem('cart');
  text = d.getElementById('cart__text');
  text.innerHTML = 'Корзина пустая';
  shippingForm.style.display = "none";
  // text += "Корзина пуста";    
  // cartCont.innerHTML = 'Корзина очишена.';
});

// addEvent(d.getElementById('cart__total_checkout'), 'click', sendEmail(cartData));

maskPhone('.phone');





// ОТПАРВИТЬ EMAIL по НАЖАТИЮ КНОПКИ
addEvent(d.getElementById('cart__total_checkout'), 'click', function(e){
  // Email.send({
  //   SecureToken : "d3bf2e8a-47cd-46b0-a883-8db282bd0e5a",    
  //   To : 'admin@visokomerie.ru',
  //   // To : 'roma69rus@gmail.com',
  //   // To : 'pertuevr@gmail.com',
  //   From : "admin@visokomerie.ru",
  //   Subject : "This is the subject",
  //   Body : email_text
  // }).then(
  //   OpenWatsappModal (this)
  // ); 
  OpenWatsappModal (this)
});


var getPhoneStr = document.getElementById('phone').value;
var getNameStr = document.getElementById('clientname').value;

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

/////////////////////////// tel 



function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

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


// newli.innerHTML = html_text;

    // console.log(newli);

/*
function openCart(e){
    var cartData = getCartData(), // вытаскиваем все данные корзины
        totalItems = '';
    // если что-то в корзине уже есть, начинаем формировать данные для вывода
    if(cartData !== null){
      totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
      for(var items in cartData){
        totalItems += '<tr>';
        for(var i = 0; i < cartData[items].length; i++){
          totalItems += '<td>' + cartData[items][i] + '</td>';
        }
        totalItems += '</tr>';
      }
      totalItems += '</table>';
      cartCont.innerHTML = totalItems;
    } else {
      // если в корзине пусто, то сигнализируем об этом
      cartCont.innerHTML = 'В корзине пусто!';
    }
    return false;
  }
  // Открыть корзину
  addEvent(d.getElementById('checkout'), 'click', openCart);
  // Очистить корзину 
  addEvent(d.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Корзина очишена.';
  });*/