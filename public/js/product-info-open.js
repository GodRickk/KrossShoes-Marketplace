// Открытие закрытие для продукта
let productDesctiprionBackground = document.querySelector('.product-info-window-background');
let productDesctiprion = document.querySelector('.product-info-window');

let openProductDesctiprionButtons = document.querySelectorAll('.product-open-info-button');
let closeProductDesctiprionButton = document.querySelector('.close-product-info-window');

let productField = document.querySelector('.product-item')


// Для открытия по нажатию на область с товаром
// document.addEventListener('click', (e) => {
//     if(e.target === productField) {
//         productDesctiprionBackground.classList.add('active');
//         productDesctiprion.classList.add('active');
//     }
// });


// Для открытия по нажатию на корзину
openProductDesctiprionButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        productDesctiprionBackground.classList.add('active');
        productDesctiprion.classList.add('active');
    })
});


// Для закрытия по нажатию на крестик в форме товара при открытом описании товара
closeProductDesctiprionButton.addEventListener('click',() => {
    productDesctiprionBackground.classList.remove('active');
    productDesctiprion.classList.remove('active');
});


// Для закрытия по нажатию на задник при открытом описании товара
document.addEventListener('click', (e) => {
    if(e.target === productDesctiprionBackground) {
        productDesctiprionBackground.classList.remove('active');
        productDesctiprion.classList.remove('active');
    }
});