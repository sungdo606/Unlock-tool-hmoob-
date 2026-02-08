let u = localStorage.getItem("login");
if (!u) location.href = "login.html";
document.getElementById("user").innerText = u;

function logout() {
  localStorage.removeItem("login");
  location.href = "login.html";
}

function download() {
  alert("Download tool (demo)");
}
