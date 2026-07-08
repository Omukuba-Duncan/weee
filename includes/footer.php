<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: includes/footer.php
 * Description: Main corporate footer with quick links, newsletter sign-up, social icons,
 *              copyright information, Bootstrap 5.3 bundle, and custom JavaScript scripts.
 */

// Strict typing for PHP 8
declare(strict_types=1);
?>
    <!-- Main Footer Section -->
    <footer class="footer bg-dark-green text-white pt-5 mt-auto border-top border-success border-4">
        <div class="container py-4">
            <div class="row g-4 justify-content-between">
                <!-- Column 1: Brand & Tagline -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="d-flex align-items-center mb-3">
                        <div class="logo-icon-wrapper me-2 bg-white rounded-circle d-flex align-items-center justify-content-center p-2" style="width: 42px; height: 42px;">
                            <i class="fa-solid fa-recycle text-success fs-4"></i>
                        </div>
                        <div class="d-flex flex-column lh-1">
                            <span class="fw-bold fs-5 tracking-tight text-white">WEEE CENTRE</span>
                            <span class="text-light-green font-xs tracking-wider">Towards Sustainable Future</span>
                        </div>
                    </div>
                    <p class="text-light font-sm pe-lg-3 mb-4 opacity-85 lh-relaxed">
                        Leading the way in responsible e-waste management for a cleaner and greener tomorrow across Kenya and the East African region.
                    </p>
                    <div class="social-links d-flex gap-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Twitter / X">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="YouTube">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Quick Links</h5>
                    <ul class="list-unstyled footer-links mb-0 font-sm">
                        <li class="mb-2"><a href="about.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>About Us</a></li>
                        <li class="mb-2"><a href="services.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Services</a></li>
                        <li class="mb-2"><a href="about.php#certifications" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Certifications</a></li>
                        <li class="mb-2"><a href="projects.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Projects</a></li>
                        <li class="mb-2"><a href="events.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Events</a></li>
                        <li class="mb-0"><a href="contact.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Resources</h5>
                    <ul class="list-unstyled footer-links mb-0 font-sm">
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>E-Waste Education Hub</a></li>
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Guidelines & Policies</a></li>
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Reports & Publications</a></li>
                        <li class="mb-2"><a href="events.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>News & Updates</a></li>
                        <li class="mb-0"><a href="contact.php#faq" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>FAQs</a></li>
                    </ul>
                </div>

                <!-- Column 4: Contact Us -->
                <div class="col-12 col-md-6 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Contact Us</h5>
                    <ul class="list-unstyled mb-0 font-sm pe-lg-2">
                        <li class="d-flex mb-3 align-items-start">
                            <i class="fa-solid fa-location-dot mt-1 me-2 text-accent-green"></i>
                            <span class="text-light">P.O Box 69633 – 00400 Nairobi, Kenya</span>
                        </li>
                        <li class="d-flex mb-3 align-items-center">
                            <i class="fa-solid fa-phone me-2 text-accent-green"></i>
                            <a href="tel:+254768449499" class="text-light text-decoration-none">+254768449499</a>
                        </li>
                        <li class="d-flex mb-3 align-items-center">
                            <i class="fa-solid fa-envelope me-2 text-accent-green"></i>
                            <a href="mailto:ogadan254@gmail.com" class="text-light text-decoration-none">ogadan254@gmail.com</a>
                        </li>
                        <li class="d-flex mb-0 align-items-center">
                            <i class="fa-solid fa-globe me-2 text-accent-green"></i>
                            <a href="https://www.weeecentre.com" class="text-light text-decoration-none">www.weeecentre.com</a>
                        </li>
                    </ul>
                </div>

                <!-- Column 5: Newsletter -->
                <div class="col-12 col-md-6 col-lg-3">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Newsletter</h5>
                    <p class="font-sm text-light mb-3 opacity-85">
                        Subscribe to our newsletter for latest e-waste regulations, sustainability updates and community drives.
                    </p>
                    <form class="newsletter-form" action="contact.php" method="POST" id="newsletterForm" novalidate>
                        <input type="hidden" name="form_type" value="newsletter">
                        <div class="mb-2">
                            <input type="email" name="email" class="form-control form-control-sm rounded-pill py-2 px-3 border-0 shadow-sm font-sm" placeholder="Enter your email" required aria-label="Enter your email for newsletter">
                        </div>
                        <button type="submit" class="btn btn-success btn-sm w-100 rounded-pill py-2 fw-semibold shadow-sm transition-all d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-paper-plane me-2"></i> Subscribe
                        </button>
                    </form>
                    <div id="newsletterMessage" class="mt-2 font-xs"></div>
                </div>
            </div>

            <!-- Horizontal Divider -->
            <hr class="my-4 border-light opacity-15">

            <!-- Bottom Copyright & Policies -->
            <div class="row align-items-center font-sm text-light opacity-75">
                <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
                    <span>&copy; <?= date('Y'); ?> WEEE Centre. All Rights Reserved.</span>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <a href="about.php#privacy" class="text-light text-decoration-none me-3 transition-hover">Privacy Policy</a>
                    <span class="me-3">|</span>
                    <a href="about.php#terms" class="text-light text-decoration-none transition-hover">Terms of Use</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5.3 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <!-- Custom JavaScript with Smooth Scroll & Animations -->
    <script src="assets/js/script.js?v=2.0.0"></script>
    
