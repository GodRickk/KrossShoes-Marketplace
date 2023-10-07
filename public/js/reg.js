const url = "http://localhost:3000/auth";
const renderUrl = "https://godrickk-kros-shoes.onrender.com/auth";

// console.log(1)
// const signUpBtn = document.querySelector('.btn-login');
// const customer = {}

// signUpBtn.addEventListener('click', (e) => {
//   e.preventDefault();
  
//   const inputs = Array.from(document.querySelectorAll('.login-form-container input')); 
//   // console.log(inputs);

//   for(let input of inputs) {
//     if (input.name === "phone_number") {
//       customer[input.name] = BigInt(input.value);
//     } else {
//       customer[input.name] = input.value;
//     }
//   }
//   // console.log(customer)
// })


(async () => {

  const signUpBtn = document.querySelector('.btn-login');
  const customer = {}

  signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const inputs = Array.from(document.querySelectorAll('.login-form-container input')); 
  // console.log(inputs);

  for(let input of inputs) {
    // if (input.name === "phone_number") {
    //   customer[input.name] = BigInt(input.value);
    // } else {
      customer[input.name] = input.value;
    // }
  }
  
  const data = await fetch(`${renderUrl}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  const result = await data.json()

  if (result) {
    // console.log("37733773")
    window.location.replace("/");
  }
  console.log(result)
})
  console.log(1)
})();

