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
            event.preventDefault(); // Previne o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Validação básica
            if (name === '' || email === '') {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios (Nome e Email).';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block'; // Garante que a mensagem seja exibida
                return;
            }

            if (!isValidEmail(email)) {
                formMessage.textContent = 'Por favor, insira um endereço de email válido.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block'; // Garante que a mensagem seja exibida
                return;
            }

            // Simulação de envio do formulário (substituir pela lógica real de backend)
            console.log('Formulário enviado:');
            console.log('Nome:', name);
            console.log('Email:', email);
            console.log('Empresa:', document.getElementById('company').value.trim());

            // Exibe mensagem de sucesso
            formMessage.textContent = 'Obrigado! Seus dados foram enviados com sucesso. Entraremos em contato em breve.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block'; // Garante que a mensagem seja exibida
            form.reset(); // Limpa os campos do formulário

            // Opcional: Esconde a mensagem após alguns segundos
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                formMessage.style.display = 'none'; // Esconde a mensagem
            }, 7000);
        });
    }

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Define o ano atual no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inicialização do SwiperJS para o Carrossel do Hero
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        effect: 'fade', // Efeito de transição
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 6000, // Tempo entre slides (em milissegundos)
            disableOnInteraction: false, // Autoplay não para na interação do usuário
        },
        pagination: {
            el: '.hero-pagination', // Seletor da paginação do hero
            clickable: true,
        },
        allowTouchMove: true, // Permite arrastar em dispositivos móveis
        speed: 1000, // Velocidade da transição do slide
    });

    // Inicialização do SwiperJS para o Carrossel de Depoimentos
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 1, // Slides visíveis por padrão (mobile)
        spaceBetween: 30, // Espaço entre os slides
        grabCursor: true, // Mostra o cursor de "agarrar"
        autoplay: {
            delay: 5000, // Tempo entre slides
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination', // Seletor da paginação dos depoimentos (pode ser o mesmo ou diferente)
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next', // Seletor do botão "próximo"
            prevEl: '.swiper-button-prev', // Seletor do botão "anterior"
        },
        breakpoints: {
            // Quando a largura da janela for >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // Quando a largura da janela for >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        // Lógica para sincronizar animações CSS com as transições do Swiper
        on: {
            init: function () {
                this.slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-visible') || slide.classList.contains('swiper-slide-active')) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    } else {
                        // Garante que slides não visíveis inicialmente estejam prontos para animar
                        slide.style.opacity = '0';
                        slide.style.transform = 'translateY(30px)';
                    }
                });
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    // Antes da transição, reseta slides que vão sair ou ainda não entraram
                     if (!slide.classList.contains('swiper-slide-visible') && !slide.classList.contains('swiper-slide-active') && !slide.classList.contains('swiper-slide-next') && !slide.classList.contains('swiper-slide-prev')) {
                        slide.style.opacity = '0';
                        slide.style.transform = 'translateY(30px)';
                    }
                });
            },
            slideChangeTransitionEnd: function() {
                 // Após a transição, garante que os slides visíveis estejam animados
                this.slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-visible') || slide.classList.contains('swiper-slide-active')) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    }
                });
                 // Reativa o autoplay se foi desabilitado por interação e a opção permitir
                if (this.autoplay && this.autoplay.running === false && this.params.autoplay.disableOnInteraction === false) {
                    this.autoplay.start();
                }
            }
        }
    });
});
