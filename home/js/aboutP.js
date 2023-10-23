const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const formData = new FormData();

    formData.append('name', nameInput.value);
    formData.append('email', emailInput.value);
    formData.append('message', messageInput.value);

    const emailTo = 'mayabargig@gmail.com';

    fetch('/send-email', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message. Please try again later.');
        });

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});
