// Initialize Stripe
const stripe = Stripe(window.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');
let elements;
let cardElement;

// DOM elements
const form = document.getElementById('check-form');
const paymentSection = document.getElementById('payment-section');
const submitBtn = document.getElementById('submit-btn');
const payBtn = document.getElementById('pay-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const checkAmountInput = document.getElementById('check-amount');
const feeAmountSpan = document.getElementById('fee-amount');
const netAmountSpan = document.getElementById('net-amount');
const frontPreview = document.getElementById('front-preview');
const backPreview = document.getElementById('back-preview');
const checkFrontInput = document.getElementById('check-front');
const checkBackInput = document.getElementById('check-back');

// Store form data
let formData = {
    checkFront: null,
    checkBack: null
};

// Calculate and display fees
checkAmountInput.addEventListener('input', (e) => {
    const amount = parseFloat(e.target.value) || 0;
    const fee = amount * 0.03; // 3% fee
    const netAmount = amount - fee;
    
    feeAmountSpan.textContent = `$${fee.toFixed(2)}`;
    netAmountSpan.textContent = `$${netAmount.toFixed(2)}`;
});

// Preview images
checkFrontInput.addEventListener('change', (e) => {
    handleImagePreview(e.target.files[0], frontPreview, 'checkFront');
});

checkBackInput.addEventListener('change', (e) => {
    handleImagePreview(e.target.files[0], backPreview, 'checkBack');
});

function handleImagePreview(file, previewElement, dataKey) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewElement.innerHTML = `<img src="${e.target.result}" alt="Check preview">`;
            previewElement.classList.add('has-image');
            
            // Store the base64 data
            formData[dataKey] = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.checkFront || !formData.checkBack) {
        showError('Please upload both front and back images of your check.');
        return;
    }
    
    const amount = parseFloat(checkAmountInput.value);
    if (amount < 10 || amount > 5000) {
        showError('Check amount must be between $10 and $5,000.');
        return;
    }
    
    // Store form data
    formData.name = document.getElementById('name').value;
    formData.email = document.getElementById('email').value;
    formData.phone = document.getElementById('phone').value;
    formData.amount = amount;
    formData.fee = amount * 0.03;
    
    // Show payment section
    form.style.display = 'none';
    paymentSection.style.display = 'block';
    
    // Initialize Stripe Elements
    if (!elements) {
        elements = stripe.elements();
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#e74c3c'
                }
            }
        });
        cardElement.mount('#card-element');
        
        cardElement.on('change', (event) => {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }
});

// Handle payment
payBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    payBtn.disabled = true;
    payBtn.textContent = 'Processing...';
    
    try {
        // Create payment intent
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: Math.round(formData.fee * 100), // Convert to cents
                email: formData.email,
                name: formData.name
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }
        
        const { clientSecret } = await response.json();
        
        // Confirm payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                }
            }
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        if (paymentIntent.status === 'succeeded') {
            // Submit check data
            const submitResponse = await fetch('/.netlify/functions/process-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    paymentIntentId: paymentIntent.id
                })
            });
            
            if (!submitResponse.ok) {
                throw new Error('Failed to process check');
            }
            
            // Show success message
            paymentSection.style.display = 'none';
            successMessage.style.display = 'block';
        }
    } catch (err) {
        console.error('Payment error:', err);
        showError(err.message || 'An error occurred during payment processing.');
        payBtn.disabled = false;
        payBtn.textContent = 'Pay Service Fee & Cash Check';
    }
});

function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Load Stripe publishable key from environment
async function loadStripeKey() {
    try {
        const response = await fetch('/.netlify/functions/get-config');
        if (response.ok) {
            const config = await response.json();
            if (config.stripePublishableKey && config.stripePublishableKey !== 'pk_test_placeholder') {
                // Reinitialize Stripe with the correct key
                window.STRIPE_PUBLISHABLE_KEY = config.stripePublishableKey;
                window.stripe = Stripe(config.stripePublishableKey);
            }
        }
    } catch (err) {
        console.error('Failed to load configuration:', err);
    }
}

// Load configuration on page load
loadStripeKey();
