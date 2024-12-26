let elForm = document.querySelector(".register-form");
let elBtn = document.querySelector(".register-btn");
let elNewUsername = document.querySelector(".new_username");
let elNewPassword = document.querySelector(".new_password");

elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const new_Username = e.target.username.value;
  const new_Password = e.target.password.value;

  const new_date = {
    username: new_Username,
    password: new_Password,
  };

  setTimeout(() => {
    elBtn.innerHTML = `
        <img class="scale-[3] mx-auto" src="./images/loading.png" alt="loading img" width="17" height="17">
    `;
    localStorage.setItem("new_user", JSON.stringify(new_date));
    location.pathname = "./index.html";
  }, 1000);
});
