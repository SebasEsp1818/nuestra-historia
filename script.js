document.addEventListener("DOMContentLoaded", () => {


    /* ==========================================
       FECHA DE INICIO DE LA RELACIÓN
    ========================================== */

    const relationshipStart = new Date(2025, 6, 23);


    /* ==========================================
       ELEMENTOS PRINCIPALES
    ========================================== */

    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("btn-enter");
    const mainContent = document.getElementById("main-content");


    /* ==========================================
       ENTRAR A LA PÁGINA
    ========================================== */

    if (enterButton && intro && mainContent) {

        enterButton.addEventListener("click", () => {

            intro.classList.add("fade-out");

            mainContent.classList.remove("is-hidden");

            setTimeout(() => {

                intro.style.display = "none";

                handleScrollReveal();

            }, 1200);

            playMusic();

        });

    }


    /* ==========================================
       NAVEGACIÓN
    ========================================== */

    const navigationButtons =
        document.querySelectorAll(
            ".nav-links button, .btn-scroll"
        );


    navigationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.getAttribute("data-target");

            const target =
                document.getElementById(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ==========================================
       PARTÍCULAS
    ========================================== */

    const canvas =
        document.getElementById("particles-canvas");

    const ctx =
        canvas ? canvas.getContext("2d") : null;

    let particles = [];


    function resizeCanvas() {

        if (!canvas) return;

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    }


    class Particle {

        constructor() {

            this.x =
                Math.random() * canvas.width;

            this.y =
                Math.random() * canvas.height;

            this.size =
                Math.random() * 1.2 + .4;

            this.speedX =
                Math.random() * .15 - .075;

            this.speedY =
                Math.random() * -.2 - .05;

            this.alpha =
                Math.random() * .35 + .1;

        }


        update() {

            this.x += this.speedX;

            this.y += this.speedY;


            if (this.y < 0) {

                this.y = canvas.height;

                this.x =
                    Math.random() * canvas.width;

            }

        }


        draw() {

            ctx.save();

            ctx.globalAlpha = this.alpha;

            ctx.fillStyle = "#ffffff";

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();

        }

    }


    function createParticles() {

        if (!canvas) return;

        particles = [];

        const amount =
            Math.min(
                50,
                Math.floor(window.innerWidth / 25)
            );


        for (let i = 0; i < amount; i++) {

            particles.push(
                new Particle()
            );

        }

    }


    function animateParticles() {

        if (!canvas || !ctx) return;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(particle => {

            particle.update();

            particle.draw();

        });


        requestAnimationFrame(
            animateParticles
        );

    }


    if (canvas) {

        resizeCanvas();

        createParticles();

        animateParticles();

        window.addEventListener(
            "resize",
            () => {

                resizeCanvas();

                createParticles();

            }
        );

    }


    /* ==========================================
       MÚSICA
    ========================================== */

    const musicButton =
        document.getElementById(
            "music-toggle-btn"
        );

    const audio =
        document.getElementById(
            "bg-audio"
        );


    function playMusic() {

        if (!audio) return;


        audio.volume = .4;


        audio.play()
            .then(() => {

                if (musicButton) {

                    musicButton.classList.add(
                        "playing"
                    );

                    const text =
                        musicButton.querySelector(
                            ".music-text"
                        );

                    if (text) {

                        text.textContent =
                            "PAUSAR MÚSICA";

                    }

                }

            })
            .catch(() => {

                /*
                    El navegador puede bloquear
                    la reproducción automática.
                    El usuario puede pulsar el
                    botón de música.
                */

            });

    }


    if (musicButton && audio) {

        musicButton.addEventListener(
            "click",
            () => {

                if (audio.paused) {

                    playMusic();

                } else {

                    audio.pause();

                    musicButton.classList.remove(
                        "playing"
                    );

                    const text =
                        musicButton.querySelector(
                            ".music-text"
                        );

                    if (text) {

                        text.textContent =
                            "REPRODUCIR MÚSICA";

                    }

                }

            }
        );

    }


    /* ==========================================
       CUALIDADES DE "TÚ"
    ========================================== */

    const qualityButtons =
        document.querySelectorAll(
            ".quality-btn"
        );

    const qualityMessage =
        document.getElementById(
            "quality-message"
        );


    qualityButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                qualityButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const message =
                    button.getAttribute(
                        "data-message"
                    );


                if (qualityMessage) {

                    qualityMessage.textContent =
                        message;

                }

            }
        );

    });


    /* ==========================================
       CARTAS / MODALES
    ========================================== */

    const modalOverlay =
        document.getElementById(
            "global-modal-overlay"
        );

    const letterButtons =
        document.querySelectorAll(
            "[data-modal]"
        );

    const modalCards =
        document.querySelectorAll(
            ".modal-card"
        );

    const closeButtons =
        document.querySelectorAll(
            ".modal-close"
        );


    function closeAllModals() {

        if (!modalOverlay) return;


        modalOverlay.classList.add(
            "is-hidden"
        );


        modalCards.forEach(card => {

            card.classList.add(
                "is-hidden"
            );

        });


        document.body.style.overflow =
            "auto";

    }


    letterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modalId =
                    button.getAttribute(
                        "data-modal"
                    );


                const modal =
                    document.getElementById(
                        modalId
                    );


                if (!modal || !modalOverlay) {
                    return;
                }


                modalCards.forEach(card => {

                    card.classList.add(
                        "is-hidden"
                    );

                });


                modal.classList.remove(
                    "is-hidden"
                );


                modalOverlay.classList.remove(
                    "is-hidden"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            closeAllModals
        );

    });


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalOverlay
                ) {

                    closeAllModals();

                }

            }
        );

    }


    /* ==========================================
       LIGHTBOX DE FOTOS
    ========================================== */

    const lightbox =
        document.getElementById(
            "lightbox-viewer"
        );

    const lightboxImage =
        document.getElementById(
            "lightbox-img"
        );

    const lightboxClose =
        document.getElementById(
            "lightbox-close"
        );


    const photos =
        document.querySelectorAll(
            ".viewable-photo img"
        );


    photos.forEach(photo => {

        photo.addEventListener(
            "click",
            () => {

                if (!lightbox || !lightboxImage) {
                    return;
                }


                lightboxImage.src =
                    photo.src;


                lightbox.classList.remove(
                    "is-hidden"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.add(
            "is-hidden"
        );


        if (
            !modalOverlay ||
            modalOverlay.classList.contains(
                "is-hidden"
            )
        ) {

            document.body.style.overflow =
                "auto";

        }

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* ==========================================
       TECLA ESCAPE
    ========================================== */

    window.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeAllModals();

                closeLightbox();

            }

        }
    );


    /* ==========================================
       CONTADOR
    ========================================== */

    function updateCounter() {

        const today =
            new Date();


        const difference =
            today - relationshipStart;


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const counter =
            document.getElementById(
                "days-val"
            );


        if (counter) {

            counter.textContent =
                days >= 0
                    ? days
                    : 0;

        }

    }


    updateCounter();


    setInterval(
        updateCounter,
        60 * 60 * 1000
    );


    /* ==========================================
       EASTER EGG
    ========================================== */

    const secretLogo =
        document.getElementById(
            "secret-logo"
        );


    let secretClicks = 0;

    let secretTimer;


    if (secretLogo) {

        secretLogo.addEventListener(
            "click",
            () => {

                secretClicks++;


                clearTimeout(
                    secretTimer
                );


                secretTimer =
                    setTimeout(() => {

                        secretClicks = 0;

                    }, 2000);


                if (secretClicks === 5) {

                    secretClicks = 0;


                    alert(
                        "✨ encontraste nuestro secreto. te amo ❤️"
                    );

                }

            }
        );

    }


    /* ==========================================
       ANIMACIONES AL HACER SCROLL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".scroll-reveal"
        );


    function handleScrollReveal() {

        const trigger =
            window.innerHeight * .85;


        revealElements.forEach(
            element => {

                const position =
                    element.getBoundingClientRect()
                        .top;


                if (position < trigger) {

                    element.classList.add(
                        "is-visible"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleScrollReveal
    );


    handleScrollReveal();

});