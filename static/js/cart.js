// Cart functions
const CART_KEY = 'deni_bakery_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
    }
}

function updateCartUI() {
    const cart = getCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('cartCount');
    if (cartCountSpan) cartCountSpan.innerText = cartCount;
    
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Keranjang kosong</p>';
        if (cartTotalSpan) cartTotalSpan.innerHTML = 'Total: Rp 0';
        return;
    }
    
    let total = 0;
    let html = '';
    cart.forEach(item => {
        const subtotal = item.harga * item.quantity;
        total += subtotal;
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div><strong>${item.nama}</strong><br>@Rp ${item.harga.toLocaleString()}</div>
                <div>
                    <input type="number" min="1" value="${item.quantity}" style="width: 60px;" data-id="${item.id}" class="cart-qty">
                    <button class="cart-remove" data-id="${item.id}">Hapus</button>
                </div>
                <div>Rp ${subtotal.toLocaleString()}</div>
            </div>
        `;
    });
    cartItemsDiv.innerHTML = html;
    if (cartTotalSpan) cartTotalSpan.innerHTML = `Total: Rp ${total.toLocaleString()}`;
    
    // Attach event listeners
    document.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const qty = parseInt(e.target.value);
            updateQuantity(id, qty);
        });
    });
    document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            removeFromCart(id);
        });
    });
}

function checkoutToWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }
    let message = 'Halo Deni Bakery, saya ingin memesan:%0A';
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.harga * item.quantity;
        total += subtotal;
        message += `- ${item.nama} (${item.quantity} x Rp ${item.harga.toLocaleString()}) = Rp ${subtotal.toLocaleString()}%0A`;
    });
    message += `%0ATotal: Rp ${total.toLocaleString()}%0A%0ATolong konfirmasi pesanan saya. Terima kasih.`;
    const phone = '6281234567890'; // Ganti dengan nomor WhatsApp pemilik toko
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Inisialisasi saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutToWhatsApp);
    
    // Event untuk cart icon dan sidebar
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', () => cartSidebar.classList.add('open'));
        if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));
    }
});

// Expose addToCart ke global untuk digunakan di tombol-tombol
window.addToCart = addToCart;