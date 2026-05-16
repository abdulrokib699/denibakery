/* ============================================================
   DENI BAKERY — kontak.js
   JavaScript khusus halaman Kontak
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitForm();
  });

  document.getElementById('btn-submit')?.addEventListener('click', submitForm);

});

function submitForm() {
  const name  = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();
  const type  = document.getElementById('f-type')?.value;
  const msg   = document.getElementById('f-msg')?.value.trim();

  // Simple validation
  if (!name || !phone) {
    alert('Mohon isi nama dan nomor HP terlebih dahulu.');
    return;
  }

  // Show success toast
  if (window.showToast) {
    window.showToast('✅ Pesan terkirim! Kami akan segera menghubungi Anda.');
  }

  // Reset form fields
  document.getElementById('f-name').value  = '';
  document.getElementById('f-phone').value = '';
  if (document.getElementById('f-type'))  document.getElementById('f-type').value = '';
  if (document.getElementById('f-msg'))   document.getElementById('f-msg').value  = '';
}
