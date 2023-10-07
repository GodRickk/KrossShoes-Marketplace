const url = "http://localhost:3000/auth";
const renderUrl = "https://godrickk-kros-shoes.onrender.com/auth";

(async () => {

  const signUpBtn = document.querySelector('.btn-login');
  const customer = {}

  signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const inputs = Array.from(document.querySelectorAll('.login-form-container input')); 

  for(let input of inputs) {
    customer[input.name] = input.value;
  }
  
  //console.log(customer)

  const data = await fetch(`${renderUrl}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  const result = await data.json()
  console.log(result.access_token)
  if (result.access_token) {
    //localStorage.getItem(access_token, result.access_token)
    localStorage.setItem("access_token", result.access_token)
    window.location.replace("/");
  }
  console.log(result)
})
  console.log(1)
})();

