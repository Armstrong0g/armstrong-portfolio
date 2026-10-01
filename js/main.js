/* ============================================================
   Armstrong Gyasi — Portfolio
   Vanilla JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ==========================================================
     01. BASIC SETTINGS
     ========================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==========================================================
     02. STICKY HEADER
     ========================================================== */

  const header = document.getElementById("siteHeader");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 24
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* ==========================================================
     03. MOBILE NAVIGATION
     ========================================================== */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.classList.toggle("is-open", isOpen);

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    navLinks.addEventListener("click", function (event) {
      const link = event.target.closest("a");

      if (!link) return;

      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;

      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  }


  /* ==========================================================
     04. SCROLL REVEAL
     ========================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {
    const revealObserver =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            revealObserver.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }


  /* ==========================================================
     05. ACTIVE NAVIGATION
     ========================================================== */

  const sections =
    document.querySelectorAll(
      "section[id], .hero[id]"
    );

  const navLinkMap = {};

  document
    .querySelectorAll(".nav-link")
    .forEach(function (link) {
      const sectionName =
        link.getAttribute("data-nav");

      if (sectionName) {
        navLinkMap[sectionName] = link;
      }
    });

  if ("IntersectionObserver" in window) {
    const sectionObserver =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const sectionId =
              entry.target.getAttribute("id");

            Object.keys(navLinkMap).forEach(
              function (key) {
                navLinkMap[key].classList.toggle(
                  "is-active",
                  key === sectionId
                );
              }
            );
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px"
        }
      );

    sections.forEach(function (section) {
      if (navLinkMap[section.id]) {
        sectionObserver.observe(section);
      }
    });
  }


  /* ==========================================================
     06. ANIMATED STATISTICS
     ========================================================== */

  const stats =
    document.querySelectorAll(
      ".stat-num[data-count]"
    );

  function runCounter(element) {
    const target = parseInt(
      element.getAttribute("data-count"),
      10
    );

    const suffix =
      element.getAttribute("data-suffix") || "";

    if (Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      element.textContent =
        target + suffix;

      return;
    }

    const duration = 1100;
    let startTime = null;

    function animateCounter(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress =
        Math.min(
          (timestamp - startTime) / duration,
          1
        );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.round(eased * target);

      element.textContent =
        currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(
          animateCounter
        );
      }
    }

    requestAnimationFrame(
      animateCounter
    );
  }

  if ("IntersectionObserver" in window) {
    const statObserver =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            runCounter(entry.target);

            statObserver.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.6
        }
      );

    stats.forEach(function (stat) {
      statObserver.observe(stat);
    });
  } else {
    stats.forEach(runCounter);
  }


  /* ==========================================================
     07. TOAST MESSAGE
     ========================================================== */

  let toastElement = null;
  let toastTimer = null;

  function showToast(message) {
    if (!toastElement) {
      toastElement =
        document.createElement("div");

      toastElement.className =
        "toast mono";

      toastElement.setAttribute(
        "role",
        "status"
      );

      const style =
        toastElement.style;

      style.position = "fixed";
      style.left = "50%";
      style.bottom =
        "calc(24px + env(safe-area-inset-bottom))";
      style.transform =
        "translate(-50%, 16px)";
      style.maxWidth =
        "min(92vw, 460px)";
      style.padding =
        "13px 20px";
      style.borderRadius =
        "14px";
      style.background =
        "rgba(255, 255, 255, 0.96)";
      style.border =
        "1px solid rgba(109, 40, 217, 0.25)";
      style.color =
        "#0f172a";
      style.fontSize =
        "0.78rem";
      style.textAlign =
        "center";
      style.boxShadow =
        "0 20px 50px rgba(15, 23, 42, 0.16)";
      style.backdropFilter =
        "blur(14px)";
      style.webkitBackdropFilter =
        "blur(14px)";
      style.opacity = "0";
      style.transition =
        "opacity .3s ease, transform .3s cubic-bezier(.22,1,.36,1)";
      style.zIndex = "2000";
      style.pointerEvents = "none";

      document.body.appendChild(
        toastElement
      );
    }

    toastElement.textContent =
      message;

    requestAnimationFrame(function () {
      toastElement.style.opacity =
        "1";

      toastElement.style.transform =
        "translate(-50%, 0)";
    });

    clearTimeout(toastTimer);

    toastTimer = setTimeout(
      function () {
        toastElement.style.opacity =
          "0";

        toastElement.style.transform =
          "translate(-50%, 16px)";
      },
      3200
    );
  }


  /* ==========================================================
     08. PLACEHOLDER LINKS
     ========================================================== */

  const placeholderLinks =
    document.querySelectorAll(
      "[data-placeholder]"
    );

  placeholderLinks.forEach(function (link) {
    link.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        const label =
          link.textContent.trim();

        showToast(
          `"${label}" will be available once this project is published.`
        );
      }
    );
  });



  /* ==========================================================
     10. HERO BACKGROUND PARALLAX
     ========================================================== */

  if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    const blobs =
      document.querySelectorAll(".blob");

    const hero =
      document.querySelector(".hero");

    if (hero && blobs.length) {
      hero.addEventListener(
        "pointermove",
        function (event) {
          const x =
            (event.clientX /
              window.innerWidth -
              0.5) * 2;

          const y =
            (event.clientY /
              window.innerHeight -
              0.5) * 2;

          blobs.forEach(
            function (blob, index) {
              const depth =
                (index + 1) * 8;

              blob.style.translate =
                `${x * depth}px ${y * depth}px`;
            }
          );
        }
      );

      hero.addEventListener(
        "pointerleave",
        function () {
          blobs.forEach(
            function (blob) {
              blob.style.translate =
                "0 0";
            }
          );
        }
      );
    }
  }


  /* ==========================================================
     11. CURRENT YEAR
     ========================================================== */

  const yearElement =
    document.querySelector(
      "[data-current-year]"
    );

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }

})();



// ============================================================
// CONTACT FORM — FORMSPREE
// ============================================================

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".contact-submit");
    const originalButtonText = submitButton
      ? submitButton.innerHTML
      : "";

    const name = contactForm.querySelector("#name")?.value.trim();
    const email = contactForm.querySelector("#email")?.value.trim();
    const message = contactForm.querySelector("#message")?.value.trim();

    // Clear previous message
    if (formNote) {
      formNote.textContent = "";
    }

    // Basic validation
    if (!name || !email || !message) {
      if (formNote) {
        formNote.textContent = "Please fill in all fields.";
      }

      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      if (formNote) {
        formNote.textContent = "Please enter a valid email address.";
      }

      return;
    }

    // Loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <span>Sending...</span>
        <span>↗</span>
      `;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (formNote) {
          formNote.textContent =
            "Message sent successfully. I'll get back to you soon.";
        }

        contactForm.reset();

        if (typeof showToast === "function") {
          showToast("Message sent successfully!");
        }
      } else {
        const data = await response.json();

        if (formNote) {
          formNote.textContent =
            data.errors?.map((error) => error.message).join(", ") ||
            "Something went wrong. Please try again.";
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);

      if (formNote) {
        formNote.textContent =
          "Unable to send your message. Please try again later.";
      }
    } finally {
      // Restore button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
}