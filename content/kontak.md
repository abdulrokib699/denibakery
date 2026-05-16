---
title: "Kontak Kami"
layout: "page"
---
# Hubungi Kami

**Alamat:**  
Jl. Roti No. 123, Jember, Jawa Timur

**Telepon / WhatsApp:**  
0812-3456-7890

**Email:**  
denibakery@example.com

**Jam Operasional:**  
Senin – Minggu: 05.00 – 20.00 WIB

---

### Kirim Pesan

<form id="contactForm">
  <div>
    <label>Nama Anda:</label><br>
    <input type="text" name="name" required style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px;">
  </div>
  <div>
    <label>Email:</label><br>
    <input type="email" name="email" required style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px;">
  </div>
  <div>
    <label>Pesan:</label><br>
    <textarea name="message" rows="5" required style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px;"></textarea>
  </div>
  <button type="submit" style="background:#5c3b1f; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer;">Kirim</button>
</form>

<script src="{{ "js/contact-form.js" | relURL }}"></script>