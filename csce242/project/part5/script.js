// Set footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const toggleBtn = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

/* ---------------- News Card Behavior ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const card = document.getElementById("skillshare-card");
    const toggle = document.getElementById("skillshare-toggle");
    const detail = document.getElementById("skillshare-detail");
    const closeBtn = document.getElementById("skillshare-close");

    // If DOM doesn't include these elements, bail out gracefully
    if (!card || !toggle || !detail) {
      console.warn("SkillShare expand elements not found; skipping init.");
      return;
    }

    // Ensure initial (closed) state on load (defensive: removes any leftover 'expanded' class)
    card.classList.remove("expanded");
    toggle.setAttribute("aria-expanded", "false");
    detail.setAttribute("aria-hidden", "true");

    // Avoid double-binding: use a flag on the element
    if (toggle.dataset.expandInited === "1") return;
    toggle.dataset.expandInited = "1";

    // Namespaced keydown handler so we can remove it reliably
    function onKeydown(e) {
      if (e.key === "Escape" || e.key === "Esc") {
        closeDetail(true);
      }
    }

    function openDetail() {
      card.classList.add("expanded");
      toggle.setAttribute("aria-expanded", "true");
      detail.setAttribute("aria-hidden", "false");

      // focus logical control inside detail (close button if present)
      // prefer focusing a control inside the panel for screen readers
      if (closeBtn) {
        closeBtn.focus({ preventScroll: true });
      } else {
        // Ensure panel is focusable for screen readers if no internal control
        if (!detail.hasAttribute("tabindex")) detail.setAttribute("tabindex", "-1");
        try { detail.focus({ preventScroll: true }); } catch (err) { /* some browsers may not allow */ }
      }

      // Add Escape key listener
      document.addEventListener("keydown", onKeydown);
    }

    function closeDetail(returnFocus = true) {
      card.classList.remove("expanded");
      toggle.setAttribute("aria-expanded", "false");
      detail.setAttribute("aria-hidden", "true");

      // Remove Escape key listener
      document.removeEventListener("keydown", onKeydown);

      // Return focus to the toggle button if requested
      if (returnFocus) {
        try { toggle.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
      }
    }

    function toggleDetail() {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeDetail(true);
      else openDetail();
    }

    // Click/tap on the title button toggles the detail
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDetail();
    });

    // Close button inside the panel
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeDetail(true);
      });
    }

    // Clicking outside the card closes it
    document.addEventListener("click", (e) => {
      if (toggle.getAttribute("aria-expanded") === "true" && !card.contains(e.target)) {
        closeDetail(false);
      }
    });

    // Improve keyboard toggling (Enter/Space) for accessibility on the toggle button
    toggle.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
        e.preventDefault();
        toggleDetail();
      }
    });


  } catch (err) {
    // Logs any runtime error so you can see it in the console of the deployed site
    console.error("Error initializing SkillShare expand behavior:", err);
  }
});