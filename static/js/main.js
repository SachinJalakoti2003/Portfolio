// Simple Portfolio JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with simple settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Simple Typing Effect for Role
    const roles = [
        "Data Analyst", 
        "Data Science", 
        "AI Enthusiast"
    ];
    let roleIndex = 0, charIndex = 0, typing = true;
    const typedRole = document.getElementById("typed-role");
    
    function typeRole() {
        if (!typedRole) return;
        
        if (typing) {
            if (charIndex < roles[roleIndex].length) {
                typedRole.textContent += roles[roleIndex][charIndex++];
                setTimeout(typeRole, 100);
            } else {
                typing = false;
                setTimeout(typeRole, 2000);
            }
        } else {
            if (charIndex > 0) {
                typedRole.textContent = roles[roleIndex].substring(0, --charIndex);
                setTimeout(typeRole, 50);
            } else {
                typing = true;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
            }
        }
    }
    
    typeRole();
    
    // Simple Smooth Scrolling
    initSmoothScrolling();
    
    // Simple Navbar Effects
    initNavbarEffects();
    
    // Initialize Tab Functionality
    initTabFunctionality();
    
    // Initialize Bootstrap Modals
    initModalFunctionality();
});

// Simple Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simple Navbar Effects
function initNavbarEffects() {
    window.addEventListener('scroll', function() {
        updateActiveNavigation();
    });
}

// Update Active Navigation
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

// Fix Bootstrap Tab Functionality
function initTabFunctionality() {
    const tabButtons = document.querySelectorAll('#aboutTabs button[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and content
            document.querySelectorAll('#aboutTabs .nav-link').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('#aboutTabsContent .tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

// Initialize Bootstrap Modals
function initModalFunctionality() {
    // Ensure Bootstrap modals work properly
    const modalButtons = document.querySelectorAll('button[data-bs-toggle="modal"]');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetModalId = this.getAttribute('data-bs-target');
            const targetModal = document.querySelector(targetModalId);
            
            if (targetModal) {
                // Show the modal
                targetModal.classList.add('show');
                targetModal.style.display = 'block';
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
                
                // Create backdrop
                const backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
                
                // Close modal functionality
                const closeButtons = targetModal.querySelectorAll('[data-bs-dismiss="modal"]');
                closeButtons.forEach(closeBtn => {
                    closeBtn.addEventListener('click', function() {
                        closeModal(targetModal, backdrop);
                    });
                });
                
                // Close on backdrop click
                backdrop.addEventListener('click', function() {
                    closeModal(targetModal, backdrop);
                });
                
                // Close on escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeModal(targetModal, backdrop);
                    }
                });
            }
        });
    });
}

function closeModal(modal, backdrop) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (backdrop && backdrop.parentNode) {
        backdrop.remove();
    }
} 