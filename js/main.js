/* ======================================================
   main.js — Animations + Mobile Nav + Dynamic Roles
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOBILE NAV TOGGLE
  =============================== */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      mainNav.style.display =
        mainNav.style.display === "block" ? "none" : "block";
    });
  }

  // Close nav on click link (mobile)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 850) {
        mainNav.style.display = "none";
      }
    });
  });

  // On resize (desktop view)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      mainNav.style.display = "";
    }
  });


  /* ===============================
     SMOOTH SCROLL
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });


  /* ===============================
     APPEAR-UP ANIMATIONS
  =============================== */
  const appearItems = document.querySelectorAll(".appear-up");

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // for certifications (stagger effect)
          const certs = entry.target.querySelectorAll(".cert-card");
          if (certs.length > 0) {
            certs.forEach((card, i) => {
              setTimeout(() => card.classList.add("visible"), i * 120);
            });
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  appearItems.forEach((el) => io.observe(el));
  document.querySelectorAll("section").forEach((sec) => io.observe(sec));


  /* ===============================
     FLOATING BLOBS
  =============================== */
  const blob1 = document.querySelector(".b1");
  const blob2 = document.querySelector(".b2");

  if (blob1 && blob2) {
    let t = 0;
    function animateBlobs() {
      t += 0.006;

      blob1.style.transform =
        `translate(${Math.sin(t) * 6}px, ${Math.cos(t * 1.1) * 6}px)`;

      blob2.style.transform =
        `translate(${Math.cos(t * 1.4) * 8}px, ${Math.sin(t * 0.9) * 8}px)`;

      requestAnimationFrame(animateBlobs);
    }
    animateBlobs();
  }


  /* ===============================
     TYPEWRITER EFFECT FOR NAME
  =============================== */
  const typewriter = document.getElementById("typewriter");
  const nameText = "RITHESH G";
  let idx = 0;

  function typeWriterEffect() {
    if (idx < nameText.length) {
      typewriter.textContent += nameText.charAt(idx);
      idx++;
      setTimeout(typeWriterEffect, 120);
    }
  }
  typeWriterEffect();


  /* ===============================
     DYNAMIC ROLE CHANGING TEXT
  =============================== */
  const roles = [
    "Web Developer",
    "Data Scientist",
    "Coder",
    "Problem Solver",
    "Business Enthusiast"
  ];

  const roleText = document.getElementById("roleText");
  let roleIndex = 0;

  function changeRole() {
    roleText.style.opacity = 0;

    setTimeout(() => {
      roleText.textContent = roles[roleIndex];
      roleText.style.opacity = 1;
      roleIndex = (roleIndex + 1) % roles.length;
    }, 400);
  }

  setInterval(changeRole, 2000); // every 2 seconds
});
