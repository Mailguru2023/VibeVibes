const siteConfig = {
    contact: {
        phone: "+436641234567", 
        email: "info@baumeister.at", 
        address: "Musterstraße 1, 1010 Wien",
        whatsappNumber: "436641234567", 
        telegramUsername: "yourusername",
        social: { 
            facebook: "#", 
            instagram: "#", 
            telegram: "#" 
        }
    },
    assets: {
        heroBg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        portfolio: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1529408632839-a549174db48c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop', 
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop'
        ]
    },
    content: {} // Will be loaded from lang.json
};

class Cursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        
        window.addEventListener('mousemove', this.move.bind(this));
        document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    move(e) {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
        this.cursorDot.style.left = `${e.clientX}px`;
        this.cursorDot.style.top = `${e.clientY}px`;
    }

    setGrab(isGrabbing) {
        this.cursor.classList.toggle('grab', isGrabbing);
    }
}

class HolographicBlueprint {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.time = 0;
        this.mouse = { x: 0, y: 0 };
        this.rotation = { x: 0.5, y: -0.5 };
        this.targetRotation = { x: 0.5, y: -0.5 };
        this.drawProgress = 0;
        this.isIntersecting = false;
        
        const s = 100; // size
        this.initModel(s);
        this.initParticles();
        this.updateColors();
        this.resize();

        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    initModel(s) {
         this.vertices = [
            {x: -s, y: -s, z: -s}, {x: s, y: -s, z: -s}, {x: s, y: s, z: -s}, {x: -s, y: s, z: -s},
            {x: -s, y: -s, z: s}, {x: s, y: -s, z: s}, {x: s, y: s, z: s}, {x: -s, y: s, z: s},
            {x: 0, y: -s, z: -s*1.5}, {x: 0, y: s, z: -s*1.5}
        ];
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7], [0, 8], [1, 8], [2, 9], [3, 9], [8,9]
        ];
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 600,
                z: (Math.random() - 0.5) * 600, size: Math.random() * 2 + 1,
                speed: Math.random() * 0.1 + 0.05
            });
        }
    }

    startAnimation() { this.isIntersecting = true; }

    updateColors() {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim().replace(/ /g, ',');
        this.colors = {
            line: `rgb(${primaryColor})`, glow: `rgba(${primaryColor}, 0.2)`,
            particle: `rgba(${primaryColor}, 0.5)`, light: `rgba(${primaryColor}, 0.08)`
        };
    }

    resize() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth, 450);
        this.canvas.width = size;
        this.canvas.height = size;
    }
    
    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.targetRotation.y = (e.clientX - rect.left - this.canvas.width / 2) * 0.003;
        this.targetRotation.x = (e.clientY - rect.top - this.canvas.height / 2) * 0.003;
    }

    onMouseLeave() {
        this.targetRotation.y = 0;
        this.targetRotation.x = 0;
    }

    project(point, rotX, sinX, rotY, sinY) {
        const y1 = point.y * rotX - point.z * sinX, z1 = point.y * sinX + point.z * rotX;
        const x1 = point.x * rotY - z1 * sinY, z2 = point.x * sinY + z1 * rotY;
        const fov = 400;
        const scale = fov / (fov + z2);
        return { x: x1 * scale + this.canvas.width / 2, y: y1 * scale + this.canvas.height / 2, scale };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01;
        if (this.isIntersecting && this.drawProgress < 1) this.drawProgress += 0.015;

        this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.05;
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.05;
        this.rotation.x += Math.sin(this.time * 0.5) * 0.0001; this.rotation.y += 0.0008;

        const rotX = Math.cos(this.rotation.x), sinX = Math.sin(this.rotation.x);
        const rotY = Math.cos(this.rotation.y), sinY = Math.sin(this.rotation.y);
        
        this.ctx.fillStyle = this.colors.particle;
        this.particles.forEach(p => {
            p.z -= p.speed;
            if (p.z < -300) p.z = 300;
            const proj = this.project(p, rotX, sinX, rotY, sinY);
            if (proj.scale > 0) {
                this.ctx.beginPath(); this.ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2); this.ctx.fill();
            }
        });
        
        const pulse = (Math.sin(this.time * 3) + 1) / 2;
        const projected = this.vertices.map(v => this.project(v, rotX, sinX, rotY, sinY));
        
        this.ctx.strokeStyle = this.colors.line; this.ctx.lineWidth = 1.5 + pulse;
        this.ctx.shadowBlur = 10 + pulse * 10; this.ctx.shadowColor = this.colors.glow;
        
        const edgesToDraw = Math.floor(this.edges.length * this.drawProgress);
        for(let i = 0; i < edgesToDraw; i++) {
            const e = this.edges[i], p1 = projected[e[0]], p2 = projected[e[1]];
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        }
        this.ctx.shadowBlur = 0;
    }

    run() {
        const loop = () => { this.draw(); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
    }
}