<!-- Standalone PHP/Apache Realtime E-Waste AI Chatbot -->
<div id="weee-php-chatbot-container" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999; font-family: 'Segoe UI', system-ui, sans-serif;">
    <!-- Floating Trigger Button & Pill -->
    <div id="weee-chat-trigger-wrap" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <button id="weee-chat-btn" onclick="toggleWeeeChat()" style="width: 60px; height: 60px; border-radius: 50%; background-color: #13803f; color: white; border: 2px solid white; box-shadow: 0 8px 25px rgba(19, 128, 63, 0.5); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: transform 0.2s;">
            <i class="fa-solid fa-robot" id="weee-chat-icon"></i>
        </button>
        <div id="weee-chat-pill" onclick="toggleWeeeChat()" style="background: white; color: #0d3d26; padding: 8px 16px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 2px solid #1da15c; font-size: 13px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #1da15c; border-radius: 50%;"></span>
            <span>💬 E-Waste AI Assistant</span>
        </div>
    </div>

    <!-- Chat Window -->
    <div id="weee-chat-window" style="display: none; width: 370px; max-width: calc(100vw - 40px); height: 540px; background: white; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.25); overflow: hidden; flex-direction: column; border: 1px solid #e2e8f0; margin-bottom: 12px;">
        <!-- Header -->
        <div style="background: #0d3d26; color: white; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="background: white; color: #1da15c; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div>
                    <div style="font-weight: bold; font-size: 15px; line-height: 1.2;">WEEE Centre AI Assistant</div>
                    <div style="font-size: 11px; opacity: 0.85;">⚡ Online • NEMA E-Waste Intelligence</div>
                </div>
            </div>
            <button onclick="toggleWeeeChat()" style="background: transparent; border: none; color: white; font-size: 20px; cursor: pointer; padding: 4px;">&times;</button>
        </div>

        <!-- Messages Area -->
        <div id="weee-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; line-height: 1.5;">
            <!-- Initial Bot Message -->
            <div style="display: flex; gap: 8px; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #1da15c; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px;">♻️</div>
                <div style="background: white; padding: 12px 14px; border-radius: 12px; border-top-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); color: #1e293b; max-width: 85%;">
                    <strong>Jambo! Welcome to WEEE Centre Kenya.</strong> 🌱<br>
                    I am your intelligent E-Waste Assistant. How can we help your organization or household safely manage electronic waste today?
                </div>
            </div>
        </div>

        <!-- Quick Questions Pill Box -->
        <div style="padding: 8px 12px; background: #f1f5f9; border-top: 1px solid #e2e8f0; display: flex; gap: 6px; overflow-x: auto; white-space: nowrap; scrollbar-width: none;">
            <button onclick="sendWeeeMsg('🚚 How do I schedule an office or household e-waste pickup?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🚚 Schedule Pickup</button>
            <button onclick="sendWeeeMsg('🔒 What is your data destruction pricing & NEMA certificate?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🔒 Data Shredding</button>
            <button onclick="sendWeeeMsg('📋 How does Extended Producer Responsibility (EPR) work in Kenya?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">📋 NEMA EPR Guide</button>
            <button onclick="sendWeeeMsg('🔋 What e-waste items & solar lithium batteries do you accept?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🔋 Accepted Items</button>
            <button onclick="sendWeeeMsg('🌍 Where are your drop-off collection bins in Nairobi & Mombasa?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🌍 Nairobi Bins</button>
            <button onclick="sendWeeeMsg('⚖️ What is the penalty under Kenya Sustainable Waste Management Act?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">⚖️ NEMA Law</button>
        </div>

        <!-- Input Bar -->
        <form onsubmit="handleWeeeSubmit(event)" style="display: flex; padding: 10px; background: white; border-top: 1px solid #e2e8f0; gap: 8px;">
            <input type="text" id="weee-chat-input" placeholder="Ask about e-waste disposal, EPR, certificates..." style="flex: 1; border: 1px solid #cbd5e1; border-radius: 50px; padding: 8px 16px; font-size: 13.5px; outline: none;">
            <button type="submit" style="background: #13803f; color: white; border: none; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>
