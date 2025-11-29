// Smooth Scroll to Form Function
function scrollToForm() {
    const formSection = document.getElementById('formSection');
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add a little shake animation to draw attention
    const formContainer = document.querySelector('.form-container');
    formContainer.style.animation = 'none';
    setTimeout(() => {
        formContainer.style.animation = 'formShake 0.5s ease';
    }, 10);
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes formShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Countdown Timer
function startCountdown() {
    let hours = 23, minutes = 45, seconds = 12;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            hours = 23;
            minutes = 59;
            seconds = 59;
        }
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

// Initialize countdown on page load
startCountdown();

// Form Elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validation Functions
function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 2) {
        showError(nameInput, 'nameError');
        return false;
    }
    hideError(nameInput, 'nameError');
    return true;
}

function validateMobile() {
    const mobile = mobileInput.value.trim();
    // Indian mobile number validation (starts with 6-9 and is 10 digits)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
        showError(mobileInput, 'mobileError');
        return false;
    }
    hideError(mobileInput, 'mobileError');
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, 'emailError');
        return false;
    }
    hideError(emailInput, 'emailError');
    return true;
}

function showError(input, errorId) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'block';
    }
}

function hideError(input, errorId) {
    input.classList.remove('error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Real-time Validation on Blur
nameInput.addEventListener('blur', validateName);
mobileInput.addEventListener('blur', validateMobile);
emailInput.addEventListener('blur', validateEmail);

// Real-time Validation on Input (for better UX)
nameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateName();
    }
});

mobileInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateMobile();
    }
});

emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateEmail();
    }
});

// Form Submission Handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isMobileValid = validateMobile();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isMobileValid || !isEmailValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ SUBMITTING...';

    // Prepare form data
    const formData = {
        name: nameInput.value.trim(),
        mobile: mobileInput.value.trim(),
        email: emailInput.value.trim(),
        timestamp: new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    try {
        // Replace with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIBXP_Dpm1uduPMooeMeCWNCul19wV_K4iDB2ED5ZCmKSZyRdxtkEbCz8EQJAHeSeAig/exec';
        
        // Send data to Google Sheets
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        successMessage.style.display = 'block';
        successMessage.innerHTML = `
            ✅ <strong>Success!</strong><br>
            Welcome aboard, ${formData.name}!<br>
            Check your email for masterclass details.
        `;
        
        // Reset form
        form.reset();
        
        // Update button
        submitBtn.textContent = '✅ SUBMITTED SUCCESSFULLY';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Redirect after 3 seconds
        // setTimeout(() => {
        //     window.location.href = 'thank-you.html';
        // }, 3000);
        
        // Reset button after 5 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = '🎓 CLAIM YOUR FREE SEAT NOW';
            submitBtn.style.background = 'linear-gradient(135deg, #FF9900 0%, #FF6B00 100%)';
            successMessage.style.display = 'none';
        }, 5000);

        // Track conversion (if you're using Google Analytics or Facebook Pixel)
        // gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'});
        // fbq('track', 'Lead');

    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        successMessage.style.display = 'block';
        successMessage.style.background = 'rgba(255, 68, 68, 0.2)';
        successMessage.style.borderColor = 'rgba(255, 68, 68, 0.5)';
        successMessage.textContent = '❌ Oops! Something went wrong. Please try again.';
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = '🎓 CLAIM YOUR FREE SEAT NOW';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.style.background = 'rgba(76, 175, 80, 0.2)';
            successMessage.style.borderColor = 'rgba(76, 175, 80, 0.5)';
        }, 5000);
    }
});

// Add entrance animations for elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards and testimonials
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.benefit-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Track button clicks for analytics
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        console.log('Button clicked:', buttonText);
        
        // Track with Google Analytics (if implemented)
        // gtag('event', 'click', {
        //     'event_category': 'CTA Button',
        //     'event_label': buttonText
        // });
        
        // Track with Facebook Pixel (if implemented)
        // fbq('trackCustom', 'CTAClick', {
        //     button_text: buttonText
        // });
    });
});

// Prevent form submission on Enter key (except in submit button)
form.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.type !== 'submit') {
        e.preventDefault();
        // Move to next input
        const inputs = Array.from(form.querySelectorAll('input'));
        const index = inputs.indexOf(e.target);
        if (index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    }
});