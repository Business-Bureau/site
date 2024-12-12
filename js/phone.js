document.addEventListener('DOMContentLoaded', function() {
    const phoneNumber = '5039084704';
    const phoneNumberElement = document.getElementById('phone-number');

    function openSMS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check if the device is iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = `sms:${phoneNumber}`;
        } 
        // For Android and other devices
        else {
            window.location.href = `sms:${phoneNumber}`;
        }
    }

    phoneNumberElement.addEventListener('click', function(event) {
        event.preventDefault();
        openSMS();
    });
});