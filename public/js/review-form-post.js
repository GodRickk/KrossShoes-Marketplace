const review = {};
const url = "http://localhost:3000";
const renderUrl = "https://godrickk-kros-shoes.onrender.com";

import { handleSubmitNewMessage } from "./toast.js"
// console.log(handleSubmitNewMessage)


let form = document.querySelector('form.review-form');
let reviewsColumnContainer = document.querySelector('div.reviews-column__container');
let textReviewInput = document.querySelector('#text-review');
let nameInput = document.querySelector('#user-name');


function closeForm(){
    let reviewForm = document.querySelector('.review-form');
    let reviewFormBackground = document.querySelector('.review-form-background');
    reviewFormBackground.classList.remove('active');
    reviewForm.classList.remove('active');
}

const btnSubmitReview = document.getElementById("review-submit-button")


function getCustomerIdFromJWT(jwt) {
    const arr = jwt.split('.');
    const decodedJwt = JSON.parse(atob(arr[1]));
    return decodedJwt.sub;
};


// function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time))
// }

// function handleSubmitNewMessage() {
//     socket.emit('message', { data: "lol" });
// };

// const tostify = Toastify({
//     text: "This is a toast",
//     duration: 3000,
//     destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     gravity: "top", // `top` or `bottom`
//     position: "left", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//     },
//     onClick: function(){} // Callback after click
//   });


//   socket.on('message', ({ data }) => {
//     tostify.showToast();
    
//     console.log(data);
// });


btnSubmitReview.addEventListener('click', (e) => {
    e.preventDefault();
    (async() => {
        
        const token = localStorage.getItem("access_token");
        const customer_id = getCustomerIdFromJWT(token);

        // const testGetRequest = await fetch(`${url}/customer/${customer_id}`, {
        //     method: "GET",
        //     headers: {
        //       "Authorization" : `Bearer ${token}`
        //     },
        // });

        // const testResponse = await testGetRequest.text()
        // const jsonCustomer = JSON.parse(testResponse)
        // const customer = jsonCustomer.data


        review.text = textReviewInput.value;
        review.customer_id = customer_id
        //await delay(2000)
        closeForm()
        console.log(review)
        const data = await fetch(`${renderUrl}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(review),
        })

        const customerReview = await data.text();
    
        console.log(customerReview);
        handleSubmitNewMessage();
        //await delay(15000)
    })();
})
