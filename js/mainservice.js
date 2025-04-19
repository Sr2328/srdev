document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const bookButtons = document.querySelectorAll('.book-service');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const notification = document.getElementById('notification');
    const clientBudget = document.getElementById('clientBudget');
    const budgetType = document.getElementById('budgetType');
    const submitBtn = document.querySelector('.submit-btn');
    function formatRupees(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    function showNotification(message, type) {
        const notif = document.getElementById('notification');
        const messageEl = notif.querySelector('.notification-message');
        const progress = notif.querySelector('.notification-progress');
        
        if (type === 'success') {
            notif.querySelector('.success-icon').style.display = 'block';
            notif.querySelector('.error-icon').style.display = 'none';
        } else {
            notif.querySelector('.success-icon').style.display = 'none';
            notif.querySelector('.error-icon').style.display = 'block';
        }
        
        messageEl.textContent = message;
        notif.className = `notification ${type}`;
        notif.classList.add('show');
        
        progress.style.animation = 'none';
        progress.offsetHeight;
        progress.style.animation = 'progress 3s linear';
        
        setTimeout(() => {
            notif.classList.remove('show');
        }, 3000);
        
        const closeBtn = notif.querySelector('.notification-close');
        closeBtn.onclick = () => notif.classList.remove('show');
    }

    function validateForm(formData) {
        const errors = [];
        if (!formData.name.trim()) errors.push('Name is required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Valid email is required');
        if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) errors.push('Valid phone number is required');
        if (!formData.message.trim() || formData.message.length < 10) errors.push('Project details required (min 10 characters)');
        
        const budget = parseFloat(formData.clientBudget);
        if (isNaN(budget) || budget <= 0) errors.push('Please enter a valid budget amount');
        
        const fixedPrice = parseFloat(formData.servicePrice.replace(/[^0-9.-]+/g, ""));
        if (budgetType.value === 'fixed' && budget < fixedPrice) {
            errors.push(`Budget cannot be less than fixed price ($${fixedPrice})`);
        }
        
        return errors;
    }

    function closeModalHandler() {
        modal.style.opacity = '0';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
            bookingForm.reset();
        }, 300);
    }

    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceCard = button.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            const servicePrice = serviceCard.querySelector('.price').textContent;

            document.getElementById('serviceType').value = serviceTitle;
            document.getElementById('servicePrice').value = servicePrice;

            const initialPrice = parseFloat(servicePrice.replace(/[^0-9.-]+/g, ""));
            clientBudget.value = initialPrice;
            clientBudget.readOnly = true;
            budgetType.value = 'fixed';

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => modal.style.opacity = '1');
        });
    });

    budgetType.addEventListener('change', function() {
        const fixedPrice = parseFloat(document.getElementById('servicePrice').value.replace(/[^0-9.-]+/g, ""));
        
        if (this.value === 'fixed') {
            clientBudget.value = fixedPrice;
            clientBudget.readOnly = true;
        } else {
            clientBudget.readOnly = false;
            clientBudget.focus();
        }
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company')?.value || 'Not provided',
            service: document.getElementById('serviceType').value,
            servicePrice: document.getElementById('servicePrice').value,
            clientBudget: clientBudget.value,
            budgetType: budgetType.value,
            message: document.getElementById('message').value
        };

        const errors = validateForm(formData);
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';

        try {
            const webhookUrl = 'https://discord.com/api/webhooks/1362958395749175477/d7DZUzVt93i2iTcexcKgjpoU7avdYHoyJ506MRkY9V_IREbTRWBbWA6X_Q3qTnqDD1-r';
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: '🎉 New Service Booking',
                        color: 0x60A5FA,
                        fields: [
                            {
                                name: 'Service',
                                value: formData.service,
                                inline: true
                            },
                            {
                                name: 'Fixed Price',
                                value: formData.servicePrice,
                                inline: true
                            },
                            {
                                name: 'Client Budget',
                                value: `${formatRupees(formData.clientBudget)} (${formData.budgetType})`,
                                inline: true
                            },
                            {
                                name: 'Client Details',
                                value: `**Name:** ${formData.name}\n**Company:** ${formData.company}\n**Email:** ${formData.email}\n**Phone:** ${formData.phone}`,
                                inline: false
                            },
                            {
                                name: 'Project Details',
                                value: formData.message,
                                inline: false
                            }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            });

            if (!response.ok) throw new Error('Failed to submit booking');
            showNotification('Booking submitted successfully! We\'ll contact you soon.', 'success');
            closeModalHandler();

        } catch (error) {
            console.error('Booking Error:', error);
            showNotification('Failed to submit booking. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Request</span><i class="fa fa-arrow-right"></i>';
        }
    });

    [closeModal, modal].forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeModal) closeModalHandler();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModalHandler();
    });
});