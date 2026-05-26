// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
    if (typeof feather !== "undefined") {
        feather.replace();
    }
    
    initCustomCursor();
    initParticleBackground();
    initNavbarScroll();
    initMobileMenu();
    initProjectFiltering();
    initContactForm();
});

/* ==========================================================================
   1. Custom Cursor
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Simple dot follows immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Smooth trailing effect for the outer circle
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover states for interactive items
    const interactives = document.querySelectorAll("a, button, input, textarea, .filter-btn, .project-card, .timeline-item");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
        });
    });
}

/* ==========================================================================
   2. Particle Canvas Background
   ========================================================================== */
function initParticleBackground() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };
    
    // Adjust sizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    window.addEventListener("resize", resizeCanvas);
    
    document.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    document.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.baseSize = this.size;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop screen boundaries
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Mouse Interaction: Gravity repelling force
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    
                    // Repel particles slightly
                    this.x -= Math.cos(angle) * force * 1.5;
                    this.y -= Math.sin(angle) * force * 1.5;
                    
                    this.size = this.baseSize * (1 + force * 1.5);
                } else {
                    if (this.size > this.baseSize) {
                        this.size -= 0.1;
                    }
                }
            }
        }
    }
    
    function initParticles() {
        particles = [];
        // Scale particle count with screen size
        const numParticles = Math.floor((canvas.width * canvas.height) / 18000);
        for (let i = 0; i < Math.min(numParticles, 120); i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connections if particles are close
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    function connectParticles() {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDist) {
                    const alpha = (maxDist - distance) / maxDist * 0.12;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Launch
    resizeCanvas();
    animate();
}

/* ==========================================================================
   3. Navbar Active State on Scroll
   ========================================================================== */
function initNavbarScroll() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -60% 0px", // Focus middle of the viewport
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Mobile Toggle Menu
   ========================================================================== */
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-link");
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    
    links.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

/* ==========================================================================
   5. Dynamic Project Card Filtering
   ========================================================================== */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Set active class on buttons
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                // Add quick exit animations
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   6. Form Handling & Simulation Database
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    
    if (!form || !feedback) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector(".form-submit-btn");
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable state & loading indicator
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending... <span class="pulse-dot" style="margin-left:8px;"></span>`;
        
        const formData = new FormData(form);
        const submission = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            timestamp: new Date().toISOString()
        };
        
        // Simulating standard validation + network transmission delay
        setTimeout(() => {
            try {
                // Fetch existing leads or set empty
                const existingLeads = JSON.parse(localStorage.getItem("portfolio_leads") || "[]");
                existingLeads.push(submission);
                
                // Save to simulated localStorage database
                localStorage.setItem("portfolio_leads", JSON.stringify(existingLeads));
                
                // Present success visual feedback
                feedback.innerHTML = `<strong>Success!</strong> Thank you, ${submission.name}. Your message has been received! I will reach out shortly.`;
                feedback.className = "form-feedback success";
                feedback.classList.remove("hidden");
                
                // Clear out inputs
                form.reset();
            } catch (err) {
                // Error boundary fallback
                feedback.innerHTML = `<strong>Error!</strong> Something went wrong saving your message. Please try emailing directly.`;
                feedback.className = "form-feedback error";
                feedback.classList.remove("hidden");
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Scroll feedback into focus
                feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 1500);
    });
}
