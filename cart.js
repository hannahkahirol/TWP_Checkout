const cartItems = document.querySelector('.cart-items');
const totalDisplay = document.getElementById('total');
const progress = document.getElementById('progress');
const freeText = document.getElementById('freeText');
const freeRemain = document.getElementById('freeRemain');
const checkoutBtn = document.getElementById('checkout');
const THRESHOLD = 5000;

// 🔄 Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('tfhCart')) || [];

// 🧠 Render cart items
function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    document.getElementById('empty-cart').classList.remove('hidden');
    checkoutBtn.classList.remove('enabled');
    return;
  }

  document.getElementById('empty-cart').classList.add('hidden');

  cart.forEach(item => {
    const itemBox = document.createElement('div');
    itemBox.className = 'cart-item';
    itemBox.dataset.price = item.price;

    itemBox.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-img"/>
      <div class="item-info">
        <p class="item-title">${item.name}</p>
        <p class="item-price">Unit Price: RM ${item.price.toFixed(2)}</p>
        <div class="item-controls">
          <button class="btn minus"><i class="fas fa-minus"></i></button>
          <span class="qty">${item.quantity}</span>
          <button class="btn plus"><i class="fas fa-plus"></i></button>
          <button class="btn remove"><i class="fas fa-trash-alt"></i> &nbsp;Remove</button>
        </div>
      </div>
      <div class="item-total">RM ${(item.price * item.quantity).toFixed(2)}</div>
    `;

    cartItems.appendChild(itemBox);
  });

  updateCart();
}

// 💾 Save cart to localStorage
function saveCartToLocalStorage() {
  const updatedCart = [];

  document.querySelectorAll('.cart-item').forEach(item => {
    const name = item.querySelector('.item-title').textContent;
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.qty').textContent);
    const image = item.querySelector('.item-img').getAttribute('src');

    updatedCart.push({
      id: name, // Use actual ID if available
      name,
      price,
      quantity,
      image
    });
  });

  cart = updatedCart;
  localStorage.setItem('tfhCart', JSON.stringify(cart));
}

// 💸 Update totals + save cart
function updateCart() {
  let total = 0;

  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.dataset.price);
    const qty = parseInt(item.querySelector('.qty').textContent);
    const itemTotal = price * qty;
    total += itemTotal;
    item.querySelector('.item-total').textContent = `RM ${itemTotal.toFixed(2)}`;
  });

  totalDisplay.textContent = `RM ${total.toFixed(2)}`;

  const percent = Math.min((total / THRESHOLD) * 100, 100);
  progress.style.width = `${percent}%`;

  if (total >= THRESHOLD) {
    freeText.textContent = '🎉 Free shipping unlocked!';
    freeRemain.textContent = '';
  } else {
    const remaining = THRESHOLD - total;
    freeText.textContent = 'Add more for free shipping';
    freeRemain.textContent = `RM ${remaining.toFixed(2)} more to get free shipping`;
  }

  if (total > 0) {
    checkoutBtn.classList.add('enabled');
    checkoutBtn.setAttribute('aria-disabled', 'false');
  } else {
    checkoutBtn.classList.remove('enabled');
    checkoutBtn.setAttribute('aria-disabled', 'true');
  }

  saveCartToLocalStorage();
}

// ➕➖🗑️ Button Events
cartItems.addEventListener('click', e => {
  const target = e.target;
  const item = target.closest('.cart-item');
  const qtyElem = item.querySelector('.qty');
  let qty = parseInt(qtyElem.textContent);

  if (target.classList.contains('plus')) {
    qty++;
    qtyElem.textContent = qty;
  }

  if (target.classList.contains('minus')) {
    if (qty > 1) {
      qty--;
      qtyElem.textContent = qty;
    }
  }

  if (target.classList.contains('remove')) {
    item.remove();
  }

  updateCart();
});

// 🟢 Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
