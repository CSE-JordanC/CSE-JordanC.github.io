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

/* ---------------- News Card Behavior + JSON fetch ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  try {
    /* ---------------- SkillShare expand panel (existing code) ---------------- */
    const card = document.getElementById("skillshare-card");
    const toggle = document.getElementById("skillshare-toggle");
    const detail = document.getElementById("skillshare-detail");
    const closeBtn = document.getElementById("skillshare-close");

    if (!card || !toggle || !detail) {
      console.warn("SkillShare expand elements not found; skipping init.");
    } else {
      // Ensure initial (closed) state
      card.classList.remove("expanded");
      toggle.setAttribute("aria-expanded", "false");
      detail.setAttribute("aria-hidden", "true");

      if (toggle.dataset.expandInited !== "1") {
        toggle.dataset.expandInited = "1";

        function onKeydown(e) {
          if (e.key === "Escape" || e.key === "Esc") closeDetail(true);
        }

        function openDetail() {
          card.classList.add("expanded");
          toggle.setAttribute("aria-expanded", "true");
          detail.setAttribute("aria-hidden", "false");
          if (closeBtn) closeBtn.focus({ preventScroll: true });
          else {
            if (!detail.hasAttribute("tabindex")) detail.setAttribute("tabindex", "-1");
            try { detail.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
          }
          document.addEventListener("keydown", onKeydown);
        }

        function closeDetail(returnFocus = true) {
          card.classList.remove("expanded");
          toggle.setAttribute("aria-expanded", "false");
          detail.setAttribute("aria-hidden", "true");
          document.removeEventListener("keydown", onKeydown);
          if (returnFocus) try { toggle.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
        }

        function toggleDetail() {
          const isOpen = toggle.getAttribute("aria-expanded") === "true";
          if (isOpen) closeDetail(true);
          else openDetail();
        }

        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          toggleDetail();
        });

        if (closeBtn) {
          closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closeDetail(true);
          });
        }

        document.addEventListener("click", (e) => {
          if (toggle.getAttribute("aria-expanded") === "true" && !card.contains(e.target)) {
            closeDetail(false);
          }
        });

        toggle.addEventListener("keydown", (e) => {
          if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
            e.preventDefault();
            toggleDetail();
          }
        });
      }
    }

    /* ---------------- JSON fetch & dynamic cards rendering ---------------- */
    const GITHUB_BASE = "https://CSE-JordanC.github.io/csce242/project/part7";
    const JSON_URL = `${GITHUB_BASE}/skills.json`;
    const IMAGES_BASE = `${GITHUB_BASE}/images`;

    const grid = document.querySelector(".cards-grid");
    if (!grid) {
      console.info("No .cards-grid found on this page — skipping JSON skills load.");
      return; // nothing more to do on pages without a cards grid
    }

    // create a skill card from a JSON item (matches your CSS structure)
    function createSkillCard(item) {
      const article = document.createElement("article");
      article.className = "skill-card";

      const img = document.createElement("img");
      img.className = "skill-img";
      img.alt = item.title || "Skill image";
      img.src = `${IMAGES_BASE}/${item.img_name}`;

      const body = document.createElement("div");
      body.className = "skill-body";

      const h3 = document.createElement("h3");
      h3.className = "skill-title";
      h3.textContent = item.title || "Untitled";

      const cat = document.createElement("div");
      cat.className = "skill-category";
      cat.textContent = `${item.category || "General"} - ${item.level || "N/A"}`;

      const meta = document.createElement("div");
      meta.className = "skill-meta";
      const instructor = item.instructor ? item.instructor : "Instructor";
      const lessons = item.lessons ? `${item.lessons} lessons` : "";
      meta.textContent = `${instructor} • ${lessons}`;

      const view = document.createElement("a");
      view.className = "btn btn-green";
      view.href = "viewskills.html";
      view.textContent = "View";

      // assemble
      body.appendChild(h3);
      body.appendChild(cat);
      body.appendChild(meta);
      body.appendChild(view);

      article.appendChild(img);
      article.appendChild(body);

      return article;
    }

    async function loadAndRenderSkills() {
      try {
        const res = await fetch(JSON_URL);
        if (!res.ok) throw new Error(`Failed to fetch JSON (${res.status})`);
        const items = await res.json();

        // Validate we received an array
        if (!Array.isArray(items)) throw new Error("JSON did not contain an array.");

        // clear any existing static markup (so we don't duplicate)
        grid.innerHTML = "";

        // Determine how many to show
        const isHomePage = window.location.pathname.includes("index.html") 
        || window.location.pathname === "/";

        const itemsToShow = isHomePage ? items.slice(0, 4) : items;

        // clear grid
        grid.innerHTML = "";

        // render selected items
        itemsToShow.forEach((item) => {
        const cardEl = createSkillCard(item);
        grid.appendChild(cardEl);
        });
      } catch (err) {
        console.error("Error loading skills JSON:", err);
        // show a friendly message in the grid area
        grid.innerHTML = `<div class="error" style="padding:20px;background:#fff;border-radius:8px;">Could not load skills. Check console for details.</div>`;
      }
    }

    // Start loading skills
    loadAndRenderSkills();

  } catch (err) {
    // Logs any runtime error so you can see it in the console of the deployed site
    console.error("Error initializing script.js behaviors:", err);
  }
});