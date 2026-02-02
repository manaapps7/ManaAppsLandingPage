document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simplified placeholder)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        // In a real app, we'd toggle a class to show/hide the menu
        alert('Mobile menu functionality would go here! To keep it simple, we use a single-page responsive layout.');
    });

    // Smooth Scroll Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('mana-contact-form');
    const modal = document.getElementById('responseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalIconImg = document.getElementById('modalIconImg');
    const modalMsg = document.getElementById('modalMessage');
    const modalBtn = document.getElementById('modalBtn');

    const showResponseModal = (type, title, message) => {
        if (type === 'error') {
            modalIcon.classList.add('error');
            modalIconImg.className = 'fas fa-exclamation-triangle';
            modalTitle.innerHTML = `<span style="color: var(--secondary)">${title}</span>`;
            modalBtn.className = 'btn btn-secondary';
            modalBtn.textContent = 'Try Again';
        } else {
            modalIcon.classList.remove('error');
            modalIconImg.className = 'fas fa-paper-plane';
            modalTitle.innerHTML = `Message <span class="text-gradient">${title}</span>`;
            modalBtn.className = 'btn btn-primary';
            modalBtn.textContent = 'Great!';
        }
        modalMsg.textContent = message;
        modal.style.display = 'flex';
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameField = contactForm.querySelector('input[name="name"]');
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            formData.append('_subject', `New Inquiry from ${nameField.value}`);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent';
                    submitBtn.style.background = '#4CAF50';
                    showResponseModal('success', 'Sent!', `Thanks ${nameField.value}, your message has been sent to ManaApps. We'll get back to you soon.`);
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showResponseModal('error', 'Ops! Error', 'Your browser blocked the message because it\'s being sent from a local file. This is a common security feature. Please try again from a live website or email hello@manaapps.in directly.');
            } finally {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // Modal Close Function
    window.closeModal = () => {
        modal.style.display = 'none';
    };
});
