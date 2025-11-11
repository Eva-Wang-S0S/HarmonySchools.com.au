// Cultural Safety in Schools - Contact Form

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const role = formData.get('role');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
        showError();
        return;
    }

    // Create mailto link (fallback method)
    const mailtoLink = createMailtoLink(name, email, role, subject, message);
    
    // Try to open email client
    try {
        window.location.href = mailtoLink;
        showSuccess();
        form.reset();
    } catch (error) {
        console.error('Error opening email client:', error);
        showError();
    }
}

function createMailtoLink(name, email, role, subject, message) {
    const recipient = 'contact@culturalsafetyinschools.org'; // Replace with actual email
    const emailSubject = subject || 'Cultural Safety in Schools Contact Form';
    const emailBody = `
Name: ${name}
Email: ${email}
Role: ${role || 'Not specified'}

Message:
${message}
    `.trim();

    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    return `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
}

function showSuccess() {
    const successDiv = document.getElementById('form-success');
    const errorDiv = document.getElementById('form-error');
    const formContainer = document.querySelector('.contact-form');

    formContainer.style.display = 'none';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'block';

    // Reset after 5 seconds
    setTimeout(() => {
        formContainer.style.display = 'block';
        successDiv.style.display = 'none';
    }, 5000);
}

function showError() {
    const errorDiv = document.getElementById('form-error');
    const successDiv = document.getElementById('form-success');

    successDiv.style.display = 'none';
    errorDiv.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}
