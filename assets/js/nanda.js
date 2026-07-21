gsap.registerPlugin(ScrollTrigger);

// Global Variables
let currentGalleryIndex = 0;
let isZoomed = false;
const galleryArray = Array.from(document.querySelectorAll('.gallery-item'));

// --- 1. ENHANCED MOUSE INTERACTION & MAGNETICS ---
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('customCursorDot');
const spotlight = document.getElementById('mouseSpotlight');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.08 });
    
    if(spotlight) {
        if (spotlight.style.opacity === '0' || !spotlight.style.opacity) spotlight.style.opacity = '1';
        gsap.to(spotlight, { x: e.clientX, y: e.clientY, duration: 0.8, ease: "power3.out" });
    }
});

// Hover expansions
document.querySelectorAll('.interactive-item, a, button, .gallery-item').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.width = '75px'; cursor.style.height = '75px';
        cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
        cursor.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    });
    elem.addEventListener('mouseleave', () => {
        cursor.style.width = '48px'; cursor.style.height = '48px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
});

// --- 2. HERO PARALLAX & KEN BURNS MOTIONS ---
const heroTimeline = gsap.timeline();
heroTimeline.to('.hero-animate', { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "power4.out" })
            .to('.hero-animate-delayed', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.7");

const heroTypewriterText = document.getElementById('typewriterText');
const heroTypewriterPhrases = [
    'Aforetime Precision Mechanician.',
    'Backend PHP Codifier.',
    'Progeny of Eminence 2024.',
    'Connoisseur of Visual & Logical Conundrums.'
];
let heroTypewriterPhrase = 0;
let heroTypewriterChar = 0;
let heroTypewriterDeleting = false;

function updateHeroTypewriter() {
    const current = heroTypewriterPhrases[heroTypewriterPhrase];
    if (heroTypewriterDeleting) {
        heroTypewriterChar = Math.max(heroTypewriterChar - 1, 0);
    } else {
        heroTypewriterChar = Math.min(heroTypewriterChar + 1, current.length);
    }
    heroTypewriterText.textContent = current.substring(0, heroTypewriterChar);

    let delay = heroTypewriterDeleting ? 45 : 90;
    if (!heroTypewriterDeleting && heroTypewriterChar === current.length) {
        delay = 1800;
        heroTypewriterDeleting = true;
    } else if (heroTypewriterDeleting && heroTypewriterChar === 0) {
        heroTypewriterDeleting = false;
        heroTypewriterPhrase = (heroTypewriterPhrase + 1) % heroTypewriterPhrases.length;
        delay = 500;
    }
    setTimeout(updateHeroTypewriter, delay);
}

function initHeroTypewriter() {
    const heroTypewriter = document.getElementById('heroTypewriter');
    if (!heroTypewriter || !heroTypewriterText) return;
    gsap.to(heroTypewriter, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 });
    updateHeroTypewriter();
}

heroTimeline.call(initHeroTypewriter, [], 0.8);

gsap.from('.nav-link', { y: -18, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.05, delay: 0.22 });
gsap.from('.hero-badge', { y: 26, opacity: 0, duration: 1.05, ease: "power3.out", stagger: 0.12, delay: 1.3 });
gsap.to('.hero-accent-ring.ring-lg', { rotation: 360, duration: 48, ease: "none", repeat: -1 });
gsap.to('.hero-accent-ring.ring-md', { rotation: -360, duration: 36, ease: "none", repeat: -1 });
gsap.to('.hero-accent-ring.ring-sm', { rotation: 360, duration: 56, ease: "none", repeat: -1 });
gsap.to('#lightboxCaption', { y: -6, repeat: -1, yoyo: true, duration: 2.8, ease: "sine.inOut", delay: 0.8 });
gsap.to('#scrollProgress', { boxShadow: "0 0 16px rgba(212,175,55,0.35)", duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to('.animate-marquee span', { y: -5, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.16 });

// Dynamic scroll transforms for Hero Background
gsap.to("#heroBgWrapper", {
    scrollTrigger: {
        trigger: "#home", start: "top top", end: "bottom top", scrub: true
    },
    scale: 1.15,
    filter: "blur(10px) brightness(10%)",
    yPercent: 15,
    ease: "none"
});

// --- 3. 3D TILT EFFECT FOR PROFILE CARD & GALLERY ITEMS ---
function applyLuxury3DTilt(element) {
    if (!element) return;
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const angleX = (yc - y) / 12;
        const angleY = (x - xc) / 12;

        gsap.to(element, {
            rotateX: angleX, rotateY: angleY,
            scale: 1.02, duration: 0.4, ease: "power2.out",
            transformOrigin: "center center"
        });
    });
    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out"
        });
    });
}
applyLuxury3DTilt(document.getElementById('tiltProfileContainer'));
document.querySelectorAll('.gallery-item').forEach(item => applyLuxury3DTilt(item));

// --- 4. PROJECT SHOWCASE SPLIT MASK REVEAL ---
document.querySelectorAll('.project-card').forEach(card => {
    const innerImg = card.querySelector('.project-parallax-img');
    const container = card.querySelector('.clip-reveal-container');

    gsap.fromTo(container,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
            clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut",
            scrollTrigger: { trigger: card, start: "top 85%" }
        }
    );

    if(innerImg) {
        gsap.to(innerImg, {
            yPercent: 18, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
    }
});

// --- 5. MOBILE OVERLAY SYSTEM ---
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden'); mobileMenu.classList.add('flex');
    gsap.fromTo(mobileMenu, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo('.mobile-link', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2 });
});
const closeMenu = () => {
    gsap.to(mobileMenu, { opacity: 0, duration: 0.3, onComplete: () => { mobileMenu.classList.replace('flex','hidden'); } });
};
closeMenuBtn.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMenu));

