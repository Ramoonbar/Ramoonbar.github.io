// Intersection Observer for active sections
const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            updateActiveStates(id);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Update Menu and Line Indicators
function updateActiveStates(id) {
    // Update Menu
    document.querySelectorAll('.menu a, .menu-item a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });

    // Update Side Lines
    const sections = Array.from(document.querySelectorAll('section'));
    const index = sections.findIndex(s => s.id === id);
    document.querySelectorAll('.line').forEach((line, i) => {
        line.classList.toggle('active', i === index);
    });

    // Update Social Buttons Active State
    // (This is just visual logic if needed)
}

// Function for Manual Line Clicks
function activateLine(selectedLine) {
    const lines = Array.from(document.querySelectorAll('.line'));
    const sections = document.querySelectorAll('section');
    const index = lines.indexOf(selectedLine);
    
    if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth Scroll Down Fade
// Smooth Scroll Down Fade
function handleScrollFade() {
    const scrollDown = document.querySelector('.scroll-down');
    const expContainer = document.querySelector('.experience-container');
    
    const scrollY = window.scrollY;
    const fadeEnd = 300; 
    
    let opacity = 1 - (scrollY / fadeEnd);
    if (opacity < 0) opacity = 0;
    
    let translateY = (scrollY / fadeEnd) * 50; 
    if (translateY > 50) translateY = 50;
    
    if (scrollDown) {
        scrollDown.style.opacity = opacity;
        scrollDown.style.transform = `translateY(${translateY}px)`;
        scrollDown.style.pointerEvents = opacity > 0.1 ? 'all' : 'none';
        scrollDown.style.visibility = opacity > 0 ? 'visible' : 'hidden';
    }

    if (expContainer) {
        expContainer.style.opacity = opacity;
        expContainer.style.transform = `translateX(-50%) translateY(${translateY}px)`;
        expContainer.style.visibility = opacity > 0 ? 'visible' : 'hidden';
    }
}

window.addEventListener('scroll', handleScrollFade);
window.addEventListener('load', handleScrollFade);

// Mobile Menu Toggle
function toggleMenu() {
    const menuPopup = document.getElementById('menu-popup');
    if (menuPopup) {
        menuPopup.classList.toggle('active');
        document.body.style.overflow = menuPopup.classList.contains('active') ? 'hidden' : 'auto';
    }
}


// Social Buttons Hover Effect
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseover', () => {
        document.querySelectorAll('.social-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// X-Ray Effect Logic
const xrayContainer = document.getElementById('xray-container');
if (xrayContainer) {
    xrayContainer.addEventListener('mousemove', (e) => {
        const rect = xrayContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Dynamic hole size based on distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        
        // Exaggerated hole size (40px at edges to 200px at center)
        const holeSize = 40 + (160 * (1 - dist / maxDist));
        
        const x1 = ((mouseX - holeSize/2) / rect.width) * 100;
        const x2 = ((mouseX + holeSize/2) / rect.width) * 100;
        const y1 = ((mouseY - holeSize/2) / rect.height) * 100;
        const y2 = ((mouseY + holeSize/2) / rect.height) * 100;
        
        xrayContainer.style.setProperty('--hole-x1', `${x1}%`);
        xrayContainer.style.setProperty('--hole-x2', `${x2}%`);
        xrayContainer.style.setProperty('--hole-y1', `${y1}%`);
        xrayContainer.style.setProperty('--hole-y2', `${y2}%`);
    });
}


// Language Switcher Logic
function changeLanguage(lang) {
    if (!translations[lang]) return;

    // Save preference
    localStorage.setItem('preferredLang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // If it's the download button, we might want to update data-text too for hover effects
            if (el.classList.contains('download-btn')) {
                el.setAttribute('data-text', translations[lang][key]);
            }
            el.innerHTML = translations[lang][key];
        }
    });

    // Update Active Button State (Desktop & Mobile)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        btn.classList.toggle('active', btnLang === lang);
    });
}

// Initialization
window.addEventListener('load', () => {
    // Detect language: Saved -> Browser -> Default (es)
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (translations[browserLang] ? browserLang : 'es');
    
    changeLanguage(defaultLang);
    updateActiveStates('perfil');
});

