// ========================================
// BauMeister - Main JavaScript
// Multilingual Support (DE/EN) + Dark Mode
// ========================================

// === MULTILINGUAL CONTENT ===
const translations = {
  de: {
    // Navigation
    nav_home: 'Startseite',
    nav_services: 'Leistungen',
    nav_about: 'Über uns',
    nav_projects: 'Projekte',
    nav_contact: 'Kontakt',
    nav_home_mobile: 'Startseite',
    nav_services_mobile: 'Leistungen',
    nav_about_mobile: 'Über uns',
    nav_projects_mobile: 'Projekte',
    nav_contact_mobile: 'Kontakt',
    
    // Hero
    hero_title: 'Wir gestalten <br>Ihre Räume neu',
    hero_subtitle: 'Zuverlässigkeit, Qualität und Termintreue sind unsere Grundprinzipien. Vertrauen Sie Ihr Projekt den Profis an.',
    hero_btn_1: 'Unsere Leistungen',
    hero_btn_2: 'Kontakt',
    
    // Services
    services_title: 'Unsere Leistungen',
    services_subtitle: 'Wir bieten ein komplettes Spektrum an Renovierungs- und Ausbauarbeiten, von der Planung bis zur schlüsselfertigen Übergabe.',
    
    // About
    about_title: 'Warum Sie uns wählen sollten',
    about_desc: 'Wir sind stolz auf unseren Ruf als zuverlässiger Partner. Unser Ansatz basiert auf Ehrlichkeit, Professionalität und Liebe zum Detail in jeder Phase der Arbeit.',
    
    // Portfolio
    portfolio_title: 'Aktuelle Projekte',
    filter_all: 'Alle',
    filter_houses: 'Häuser & Villen',
    filter_apartments: 'Wohnungen',
    filter_offices: 'Büros',
    
    // Testimonials
    testimonials_title: 'Was unsere Kunden sagen',
    testimonials_subtitle: 'Ihr Vertrauen ist unser größtes Kapital.',
    
    // CTA
    cta_title: 'Suchen Sie einen zuverlässigen Partner?',
    cta_subtitle: 'Wir sind bereit, Ihr Traumprojekt zu verwirklichen. Erhalten Sie noch heute eine kostenlose Beratung und einen detaillierten Kostenvoranschlag.',
    cta_btn: 'Angebot anfordern',
    
    // Contact
    contact_title: 'Kontaktieren Sie uns',
    contact_subtitle: 'Hinterlassen Sie eine Nachricht, und wir werden uns in Kürze bei Ihnen melden.',
    form_name_placeholder: 'Ihr Name',
    form_phone_placeholder: 'Ihre Telefonnummer',
    form_message_placeholder: 'Beschreiben Sie kurz Ihr Projekt...',
    form_send_btn: 'Senden',
    contact_success_title: 'Vielen Dank!',
    contact_success_msg: 'Ihre Nachricht wurde gesendet. Wir werden uns in Kürze bei Ihnen melden.',
    
    // Footer
    footer_about_title: 'Über uns',
    footer_about_desc: '"BauMeister" — Ihr zuverlässiger Partner in der Welt der Renovierung. Wir schaffen Qualität, der Sie seit über 15 Jahren vertrauen können.',
    footer_services_title: 'Unsere Leistungen',
    footer_service_1: '» Komplettsanierung',
    footer_service_2: '» Wohnungsrenovierung',
    footer_service_3: '» Bürosanierung',
    footer_service_4: '» Design-Projekte',
    footer_contact_title: 'Kontakt',
    footer_projects_title: 'Aktuelle Projekte',
    address: 'Musterstraße 1, 1010 Wien',
    phone_number: '+43 664 1234567',
    phone_number_footer: '+43 664 1234567',
    email: 'info@baumeister.at',
    email_footer: 'info@baumeister.at',
    copyright: '© 2024 BauMeister. Alle Rechte vorbehalten.',
    
    // Callback Modal
    request_callback_btn: 'Rückruf anfordern',
    request_callback_btn_mobile: 'Rückruf anfordern',
    callback_title_modal: 'Rückruf anfordern',
    callback_subtitle_modal: 'Hinterlassen Sie Ihre Nummer und wir rufen Sie innerhalb von 10 Minuten zurück!',
    phone_placeholder_modal: 'Ihre Telefonnummer',
    callback_btn_modal: 'Rückruf anfordern',
    callback_success_title_modal: 'Vielen Dank!',
    callback_success_msg_modal: 'Ihre Anfrage wurde erhalten. Wir werden Sie in Kürze kontaktieren.',
    
    // Form Validation Messages
    validation_required: 'Bitte füllen Sie dieses Feld aus',
    validation_name_required: 'Bitte geben Sie Ihren Namen ein',
    validation_phone_required: 'Bitte geben Sie Ihre Telefonnummer ein',
    validation_phone_invalid: 'Bitte geben Sie eine gültige Telefonnummer ein',
    validation_message_required: 'Bitte geben Sie eine Nachricht ein',
    error_occurred: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    // Chat widget
    chat_open_button: 'Chat',
    chat_title: 'Online-Chat',
    chat_send_button: 'Senden',
    chat_name_placeholder: 'Ihr Name (optional)',
    chat_message_placeholder: 'Nachricht...'
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Services',
    nav_about: 'About Us',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_home_mobile: 'Home',
    nav_services_mobile: 'Services',
    nav_about_mobile: 'About Us',
    nav_projects_mobile: 'Projects',
    nav_contact_mobile: 'Contact',
    
    // Hero
    hero_title: 'We Transform <br>Your Spaces',
    hero_subtitle: 'Reliability, quality, and punctuality are our core principles. Trust your project to the professionals.',
    hero_btn_1: 'Our Services',
    hero_btn_2: 'Contact',
    
    // Services
    services_title: 'Our Services',
    services_subtitle: 'We offer a full range of renovation and construction services, from planning to turnkey delivery.',
    
    // About
    about_title: 'Why Choose Us',
    about_desc: 'We take pride in our reputation as a reliable partner. Our approach is based on honesty, professionalism, and attention to detail at every stage.',
    
    // Portfolio
    portfolio_title: 'Recent Projects',
    filter_all: 'All',
    filter_houses: 'Houses & Villas',
    filter_apartments: 'Apartments',
    filter_offices: 'Offices',
    
    // Testimonials
    testimonials_title: 'What Our Clients Say',
    testimonials_subtitle: 'Your trust is our greatest asset.',
    
    // CTA
    cta_title: 'Looking for a Reliable Partner?',
    cta_subtitle: 'We are ready to bring your dream project to life. Get a free consultation and detailed quote today.',
    cta_btn: 'Request a Quote',
    
    // Contact
    contact_title: 'Contact Us',
    contact_subtitle: 'Leave a message and we will get back to you shortly.',
    form_name_placeholder: 'Your Name',
    form_phone_placeholder: 'Your Phone Number',
    form_message_placeholder: 'Briefly describe your project...',
    form_send_btn: 'Send',
    contact_success_title: 'Thank You!',
    contact_success_msg: 'Your message has been sent. We will contact you shortly.',
    
    // Footer
    footer_about_title: 'About Us',
    footer_about_desc: '"BauMeister" — Your trusted partner in renovation. We create quality you can rely on for over 15 years.',
    footer_services_title: 'Our Services',
    footer_service_1: '» Complete Renovation',
    footer_service_2: '» Apartment Renovation',
    footer_service_3: '» Office Renovation',
    footer_service_4: '» Design Projects',
    footer_contact_title: 'Contact',
    footer_projects_title: 'Recent Projects',
    address: 'Musterstraße 1, 1010 Vienna',
    phone_number: '+43 664 1234567',
    phone_number_footer: '+43 664 1234567',
    email: 'info@baumeister.at',
    email_footer: 'info@baumeister.at',
    copyright: '© 2024 BauMeister. All rights reserved.',
    
    // Callback Modal
    request_callback_btn: 'Request Callback',
    request_callback_btn_mobile: 'Request Callback',
    callback_title_modal: 'Request Callback',
    callback_subtitle_modal: 'Leave your number and we will call you back within 10 minutes!',
    phone_placeholder_modal: 'Your Phone Number',
    callback_btn_modal: 'Request Callback',
    callback_success_title_modal: 'Thank You!',
    callback_success_msg_modal: 'Your request has been received. We will contact you shortly.',
    
    // Form Validation Messages
    validation_required: 'Please fill in this field',
    validation_name_required: 'Please enter your name',
    validation_phone_required: 'Please enter your phone number',
    validation_phone_invalid: 'Please enter a valid phone number',
    validation_message_required: 'Please enter a message',
    error_occurred: 'An error occurred. Please try again.',
    // Chat widget
    chat_open_button: 'Chat',
    chat_title: 'Online Chat',
    chat_send_button: 'Send',
    chat_name_placeholder: 'Your name (optional)',
    chat_message_placeholder: 'Message...'
  }
};

