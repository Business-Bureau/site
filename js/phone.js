function saveContactAndText() {
    // Hardcoding the phone number
    const phoneNumber = '5039084704';
    
    if ('contacts' in navigator && 'canShare' in navigator) {
        const contact = {
            name: 'Business Contact',
            tel: phoneNumber
        };

        navigator.contacts.save(contact)
            .then(() => {
                window.location.href = `sms:${phoneNumber}`;
            })
            .catch((error) => {
                console.error('Contact save error:', error);
                window.location.href = `sms:${phoneNumber}`;
            });
    } else {
        window.location.href = `sms:${phoneNumber}`;
    }
}

document.getElementById('phone-number').addEventListener('click', saveContactAndText);