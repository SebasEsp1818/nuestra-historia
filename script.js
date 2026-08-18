document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURACIÓN DE TU FECHA DE ANIVERSARIO REAL
    // ==========================================
    // NOTA: Enero es 0, Febrero es 1... Julio = 6.
    // 23 de Julio de 2025 -> (2025, 6, 23)
    const relationshipStart = new Date(2025, 6, 23); 


    // ==========================================
    // PARTÍCULAS SUTILES (CANVAS)
    // ==========================================
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.2 + 0.4;
            this.speedX = Math.random() * 0.14 - 0.07;
            this.speedY = Math.random() * -0.2 - 0.05;
            this.alpha = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 25));
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();


    // ==========================================
    // REPRODUCTOR DE MÚSICA
    // ==========================================
    const musicBtn = document.getElementById("music-toggle-btn");
    const bgAudio = document.getElementById("bg-audio");

    if (musicBtn && bgAudio) {
        bgAudio.volume = 0.4;

        musicBtn.addEventListener("click", () => {
            if (bgAudio.paused) {
                bgAudio.play().then(() => {
                    musicBtn.classList.add("playing");
                    musicBtn.querySelector(".music-text").textContent = "PAUSAR MÚSICA";
                }).catch(err => console.log("Clic manual necesario", err));
            } else {
                bgAudio.pause();
                musicBtn.classList.remove("playing");
                musicBtn.querySelector(".music-text").textContent = "REPRODUCIR MÚSICA";
            }
        });
    }


    // ==========================================
    // PANTALLA INICIAL (PULSAR PARA ENTRAR)
    // ==========================================
    const btnEnter = document.getElementById("btn-enter");
    const introScreen = document.getElementById("intro-screen") || document.getElementById("intro");
    const mainContent = document.getElementById("main-content");

    if (btnEnter && introScreen && mainContent) {
        btnEnter.addEventListener("click", () => {
            introScreen.classList.add("fade-out");
            mainContent.classList.remove("is-hidden");

            if (bgAudio && bgAudio.paused) {
                bgAudio.play().then(() => {
                    musicBtn.classList.add("playing");
                    musicBtn.querySelector(".music-text").textContent = "PAUSAR MÚSICA";
                }).catch(() => {});
            }

            setTimeout(() => {
                introScreen.style.display = "none";
                handleScrollReveal();
            }, 1200);
        });
    }


    // ==========================================
    // NAVEGACIÓN SUAVE (SCROLL LINKS)
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-links button, .btn-scroll");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });


    // ==========================================
    // INTERACTIVIDAD DE CUALIDADES "TÚ"
    // ==========================================
    const qualityBtns = document.querySelectorAll(".quality-btn");
    const qualityMessages = document.querySelectorAll(".quality-message");

    qualityBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            qualityBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.getAttribute("data-target");

            qualityMessages.forEach(msg => msg.classList.remove("active"));
            const targetMsg = document.getElementById(targetId);
            if (targetMsg) {
                targetMsg.classList.add("active");
            }
        });
    });


    // ==========================================
    // CONTROL DE CARTAS (MODALES)
    // ==========================================
    const globalOverlay = document.getElementById("global-modal-overlay");
    const triggers = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll(".modal-close");
    const allCards = document.querySelectorAll(".modal-card");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const modalId = trigger.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);

            if (globalOverlay && targetModal) {
                globalOverlay.classList.remove("is-hidden");
                targetModal.classList.remove("is-hidden");
                document.body.style.overflow = "hidden";
            }
        });
    });

    const closeAllModals = () => {
        if (globalOverlay) {
            globalOverlay.classList.add("is-hidden");
            allCards.forEach(c => c.classList.add("is-hidden"));
            document.body.style.overflow = "auto";
        }
    };

    closeButtons.forEach(btn => btn.addEventListener("click", closeAllModals));
    if (globalOverlay) {
        globalOverlay.addEventListener("click", (e) => {
            if (e.target === globalOverlay) closeAllModals();
        });
    }


    // ==========================================
    // VISOR DE FOTOS PANTALLA COMPLETA (LIGHTBOX)
    // ==========================================
    const lightbox = document.getElementById("lightbox-viewer");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const viewablePhotos = document.querySelectorAll(".viewable-photo img");

    viewablePhotos.forEach(img => {
        img.addEventListener("click", () => {
            if (lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.remove("is-hidden");
                document.body.style.overflow = "hidden";
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.add("is-hidden");
            if (globalOverlay && !globalOverlay.classList.contains("is-hidden")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }


    // ==========================================
    // SOPORTE DE TECLADO (ESCAPE)
    // ==========================================
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
            closeLightbox();
        }
    });


    // ==========================================
    // CONTADOR DE TIEMPO REAL AUTOMÁTICO
    // ==========================================
    function updateCounter() {
        const today = new Date();
        const diffInMs = today - relationshipStart;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        const daysContainer = document.getElementById("days-val");
        if (daysContainer) {
            daysContainer.textContent = diffInDays >= 0 ? diffInDays : "00";
        }
    }
    updateCounter();


    // ==========================================
    // EASTER EGG SECRETO INTERACTIVO
    // ==========================================
    const logoSecret = document.getElementById("secret-logo");
    let clickCount = 0;
    let clickTimeout;

    if (logoSecret) {
        logoSecret.addEventListener("click", () => {
            clickCount++;
            clearTimeout(clickTimeout);

            clickTimeout = setTimeout(() => { clickCount = 0; }, 2000);

            if (clickCount === 5) {
                clickCount = 0;
                alert("✨ Mensaje Secreto Descubierto: Eres el secreto mejor guardado del universo y mi rincón favorito del mundo entero. Te amo. ❤️");
            }
        });
    }


    // ==========================================
    // ANIMACIONES AL HACER SCROLL (REVEAL)
    // ==========================================
Usa el código con precaución.const revealElements = document.querySelectorAll(".scroll-reveal");function handleScrollReveal() {const triggerBottom = window.innerHeight * 0.85;revealElements.forEach(el => {const elementTop = el.getBoundingClientRect().top;if (elementTop < triggerBottom) {el.classList.add("is-visible");}});}window.addEventListener("scroll", handleScrollReveal);});