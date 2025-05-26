document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Form handling
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default page reload

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Basic validation
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

            // Simulate form submission
            // In a real scenario, you would send data to a server here (e.g., using Fetch API)
            console.log('Form submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Company:', document.getElementById('company').value.trim());

            // Display success message
            formMessage.textContent = 'Obrigado! Seus dados foram enviados com sucesso. Entraremos em contato em breve.';
            formMessage.className = 'form-message success';
            form.reset(); // Clear the form fields

            // Optional: Hide message after some time
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
