// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply initial theme
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('features')) {
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach(card => {
                    card.classList.add('animate');
                });
            } else if (entry.target.classList.contains('welcome')) {
                const aboutLabel = entry.target.querySelector('.about-label');
                const welcomeText = entry.target.querySelector('.welcome-text');
                const welcomeImage = entry.target.querySelector('.welcome-image');

                if (aboutLabel) aboutLabel.classList.add('animate');
                if (welcomeText) welcomeText.classList.add('animate');
                if (welcomeImage) welcomeImage.classList.add('animate');
            }
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing sections
document.addEventListener('DOMContentLoaded', () => {
    const featuresSection = document.querySelector('.features');
    const welcomeSection = document.querySelector('.welcome');

    if (featuresSection) {
        observer.observe(featuresSection);
    }
    if (welcomeSection) {
        observer.observe(welcomeSection);
    }
});

// Floating Action Button
const fabContainer = document.querySelector('.fab-container');
const mainButton = document.querySelector('.fab-button.main');

// Toggle FAB on main button click
mainButton.addEventListener('click', () => {
    fabContainer.classList.toggle('active');
});

// Close FAB when clicking outside
document.addEventListener('click', (e) => {
    if (!fabContainer.contains(e.target)) {
        fabContainer.classList.remove('active');
    }
});

// Animate services cards when they come into view
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // For the services header elements
            if (entry.target.classList.contains('animate-slide-top')) {
                entry.target.style.animationPlayState = 'running';
            }
            // For the service cards
            if (entry.target.classList.contains('animate-slide-left') ||
                entry.target.classList.contains('animate-slide-right') ||
                entry.target.classList.contains('animate-fade-in')) {
                entry.target.style.animationPlayState = 'running';
            }
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    // Observe services header elements
    const headerElements = document.querySelectorAll('.animate-slide-top');
    headerElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        servicesObserver.observe(el);
    });

    // Observe service cards
    const animatedElements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-fade-in');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        servicesObserver.observe(el);
    });
});

// Schedule animations
const scheduleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            scheduleObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize schedule animations
    const scheduleRows = document.querySelectorAll('.day');
    scheduleRows.forEach((row, index) => {
        row.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            row.classList.add('animate-slide-left');
        } else {
            row.classList.add('animate-slide-right');
        }
        scheduleObserver.observe(row);
    });
});

// Contact section animations
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll, .fade-in-right, .fade-in-left');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
            contactObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact section animations
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
});

// Map section animations
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll, .animate-in');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
            mapObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize map section animations
    const mapSection = document.querySelector('.map');
    if (mapSection) {
        mapObserver.observe(mapSection);
    }

    // ... existing DOMContentLoaded code ...
});

// Footer animations
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-fade-in');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
            footerObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize footer animations
    const footer = document.querySelector('footer');
    if (footer) {
        footerObserver.observe(footer);
    }

    // ... existing DOMContentLoaded code ...
}); 