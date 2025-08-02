const navLinks = document.querySelectorAll('.right a');
const logoLink = document.querySelector('.logo a');
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-links');
const servicesSection = document.getElementById('services');

function setActiveLink() {
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
    });

    if (currentHash === '' || currentHash === '#about') {
        const aboutMeLink = document.querySelector('.right a[href="#about"]');
        if (aboutMeLink) {
            aboutMeLink.classList.add('nav-active');
        }
    } else {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('nav-active');
            }
        });
    }

    if (window.innerWidth <= 542) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

setActiveLink();
window.addEventListener('hashchange', setActiveLink);

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

document.addEventListener('click', (event) => {
    if (window.innerWidth <= 542) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Animate services on scroll
const servicesObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

if (servicesSection) {
    servicesObserver.observe(servicesSection);
}