// === SERVICES DATA ===
const services = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    title_de: 'Komplettsanierung',
    title_en: 'Complete Renovation',
    desc_de: 'Vollständige Renovierung von Häusern und Wohnungen mit Garantie auf alle Arbeiten.',
    desc_en: 'Complete renovation of houses and apartments with warranty on all works.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    title_de: 'Wohnungsrenovierung',
    title_en: 'Apartment Renovation',
    desc_de: 'Modernisierung von Wohnungen jeder Größe mit individuellem Design.',
    desc_en: 'Modernization of apartments of any size with individual design.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    title_de: 'Bürosanierung',
    title_en: 'Office Renovation',
    desc_de: 'Professionelle Gestaltung von Büros und Gewerberäumen.',
    desc_en: 'Professional design of offices and commercial spaces.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    title_de: 'Design-Projekte',
    title_en: 'Design Projects',
    desc_de: 'Exklusive Design-Lösungen für anspruchsvolle Kunden.',
    desc_en: 'Exclusive design solutions for demanding clients.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
    title_de: 'Trockenbau',
    title_en: 'Drywall Construction',
    desc_de: 'Hochwertige Trockenbauarbeiten für Innenausbau.',
    desc_en: 'High-quality drywall work for interior construction.'
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    title_de: 'Fassadenarbeiten',
    title_en: 'Facade Work',
    desc_de: 'Fassadensanierung und Wärmedämmung nach neuesten Standards.',
    desc_en: 'Facade renovation and thermal insulation to the latest standards.'
  }
];

