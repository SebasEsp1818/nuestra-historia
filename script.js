document.addEventListener("DOMContentLoaded", () => {
    // Configuración aniversario: 23 de Julio de 2025
    const relationshipStart = new Date(2025, 6, 23); 

    // CANVAS PARTÍCULAS
    const canvas = document.getElementById("particles-canvas");
    if(canvas) {
        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener("resize", resizeCanvas); resizeCanvas();
        class Particle {
            constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 1.2 + 0.4; this.speedX = Math.random() * 0.14 - 0.07; this.speedY = Math.random() * -0.2 - 0.05; this.alpha = Math.random() * 0.4 + 0.1; }
            update() { this.x += this.speedX; this.y += this.speedY; if (this.y < 0) { this.y = canvas.height; this.x = Math.random() * canvas.width; } }
            draw() { ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        }
        function init() { for (let i = 0; i < 40; i++) { particlesArray.push(new Particle()); } }
        function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
        init(); animate();
    }

    // REPRODUCCTOR DE MÚSICA
    const musicBtn = document.getElementById("music-toggle-btn");
    const bgAudio = document.getElementById("bg-audio");
    if (musicBtn && bgAudio) {
        bgAudio.volume = 0.4;
        musicBtn.addEventListener("click", () => {
            if (bgAudio.paused) { bgAudio.play().then(() => { musicBtn.classList.add("playing"); musicBtn.querySelector(".music-text").textContent = "PAUSAR MÚSICA"; }); } 
            else { bgAudio.pause(); musicBtn.classList.remove("playing"); musicBtn.querySelector(".music-text").textContent = "REPRODUCIR MÚSICA"; }
        });
    }

    // ➔ BOTÓN DE ENTRADA INTELIGENTE (Busca todas las opciones posibles para no fallar)
    const btnEnter = document.getElementById("btn-enter") || document.querySelector(".btn-premium");
    
    if (btnEnter) {
        btnEnter.addEventListener("click", () => {
            // Busca la pantalla de intro por cualquiera de sus nombres posibles
            const introScreen = document.getElementById("intro") || document.getElementById("intro-screen") || document.querySelector(".intro-overlay");
            const mainContent = document.getElementById("main-content");

            if (introScreen && mainContent) {
                introScreen.classList.add("fade-out");
                mainContent.classList.remove("is-hidden");
                if (bgAudio) { bgAudio.play().catch(() => {}); }
                setTimeout(() => { introScreen.style.display = "none"; handleScrollReveal(); }, 1200);
            }
        });
    }

    // NAVEGACIÓN SUAVE
    document.querySelectorAll("[data-target]").forEach(link => {
        link.addEventListener("click", () => {
            const target = document.getElementById(link.getAttribute("data-target"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // CUALIDADES INTERACTIVAS
    document.querySelectorAll(".quality-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".quality-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(".quality-message").forEach(msg => msg.classList.remove("active"));
            const target = document.getElementById(btn.getAttribute("data-target"));
            if (target) target.classList.add("active");
        });
    });

    // MODALES CARTAS
    const overlay = document.getElementById("global-modal-overlay");
    document.querySelectorAll("[data-modal]").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const modal = document.getElementById(trigger.getAttribute("data-modal"));
            if (overlay && modal) { overlay.classList.remove("is-hidden"); modal.classList.remove("is-hidden"); document.body.style.overflow = "hidden"; }
        });
    });
    function closeModals() { if (overlay) { overlay.classList.add("is-hidden"); document.querySelectorAll(".modal-card").forEach(c => c.classList.add("is-hidden")); document.body.style.overflow = "auto"; } }
    document.querySelectorAll(".modal-close").forEach(btn => btn.addEventListener("click", closeModals));
    if (overlay) overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModals(); });

    // LIGHTBOX FOTOS
    const lightbox = document.getElementById("lightbox-viewer");
    const lightboxImg = document.getElementById("lightbox-img");
    document.querySelectorAll(".viewable-photo img").forEach(img => {
        img.addEventListener("click", () => { if (lightbox && lightboxImg) { lightboxImg.src = img.src; lightbox.classList.remove("is-hidden"); document.body.style.overflow = "hidden"; } });
    });
    if (lightbox) lightbox.addEventListener("click", () => { lightbox.classList.add("is-hidden"); document.body.style.overflow = "auto"; });

    // ESCAPE KEY
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModals(); if(lightbox) lightbox.classList.add("is-hidden"); } });

    // RECOLO AUTOMÁTICO ANIVERSARIO
    function updateCounter() {
        const today = new Date(); const diff = today - relationshipStart;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const daysContainer = document.getElementById("days-val");
        if (daysContainer) daysContainer.textContent = days >= 0 ? days : "00";
    }
    setInterval(updateCounter, 1000); updateCounter();

    // EASTER EGG (5 CLICS AL LOGO)
    const logoSecret = document.getElementById("secret-logo");
    let clicks = 0; let timeout;
    if (logoSecret) {
        logoSecret.addEventListener("click", () => {
            clicks++; clearTimeout(timeout); timeout = setTimeout(() => { clicks = 0; }, 2000);
            if (clicks === 5) { clicks = 0; alert("✨ Mensaje Secreto: Eres el secreto mejor guardado del universo y mi rincón favorito del mundo entero. Te amo. ❤️"); }
        });
    }

    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".scroll-reveal");
    function handleScrollReveal() {
        revealElements.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add("is-visible"); });
    }
    window.addEventListener("scroll", handleScrollReveal);
});
