// Registrasi ScrollTrigger ke GSAP Core Engine
gsap.registerPlugin(ScrollTrigger);

// 1. KURSOR KUSTOM LUXURY DENGAN INTERSIA HALUS
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.08 });
});

// Interaksi Kursor Membesar di Elemen Interaktif
document.querySelectorAll('a, .project-card, .skill-node, .random-container').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.width = '75px';
        cursor.style.height = '75px';
        cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
        cursor.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    });
    elem.addEventListener('mouseleave', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = 'var(--accent-color)';
    });
});

// 2. TIMELINE INTRO HERO SECTION (Efek Loading Pertama Kali)
const introTl = gsap.timeline();

introTl.from('nav', { y: -60, opacity: 0, duration: 1, ease: 'power3.out' })
       .from('.hero-title', { y: 120, opacity: 0, duration: 1.4, stagger: 0.2, ease: 'power4.out' }, '-=0.7')
       .from('.hero-subtitle', { opacity: 0, y: 15, duration: 0.8 }, '-=0.4')
       .from('.scroll-indicator', { opacity: 0, duration: 0.5 });

// 3. PARALLAX EFFECT (Hero Background & Titles)
document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Background Hero bergerak lebih lambat saat di-scroll
    const bgHero = document.querySelector('.hero-bg-image');
    if(bgHero) {
        bgHero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }

    // Teks judul bergerak berlawanan arah
    document.querySelectorAll('.hero-title').forEach(title => {
        const speed = title.getAttribute('data-speed');
        title.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 4. SCROLLTRIGGER PARALLAX GAMBAR DALAM FRAME + CARDS FADE UP
document.querySelectorAll('.project-card, .random-container').forEach(card => {
    const image = card.querySelector('.project-img');
    
    // Parallax Gambar jika ada di dalam card
    if(image) {
        gsap.to(image, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Card Fade-In Efek Mewah
    gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// 5. ANIMASI SKILL BAR MENGEMBANG SAAT SECTION MASUK LAYAR
document.querySelectorAll('.skill-node').forEach(node => {
    const bar = node.querySelector('.bar');
    const targetWidth = bar.getAttribute('data-width');

    gsap.to(bar, {
        width: targetWidth,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 75%'
        }
    });

    // Interaksi JavaScript deskripsi dinamis
    node.addEventListener('mouseenter', () => {
        const desc = node.getAttribute('data-desc');
        document.getElementById('dynamic-skill-desc').innerHTML = `// Executed: ${desc}`;
        node.style.borderColor = 'var(--accent-color)';
    });
    node.addEventListener('mouseleave', () => {
        document.getElementById('dynamic-skill-desc').innerHTML = `// Sentuh salah satu pilar keahlian di atas untuk memuat data deskripsi.`;
        node.style.borderColor = 'rgba(255,255,255,0.05)';
    });
});

// 6. REVEAL TEXT ON SCROLL (Section About)
gsap.from('.reveal-text', {
    opacity: 0,
    y: 40,
    duration: 1.5,
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
        end: 'top 30%',
        scrub: 1
    }
});