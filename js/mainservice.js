document.addEventListener('DOMContentLoaded', function() {
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1361957105594269780/dybpxeLHsLWIi9GGPwP8vjfwIHRlwmabZkSTG2qgvTrgOyZ3GaEKwKXzNSaOozDe3sm_';
  const bookButtons = document.querySelectorAll('.book-service');
  const notification = document.getElementById('notification');

  // Show notification function
  function showNotification(message, type) {
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.classList.add('show');

      setTimeout(() => {
          notification.classList.remove('show');
      }, 3000);
  }

  // Book service function
  async function bookService(serviceType, serviceName, servicePrice) {
      try {
          const response = await fetch(DISCORD_WEBHOOK_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  embeds: [{
                      title: '🎉 New Service Booking!',
                      color: 0x60A5FA,
                      fields: [
                          {
                              name: 'Service',
                              value: serviceName,
                              inline: true
                          },
                          {
                              name: 'Price',
                              value: servicePrice,
                              inline: true
                          },
                          {
                              name: 'Status',
                              value: '⏳ Pending Review',
                              inline: true
                          }
                      ],
                      timestamp: new Date().toISOString(),
                      footer: {
                          text: 'SRDEV Services'
                      }
                  }]
              })
          });

          if (!response.ok) throw new Error('Failed to send booking');
          
          showNotification('Service booked successfully! We\'ll contact you soon.', 'success');
          
          // Disable the clicked button temporarily
          const button = document.querySelector(`[data-service="${serviceType}"]`);
          button.disabled = true;
          button.textContent = 'Booked ✓';
          setTimeout(() => {
              button.disabled = false;
              button.textContent = 'Book Now';
          }, 3000);

      } catch (error) {
          console.error('Booking Error:', error);
          showNotification('Failed to book service. Please try again.', 'error');
      }
  }

  // Add click handlers to book buttons
  bookButtons.forEach(button => {
      button.addEventListener('click', async () => {
          const serviceType = button.getAttribute('data-service');
          const card = button.closest('.service-card');
          const serviceName = card.querySelector('h3').textContent;
          const servicePrice = card.querySelector('.price').textContent;

          button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Booking...';
          button.disabled = true;

          await bookService(serviceType, serviceName, servicePrice);
      });
  });
});