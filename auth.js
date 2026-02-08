function login() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const msg  = document.getElementById("msg");

  // tài khoản demo (sau này nối server)
  const ACCOUNT = {
    username: "admin",
    password: "1234"
  };

  if (user === "" || pass === "") {
    msg.innerHTML = "❌ Vui lòng nhập đầy đủ thông tin";
    msg.style.color = "orange";
    return;
  }

  if (user === ACCOUNT.username && pass === ACCOUNT.password) {
    msg.innerHTML = "✅ Đăng nhập thành công";
    msg.style.color = "#00ffcc";

    // 🔐 LƯU SESSION (đóng web là mất)
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("user", user);

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);

  } else {
    msg.innerHTML = "❌ Sai tài khoản hoặc mật khẩu";
    msg.style.color = "red";
  }
}
