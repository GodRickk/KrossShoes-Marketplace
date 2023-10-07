// Открытие закрытие для отзыва
let reviewFormBackground = document.querySelector('.review-form-background');
let reviewForm = document.querySelector('.review-form');

let openReviewFormButtons = document.querySelectorAll('.open-review-form');
let closeReviewFormButton = document.querySelector('.close-review-form');


openReviewFormButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        reviewFormBackground.classList.add('active');
        reviewForm.classList.add('active');
    })
});


closeReviewFormButton.addEventListener('click',() => {
    reviewFormBackground.classList.remove('active');
    reviewForm.classList.remove('active');
});


document.addEventListener('click', (e) => {
    if(e.target === reviewFormBackground) {
        reviewFormBackground.classList.remove('active');
        reviewForm.classList.remove('active');
    }
});
