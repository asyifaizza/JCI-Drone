/* ============================================
   JCI Drone Technology - Main JavaScript
   ============================================ */

// ============================================
// Mobile Navigation
// ============================================
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.nav-mobile');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = mobileNav.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Toast Notifications
// ============================================
function showToast(title, message, type) {
    type = type || 'success';

    // Remove existing toast
    var existingToast = document.querySelector('.toast-container');
    if (existingToast) {
        existingToast.remove();
    }

    var iconSvg = '';
    if (type === 'success') {
        iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else {
        iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    }

    var container = document.createElement('div');
    container.className = 'toast-container';
    container.innerHTML =
        '<div class="toast ' + type + '">' +
        '<div class="toast-icon">' + iconSvg + '</div>' +
        '<div class="toast-content">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-message">' + message + '</div>' +
        '</div>' +
        '<button class="toast-close" aria-label="Close">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
        '</button>' +
        '</div>';

    document.body.appendChild(container);

    // Close button functionality
    var closeBtn = container.querySelector('.toast-close');
    closeBtn.addEventListener('click', function () {
        hideToast(container);
    });

    // Auto-hide after 5 seconds
    setTimeout(function () {
        hideToast(container);
    }, 5000);
}

function hideToast(container) {
    var toast = container.querySelector('.toast');
    if (toast) {
        toast.classList.add('hiding');
        setTimeout(function () {
            container.remove();
        }, 300);
    }
}

// ============================================
// Forum Category Filter
// ============================================
function initForumFilter() {
    const categoryButtons = document.querySelectorAll('.forum-category-btn');
    const forumCards = document.querySelectorAll('.forum-card');

    if (categoryButtons.length === 0) return;

    categoryButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active state
            categoryButtons.forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Filter posts
            forumCards.forEach(function (card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// Contact Form Validation
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get form values
        //var name = document.getElementById('name').value;
        var firstName = document.getElementById('first-name').value;
        var lastName = document.getElementById('last-name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        //var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        var terms = document.getElementById('terms').checked;

        var isValid = true;

        // Validate name
        // var nameError = validateName(name);
        // if (nameError) {
        //     showError('name', nameError);
        //     isValid = false;
        // }

        // Validate first name
        var firstNameError = validateName(firstName);
        if (firstNameError) {
            showError('first-name', firstNameError);
            isValid = false;
        }

        // Validate last name
        var lastNameError = validateName(lastName);
        if (lastNameError) {
            showError('last-name', lastNameError);
            isValid = false;
        }


        // Validate email
        var emailError = validateEmail(email);
        if (emailError) {
            showError('email', emailError);
            isValid = false;
        }

        // Validate phone
        var phoneError = validatePhone(phone);
        if (phoneError) {
            showError('phone', phoneError);
            isValid = false;
        }

        // Validate subject
        // var subjectError = validateSubject(subject);
        // if (subjectError) {
        //     showError('subject', subjectError);
        //     isValid = false;
        // }

        // Validate message
        var messageError = validateMessage(message);
        if (messageError) {
            showError('message', messageError);
            isValid = false;
        }

        // Validate terms
        if (!terms) {
            showError('terms', 'You must agree to the Terms of Service');
            isValid = false;
        }

        if (!isValid) {
            showToast('Validation Error', 'Please fix the errors in the form.', 'error');
            return;
        }

        // Simulate form submission
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" style="animation: spin 1s linear infinite; transform-origin: center;"></path></svg> Sending...';
        submitBtn.disabled = true;

        setTimeout(function () {
            showToast('Message Sent!', 'Thank you for contacting us. We\'ll get back to you soon.', 'success');
            form.reset();
            updateCharCount();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Real-time validation
    // var inputs = ['name', 'email', 'phone', 'subject', 'message'];
    var inputs = ['first-name', 'last-name', 'email', 'phone', 'message'];
    inputs.forEach(function (id) {
        var input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function () {
                clearError(id);
            });
        }
    });

    var termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function () {
            clearError('terms');
        });
    }
}

// Validation functions
function validateName(name) {
    var trimmed = name.trim();
    if (!trimmed) {
        return 'Name is required';
    }
    if (trimmed.length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (trimmed.length > 50) {
        return 'Name must be less than 50 characters';
    }
    return null;
}

function validateEmail(email) {
    var trimmed = email.trim();
    if (!trimmed) {
        return 'Email is required';
    }
    if (trimmed.indexOf('@') === -1) {
        return 'Email must contain @';
    }
    var atIndex = trimmed.indexOf('@');
    var beforeAt = trimmed.substring(0, atIndex);
    var afterAt = trimmed.substring(atIndex + 1);
    if (beforeAt.length < 1) {
        return 'Invalid email format';
    }
    if (afterAt.indexOf('.') === -1) {
        return 'Email domain must contain a dot';
    }
    var dotIndex = afterAt.lastIndexOf('.');
    var domain = afterAt.substring(0, dotIndex);
    var tld = afterAt.substring(dotIndex + 1);
    if (domain.length < 1 || tld.length < 2) {
        return 'Invalid email domain';
    }
    return null;
}

function validatePhone(phone) {
    var trimmed = phone.trim();
    if (!trimmed) {
        return 'Phone number is required';
    }
    // Remove common separators
    var cleanPhone = trimmed.split('-').join('').split(' ').join('').split('(').join('').split(')').join('').split('+').join('');
    // Check if remaining characters are digits
    for (var i = 0; i < cleanPhone.length; i++) {
        var char = cleanPhone[i];
        if (char < '0' || char > '9') {
            return 'Phone number can only contain digits, spaces, dashes, and parentheses';
        }
    }
    if (cleanPhone.length < 10) {
        return 'Phone number must have at least 10 digits';
    }
    if (cleanPhone.length > 15) {
        return 'Phone number is too long';
    }
    return null;
}

// function validateSubject(subject) {
//     if (!subject) {
//         return 'Please select a subject';
//     }
//     return null;
// }

function validateMessage(message) {
    var trimmed = message.trim();
    if (!trimmed) {
        return 'Message is required';
    }
    if (trimmed.length < 10) {
        return 'Message must be at least 10 characters';
    }
    if (trimmed.length > 1000) {
        return 'Message must be less than 1000 characters';
    }
    return null;
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + '-error');

    if (field && field.tagName !== 'INPUT' || field && field.type !== 'checkbox') {
        field.classList.add('error');
    }

    if (errorEl) {
        errorEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' + message;
        errorEl.style.display = 'flex';
    }
}

function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + '-error');

    if (field) {
        field.classList.remove('error');
    }

    if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.innerHTML = '';
    }
}

