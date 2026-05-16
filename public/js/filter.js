function renderProducts(products, filterKategori, searchTerm) {
    const container = document.getElementById('produkContainer');
    if (!container) return;
    
    const filtered = products.filter(product => {
        const matchKategori = filterKategori === 'semua' || product.kategori === filterKategori;
        const matchSearch = product.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.deskripsi && product.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchKategori && matchSearch;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Tidak ada produk yang ditemukan.</p>';
        return;
    }
    
    let html = '';
    filtered.forEach(product => {
        html += `
            <div class="produk-card" data-id="${product.id}">
                <div class="produk-img">🥐</div>
                <div class="produk-info">
                    <div class="produk-title">${escapeHtml(product.nama)}</div>
                    <div class="produk-kategori">${escapeHtml(product.kategori)}</div>
                    <div class="produk-harga">Rp ${product.harga.toLocaleString()}</div>
                    <button class="btn-add" data-id="${product.id}" data-nama="${escapeHtml(product.nama)}" data-harga="${product.harga}" data-kategori="${escapeHtml(product.kategori)}" data-deskripsi="${escapeHtml(product.deskripsi)}">Tambah ke Keranjang</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    
    // Attach event listeners
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = {
                id: btn.dataset.id,
                nama: btn.dataset.nama,
                harga: parseInt(btn.dataset.harga),
                kategori: btn.dataset.kategori,
                deskripsi: btn.dataset.deskripsi
            };
            if (window.addToCart) {
                window.addToCart(product, 1);
                alert(`${product.nama} ditambahkan ke keranjang!`);
            }
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Inisialisasi filter ketika halaman menu dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (typeof products !== 'undefined' && products.length) {
        let currentFilter = 'semua';
        let currentSearch = '';
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('searchInput');
        
        function updateDisplay() {
            renderProducts(products, currentFilter, currentSearch);
        }
        
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.kategori;
                    updateDisplay();
                });
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                updateDisplay();
            });
        }
        
        updateDisplay();
    } else {
        console.warn('Produk tidak ditemukan');
    }
});