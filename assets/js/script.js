/**
 * WEEE Centre - Responsible E-Waste Management
 * Professional Corporate Website JavaScript
 * 
 * File: assets/js/script.js
 * Description: Implements sticky navbar scroll behavior, smooth scrolling, intersection observer
 *              for scroll reveal animations, animated counter for impact statistics, partner carousel,
 *              and newsletter AJAX form submission simulation with professional comments.
 * Author: WEEE Centre Dev Team
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. Sticky Navigation Scroll Effect
       ========================================================================== */
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }, { passive: true });
    }

    /* ==========================================================================
       2. Smooth Scrolling for Anchor Links
       ========================================================================== */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       3. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed for better performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.15
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver support
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* ==========================================================================
       4. Animated Number Counters for Statistics
       ========================================================================== */
    const statCounters = document.querySelectorAll('.stat-number[data-count]');
    if ('IntersectionObserver' in window && statCounters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const targetValue = parseInt(counter.getAttribute('data-count'), 10);
                    const suffix = counter.getAttribute('data-suffix') || '+';
                    const duration = 2000; // 2 seconds
                    const frameRate = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameRate);
                    let currentFrame = 0;

                    const updateCounter = () => {
                        currentFrame++;
                        const progress = currentFrame / totalFrames;
                        // Ease out quad
                        const currentVal = Math.round(targetValue * (1 - Math.pow(1 - progress, 3)));

                        if (currentFrame < totalFrames) {
                            counter.innerText = currentVal.toLocaleString() + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = targetValue.toLocaleString() + suffix;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        statCounters.forEach(counter => counterObserver.observe(counter));
    }

    /* ==========================================================================
       5. Partners Carousel / Horizontal Scroll Control
       ========================================================================== */
    const partnerContainer = document.getElementById('partnerCarouselTrack');
    const prevBtn = document.getElementById('partnerPrevBtn');
    const nextBtn = document.getElementById('partnerNextBtn');

    if (partnerContainer && prevBtn && nextBtn) {
        const scrollAmount = 280;

        prevBtn.addEventListener('click', () => {
            partnerContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            partnerContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       6. Newsletter Form Submission Handling
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) {
                if (newsletterMsg) {
                    newsletterMsg.innerHTML = `<span class="text-warning"><i class="fa-solid fa-triangle-exclamation me-1"></i> Please enter a valid email address.</span>`;
                }
                return;
            }

            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Subscribe';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Subscribing...`;
            }

            // Simulate AJAX submission delay
            setTimeout(() => {
                if (newsletterMsg) {
                    newsletterMsg.innerHTML = `<span class="text-light-green fw-medium"><i class="fa-solid fa-circle-check me-1"></i> Thank you! You've been subscribed to our updates.</span>`;
                }
                newsletterForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }, 1200);
        });
    }

    /* ==========================================================================
       7. Initialize Bootstrap Tooltips if present
       ========================================================================== */
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    console.info('♻ WEEE Centre - Towards Sustainable Future initialized successfully.');
});