class BackgroundShader {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 70;
        this.maxDistance = 150;

        this.resize();
        this.initParticles();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.maxDistance = Math.min(window.innerWidth / 8, 150);
        this.particleCount = Math.floor((this.canvas.width * this.canvas.height) / 20000);
    }

    initParticles() {
        this.particles = [];
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim().replace(/ /g, ',');
        this.lineColor = `rgba(${primaryColor}, 0.5)`;

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p1 => {
            p1.x += p1.vx;
            p1.y += p1.vy;
            if (p1.x < 0 || p1.x > this.canvas.width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > this.canvas.height) p1.vy *= -1;
        });

        for (let i = 0; i < this.particleCount; i++) {
            for (let j = i; j < this.particleCount; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.lineColor;
                    this.ctx.globalAlpha = 1 - (dist / this.maxDistance);
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }

    run() {
        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

class BauMeisterApp {
    constructor(config) {
        this.config = config; 
        this.currentLang = 'de'; 
        this.elements = {};
        this.slider = { currentIndex: 0, itemsPerView: 3, totalItems: 0, isTransitioning: false };
        this.portfolioSlider = { isDown: false, startX: 0, scrollLeft: 0, velocity: 0, currentX: 0, targetX: 0 };
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        await this.loadTranslations();
        this.cacheDOMElements(); 
        this.registerEventListeners(); 
        this.initAssetsAndLinks();
        this.initHeaderObserver(); 
        this.initRevealOnScroll();
        this.initBlueprint(); 
        this.cursor = new Cursor();
        const savedLang = localStorage.getItem('language') || 'de'; 
        this.setLanguage(savedLang);
        this.runPortfolioSlider();
        
        const shaderCanvas = document.getElementById('background-shader');
        if(shaderCanvas) {
            this.backgroundShader = new BackgroundShader(shaderCanvas);
            this.backgroundShader.run();
        }
    }

    async loadTranslations() {
        try {
            const response = await fetch('locales/lang.json');
            if (!response.ok) {
                throw new Error('Failed to load translations');
            }
            const translations = await response.json();
            this.config.content = translations;
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to empty content if translations fail to load
            this.config.content = { de: {}, en: {} };
        }
    }

    cacheDOMElements() {
        this.elements.header = document.getElementById('header');
        this.elements.mainNavLinks = document.querySelectorAll('#main-nav .nav-link');
        this.elements.mobileMenu = document.getElementById('mobile-menu');
        this.elements.langDeBtn = document.getElementById('lang-de');
        this.elements.langEnBtn = document.getElementById('lang-en');
        this.elements.portfolioSliderEl = document.getElementById('portfolio-slider');
        this.elements.portfolioSliderWrapper = document.getElementById('portfolio-slider-wrapper');
        this.elements.portfolioFilterBtns = document.querySelectorAll('#portfolio-filter .filter-btn');
        this.elements.portfolioProgressIndicator = document.getElementById('portfolio-progress-indicator');
        this.elements.testimonialSlider = document.getElementById('testimonial-slider');
        this.elements.testimonialContainer = document.querySelector('.testimonial-slider-container');
        this.elements.nextTestimonialBtn = document.getElementById('next-testimonial');
        this.elements.prevTestimonialBtn = document.getElementById('prev-testimonial');
        this.elements.mainContactForm = document.getElementById('main-contact-form');
        this.elements.callbackForm = document.getElementById('callback-form');
        this.elements.callbackModal = document.getElementById('callback-modal');
        this.elements.blueprintCanvas = document.getElementById('blueprint-canvas');
    }

    registerEventListeners() {
        window.addEventListener('scroll', () => this.elements.header.classList.toggle('scrolled', window.scrollY > 50));
        this.elements.langDeBtn.addEventListener('click', () => this.setLanguage('de'));
        this.elements.langEnBtn.addEventListener('click', () => this.setLanguage('en'));
        document.getElementById('mobile-menu-button').addEventListener('click', () => this.elements.mobileMenu.classList.toggle('hidden'));
        this.elements.mobileMenu.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => this.elements.mobileMenu.classList.add('hidden'));
        });
        this.elements.portfolioFilterBtns.forEach(button => {
            button.addEventListener('click', (e) => this.filterPortfolio(e.currentTarget));
        });
        this.elements.nextTestimonialBtn.addEventListener('click', () => this.moveTestimonialSlider('next'));
        this.elements.prevTestimonialBtn.addEventListener('click', () => this.moveTestimonialSlider('prev'));
        this.elements.testimonialSlider.addEventListener('transitionend', () => this.handleTestimonialLoop());
        window.addEventListener('resize', () => this.setupTestimonialSlider());
        this.elements.mainContactForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'contact'));
        this.elements.callbackForm.addEventListener('submit', (e) => this.handleFormSubmit(e, 'callback'));
        [document.getElementById('callback-modal-trigger'), document.getElementById('callback-modal-trigger-mobile')].forEach(trigger => {
            trigger.addEventListener('click', () => this.openModal(this.elements.callbackModal));
        });
        document.getElementById('callback-modal-close').addEventListener('click', () => this.closeModal(this.elements.callbackModal));
        this.elements.callbackModal.addEventListener('click', (e) => {
            if (e.target === this.elements.callbackModal) this.closeModal(this.elements.callbackModal);
        });

        const sliderWrapper = this.elements.portfolioSliderWrapper;
        sliderWrapper.addEventListener('mousedown', (e) => this.portfolioSliderStart(e));
        sliderWrapper.addEventListener('mouseleave', () => this.portfolioSliderEnd());
        sliderWrapper.addEventListener('mouseup', () => this.portfolioSliderEnd());
        sliderWrapper.addEventListener('mousemove', (e) => this.portfolioSliderMove(e));
    }

    initAssetsAndLinks() {
        document.getElementById('hero-bg-img').src = this.config.assets.heroBg;
        document.querySelector('a[data-translate-aria="facebook_link_aria"]').href = this.config.contact.social.facebook;
        document.querySelector('a[data-translate-aria="instagram_link_aria"]').href = this.config.contact.social.instagram;
        document.querySelector('a[data-translate-aria="telegram_link_aria"]').href = this.config.contact.social.telegram;
        document.getElementById('whatsapp-link').href = `https://wa.me/${this.config.contact.whatsappNumber}`;
        document.getElementById('telegram-link').href = `https://t.me/${this.config.contact.telegramUsername}`;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        const content = this.config.content[lang];
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            if (content[key]) {
                 if (el.placeholder !== undefined) el.placeholder = content[key];
                 else el.innerHTML = content[key];
            }
        });
        document.querySelectorAll('[data-translate-aria]').forEach(el => {
            const key = el.dataset.translateAria;
            if (content[key]) el.setAttribute('aria-label', content[key]);
        });
        document.querySelector('a[data-translate="phone_number_footer"]').href = `tel:${this.config.contact.phone}`;
        document.querySelector('a[data-translate="email_footer"]').href = `mailto:${this.config.contact.email}`;
        document.querySelector('[data-translate="address"]').textContent = this.config.contact.address;
        this.elements.langDeBtn.classList.toggle('accent-blue', lang === 'de');
        this.elements.langDeBtn.classList.toggle('text-white', lang === 'de');
        this.elements.langEnBtn.classList.toggle('accent-blue', lang === 'en');
        this.elements.langEnBtn.classList.toggle('text-white', lang === 'en');
        document.title = content.page_title;
        this.populatePortfolio();
        this.populateTestimonials();
        this.setupTestimonialSlider();
        this.activatePortfolioFilter(this.elements.portfolioFilterBtns[0]);
    }
    
    initHeaderObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.elements.mainNavLinks.forEach(link => {
                        link.classList.toggle('active', link.dataset.scrollTo === id);
                    });
                }
            });
        }, { rootMargin: "-20% 0px -80% 0px" });
        document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    }

    initRevealOnScroll() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.id === 'blueprint-container' && this.blueprintInstance) {
                        this.blueprintInstance.startAnimation();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    populatePortfolio() {
        this.elements.portfolioSliderEl.innerHTML = '';
        const items = this.config.content[this.currentLang].portfolio_items;
        items.forEach((item, index) => {
            const el = document.createElement('div');
            const category = this.config.content.de.portfolio_items[index].category;
            el.className = "portfolio-slide";
            el.dataset.category = category;
            el.innerHTML = `
                <div class="portfolio-slide-image" style="background-image: url('${this.config.assets.portfolio[index]}')"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6 text-white">
                    <h3 class="text-xl font-semibold">${item.title}</h3>
                </div>`;
            this.elements.portfolioSliderEl.appendChild(el);
        });
        this.elements.portfolioSlides = Array.from(this.elements.portfolioSliderEl.children);
        const container = document.querySelector('.container');
        if (container) {
            const containerWidth = container.clientWidth;
            this.elements.portfolioSliderEl.style.setProperty('--container-width', `${containerWidth}px`);
        }
    }

    filterPortfolio(button) {
        this.activatePortfolioFilter(button);
        const filter = button.dataset.filter;
        
        let firstVisibleItem = null;
        this.elements.portfolioSlides.forEach(item => {
            const shouldShow = filter === 'all' || item.dataset.category === filter;
            item.style.display = shouldShow ? 'block' : 'none';
            if(shouldShow && !firstVisibleItem) {
                firstVisibleItem = item;
            }
        });
        
        if (firstVisibleItem) {
            this.portfolioSlider.targetX = -firstVisibleItem.offsetLeft;
        }
    }

    activatePortfolioFilter(activeButton) {
        this.elements.portfolioFilterBtns.forEach(btn => btn.classList.remove('accent-blue', 'text-white'));
        activeButton.classList.add('accent-blue', 'text-white');
    }

    portfolioSliderStart(e) {
        this.portfolioSlider.isDown = true;
        this.cursor.setGrab(true);
        this.portfolioSlider.startX = e.pageX;
        this.portfolioSlider.scrollLeft = this.portfolioSlider.currentX;
        this.portfolioSlider.velocity = 0;
    }

    portfolioSliderEnd() {
        this.portfolioSlider.isDown = false;
        this.cursor.setGrab(false);
    }

    portfolioSliderMove(e) {
        if (!this.portfolioSlider.isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - this.portfolioSlider.startX);
        const prevX = this.portfolioSlider.targetX;
        this.portfolioSlider.targetX = this.portfolioSlider.scrollLeft + walk;
        this.portfolioSlider.velocity = this.portfolioSlider.targetX - prevX;
    }
    
    runPortfolioSlider() {
        const slider = this.portfolioSlider;
        const el = this.elements.portfolioSliderEl;
        const wrapper = this.elements.portfolioSliderWrapper;
        
        const update = () => {
            slider.currentX += (slider.targetX - slider.currentX) * 0.1;
            if (!slider.isDown) {
                slider.velocity *= 0.95;
                slider.targetX += slider.velocity;
                if(Math.abs(slider.velocity) < 0.1) slider.velocity = 0;
            }
            
            const maxScroll = el.scrollWidth - wrapper.clientWidth;
            slider.targetX = Math.max(-maxScroll, Math.min(0, slider.targetX));
            slider.currentX = Math.max(-maxScroll, Math.min(0, slider.currentX));

            el.style.transform = `translateX(${slider.currentX}px)`;

            const progress = maxScroll > 0 ? -slider.currentX / maxScroll : 0;
            this.elements.portfolioProgressIndicator.style.width = `${progress * 100}%`;

            this.elements.portfolioSlides.forEach(slide => {
                const image = slide.querySelector('.portfolio-slide-image');
                const slideRect = slide.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();
                
                const slideCenter = slideRect.left + slideRect.width / 2;
                const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
                const distanceFromCenter = slideCenter - wrapperCenter;
                const normalizedDistance = distanceFromCenter / wrapperRect.width;
                const parallaxOffset = normalizedDistance * -100;
                
                if(image) image.style.transform = `translateX(${parallaxOffset}px)`;
            });

            requestAnimationFrame(update);
        }
        update();
    }
    
    populateTestimonials() {
        const testimonials = this.config.content[this.currentLang].testimonials;
        this.slider.totalItems = testimonials.length;
        const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
        this.elements.testimonialSlider.innerHTML = '';
        allTestimonials.forEach(testimonial => {
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide p-4';
            slide.innerHTML = `<div class="bg-alt p-8 rounded-lg shadow-lg border border-main h-full flex flex-col justify-center"><p class="italic text-heading mb-4">"${testimonial.text}"</p><p class="font-semibold text-main">- ${testimonial.name}</p></div>`;
            this.elements.testimonialSlider.appendChild(slide);
        });
    }

    setupTestimonialSlider() {
        if (window.innerWidth < 768) this.slider.itemsPerView = 1;
        else if (window.innerWidth < 1024) this.slider.itemsPerView = 2;
        else this.slider.itemsPerView = 3;

        this.slider.currentIndex = this.slider.totalItems;
        this.elements.testimonialSlider.style.transition = 'none';
        this.updateTestimonialSlider();
        setTimeout(() => {
            this.elements.testimonialSlider.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        }, 50);
    }
    
    moveTestimonialSlider(direction) {
        if (this.slider.isTransitioning) return;
        this.slider.isTransitioning = true;
        this.slider.currentIndex += (direction === 'next' ? 1 : -1);
        this.updateTestimonialSlider();
    }

    handleTestimonialLoop() {
        if (this.slider.currentIndex >= this.slider.totalItems * 2) {
            this.elements.testimonialSlider.style.transition = 'none';
            this.slider.currentIndex = this.slider.totalItems;
            this.updateTestimonialSlider();
        }
        if (this.slider.currentIndex <= this.slider.totalItems - 1) {
            this.elements.testimonialSlider.style.transition = 'none';
            this.slider.currentIndex = this.slider.totalItems * 2 - 1;
            this.updateTestimonialSlider();
        }
        setTimeout(() => {
            this.elements.testimonialSlider.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            this.slider.isTransitioning = false;
        }, 50);
    }

    updateTestimonialSlider() {
        const slideWidth = this.elements.testimonialContainer.clientWidth / this.slider.itemsPerView;
        this.elements.testimonialSlider.style.transform = `translateX(-${this.slider.currentIndex * slideWidth}px)`;
    }
    
    initBlueprint() {
        if (!this.elements.blueprintCanvas) return;
        this.blueprintInstance = new HolographicBlueprint(this.elements.blueprintCanvas);
        this.blueprintInstance.run();
    }
    
    handleFormSubmit(event, formType) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const sendingText = this.config.content[this.currentLang].form_sending_btn || 'Sending...';

        submitBtn.disabled = true;
        submitBtn.innerHTML = sendingText;

        setTimeout(() => {
            const wrapperId = `${formType}-form-wrapper`;
            const successId = `${formType}-form-success`;
            document.getElementById(wrapperId).classList.add('hidden');
            document.getElementById(successId).classList.remove('hidden');
            
            setTimeout(() => {
                document.getElementById(wrapperId).classList.remove('hidden');
                document.getElementById(successId).classList.add('hidden');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 4000);

        }, 1000);
    }

    openModal(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open', 'opacity-100'), 10);
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('open', 'opacity-100');
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            document.body.style.overflow = 'auto'; 
        }, 300);
    }
}

new BauMeisterApp(siteConfig);
