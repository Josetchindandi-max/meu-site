document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. EFEITO COMPACTO NO HEADER AO ROLAR A PÁGINA
    // =========================================================================
    const header = document.querySelector("header");
    const logoImg = document.querySelector(".logo img");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "2px 10%";
            header.style.boxShadow = "0 10px 30px rgba(0, 51, 102, 0.1)";
            header.style.background = "rgba(255, 255, 255, 0.98)";
            if (window.innerWidth > 768) header.style.height = "70px";
            if (window.innerWidth > 768) logoImg.style.height = "58px";
        } else {
            header.style.padding = "10px 10%";
            header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
            header.style.background = "#ffffff";
            if (window.innerWidth > 768) header.style.height = "100px";
            if (window.innerWidth > 768) logoImg.style.height = "90px";
        }
    });

    // =========================================================================
    // 2. MENU HAMBURGER (MOBILE)
    // =========================================================================
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mainNav.classList.toggle("open");
        });
    }

    // Fechar o menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mainNav.classList.remove("open");
        });
    });

    // =========================================================================
    // 3. ANIMAÇÃO DE REVELAÇÃO SUAVE AO ROLAR (CORRIGIDA)
    // =========================================================================
    const elementosParaAnimar = document.querySelectorAll(
        '.mvv-card, .service-card-modern, .graphic-img, .contact-container, .testimonial-card'
    );

    elementosParaAnimar.forEach(el => el.classList.add('hidden-el'));

    const observarElementos = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden-el');
                entry.target.classList.add('visible-el');
                observer.unobserve(entry.target);
                // Nota: NÃO removemos a classe visible-el depois — foi esse o bug corrigido.
            }
        });
    }, { threshold: 0.12 });

    elementosParaAnimar.forEach(el => observarElementos.observe(el));

    // =========================================================================
    // 4. CARROSSEL AUTOMÁTICO COM DOTS INDICADORES
    // =========================================================================
    const slides = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.getElementById('carousel-dots');
    let slideAtual = 0;
    const tempoSlide = 4000;

    // Criar dots dinamicamente
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                irParaSlide(i);
                resetarIntervalo();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function atualizarDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === slideAtual);
        });
    }

    function irParaSlide(index) {
        slides[slideAtual].classList.remove('active');
        slideAtual = index;
        slides[slideAtual].classList.add('active');

        const video = slides[slideAtual].querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.play().catch(err => console.log("Auto-play contido:", err));
        }
        atualizarDots();
    }

    function proximoSlide() {
        irParaSlide((slideAtual + 1) % slides.length);
    }

    let intervalo = null;

    function resetarIntervalo() {
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(proximoSlide, tempoSlide);
    }

    if (slides.length > 0) {
        resetarIntervalo();
    }

    // =========================================================================
    // 5. FORMULÁRIO LIGADO AO WHATSAPP
    // =========================================================================
    const formulario = document.getElementById("contact-form");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("form-nome").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const mensagem = document.getElementById("form-mensagem").value.trim();
            const botao = formulario.querySelector("button");
            const textoOriginal = botao.textContent;

            // Validação básica
            if (!nome || !email || !mensagem) return;

            botao.disabled = true;
            botao.textContent = "A preparar mensagem...";

            // Montar mensagem para o WhatsApp
            const textoWA = encodeURIComponent(
                `Olá! Contacto a partir do site.\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n\n` +
                `*Mensagem:*\n${mensagem}`
            );

            const numeroWA = "244941224791";
            const urlWA = `https://wa.me/${numeroWA}?text=${textoWA}`;

            setTimeout(() => {
                window.open(urlWA, "_blank");
                formulario.reset();
                botao.disabled = false;
                botao.textContent = textoOriginal;
            }, 800);
        });
    }

});
