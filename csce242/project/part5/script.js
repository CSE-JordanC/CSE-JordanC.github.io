// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle (your existing behavior)
const toggleBtn = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

/* ---------------- News card expand behavior ----------------- */

(function() {
  const card = document.getElementById("skillshare-card");
  if (!card) return; // nothing to do if card not present

  const toggle = document.getElementById("skillshare-toggle");
  const detail = document.getElementById("skillshare-detail");
  const closeBtn = document.getElementById("skillshare-close");

  if (!toggle || !detail) return;

  function openDetail() {
    card.classList.add("expanded");
    toggle.setAttribute("aria-expanded", "true");
    detail.setAttribute("aria-hidden", "false");
    // move focus into the detail (first focusable element)
    // try the close button if present, otherwise focus detail container
    if (closeBtn) {
      closeBtn.focus();
    } else {
      detail.focus();
    }
    // set up Escape listener
    document.addEventListener("keydown", onEsc);
  }

  function closeDetail(returnFocus = true) {
    card.classList.remove("expanded");
    toggle.setAttribute("aria-expanded", "false");
    detail.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onEsc);
    if (returnFocus) toggle.focus();
  }

  function onEsc(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeDetail(true);
    }
  }

  // Toggle on click
  toggle.addEventListener("click", (e) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeDetail(true);
    else openDetail();
  });

  // Close button (inside panel) if present
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeDetail(true));
  }

  // Also close when clicking outside the card (optional, unobtrusive)
  document.addEventListener("click", (e) => {
    if (!card.contains(e.target)) {
      // only close if it is open
      if (toggle.getAttribute("aria-expanded") === "true") {
        closeDetail(false); // do not move focus back if user clicked elsewhere
      }
    }
  });

})();