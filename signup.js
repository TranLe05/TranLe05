const inputUsernameRegister = document.querySelector(".form-input-username");
const inputPasswordRegister = document.querySelector(".form-input-password");
const btnRegister = document.querySelector(".form-submit");

btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      inputUsernameRegister.value === "" ||
      inputPasswordRegister.value === ""
    ) {
      alert("vui lòng không để trống");
    } else {
      // array user
      const user = {
        username: inputUsernameRegister.value,
        password: inputPasswordRegister.value,
      };
      let json = JSON.stringify(user);
      localStorage.setItem(inputUsernameRegister.value, json);
      alert("Đăng Ký Thành Công");
      window.location.href = "signin.html";
    }
  });
