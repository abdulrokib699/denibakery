document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Ganti URL dengan Google Apps Script URL setelah Anda buat
        const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
        
        try {
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            alert('Pesan terkirim! Terima kasih.');
            form.reset();
        } catch (error) {
            alert('Gagal mengirim pesan. Silakan coba lagi.');
            console.error(error);
        }
    });
});