// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Fungsi untuk menambahkan kelas 'active' pada link navbar yang sesuai dengan halaman saat ini
  const setActiveNavLink = () => {
      const currentPath = window.location.pathname.split('/').pop();
      const navLinks = document.querySelectorAll('.nav-links a');

      navLinks.forEach(link => {
          // Hapus kelas 'active' dari semua link terlebih dahulu
          link.classList.remove('active');

          // Cek apakah href link cocok dengan nama file halaman saat ini
          // Jika di halaman utama (index.html) dan path kosong, anggap itu aktif
          if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
              link.classList.add('active');
          }
      });
  };

  // Panggil fungsi saat DOMContentLoaded (halaman dimuat)
  setActiveNavLink();

  // Initialize profile image
  initializeProfileImage();

  // Animasi untuk elemen di halaman Home
  const heroSection = document.getElementById('home');
  if (heroSection) {
      const h1 = heroSection.querySelector('h1');
      const h2 = heroSection.querySelector('h2');
      const roleText = heroSection.querySelector('p.role-text');
      const viewPortfolioBtn = heroSection.querySelector('.view-portfolio-btn');

      if (h1) h1.style.opacity = '1';
      if (h2) h2.style.opacity = '1';
      if (roleText) roleText.style.opacity = '1';
      if (viewPortfolioBtn) viewPortfolioBtn.style.opacity = '1';
  }

  // Animasi untuk elemen di halaman About
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
      const sectionTitle = aboutSection.querySelector('.section-title');
      const profileHero = aboutSection.querySelector('.profile-hero');
      const educationSection = aboutSection.querySelector('.education-section');
      const infoCards = aboutSection.querySelectorAll('.info-card');

      if (sectionTitle) sectionTitle.style.opacity = '1';
      if (profileHero) profileHero.style.opacity = '1';
      if (educationSection) educationSection.style.opacity = '1';
      infoCards.forEach((card, index) => {
          card.style.animationDelay = `${0.1 * index + 0.3}s`;
          card.style.opacity = '1';
      });
  }

  // Animasi untuk elemen di halaman Certificates, Skills, Projects
  const sectionsWithGrid = document.querySelectorAll('.certificates-section, .skills-section, .projects-section');
  sectionsWithGrid.forEach(section => {
      const items = section.querySelectorAll('.certificate-item, .skill-item, .project-item');
      const sectionTitle = section.querySelector('.section-title');

      if (sectionTitle) {
          sectionTitle.style.opacity = '1';
      }
      items.forEach((item, index) => {
          item.style.animationDelay = `${0.1 * index + 0.3}s`; // Atur delay untuk setiap item grid
          item.style.opacity = '1';
      });
  });

  // Animasi untuk elemen di halaman Contact
  const contactSection = document.getElementById('contact');
  if (contactSection) {
      const contactForm = contactSection.querySelector('.contact-form');
      const sectionTitle = contactSection.querySelector('.section-title');

      if (sectionTitle) {
          sectionTitle.style.opacity = '1';
      }
      if (contactForm) {
          contactForm.style.opacity = '1';
      }
  }
});

// Initialize profile image loading
function initializeProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        profileImage.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, var(--box-bg) 0%, var(--border-color) 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'var(--medium-text)';
            this.style.fontSize = '14px';
            this.textContent = 'Profile Image';
        });
        
        // Check if image is already loaded
        if (profileImage.complete) {
            if (profileImage.naturalWidth > 0) {
                profileImage.classList.add('loaded');
            } else {
                profileImage.style.background = 'linear-gradient(135deg, var(--box-bg) 0%, var(--border-color) 100%)';
                profileImage.style.display = 'flex';
                profileImage.style.alignItems = 'center';
                profileImage.style.justifyContent = 'center';
                profileImage.style.color = 'var(--medium-text)';
                profileImage.style.fontSize = '14px';
                profileImage.textContent = 'Profile Image';
            }
        }
    }
}