// === FAQ DATA ===
const faqData = [
  {
    question_de: 'Wie lange dauert eine durchschnittliche Renovierung?',
    question_en: 'How long does an average renovation take?',
    answer_de: 'Die Dauer hängt vom Projektumfang ab. Eine Wohnungsrenovierung dauert in der Regel 3-6 Wochen, größere Projekte können 2-3 Monate in Anspruch nehmen.',
    answer_en: 'Duration depends on the project scope. An apartment renovation typically takes 3-6 weeks, larger projects may take 2-3 months.'
  },
  {
    question_de: 'Bieten Sie eine Garantie?',
    question_en: 'Do you offer a warranty?',
    answer_de: 'Ja, wir bieten 2 Jahre Garantie auf alle Bauarbeiten und bis zu 5 Jahre auf bestimmte Materialien.',
    answer_en: 'Yes, we offer a 2-year warranty on all construction work and up to 5 years on certain materials.'
  },
  {
    question_de: 'Kann ich während der Renovierung in der Wohnung wohnen?',
    question_en: 'Can I stay in the apartment during renovation?',
    answer_de: 'Bei kleineren Arbeiten ist das möglich. Bei größeren Projekten empfehlen wir jedoch einen Auszug für die Dauer der Arbeiten.',
    answer_en: 'With minor work, this is possible. For larger projects, however, we recommend moving out for the duration of the work.'
  },
  {
    question_de: 'Erstellen Sie kostenlose Kostenvoranschläge?',
    question_en: 'Do you provide free estimates?',
    answer_de: 'Ja, wir erstellen kostenlose und unverbindliche Kostenvoranschläge nach Besichtigung vor Ort.',
    answer_en: 'Yes, we provide free and non-binding estimates after an on-site inspection.'
  }
];

