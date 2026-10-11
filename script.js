/**
 * PORTOFOLIO HARDWARE & IOT ENGINEER - SCRIPT.JS
 * Fitur:
 * 1. Mobile Hamburger Menu Toggle (aksesibel & responsif)
 * 2. Active Navigation link highlighter saat scroll
 * 3. Smooth scrolling behavior
 * 4. Navbar background change saat di-scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  // 1. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = navToggle.classList.contains('active');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Menutup menu mobile saat salah satu tautan diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Efek Navbar Shadow saat Scroll
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
    }
  };

  // 3. Highlight Nav Link Aktif berdasarkan Posisi Scroll
  const handleActiveSection = () => {
    const scrollPosition = window.scrollY + 100;

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

  // Event Listener Scroll yang efisien
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleActiveSection();
  }, { passive: true });

  // Initial call saat pertama kali dimuat
  handleNavbarScroll();
  handleActiveSection();
});
