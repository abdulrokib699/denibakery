/* ============================================================
   DENI BAKERY — menu.js
   JavaScript khusus halaman Menu
   ============================================================ */

const products = [
  { name: 'Roti Gandum',       emoji: '🍞', desc: 'Roti gandum utuh bergizi, lembut di dalam, renyah di luar.',            price: 'Rp 15.000', badge: 'Bestseller', cat: 'roti'    },
  { name: 'Roti Sobek Keju',   emoji: '🧀', desc: 'Roti sobek lembut isi keju mozzarella yang meleleh.',                   price: 'Rp 28.000', badge: 'Favorit',   cat: 'roti'    },
  { name: 'Baguette Prancis',  emoji: '🥖', desc: 'Baguette klasik ala Prancis dengan tekstur crispy sempurna.',           price: 'Rp 22.000', badge: 'Artisan',   cat: 'roti'    },
  { name: 'Croissant Butter',  emoji: '🥐', desc: 'Croissant berlapis mentega pilihan, fluffy & gurih.',                   price: 'Rp 18.000', badge: 'Bestseller', cat: 'pastri'  },
  { name: 'Danish Pastri',     emoji: '🥧', desc: 'Danish isi buah segar dengan glaze manis menggoda.',                    price: 'Rp 20.000', badge: 'Baru',      cat: 'pastri'  },
  { name: 'Pain au Chocolat',  emoji: '🍫', desc: 'Pastri coklat lapis mentega yang bikin nagih.',                         price: 'Rp 22.000', badge: 'Premium',   cat: 'pastri'  },
  { name: 'Kue Ulang Tahun',   emoji: '🎂', desc: 'Kue custom untuk momen spesial Anda dengan dekorasi terbaik.',          price: 'Rp 250.000',badge: 'Custom',    cat: 'kue'     },
  { name: 'Cupcake Vanilla',   emoji: '🧁', desc: 'Cupcake lembut dengan frosting buttercream aneka rasa.',                price: 'Rp 12.000', badge: 'Favorit',   cat: 'kue'     },
  { name: 'Tart Coklat',       emoji: '🍰', desc: 'Tart coklat premium dengan ganache dark chocolate 70%.',                price: 'Rp 35.000', badge: 'Premium',   cat: 'kue'     },
  { name: 'Kopi Susu',         emoji: '☕', desc: 'Kopi susu segar dengan biji kopi arabika pilihan.',                     price: 'Rp 18.000', badge: 'Segar',     cat: 'minuman' },
  { name: 'Cokelat Panas',     emoji: '🍵', desc: 'Minuman cokelat hangat yang menenangkan.',                              price: 'Rp 15.000', badge: 'Hangat',    cat: 'minuman' },
  { name: 'Jus Jeruk Segar',   emoji: '🥤', desc: 'Jus jeruk segar diperas langsung, kaya vitamin C.',                    price: 'Rp 12.000', badge: 'Segar',     cat: 'minuman' },
];

let activeFilter = 'all';

function renderMenu(filter) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="menu-card reveal" style="animation-delay:${i * 0.07}s">
      <div class="card-img">${p.emoji}</div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-footer">
          <div class="card-price">${p.price}</div>
          <span class="card-badge">${p.badge}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger reveal on newly rendered cards
  setTimeout(() => {
    if (window.observeRevealElements) window.observeRevealElements();
    document.querySelectorAll('.menu-card.reveal').forEach(el => el.classList.add('visible'));
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu('all');

  const tabsContainer = document.getElementById('tabs');
  if (tabsContainer) {
    tabsContainer.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderMenu(activeFilter);
    });
  }
});