// === PORTFOLIO DATA ===
const portfolioData = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    title_de: 'Villa in Wien',
    title_en: 'Villa in Vienna',
    desc_de: 'Komplettsanierung einer Villa mit 300m² Wohnfläche',
    desc_en: 'Complete renovation of a 300m² villa',
    category: 'houses'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    title_de: 'Moderne Wohnung',
    title_en: 'Modern Apartment',
    desc_de: 'Vollständige Renovierung einer 120m² Wohnung',
    desc_en: 'Full renovation of a 120m² apartment',
    category: 'apartments'
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    title_de: 'Büroräume',
    title_en: 'Office Space',
    desc_de: 'Gestaltung moderner Büroräume mit 250m²',
    desc_en: 'Design of modern office space with 250m²',
    category: 'offices'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
    title_de: 'Einfamilienhaus',
    title_en: 'Single Family Home',
    desc_de: 'Sanierung eines Einfamilienhauses mit Garten',
    desc_en: 'Renovation of a single-family home with garden',
    category: 'houses'
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    title_de: 'Penthouse',
    title_en: 'Penthouse',
    desc_de: 'Luxus-Penthouse mit 180m² und Dachterrasse',
    desc_en: 'Luxury penthouse with 180m² and roof terrace',
    category: 'apartments'
  },
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
    title_de: 'Coworking Space',
    title_en: 'Coworking Space',
    desc_de: 'Moderner Coworking Space mit 400m²',
    desc_en: 'Modern coworking space with 400m²',
    category: 'offices'
  },
  {
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
    title_de: 'Altbausanierung',
    title_en: 'Historic Building',
    desc_de: 'Restaurierung eines historischen Gebäudes',
    desc_en: 'Restoration of a historic building',
    category: 'houses'
  },
  {
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop',
    title_de: 'Studio-Wohnung',
    title_en: 'Studio Apartment',
    desc_de: 'Kompakte 45m² Studio-Wohnung mit smartem Design',
    desc_en: 'Compact 45m² studio apartment with smart design',
    category: 'apartments'
  }
];

// === TESTIMONIALS DATA ===
const testimonialsData = [
  {
    text_de: 'Wir sind absolut begeistert von der Qualität der Arbeit! Das Team war professionell, pünktlich und hat alle unsere Wünsche berücksichtigt. Unsere Wohnung sieht jetzt fantastisch aus!',
    text_en: 'We are absolutely thrilled with the quality of work! The team was professional, punctual, and considered all our wishes. Our apartment looks fantastic now!',
    author: 'Maria Schmidt',
    location_de: 'Wien',
    location_en: 'Vienna',
    rating: 5
  },
  {
    text_de: 'Ausgezeichnete Arbeit! Unser Büro wurde in kürzester Zeit renoviert und das Ergebnis übertraf unsere Erwartungen. Sehr empfehlenswert!',
    text_en: 'Excellent work! Our office was renovated in no time and the result exceeded our expectations. Highly recommended!',
    author: 'Thomas Müller',
    location_de: 'Graz',
    location_en: 'Graz',
    rating: 5
  },
  {
    text_de: 'Kompetente Beratung, faire Preise und einwandfreie Ausführung. Wir haben unsere Traumvilla bekommen!',
    text_en: 'Competent advice, fair prices and flawless execution. We got our dream villa!',
    author: 'Anna Weber',
    location_de: 'Salzburg',
    location_en: 'Salzburg',
    rating: 5
  }
];

// === STATE VARIABLES ===
let currentLang = localStorage.getItem('language') || 'de';
let currentTestimonial = 0;
let currentPortfolioFilter = 'all';

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initHeader();
  initMobileMenu();
  initRevealOnScroll();
  initServices();
  initFAQ();
  initPortfolio();
  initTestimonials();
  initLightbox();
  initForms();
  initCallbackModal();
  initBackToTop();
  initSiteChat();
});

// === LANGUAGE FUNCTIONS ===
function initLanguage() {
  updateLanguage(currentLang);
  
  document.getElementById('lang-de').addEventListener('click', () => switchLanguage('de'));
  document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
  
  updateLangButtons();
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateLanguage(lang);
  updateLangButtons();
  
  // Reload dynamic content
  renderServices();
  renderFAQ();
  renderPortfolio();
  renderTestimonials();
  
  // Update form validation messages
  const mainForm = document.getElementById('main-contact-form');
  const callbackForm = document.getElementById('callback-modal-form');
  if (mainForm) setCustomValidationMessages(mainForm);
  if (callbackForm) setCustomValidationMessages(callbackForm);
}

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  
  document.documentElement.lang = lang;
}

function updateLangButtons() {
  document.getElementById('lang-de').classList.toggle('active', currentLang === 'de');
  document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
}

