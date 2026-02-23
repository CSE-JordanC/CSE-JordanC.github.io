// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggleBtn = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}