// --- 6. GLOBAL SCROLL PERFORMANCE ACTIONS ---
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scrollProgress').style.width = (winScroll / height) * 100 + '%';
    
    const navbar = document.getElementById('navbar');
    if (winScroll > 50) {
        navbar.classList.remove('py-6', 'bg-[#050507]/40');
        navbar.classList.add('py-4', 'bg-[#050507]/95', 'border-b-[#d4af37]/20');
    } else {
        navbar.classList.remove('py-4', 'bg-[#050507]/95', 'border-b-[#d4af37]/20');
        navbar.classList.add('py-6', 'bg-[#050507]/40');
    }
});

document.querySelectorAll('.skill-node').forEach(node => {
    const bar = node.querySelector('.bar');
    gsap.to(bar, {
        width: node.getAttribute('data-width'), duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: ".section-skills-trigger", start: "top 85%" }
    });
    node.addEventListener('mouseenter', () => {
        document.getElementById('dynamic-skill-desc').innerHTML = `// Executed: ${node.getAttribute('data-desc')}`;
        document.getElementById('dynamic-skill-desc').style.color = '#fff';
    });
    node.addEventListener('mouseleave', () => {
        document.getElementById('dynamic-skill-desc').innerHTML = `// Hover or impinge upon a pillar above to instantiate the descriptive repository.`;
        document.getElementById('dynamic-skill-desc').style.color = 'rgba(212, 175, 55, 0.6)';
    });
});

document.querySelectorAll('.reveal-item').forEach(item => {
    gsap.from(item, { opacity: 0, y: 35, duration: 1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 90%" } });
});

// --- 7. MASONRY GALLERY FILTER ENGINE ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.replace('bg-[#d4af37]','bg-transparent'));
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.replace('text-black','text-white/60'));
        btn.classList.replace('bg-transparent','bg-[#d4af37]'); btn.classList.replace('text-white/60','text-black');

        const filterValue = btn.getAttribute('data-filter');
        galleryArray.forEach(item => {
            if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block'; gsap.to(item, { opacity: 1, scale: 1, duration: 0.4 });
            } else {
                gsap.to(item, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => item.style.display = 'none' });
            }
        });
        setTimeout(() => ScrollTrigger.refresh(), 400);
    });
});

// --- 8. ADVANCED AGENCY LIGHTBOX PLATFORM ENGINE ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxLoader = document.getElementById('lightboxLoader');
const zoomWrapper = document.getElementById('lightboxZoomWrapper');

function loadLightboxItem(index) {
    if(index < 0 || index >= galleryArray.length) return;
    currentGalleryIndex = index;
    const targetItem = galleryArray[currentGalleryIndex];
    const imgSrc = targetItem.querySelector('img').src;
    const imgCaption = targetItem.getAttribute('data-caption') || "Visual Archive";

    lightboxLoader.style.opacity = '1';
    lightboxImg.style.opacity = '0';
    lightboxCaption.style.opacity = '0';
    resetImageZoom();

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {
        lightboxImg.src = imgSrc;
        lightboxLoader.style.opacity = '0';
        lightboxImg.style.opacity = '1';
        lightboxCaption.innerText = imgCaption;
        lightboxCaption.style.opacity = '1';
    };
}

galleryArray.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.classList.remove('hidden'); lightbox.classList.add('flex');
        setTimeout(() => lightbox.classList.add('opacity-100'), 50);
        loadLightboxItem(index);
    });
});

function closeLightboxEngine() {
    lightbox.classList.remove('opacity-100');
    setTimeout(() => lightbox.classList.replace('flex','hidden'), 500);
    resetImageZoom();
}

function resetImageZoom() {
    isZoomed = false;
    zoomWrapper.style.transform = "scale(1)";
    zoomWrapper.classList.replace('cursor-zoom-out', 'cursor-zoom-in');
}

zoomWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    if(!isZoomed) {
        zoomWrapper.style.transform = "scale(1.4)";
        zoomWrapper.classList.replace('cursor-zoom-in', 'cursor-zoom-out');
        isZoomed = true;
    } else {
        resetImageZoom();
    }
});

document.getElementById('closeLightbox').addEventListener('click', closeLightboxEngine);
document.getElementById('nextLightbox').addEventListener('click', (e) => { e.stopPropagation(); loadLightboxItem((currentGalleryIndex + 1) % galleryArray.length); });
document.getElementById('prevLightbox').addEventListener('click', (e) => { e.stopPropagation(); loadLightboxItem((currentGalleryIndex - 1 + galleryArray.length) % galleryArray.length); });
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightboxEngine(); });

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightboxEngine();
    if (e.key === 'ArrowRight') loadLightboxItem((currentGalleryIndex + 1) % galleryArray.length);
    if (e.key === 'ArrowLeft') loadLightboxItem((currentGalleryIndex - 1 + galleryArray.length) % galleryArray.length);
});
