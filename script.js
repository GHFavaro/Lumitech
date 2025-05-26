document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para todos os links de âncora internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
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

    // Inicialização do SwiperJS para o Carrossel do Hero (Permanece)
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
            el: '.hero-slider .hero-pagination',
            clickable: true,
        },
        allowTouchMove: true,
        speed: 1000,
    });

    // REMOVIDA a inicialização do SwiperJS para o Carrossel de Depoimentos
    // const testimonialSlider = new Swiper('.testimonial-slider', { ... });


    // Opcional: Animação de entrada para cards de depoimento com Intersection Observer
    // Se você quiser que os cards apareçam conforme rola a página:
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% do item visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // A animação CSS já está configurada para 'animation: fadeInCard ... forwards;'
                    // O delay escalonado já está no CSS.
                    // Apenas precisamos garantir que a animação possa ser re-acionada se necessário,
                    // ou simplesmente deixar o CSS cuidar disso na primeira vez que se torna visível.
                    // A animação CSS com 'forwards' já fará o trabalho.
                    // Se quiséssemos acionar uma classe: entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Para animar apenas uma vez
                }
            });
        };
        
        const cardObserver = new IntersectionObserver(observerCallback, observerOptions);
        testimonialCards.forEach(card => cardObserver.observe(card));
    }

});
