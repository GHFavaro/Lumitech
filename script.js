document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para todos os links de âncora internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Efeito de rolagem suave
                });
            }
        });
    });

    // Manipulação do Formulário de Lead
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
                formMessage.style.display = 'block';
                return;
            }

            if (!isValidEmail(email)) {
                formMessage.textContent = 'Por favor, insira um endereço de email válido.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            console.log('Formulário enviado:');
            console.log('Nome:', name);
            console.log('Email:', email);
            console.log('Empresa:', document.getElementById('company').value.trim());

            formMessage.textContent = 'Obrigado! Seus dados foram enviados com sucesso. Entraremos em contato em breve.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset(); 

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                formMessage.style.display = 'none';
            }, 7000);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inicialização do SwiperJS para o Carrossel do Hero
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-slider .hero-pagination', // Seletor específico para paginação do hero
            clickable: true,
        },
        allowTouchMove: true,
        speed: 1000,
    });

    // Inicialização do SwiperJS para o Carrossel de Depoimentos
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-slider .swiper-pagination', // Seletor específico
            clickable: true,
        },
        navigation: {
            nextEl: '.testimonial-slider .swiper-button-next', // Seletor específico
            prevEl: '.testimonial-slider .swiper-button-prev', // Seletor específico
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
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
                if (this.autoplay && this.autoplay.running === false && this.params.autoplay.disableOnInteraction === false) {
                    this.autoplay.start();
                }
            }
        }
    });
});
