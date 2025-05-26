document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // e.preventDefault(); // Removido para permitir que o scroll-behavior: smooth do CSS funcione
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement && targetId === '#contato') { // Só previne default se for o link para o form, para o CSS cuidar do resto
                 e.preventDefault();
                 targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            if (name === '' || email === '') {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios (Nome e Email).';
                formMessage.className = 'form-message error';
                return;
            }

            if (!isValidEmail(email)) {
                formMessage.textContent = 'Por favor, insira um endereço de email válido.';
                formMessage.className = 'form-message error';
                return;
            }

            console.log('Form submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Company:', document.getElementById('company').value.trim());

            formMessage.textContent = 'Obrigado! Seus dados foram enviados com sucesso. Entraremos em contato em breve.';
            formMessage.className = 'form-message success';
            form.reset(); 

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 7000); // Aumentei o tempo da mensagem
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inicialização do SwiperJS para Testimonials
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: { // Adicionado autoplay
            delay: 5000, // 5 segundos
            disableOnInteraction: false, // Continua após interação do usuário
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { // >= 768px
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: { // >= 1024px
                slidesPerView: 3,
                spaceBetween: 30 // Reduzido para caber 3 slides melhor
            }
        },
        on: {
            init: function () {
                this.slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-visible') || slide.classList.contains('swiper-slide-active')) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    } else {
                        slide.style.opacity = '0';
                        slide.style.transform = 'translateY(30px)';
                    }
                });
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    // Garante que slides fora da tela (mas que podem ser próximos) resetem a animação
                     if (!slide.classList.contains('swiper-slide-visible') && !slide.classList.contains('swiper-slide-active') && !slide.classList.contains('swiper-slide-next') && !slide.classList.contains('swiper-slide-prev')) {
                        slide.style.opacity = '0';
                        slide.style.transform = 'translateY(30px)';
                    }
                });
            },
            slideChangeTransitionEnd: function() {
                this.slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-visible') || slide.classList.contains('swiper-slide-active')) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    }
                });
                 // Re-ativa o autoplay se foi desabilitado por interação e se a opção estiver ativa
                if (this.autoplay && this.autoplay.running === false && this.params.autoplay.disableOnInteraction === false) {
                    this.autoplay.start();
                }
            }
        }
    });
});