// === THEME FUNCTIONS ===
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  
  // Show correct icon
  if (document.documentElement.classList.contains('dark')) {
    darkIcon.classList.remove('hidden');
  } else {
    lightIcon.classList.remove('hidden');
  }
  
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    if (document.documentElement.classList.contains('dark')) {
      localStorage.theme = 'dark';
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
    } else {
      localStorage.theme = 'light';
      lightIcon.classList.remove('hidden');
      darkIcon.classList.add('hidden');
    }
  });
}

// === HEADER FUNCTIONS ===
function initHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('[data-scroll-to]');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
  });
  
  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-scroll-to') || link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-scroll-to') === sectionId || link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// === MOBILE MENU ===
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// === REVEAL ON SCROLL ===
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(reveal => observer.observe(reveal));
}

// === SERVICES ===
function initServices() {
  renderServices();
}

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = services.map(service => `
    <div class="service-card reveal">
      <div class="service-card-icon">${service.icon}</div>
      <h3 class="text-xl font-bold text-heading mb-3 text-center">${service[`title_${currentLang}`]}</h3>
      <p class="text-main text-center">${service[`desc_${currentLang}`]}</p>
    </div>
  `).join('');
  
  // Re-init reveal animations
  initRevealOnScroll();
}

// === FAQ ===
function initFAQ() {
  renderFAQ();
}

function renderFAQ() {
  const container = document.getElementById('faq-container');
  container.innerHTML = faqData.map((faq, index) => `
    <div class="faq-item" data-faq="${index}">
      <button class="faq-question">
        <span>${faq[`question_${currentLang}`]}</span>
        <svg class="faq-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="faq-answer">
        <p class="text-main">${faq[`answer_${currentLang}`]}</p>
      </div>
    </div>
  `).join('');
  
  // Add event listeners
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const wasActive = parent.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      
      // Open clicked if wasn't active
      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });
}

// === PORTFOLIO ===
function initPortfolio() {
  renderPortfolio();
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterPortfolio(filter);
      
      // Update active button
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  // Set first button as active
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = portfolioData.map((project, index) => `
    <div class="portfolio-item reveal" data-category="${project.category}" data-index="${index}">
      <img src="${project.image}" alt="${project[`title_${currentLang}`]}" loading="lazy">
      <div class="portfolio-overlay">
        <h3 class="font-bold text-lg mb-1">${project[`title_${currentLang}`]}</h3>
        <p class="text-sm opacity-90">${project[`desc_${currentLang}`]}</p>
      </div>
    </div>
  `).join('');
  
  // Add click listeners
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = item.getAttribute('data-index');
      openLightbox(index);
    });
  });
  
  // Footer projects (first 6)
  const footerGrid = document.getElementById('footer-projects');
  if (footerGrid) {
    footerGrid.innerHTML = portfolioData.slice(0, 6).map((project, index) => `
      <div class="cursor-pointer hover:opacity-80 transition" data-lightbox="${index}">
        <img src="${project.image}" alt="${project[`title_${currentLang}`]}" class="w-full h-20 object-cover rounded" loading="lazy">
      </div>
    `).join('');
    
    footerGrid.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const index = item.getAttribute('data-lightbox');
        openLightbox(index);
      });
    });
  }
  
  // Re-init reveal
  initRevealOnScroll();
}

function filterPortfolio(filter) {
  currentPortfolioFilter = filter;
  const items = document.querySelectorAll('.portfolio-item');
  
  items.forEach(item => {
    const category = item.getAttribute('data-category');
    if (filter === 'all' || category === filter) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// === TESTIMONIALS ===
function initTestimonials() {
  renderTestimonials();
  
  document.getElementById('prev-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
    showTestimonial();
  });
  
  document.getElementById('next-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    showTestimonial();
  });
  
  // Auto-rotate every 5 seconds
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    showTestimonial();
  }, 5000);
}

function renderTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  slider.innerHTML = testimonialsData.map((testimonial, index) => {
    const stars = '★'.repeat(testimonial.rating);
    return `
      <div class="testimonial-slide ${index === currentTestimonial ? 'active' : ''}">
        <div class="text-yellow-400 text-2xl mb-4">${stars}</div>
        <p class="text-main text-lg mb-6 italic">"${testimonial[`text_${currentLang}`]}"</p>
        <div class="font-bold text-heading">${testimonial.author}</div>
        <div class="text-sm text-main">${testimonial[`location_${currentLang}`]}</div>
      </div>
    `;
  }).join('');
}

