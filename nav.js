// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
});

function loadNavigation() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            // Insert navigation at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Set active navigation based on current page
            setActiveNavigation();
            
            // Initialize mobile menu
            initMobileMenu();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            // Fallback: create basic navigation if fetch fails
            createFallbackNavigation();
        });
}

function createFallbackNavigation() {
    const fallbackNav = `
        <nav class="navbar">
            <div class="container">
                <a href="index.html" class="navbar-brand">Muhammad Nevan Dzamir</a>
                <ul class="nav-links">
                    <li><a href="index.html" id="nav-home">Home</a></li>
                    <li><a href="about.html" id="nav-about">About</a></li>
                    <li><a href="certificates.html" id="nav-certificates">Certificate & Course</a></li>
                    <li><a href="skills.html" id="nav-skills">Skills</a></li>
                    <li><a href="projects.html" id="nav-projects">Project</a></li>
                    <li><a href="contact.html" id="nav-contact">Contact</a></li>
                </ul>
                <div class="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', fallbackNav);
    setActiveNavigation();
    initMobileMenu();
}

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all active classes
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class based on current page
    switch(currentPage) {
        case 'index.html':
        case '':
            document.getElementById('nav-home')?.classList.add('active');
            break;
        case 'about.html':
            document.getElementById('nav-about')?.classList.add('active');
            break;
        case 'certificates.html':
            document.getElementById('nav-certificates')?.classList.add('active');
            break;
        case 'skills.html':
            document.getElementById('nav-skills')?.classList.add('active');
            break;
        case 'projects.html':
            document.getElementById('nav-projects')?.classList.add('active');
            break;
        case 'contact.html':
            document.getElementById('nav-contact')?.classList.add('active');
            break;
    }
}

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
} 