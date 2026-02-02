document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Sticky Navbar & Scroll Effects
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }

    // Smooth Scroll Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100;
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
            modalIcon.style.background = 'var(--secondary-light)';
            modalIcon.style.color = 'var(--secondary)';
            modalIconImg.className = 'fas fa-exclamation-triangle';
            modalTitle.innerHTML = `<span style="color: var(--secondary)">${title}</span>`;
            modalBtn.className = 'btn btn-outline';
            modalBtn.textContent = 'Try Again';
        } else {
            modalIcon.style.background = 'var(--primary-light)';
            modalIcon.style.color = 'var(--primary)';
            modalIconImg.className = 'fas fa-paper-plane';
            modalTitle.innerHTML = `Request <span class="text-gradient">${title}</span>`;
            modalBtn.className = 'btn btn-primary';
            modalBtn.textContent = 'Great!';
        }
        modalMsg.textContent = message;
        modal.style.display = 'flex';
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showResponseModal('success', 'Submitted!', "Thanks for reaching out! We've received your request and will get back to you within 24 hours.");
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showResponseModal('error', 'Submission Failed', 'Something went wrong. Please check your connection or email us directly at hello@manaapps.in');
            } finally {
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    // Modal Close Function
    window.closeModal = () => {
        modal.style.display = 'none';
    };

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Simple reveal animation for cards if AOS fails
    const revealOnScroll = () => {
        const cards = document.querySelectorAll('.benefit-card, .solution-card, .stat-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});