function clearErrors() {
    var errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(function (el) {
        el.style.display = 'none';
        el.innerHTML = '';
    });

    var errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(function (el) {
        el.classList.remove('error');
    });
}

// Character count for message
function initCharCount() {
    var messageInput = document.getElementById('message');
    var charCount = document.getElementById('char-count');

    if (messageInput && charCount) {
        messageInput.addEventListener('input', updateCharCount);
        updateCharCount();
    }
}

function updateCharCount() {
    var messageInput = document.getElementById('message');
    var charCount = document.getElementById('char-count');

    if (messageInput && charCount) {
        charCount.textContent = messageInput.value.length + '/1000 characters';
    }
}

// ============================================
// Set Active Navigation
// ============================================
function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-link, .nav-mobile a');

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Initialize All
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // initHeader();
    initMobileNav();
    initForumFilter();
    initContactForm();
    initCharCount();
    setActiveNav();
});

// ============================
// FIELD OF EXPERTISE CAROUSEL
// ============================

const carousel = document.getElementById("expertiseCarousel");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const itemWidth = carousel.clientWidth;

nextBtn.addEventListener("click", () => {
    carousel.scrollBy({
        left: itemWidth,
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", () => {
    carousel.scrollBy({
        left: -itemWidth,
        behavior: "smooth"
    });
});