function showTestimonial() {
  const slides = document.querySelectorAll('.testimonial-slide');
  slides.forEach((slide, index) => {
    if (index === currentTestimonial) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

// === LIGHTBOX ===
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

function openLightbox(index) {
  const project = portfolioData[index];
  const lightbox = document.getElementById('lightbox');
  
  document.getElementById('lightbox-img').src = project.image;
  document.getElementById('lightbox-title').textContent = project[`title_${currentLang}`];
  document.getElementById('lightbox-desc').textContent = project[`desc_${currentLang}`];
  
  lightbox.classList.remove('hidden');
  setTimeout(() => lightbox.classList.add('show'), 10);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('show');
  setTimeout(() => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

// === FORMS ===
function initForms() {
  // Main contact form
  const mainForm = document.getElementById('main-contact-form');
  if (mainForm) {
    mainForm.addEventListener('submit', handleFormSubmit);
    setCustomValidationMessages(mainForm);
  }
  
  // Callback modal form
  const callbackForm = document.getElementById('callback-modal-form');
  if (callbackForm) {
    callbackForm.addEventListener('submit', handleCallbackSubmit);
    setCustomValidationMessages(callbackForm);
  }
}

// Set custom validation messages based on current language
function setCustomValidationMessages(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  
  inputs.forEach(input => {
    // Remove previous listeners
    input.removeEventListener('invalid', handleInvalid);
    
    // Add new listener
    input.addEventListener('invalid', handleInvalid);
    
    // Clear custom validity on input
    input.addEventListener('input', () => {
      input.setCustomValidity('');
    });
  });
}

function handleInvalid(e) {
  const input = e.target;
  const type = input.type;
  const name = input.name;
  
  e.preventDefault();
  
  // Determine the appropriate message
  let message = translations[currentLang].validation_required;
  
  if (input.validity.valueMissing) {
    if (name === 'name') {
      message = translations[currentLang].validation_name_required;
    } else if (name === 'phone') {
      message = translations[currentLang].validation_phone_required;
    } else if (name === 'message') {
      message = translations[currentLang].validation_message_required;
    }
  } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
    if (type === 'tel' || name === 'phone') {
      message = translations[currentLang].validation_phone_invalid;
    }
  }
  
  input.setCustomValidity(message);
  input.reportValidity();
}

// Validate form and focus on first invalid field
function validateAndFocusFirstInvalid(form) {
  // Define the order of fields to check
  const fieldOrder = ['name', 'phone', 'message'];
  
  // Check fields in specified order
  for (let fieldName of fieldOrder) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    
    // Skip if field doesn't exist or is honeypot
    if (!input || fieldName === 'website') continue;
    
    // Check if field is required
    if (!input.hasAttribute('required') && !input.value.trim()) continue;
    
    // Check if field is empty (and required)
    if (input.hasAttribute('required') && !input.value.trim()) {
      // Set appropriate error message
      let message = translations[currentLang].validation_required;
      
      if (fieldName === 'name') {
        message = translations[currentLang].validation_name_required;
      } else if (fieldName === 'phone') {
        message = translations[currentLang].validation_phone_required;
      } else if (fieldName === 'message') {
        message = translations[currentLang].validation_message_required;
      }
      
      input.setCustomValidity(message);
      input.reportValidity();
      
      // Scroll to field and focus
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.focus();
      }, 100);
      
      return false;
    }
    
    // Check if field is valid (for tel, email, etc.)
    if (input.value.trim() && !input.checkValidity()) {
      let message = translations[currentLang].validation_required;
      
      if (input.type === 'tel' || fieldName === 'phone') {
        message = translations[currentLang].validation_phone_invalid;
      }
      
      input.setCustomValidity(message);
      input.reportValidity();
      
      // Scroll to field and focus
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.focus();
      }, 100);
      
      return false;
    }
    
    // Clear any previous custom validity
    input.setCustomValidity('');
  }
  
  return true;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  
  // Validate and focus on first invalid field
  if (!validateAndFocusFirstInvalid(form)) {
    return;
  }
  
  const btn = form.querySelector('button[type="submit"]');
  
  // Check honeypot
  if (form.querySelector('[name="website"]').value) return;
  
  btn.classList.add('loading');
  btn.disabled = true;
  
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      document.getElementById('contact-form-container').classList.add('hidden');
      document.getElementById('contact-form-success').classList.remove('hidden');
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert(translations[currentLang].error_occurred);
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

