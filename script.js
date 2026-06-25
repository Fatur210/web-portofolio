/* =========================
   Portfolio - Script Enhancements
   ========================= */

// DOM helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- AOS init ---------- */
(function initAOS() {
  try {
    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({
        duration: 900,
        once: true,
      });
    }
  } catch (e) {
    // ignore
  }
})();

/* ---------- Dark mode ---------- */
(function initDarkMode() {
  const toggle = $("#darkModeToggle");
  const body = document.body;

  // restore preference
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") body.classList.add("dark");
  } catch (e) {
    // ignore
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    try {
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    } catch (e) {
      // ignore
    }
  });
})();

/* ---------- Typing effect ---------- */
(function initTyping() {
  const typingEl = $("#typing");
  if (!typingEl) return;

  const phrases = [
    "Web Developer",
    "UI/UX Enthusiast",
    "Frontend & Backend Learner",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 110;
  const deleteSpeed = 60;
  const holdTime = 900;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);

      if (charIndex >= current.length) {
        isDeleting = true;
        setTimeout(tick, holdTime);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, Math.max(0, charIndex));

      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
  }

  typingEl.textContent = "";
  setTimeout(tick, 450);
})();

/* ---------- Back to top ---------- */
(function initBackToTop() {
  const btn = $("#backToTop");
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 300) btn.classList.add("show");
    else btn.classList.remove("show");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ---------- Skills progress bar animation ---------- */
(function initSkillProgress() {
  const bars = $$(".progress-bar");
  if (!bars.length) return;

  const applyWidths = () => {
    bars.forEach((bar) => {
      const target = bar.getAttribute("data-width");
      if (!target) return;
      bar.style.width = `${target}%`;
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          applyWidths();
          observer.disconnect();
          break;
        }
      }
    },
    { threshold: 0.25 }
  );

  // Observe first section to avoid multiple triggers
  const skillsSection = $("#skills");
  if (skillsSection) observer.observe(skillsSection);
})();

/* ---------- Counter animation ---------- */
(function initCounters() {
  const counters = $$(".stat-number");
  if (!counters.length) return;

  const animate = () => {
    counters.forEach((el) => {
      const targetStr = el.getAttribute("data-count") || "0";
      const target = parseInt(targetStr, 10) || 0;
      const duration = 900;
      const start = performance.now();

      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.round(target * t);
        el.textContent = String(value);

        if (t < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
          break;
        }
      }
    },
    { threshold: 0.35 }
  );

  const aboutSection = $("#about");
  if (aboutSection) observer.observe(aboutSection);
})();

/* ---------- Portfolio filtering ---------- */
(function initPortfolioFilter() {
  const container = $("#portfolio");
  if (!container) return;

  const buttons = $$(".filter-btn", container);
  const items = $$(".portfolio-item", container);
  if (!buttons.length || !items.length) return;

  function setActive(btn) {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function applyFilter(filter) {
    items.forEach((item) => {
      const cat = item.getAttribute("data-category") || "all";
      const match = filter === "all" ? true : cat === filter;
      if (match) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";
      setActive(btn);
      applyFilter(filter);
    });
  });
})();

/* ---------- Contact form validation (existing) ---------- */
(function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = $("#nama", form)?.value?.trim() || "";
    const email = $("#email", form)?.value?.trim() || "";
    const pesan = $("#pesan", form)?.value?.trim() || "";

    if (nama === "" || email === "" || pesan === "") {
      alert("Semua data harus diisi!");
    } else {
      alert("Terima kasih, pesan Anda berhasil dikirim!");
      form.reset();
    }
  });
})();
