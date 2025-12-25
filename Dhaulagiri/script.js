// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initSmoothScroll();
    initCounterAnimation();
    initNavbarScroll();
    initGalleryLightbox();
    initNewsTicker();
});

// Smooth Scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#mobile-menu-toggle') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    
    // Intersection Observer for counter animation on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Gallery Lightbox Effect
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.src;
            
            // Create lightbox overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
                animation: fadeIn 0.3s;
            `;
            
            // Create image element
            const image = document.createElement('img');
            image.src = src;
            image.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0,0,0,0.5);
                animation: zoomIn 0.3s;
            `;
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 40px;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 10000;
            `;
            
            overlay.appendChild(image);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay || e.target === closeBtn) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });
}

// News Ticker Functionality
function initNewsTicker() {
    const tickerItems = document.querySelector('.news-ticker-items');
    const prevBtn = document.getElementById('prevNews');
    const nextBtn = document.getElementById('nextNews');
    
    if (!tickerItems || !prevBtn || !nextBtn) return;
    
    // Clone news items for infinite scroll
    const items = tickerItems.innerHTML;
    tickerItems.innerHTML += items; // Duplicate for seamless loop
    
    let isPaused = false;
    
    // Pause on hover
    tickerItems.addEventListener('mouseenter', () => {
        isPaused = true;
        tickerItems.style.animationPlayState = 'paused';
    });
    
    tickerItems.addEventListener('mouseleave', () => {
        isPaused = false;
        tickerItems.style.animationPlayState = 'running';
    });
    
    // Manual controls
    let currentTranslate = 0;
    
    nextBtn.addEventListener('click', () => {
        currentTranslate -= 300;
        tickerItems.style.animation = 'none';
        tickerItems.style.transform = `translateX(${currentTranslate}px)`;
        
        setTimeout(() => {
            tickerItems.style.animation = '';
        }, 500);
    });
    
    prevBtn.addEventListener('click', () => {
        currentTranslate += 300;
        tickerItems.style.animation = 'none';
        tickerItems.style.transform = `translateX(${currentTranslate}px)`;
        
        setTimeout(() => {
            tickerItems.style.animation = '';
        }, 500);
    });
    
    // Click on news items
    const newsLinks = document.querySelectorAll('.news-ticker-item');
    newsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your link handling logic here
            console.log('News clicked:', link.textContent);
            // You can redirect to news page or show modal
            alert('News: ' + link.textContent);
        });
    });
}
// Add fade-in animation for sections on scroll
const observeElements = () => {
    const elements = document.querySelectorAll('.stat-card, .officer-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
};

// Initialize element observation
observeElements();

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes zoomIn {
        from { 
            opacity: 0;
            transform: scale(0.5);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Back to top button
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        display: none;
        z-index: 1000;
        transition: all 0.3s;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

createBackToTop();

// Loading animation for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});



// Console welcome message
console.log('%c Welcome to Dhaulagiri Laghubitta Bittiya Sanstha Limited ', 
    'background: #1e3a8a; color: white; font-size: 16px; padding: 10px;');
console.log('%c Empowering Rural Nepal Through Microfinance ', 
    'background: #f59e0b; color: white; font-size: 14px; padding: 5px;');