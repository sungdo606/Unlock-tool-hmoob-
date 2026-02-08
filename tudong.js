/*********************************
 * UNLOKTOOL AUTO SYSTEM (DEMO)
 * Countdown + QR Payment + Account
 *********************************/

// ====== CẤU HÌNH ======
const RENT_HOURS = 3; // 1 | 3 | 6 (giờ)
const PRICE = "50.000đ";
const DEMO_QR = "images/qr-demo.png"; // ảnh QR demo

// ====== TẠO TÀI KHOẢN SAU THANH TOÁN ======
function generateAccount() {
  const user = "user" + Math.floor(Math.random() * 9999);
  const pass = Math.random().toString(36).slice(-8);

  const now = new Date();
  const expire = new Date(now.getTime() + RENT_HOURS * 60 * 60 * 1000);

  localStorage.setItem("login", "true");
  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  localStorage.setItem("expire", expire.getTime());

  alert(
    "✅ Thanh toán thành công!\n\n" +
    "User: " + user + "\n" +
    "Pass: " + pass + "\n" +
    "Hết hạn: " + expire.toLocaleString()
  );

  window.location.href = "dashboard.html";
}

// ====== HIỂN THỊ QR THANH TOÁN ======
function showQR() {
  const html = `
  <div id="qrBox" style="
    position:fixed; inset:0; background:rgba(0,0,0,.85);
    display:flex; align-items:center; justify-content:center; z-index:9999;">
    <div style="
      background:#111; padding:25px; border-radius:20px;
      text-align:center; color:#fff; width:320px;
      box-shadow:0 0 30px #00ffcc;">
      
      <h3 style="color:#00ff99">Thanh toán ${PRICE}</h3>
      <img src="${DEMO_QR}" style="width:200px;margin:15px 0">
      <p>Quét QR để thanh toán</p>

      <button onclick="paid()" style="
        margin-top:15px;padding:10px 20px;
        border:none;border-radius:20px;
        background:#00ffcc;font-weight:bold;cursor:pointer">
        Tôi đã thanh toán
      </button>

      <p style="font-size:12px;color:#aaa;margin-top:10px">
        (Demo – sau này nối MoMo / Bank thật)
      </p>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
}

// ====== GIẢ LẬP ĐÃ THANH TOÁN ======
function paid() {
  document.getElementById("qrBox").remove();
  generateAccount();
}

// ====== ĐẾM NGƯỢC THỜI GIAN ======
function startCountdown() {
  const expire = localStorage.getItem("expire");
  if (!expire) return;

  setInterval(() => {
    const now = Date.now();
    const left = expire - now;

    if (left <= 0) {
      localStorage.removeItem("login");
      alert("⛔ Hết hạn sử dụng – vui lòng gia hạn!");
      window.location.href = "chothueunlk.html";
      return;
    }

    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);

    const el = document.getElementById("timeLeft");
    if (el) el.innerText = `${h}h ${m}m ${s}s`;
  }, 1000);
}

// ====== KIỂM TRA LOGIN ======
function checkLogin() {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
  }
}

// ====== GỌI TỰ ĐỘNG ======
document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
});
/************************
 * AUTO SLIDE IMAGE
 ************************/
const slides = [
  "img/slide1.png",
  "img/slide2.png",
  "img/slide3.png"
];

let index = 0;
const img = document.getElementById("slideImg");

setInterval(() => {
  index = (index + 1) % slides.length;
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = slides[index];
    img.style.opacity = 1;
  }, 300);

}, 3000);
