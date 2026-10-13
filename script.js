/**
 * PORTOFOLIO HARDWARE & IOT ENGINEER - SCRIPT.JS
 * Author: Daffa Argenta
 * Fitur:
 * 1. Mobile Hamburger Menu Toggle (aksesibel & responsif)
 * 2. Active Navigation link highlighter saat scroll (Scrollspy)
 * 3. Top Scroll Progress Indicator
 * 4. Typewriter / Dynamic Headline Text Cycler
 * 5. Interactive Project Filtering (Hardware, IoT, Robotics)
 * 6. Quick Copy Email to Clipboard with visual feedback
 * 7. Navbar background blur shadow enhancement
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const copyFeedback = document.getElementById('copyFeedback');

  // 1. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = navToggle.classList.contains('active');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Menutup menu mobile saat tautan diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Scroll Progress Bar & Navbar Scroll Shadow
  const handleScrollEffects = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Navbar shadow
    if (navbar) {
      if (scrollTop > 20) {
        navbar.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.94)';
      }
    }
  };

  // 3. Highlight Nav Link Aktif berdasarkan Posisi Scroll (Scrollspy)
  const handleActiveSection = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };


  // 5. Interactive Project Filter
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hapus kelas aktif dari semua tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 6. Fast Copy Email Action
  if (btnCopyEmail && copyFeedback) {
    btnCopyEmail.addEventListener('click', () => {
      const email = btnCopyEmail.getAttribute('data-email');
      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email).then(() => {
          copyFeedback.classList.add('show');
          setTimeout(() => {
            copyFeedback.classList.remove('show');
          }, 2500);
        }).catch(() => {
          // Fallback sederhana jika clipboard api dibatasi
          prompt("Salin email berikut:", email);
        });
      }
    });
  }

  // Listeners
  window.addEventListener('scroll', () => {
    handleScrollEffects();
    handleActiveSection();
  }, { passive: true });

  // Initial call saat pertama render
  handleScrollEffects();
  handleActiveSection();
});
