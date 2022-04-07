// ------------------------MODAL-------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var modalButtons = document.querySelectorAll('.js-open-modal');
    var overlay = document.querySelector('#overlay-modal');
    var closeButtons = document.querySelectorAll('.js-modal-close');

    /* открытие окон. */
    modalButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {

            e.preventDefault();

            var modalId = this.getAttribute('data-modal'),            
                modalElem = document.querySelector(`.modal[data-modal="${modalId}"]`);
                        
            modalElem.classList.add('active');
            overlay.classList.add('active');

        }); // end click
    }); // end foreach

    /* закрытие окон */
    closeButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal'); //closest возвращает ближайший родительский элемент по указанному селектору

            parentModal.classList.remove('active'); //удаляем у модального окна класс Active
            overlay.classList.remove('active');     //и у overlay
        });

    }); // end foreach

    /* закрытие по ESC */
    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.modal_overlay.active').classList.remove('active');
        };
    }, false);

    /* скрытие окна при клике на подложку */
    overlay.addEventListener('click', function () {
        document.querySelector('.modal.active').classList.remove('active'); //удаляем у модального окна класс Active
        this.classList.remove('active');                                    //и у overlay
    });

});