/* =========================================
   UNLOKTOOL LICENSE SYSTEM (WEB ONLY)
   File: abtivesv.js
   ========================================= */

/* ====== DỮ LIỆU LICENSE (SAU NÀY ĐỔI TỪ SERVER) ====== */
const LICENSE_DATA = {
  username: "admin",
  plan: "6 MONTH",            // 3 MONTH | 6 MONTH | 12 MONTH
  start_date: "2026-01-01",   // ngày kích hoạt
  expire_date: "2026-07-12",  // ngày hết hạn
  activated: true             // true | false
};
/* ==================================================== */


/* ====== KIỂM TRA LOGIN (CHỈ KHÓA TOOL, KHÔNG KHÓA WEB) ====== */
(function checkLogin() {
  if (sessionStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
  }
})();


/* ====== TÍNH NGÀY CÒN LẠI ====== */
function getRemainDays(expireDate) {
  const today = new Date();
  const exp   = new Date(expireDate);
  const diff  = exp - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


/* ====== LOAD LICENSE LÊN DASHBOARD ====== */
function loadLicense() {
  const userEl   = document.getElementById("licenseUser");
  const planEl   = document.getElementById("licensePlan");
  const statusEl = document.getElementById("licenseStatus");
  const daysEl   = document.getElementById("licenseDays");

  if (!statusEl || !daysEl) return;

  userEl.innerText = LICENSE_DATA.username;
  planEl.innerText = LICENSE_DATA.plan;

  if (!LICENSE_DATA.activated) {
    statusEl.innerText = "NOT ACTIVATED";
    statusEl.className = "status expired";
    daysEl.innerText = "Tài khoản chưa kích hoạt";
    lockTool();
    return;
  }

  const daysLeft = getRemainDays(LICENSE_DATA.expire_date);

  if (daysLeft > 0) {
    statusEl.innerText = "ACTIVE";
    statusEl.className = "status active";
    daysEl.innerText = `Còn ${daysLeft} ngày`;
    unlockTool();
  } else {
    statusEl.innerText = "EXPIRED";
    statusEl.className = "status expired";
    daysEl.innerText = "Hết hạn – vui lòng gia hạn";
    lockTool();
  }
}


/* ====== KHÓA TOOL (KHÔNG KHÓA WEB) ====== */
function lockTool() {
  document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.disabled = true;
    btn.innerText = "License Expired";
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  });
}


/* ====== MỞ TOOL ====== */
function unlockTool() {
  document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.disabled = false;
    btn.innerText = btn.dataset.text || "Download";
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  });
}


/* ====== LOGOUT ====== */
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}


/* ====== AUTO LOAD ====== */
document.addEventListener("DOMContentLoaded", loadLicense);
