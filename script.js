// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const statCards = document.querySelectorAll('.stat-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active state from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-indigenous-red', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        });
        
        // Add active state to clicked button
        button.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        button.classList.add('bg-indigenous-red', 'text-white');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter cards
        statCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.stat-card, .bg-white.rounded-xl').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Add hover effects to resource cards
document.querySelectorAll('a[href^="https"]').forEach(link => {
    if (link.classList.contains('bg-white') && link.classList.contains('border-2')) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});

// Animate numbers on scroll
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const match = text.match(/[\d,]+/);
            if (match) {
                const number = parseInt(match[0].replace(/,/g, ''));
                if (!isNaN(number) && number < 1000000) {
                    entry.target.textContent = '0';
                    animateValue(entry.target, 0, number, 1500);
                }
            }
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers
document.querySelectorAll('.text-5xl, .text-6xl, .text-3xl.font-bold, .text-2xl.font-bold').forEach(element => {
    if (element.textContent.match(/[\d,]+/) && !element.textContent.includes('%')) {
        numberObserver.observe(element);
    }
});

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('[style*="width"]');
            progressBars.forEach(bar => {
                if (bar.classList.contains('transition-all')) {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    progressObserver.observe(card);
});

console.log('Indigenous Canada Website (Tailwind CSS) Loaded Successfully');
console.log('All data sourced from official Canadian government statistics (2024-2025)');
