// Discord webhook URL - Replace with your webhook URL
const DISCORD_WEBHOOK = "";

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
    };

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Send to Discord
        await sendToDiscord(formData);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        e.target.reset();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Function to send data to Discord
async function sendToDiscord(data) {
    const embedColor = 3447003; // Discord blue color

    const payload = {
        embeds: [{
            title: '📬 New Contact Form Submission',
            color: embedColor,
            fields: [
                {
                    name: '👤 Name',
                    value: data.name,
                    inline: true
                },
                {
                    name: '📧 Email',
                    value: data.email,
                    inline: true
                },
                {
                    name: '📋 Subject',
                    value: data.subject
                },
                {
                    name: '💬 Message',
                    value: data.message
                },
                {
                    name: '⏰ Timestamp',
                    value: data.timestamp,
                    inline: true
                }
            ]
        }]
    };

    const response = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Failed to send message to Discord');
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add some CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        animation: slideIn 0.3s ease;
        z-index: 1000;
    }
    
    .notification.success {
        background: linear-gradient(45deg, #4CAF50, #45a049);
    }
    
    .notification.error {
        background: linear-gradient(45deg, #f44336, #da3c31);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);