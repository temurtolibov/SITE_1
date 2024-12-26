let elForm = document.querySelector(".login-form");
let elBtn = document.querySelector(".login-btn");

elForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  elBtn.innerHTML = `
    <img class="scale-[3] mx-auto" src="./images/loading.png" alt="loading img" width="17" height="17">
  `;
  const signUpUser = JSON.parse(localStorage.getItem("new_user"));
  if (
    (data.username == "Temur" && data.password == "777") ||
    (signUpUser &&
      signUpUser.username === data.username &&
      signUpUser.password === data.password)
  ) {
    setTimeout(() => {
      elBtn.innerHTML = `Enter`;
      localStorage.setItem("user", JSON.stringify(data));
      location.pathname = "./students.html";
    }, 1000);
  } else {
    setTimeout(() => {
      elBtn.innerHTML = `Error Password or Error Username`;
    }, 1500);
    setTimeout(() => {
      elBtn.innerHTML = `Sign In`;
    }, 3500);
  }
});
