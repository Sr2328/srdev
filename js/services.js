document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('bookingModal');
  const bookButtons = document.querySelectorAll('.book-service');
  const closeModal = document.querySelector('.close-modal');
  const bookingForm = document.getElementById('bookingForm');
  
  const services = {
      'web-development': { 
          name: 'Web Development', 
          price: '$499',
          description: 'Custom website development with modern technologies'
      },
      'ui-ux-design': { 
          name: 'UI/UX Design', 
          price: '$399',
          description: 'Creative and intuitive design solutions'
      },
      'frontend-development': { 
          name: 'Frontend Development', 
          price: '$599',
          description: 'Modern frontend development with latest frameworks'
      }
  };

  // Show notification function with improved styling
  function showNotification(message, type) {
      const notification = document.getElementById('notification');
      const icon = type === 'success' ? '✓' : '✕';
      
      notification.innerHTML = `
          <span class="notification-icon">${icon}</span>
          <span class="notification-message">${message}</span>
      `;
      notification.className = `notification ${type}`;
      notification.classList.add('show');

      // Remove notification after 3 seconds
      setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => notification.className = 'notification', 300);
      }, 3000);
  }

  // Form validation function
  function validateForm(formData) {
      const errors = [];
      
      if (!formData.clientName.trim()) errors.push('Name is required');
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push('Valid email is required');
      if (!formData.phone.match(/^\+?[\d\s-]{8,}$/)) errors.push('Valid phone number is required');
      
      return errors;
  }

  // Close modal handler with animation
  function closeModalHandler() {
      modal.style.opacity = '0';
      document.body.style.overflow = 'auto';
      setTimeout(() => {
          modal.style.display = 'none';
          modal.style.opacity = '1';
          bookingForm.reset();
      }, 300);
  }

  // Open modal with animation
  bookButtons.forEach(button => {
      button.addEventListener('click', () => {
          const serviceType = button.getAttribute('data-service');
          const service = services[serviceType];
          
          document.getElementById('serviceType').value = service.name;
          document.getElementById('servicePrice').value = service.price;
          
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          requestAnimationFrame(() => modal.style.opacity = '1');
      });
  });

  // Close modal events
  closeModal.addEventListener('click', closeModalHandler);
  window.addEventListener('click', (e) => {
      if (e.target === modal) closeModalHandler();
  });
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') closeModalHandler();
  });

  // Form submission with improved handling
  bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = bookingForm.querySelector('button[type="submit"]');
      
      const formData = {
          clientName: document.getElementById('clientName').value,
          organization: document.getElementById('organization').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          serviceType: document.getElementById('serviceType').value,
          servicePrice: document.getElementById('servicePrice').value,
          message: document.getElementById('message')?.value || 'No message provided'
      };

      // Validate form
      const errors = validateForm(formData);
      if (errors.length > 0) {
          showNotification(errors[0], 'error');
          return;
      }

      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Processing...</span>';

      try {
          const webhookURL = 'https://discord.com/api/webhooks/1362958399318528251/TXGv88INIa8Bf93Pzg5sflU9X-f01ZoqaCKQetxLC9JnWZJMpP1YCB4Ic7V39qTIDme5';
          const response = await fetch(webhookURL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  content: `🎉 **New Service Booking!**\n
                  👤 **Client:** ${formData.clientName}
                  🏢 **Organization:** ${formData.organization || 'N/A'}
                  📧 **Email:** ${formData.email}
                  📞 **Phone:** ${formData.phone}
                  🛠️ **Service:** ${formData.serviceType}
                  💰 **Price:** ${formData.servicePrice}
                  📝 **Message:** ${formData.message}`
              })
          });

          if (!response.ok) throw new Error('Failed to submit booking');

          showNotification('Booking submitted successfully! We\'ll contact you soon.', 'success');
          closeModalHandler();
      } catch (error) {
          console.error('Booking Error:', error);
          showNotification('Failed to submit booking. Please try again.', 'error');
      } finally {
          submitButton.disabled = false;
          submitButton.innerHTML = '<span>Submit Booking</span>';
      }
  });

  // Add input validation feedback
  const inputs = bookingForm.querySelectorAll('input[required]');
  inputs.forEach(input => {
      input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorMessage = input.parentElement.querySelector('.error-message');
          if (errorMessage) errorMessage.remove();
      });
  });
});