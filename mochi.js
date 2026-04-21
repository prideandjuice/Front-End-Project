const PRICE = 12000;

function openModal(flavor = '') {
    const modal = document.getElementById('orderModal');
    const form  = document.getElementById('orderForm');
    const success = document.getElementById('orderSuccess');

    // reset state
    form.style.display = 'block';
    success.style.display = 'none';
    form.reset();

    // pre-select flavor kalau diklik dari card menu
    if (flavor) {
        document.getElementById('mochi-flavor').value = flavor;
    }

    updateTotal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = '';
}

// Tutup modal kalau klik di luar konten
function handleOverlayClick(e) {
    if (e.target === document.getElementById('orderModal')) {
        closeModal();
    }
}

// Update total harga real-time
function updateTotal() {
    const qty = parseInt(document.getElementById('quantity').value) || 1;
    const total = qty * PRICE;
    document.getElementById('totalPrice').textContent = 'Rp ' + total.toLocaleString('id-ID');
}

// Event listeners setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quantity').addEventListener('input', updateTotal);

    document.getElementById('orderForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            name:     document.getElementById('name').value,
            email:    document.getElementById('email').value,
            address:  document.getElementById('address').value,
            flavor:   document.getElementById('mochi-flavor').value,
            quantity: parseInt(document.getElementById('quantity').value),
        };

        try {
            const res = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Gagal mengirim pesanan');

            document.getElementById('orderForm').style.display = 'none';
            document.getElementById('orderSuccess').style.display = 'block';
        } catch (err) {
            alert('Terjadi kesalahan: ' + err.message);
        }
    });
});
