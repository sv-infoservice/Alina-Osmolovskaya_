const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 1. ИКОНКА ТЕМЫ ПРИ ЗАГРУЗКЕ
if(localStorage.getItem('theme') === 'light') {
    themeToggle.innerHTML = moonIcon;
} else {
    themeToggle.innerHTML = sunIcon;
}

// 2. АНИМАЦИИ СТАРТУЮТ СРАЗУ СО ШТОРАМИ
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initAnimations();
});

// 3. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = moonIcon;
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = sunIcon;
    }
});

// 4. ЛЕВЫЙ САЙДБАР (Соцсети)
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// 5. ПРАВЫЙ САЙДБАР (Инструменты - Только на мобилках)
const mobileToolsBtn = document.getElementById('mobileToolsBtn');
const toolsSidebar = document.getElementById('toolsSidebar');
if(mobileToolsBtn) {
    mobileToolsBtn.addEventListener('click', () => {
        toolsSidebar.classList.toggle('open');
    });
}

// 6. ПАНЕЛЬ НАСТРОЕК МАСШТАБА
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const scaleSlider = document.getElementById('scaleSlider');
const resetScaleBtn = document.getElementById('resetScaleBtn');
const htmlTag = document.documentElement;

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
});

scaleSlider.addEventListener('input', (e) => {
    htmlTag.style.fontSize = `${e.target.value * 100}%`;
    ScrollTrigger.refresh();
});

resetScaleBtn.addEventListener('click', () => {
    scaleSlider.value = 1;
    htmlTag.style.fontSize = '100%';
    ScrollTrigger.refresh();
});

// 7. ЧАТ ПОДДЕРЖКИ
const chatToggle = document.getElementById('chatToggle'); // Мобильный и ПК (если есть)
const chatTogglePC = document.getElementById('chatTogglePC'); // Если создана отдельно
const chatWindow = document.getElementById('chatWindow');

const toggleChat = () => { chatWindow.classList.toggle('open'); };
if(chatToggle) chatToggle.addEventListener('click', toggleChat);
if(chatTogglePC) chatTogglePC.addEventListener('click', toggleChat);

// 8. FAQ АККОРДЕОН
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const bodyText = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
        if(item.classList.contains('active')){
            item.classList.remove('active');
            bodyText.style.maxHeight = null;
        } else {
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-body').style.maxHeight = null;
            });
            item.classList.add('active');
            bodyText.style.maxHeight = bodyText.scrollHeight + "px";
        }
        setTimeout(() => ScrollTrigger.refresh(), 400);
    });
});

// 9. ПАСХАЛКА В ФУТЕРЕ
const creditBtn = document.getElementById('creditBtn');
const creditWrapper = document.getElementById('creditWrapper');
creditBtn.addEventListener('click', () => {
    creditWrapper.classList.toggle('show');
});

// 10. ПЛАВНЫЙ СКРОЛЛ (LENIS)
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 11. GSAP АНИМАЦИИ
gsap.registerPlugin(ScrollTrigger);
function initAnimations() {
    gsap.utils.toArray('.g-reveal').forEach((elem) => {
        gsap.fromTo(elem, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: elem, start: "top 85%" }});
    });
    gsap.utils.toArray('.cards-grid').forEach(grid => {
        gsap.fromTo(grid.querySelectorAll('.g-stagger-card'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 80%" }});
    });
    gsap.utils.toArray('.program-steps').forEach(grid => {
        gsap.fromTo(grid.querySelectorAll('.g-stagger-step'), { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.25, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 80%" }});
    });
    gsap.utils.toArray('.faq-accordion').forEach(grid => {
        gsap.fromTo(grid.querySelectorAll('.g-stagger-card'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 85%" }});
    });
    gsap.utils.toArray('.g-fade-right').forEach((elem) => {
        gsap.fromTo(elem, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" }});
    });
    gsap.utils.toArray('.g-fade-left').forEach((elem) => {
        gsap.fromTo(elem, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" }});
    });
    gsap.utils.toArray('.g-zoom-in').forEach((elem) => {
        gsap.fromTo(elem, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)", scrollTrigger: { trigger: elem, start: "top 85%" }});
    });
}