// === CALLBACK MODAL ===
function initCallbackModal() {
  const modal = document.getElementById('callback-modal');
  const triggers = [
    document.getElementById('callback-modal-trigger'),
    document.getElementById('callback-modal-trigger-mobile')
  ];
  const closeBtn = document.getElementById('callback-modal-close');
  
  triggers.forEach(trigger => {
    if (trigger) {
      trigger.addEventListener('click', openCallbackModal);
    }
  });
  
  closeBtn.addEventListener('click', closeCallbackModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCallbackModal();
  });
}

function openCallbackModal() {
  const modal = document.getElementById('callback-modal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  document.body.style.overflow = 'hidden';
}

function closeCallbackModal() {
  const modal = document.getElementById('callback-modal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    // Reset modal
    document.getElementById('callback-modal-form-container').classList.remove('hidden');
    document.getElementById('callback-modal-success').classList.add('hidden');
  }, 300);
}

async function handleCallbackSubmit(e) {
  e.preventDefault();
  const form = e.target;
  
  // Validate and focus on first invalid field
  if (!validateAndFocusFirstInvalid(form)) {
    return;
  }
  
  const btn = form.querySelector('button[type="submit"]');
  
  // Check honeypot
  if (form.querySelector('[name="website"]').value) return;
  
  btn.classList.add('loading');
  btn.disabled = true;
  
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      document.getElementById('callback-modal-form-container').classList.add('hidden');
      document.getElementById('callback-modal-success').classList.remove('hidden');
      form.reset();
      startCallbackTimer();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert(translations[currentLang].error_occurred);
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

function startCallbackTimer() {
  let timeLeft = 600; // 10 minutes in seconds
  const timerEl = document.getElementById('modal-timer');
  
  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    timeLeft--;
    
    if (timeLeft < 0) {
      clearInterval(timer);
      closeCallbackModal();
    }
  }, 1000);
}

// === BACK TO TOP ===
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === SITE CHAT ===
function initSiteChat() {
  const chatBtn = document.querySelector('[data-chat-open]');
  const chatBox = document.getElementById('site-chat-box');
  const chatClose = document.querySelector('[data-chat-close]');
  const chatForm = document.getElementById('site-chat-form');
  const chatLog = document.getElementById('site-chat-log');
  let sessionId = null;

  function appendMsg(role, text) {
    const el = document.createElement('div');
    el.className = role === 'user' ? 'text-right mb-2' : 'text-left mb-2';
    el.innerHTML = `<span class="inline-block px-3 py-2 rounded ${role==='user'?'bg-blue-600 text-white':'bg-gray-200 text-gray-900'}">${text.replace(/[<>]/g,'')}</span>`;
    chatLog.appendChild(el);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function connectSSE() {
    const ev = new EventSource('/functions/chat/sse');
    ev.addEventListener('open', (e) => {
      try { const data = JSON.parse(e.data); sessionId = data.sessionId; } catch {}
    });
    // TODO: server should stream operator replies with event: reply
    ev.addEventListener('reply', (e) => {
      try { const data = JSON.parse(e.data); if (data?.text) appendMsg('operator', data.text); } catch {}
    });
  }

  chatBtn && chatBtn.addEventListener('click', () => { chatBox?.classList.remove('hidden'); if (!sessionId) connectSSE(); });
  chatClose && chatClose.addEventListener('click', () => { chatBox?.classList.add('hidden'); });

  chatForm && chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = chatForm.querySelector('input[name="message"]');
    const name = chatForm.querySelector('input[name="name"]')?.value || '';
    const msg = (input?.value || '').trim();
    if (!msg) return;
    appendMsg('user', msg);
    input.value = '';
    try {
      const resp = await fetch('/functions/chat/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: msg, name })
      });
      const json = await resp.json();
      if (!json.ok) appendMsg('system', translations[currentLang]?.error_occurred || 'Error');
    } catch {
      appendMsg('system', translations[currentLang]?.error_occurred || 'Error');
    }
  });
}
