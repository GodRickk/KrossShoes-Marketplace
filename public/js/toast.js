//const socket = io('http://localhost:3000');
const renderSocket = io('https://godrickk-kros-shoes.onrender.com');

export function handleSubmitNewMessage() {
    renderSocket.emit('onMessage'/*, { message: "lol" }*/);
    // console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
};

const tostify = Toastify({
    text: "Добавился новый отзыв",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  });


  renderSocket.on('onMessage', (/*{ message }*/) => {
    tostify.showToast();
    //console.log(message);
});

const testButton = document.getElementById("butt-test")
// testButton.addEventListener(`click`, handleSubmitNewMessage)

console.log(1)
