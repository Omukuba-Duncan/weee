document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Reveal on scroll using IntersectionObserver
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: reveal all immediately
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    // Simple number counter for statistics (.stat-number)
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        if (!target) {
            el.textContent = el.textContent || ('0' + suffix);
            return;
        }
        let start = 0;
        const duration = 1400;
        const stepTime = Math.max(Math.floor(duration / target), 16);
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString() + suffix;
        };
        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window && counters.length) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(c => counterObs.observe(c));
    } else {
        counters.forEach(c => animateCounter(c));
    }

    // Partner carousel manual navigation
    const track = document.getElementById('partnerCarouselTrack');
    const prevBtn = document.getElementById('partnerPrevBtn');
    const nextBtn = document.getElementById('partnerNextBtn');
    if (track && prevBtn && nextBtn) {
        const scrollBy = 220; // pixels per click
        prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollBy, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollBy, behavior: 'smooth' }));
    }

    // Testimonials carousel (autoplay + manual controls)
    const testiTrack = document.getElementById('testimonialCarouselTrack');
    const testiPrev = document.getElementById('testiPrevBtn');
    const testiNext = document.getElementById('testiNextBtn');
    if (testiTrack) {
        let slide = testiTrack.querySelector('.testimonial-slide');
        const gap = 20; // fallback gap in px
        let itemWidth = slide ? slide.offsetWidth + gap : 360;
        let autoInterval = null;

        const startAutoplay = () => {
            if (autoInterval) clearInterval(autoInterval);
            autoInterval = setInterval(() => {
                // scroll next
                const maxScroll = testiTrack.scrollWidth - testiTrack.clientWidth;
                if (testiTrack.scrollLeft + itemWidth >= maxScroll - 10) {
                    testiTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    testiTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
                }
            }, 3800);
        };

        const stopAutoplay = () => { if (autoInterval) clearInterval(autoInterval); };

        // Start autoplay
        startAutoplay();

        // Manual controls
        if (testiPrev) testiPrev.addEventListener('click', () => {
            testiTrack.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });
        if (testiNext) testiNext.addEventListener('click', () => {
            testiTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });

        // Pause on hover
        testiTrack.addEventListener('mouseenter', stopAutoplay);
        testiTrack.addEventListener('mouseleave', startAutoplay);
    }

    // Newsletter form simple client-side validation
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            const email = newsletterForm.querySelector('input[name="email"]');
            if (!email || !email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
                e.preventDefault();
                if (newsletterMessage) {
                    newsletterMessage.textContent = 'Please enter a valid email address.';
                    newsletterMessage.style.color = 'tomato';
                }
                email && email.focus();
            }
        });
    }
});