</div>

<script>
function toggleWeeeChat() {
    const win = document.getElementById('weee-chat-window');
    const pill = document.getElementById('weee-chat-pill');
    const icon = document.getElementById('weee-chat-icon');
    if (win.style.display === 'none' || !win.style.display) {
        win.style.display = 'flex';
        pill.style.display = 'none';
        icon.className = 'fa-solid fa-chevron-down';
    } else {
        win.style.display = 'none';
        pill.style.display = 'flex';
        icon.className = 'fa-solid fa-robot';
    }
}

function handleWeeeSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('weee-chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendWeeeMsg(text);
}

function sendWeeeMsg(text) {
    const box = document.getElementById('weee-chat-messages');
    
    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 4px;';
    userDiv.innerHTML = '<div style="background: #13803f; color: white; padding: 10px 14px; border-radius: 12px; border-top-right-radius: 2px; max-width: 85%; box-shadow: 0 2px 5px rgba(0,0,0,0.08); word-break: break-word;">' + text + '</div>';
    box.appendChild(userDiv);
    box.scrollTop = box.scrollHeight;

    // Typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.id = 'weee-typing';
    typingDiv.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-top: 4px; color: #64748b; font-size: 12px; font-style: italic;';
    typingDiv.innerHTML = '<div style="width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 11px;">🤖</div><span>WEEE Centre AI is thinking...</span>';
    box.appendChild(typingDiv);
    box.scrollTop = box.scrollHeight;

    setTimeout(() => {
        const typingEl = document.getElementById('weee-typing');
        if (typingEl) typingEl.remove();

        let reply = "Thank you for asking! As East Africa's premier NEMA & ISO 9001:2015 certified e-waste recycling facility, we provide secure collection, data destruction, and EPR compliance. Contact us directly at ogadan254@gmail.com or call +254768449499.";
        const lower = text.toLowerCase();

        if (lower.includes('charge') || lower.includes('price') || lower.includes('cost') || lower.includes('quotation') || lower.includes('how much') || lower.includes('develop') || lower.includes('website')) {
            reply = "💰 <b>Kenya Web Development Pricing Advice (KES & USD):</b><br><br>For a custom full-stack platform like WEEE Centre (PHP 8 + MySQL sync, NEMA EPR automated compliance, interactive pickup booking, real-time chatbot, & admin CMS):<br><br>• <b>Freelance / Mid-Level:</b> KES 85,000 – 140,000<br>• <b>Senior Developer / Agency:</b> KES 180,000 – 280,000 (~$1,400 – $2,150 USD)<br>• <b>Enterprise Contract:</b> KES 350,000+<br><br><b>Recommended Itemized Quote:</b><br>1. UI/UX & Frontend (Tailwind/React): KES 50,000<br>2. PHP/MySQL & EPR Compliance Module: KES 70,000<br>3. Real-Time Chatbot & Automated Doc Generator: KES 45,000<br>4. Admin Lead Management CMS: KES 45,000<br><b>Total Suggested Price:</b> <b>KES 210,000</b> (with 40% upfront deposit).";
        } else if (lower.includes('schedule') || lower.includes('pickup') || lower.includes('collect') || lower.includes('office') || lower.includes('household')) {
            reply = "🚚 <b>How to Schedule a Pickup:</b><br>1. Click the green <b>'Dispose Now ♻️'</b> button or visit our Contact page.<br>2. Select <b>'Corporate / Business Collection'</b> or <b>'Household Pickup'</b>.<br>3. Enter your contact details and estimated waste volume (e.g., computers, servers, printers).<br>4. Our logistics team will dispatch a NEMA-licensed GPS-tracked truck to your premises within 24-48 hours!";
        } else if (lower.includes('data') || lower.includes('shred') || lower.includes('destroy') || lower.includes('certificate') || lower.includes('security') || lower.includes('hard drive')) {
            reply = "🔒 <b>Secure Data Destruction & NEMA Certificates:</b><br>We provide military-grade physical hard drive shredding (down to 6mm particles) and magnetic degaussing compliant with <b>NIST SP 800-88</b> standards.<br><br>• <b>Pricing:</b> Discounted for corporate bulk lots (approx. KES 500 - 1,500 per drive depending on volume & on-site vs off-site shredding).<br>• <b>Proof:</b> Within 48 hours, we issue a serialized <b>NEMA Certificate of Data Destruction</b> with barcode logs for your ISO/GDPR compliance audit!";
        } else if (lower.includes('epr') || lower.includes('producer') || lower.includes('compliance') || lower.includes('responsibility')) {
            reply = "📋 <b>Extended Producer Responsibility (EPR) in Kenya:</b><br>Under Section 14 of the Kenya Sustainable Waste Management Act 2022, all brand owners, manufacturers, and importers of electrical and electronic equipment (EEE) must take physical and financial responsibility for end-of-life recovery.<br><br>• <b>WEEE Centre Role:</b> We serve as your certified Producer Responsibility Organization (PRO), providing nationwide take-back bins, recycling quotas (30% in Year 1, 50% in Year 2), and filing annual NEMA compliance audit reports on your behalf!";
        } else if (lower.includes('accept') || lower.includes('items') || lower.includes('battery') || lower.includes('batteries') || lower.includes('solar') || lower.includes('what e-waste') || lower.includes('what can i')) {
            reply = "🔋 <b>Accepted E-Waste & Solar Batteries:</b><br>We accept all electrical and electronic equipment, including:<br>• <b>IT & Telecom:</b> Laptops, desktop PCs, servers, routers, mobile phones, cables.<br>• <b>Power & Solar:</b> Lithium-ion solar batteries, inverters, UPS units, lead-acid batteries.<br>• <b>Household & Office:</b> Televisions, printers, scanners, microwaves, air conditioners, and fluorescent tubes.";
        } else if (lower.includes('where') || lower.includes('drop-off') || lower.includes('dropoff') || lower.includes('nairobi') || lower.includes('mombasa') || lower.includes('bin') || lower.includes('location')) {
            reply = "🌍 <b>WEEE Centre Drop-off Points & Collection Bins:</b><br>• <b>Nairobi HQ:</b> Utawala, off Eastern Bypass (Open Mon-Fri 8am-5pm, Sat 9am-1pm).<br>• <b>Nairobi Malls:</b> Sarit Centre, Yaya Centre, Village Market, and participating Safaricom retail shops.<br>• <b>Mombasa:</b> Nyali Centre & City Mall e-waste bins.<br>• <b>Kisumu:</b> Mega City Mall recycling station.<br><br>For bulky loads over 50kg, we offer <b>free residential and corporate pickup</b> across Kenya!";
        } else if (lower.includes('penalty') || lower.includes('act') || lower.includes('law') || lower.includes('illegal') || lower.includes('dump')) {
            reply = "⚖️ <b>Kenya Sustainable Waste Management Act 2022:</b><br>Open dumping or burning of electronic waste is illegal in Kenya. Corporations failing to comply with EPR or disposing of hazardous e-waste in municipal landfills face severe penalties, including fines up to <b>KES 4,000,000</b>, imprisonment of up to 4 years, and suspension of import/operating licenses by NEMA.";
        } else if (lower.includes('donate') || lower.includes('school') || lower.includes('computer') || lower.includes('refurbish') || lower.includes('charity') || lower.includes('rural')) {
            reply = "🖥️ <b>Refurbished Computer Donations & ITAD:</b><br>Through our IT Asset Disposal (ITAD) refurbishment labs, we upgrade decommissioned corporate laptops and desktops. Viable machines are loaded with educational software and donated to rural public schools and digital literacy centers across Kenya. In 2025 alone, we donated over 800 upgraded computers!";
        } else if (lower.includes('human') || lower.includes('agent') || lower.includes('email') || lower.includes('connect') || lower.includes('talk')) {
            reply = "👤 <b>Connecting you to our Live Support Team!</b><br>You can reach our environmental engineers directly at <b>ogadan254@gmail.com</b> or call our Nairobi office at <b>+254768449499</b>.";
        }

        const botDiv = document.createElement('div');
        botDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start; margin-bottom: 4px;';
        botDiv.innerHTML = '<div style="width: 28px; height: 28px; border-radius: 50%; background: #1da15c; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px;">♻️</div><div style="background: white; padding: 12px 14px; border-radius: 12px; border-top-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); color: #1e293b; max-width: 85%;">' + reply + '</div>';
        box.appendChild(botDiv);
        box.scrollTop = box.scrollHeight;
    }, 600);
}
</script>
<!-- WhatsApp Floating Action Button -->
<a href="https://wa.me/254768449499?text=Hello%21%20Welcome%20to%20WEEE%20Centre%20Kenya.%20We%20are%20a%20NEMA%20%26%20ISO%209001%3A2015%20certified%20e-waste%20recycling%20and%20IT%20asset%20disposal%20company.%20How%20can%20we%20help%20you%20today%3F%20Pickup%2C%20data%20destruction%2C%20EPR%20compliance%2C%20or%20training%3F" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Chat with WEEE Centre on WhatsApp" title="Chat with WEEE Centre on WhatsApp">
    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
    <span class="fab-label">WhatsApp Us</span>
</a>
<script src="assets/js/script.js"></script>
</body>
</html>