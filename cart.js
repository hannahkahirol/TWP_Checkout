const cartItems = document.querySelector('.cart-items');
const totalDisplay = document.getElementById('total');
const progress = document.getElementById('progress');
const freeText = document.getElementById('freeText');
const freeRemain = document.getElementById('freeRemain');
const checkoutBtn = document.getElementById('checkout');
const THRESHOLD = 5000;

let freeShown = false;

function formatRM(amount) {
  return `RM ${amount.toFixed(2)}`;
}

function updateCart() {
  let total = 0;

  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.dataset.price);
    const qty = parseInt(item.querySelector('.qty').textContent);
    const itemTotal = price * qty;
    total += itemTotal;
    item.querySelector('.item-total').textContent = formatRM(itemTotal);
  });

  totalDisplay.textContent = formatRM(total);

  let percent = Math.min((total / THRESHOLD) * 100, 100);
  progress.style.width = `${percent}%`;

    if (total >= THRESHOLD) {
    freeText.textContent = '🎉 Free shipping unlocked!';
    freeRemain.textContent = '';
    freeShown = true;
    }
    else {
    const remaining = THRESHOLD - total;
    freeText.textContent = 'Add more for free shipping';
    freeRemain.textContent = `${formatRM(remaining)} more to get free shipping`;
    freeShown = false;
    }

  if (total > 0) {
    checkoutBtn.classList.add('enabled');
    checkoutBtn.setAttribute('aria-disabled', 'false');
  } else {
    checkoutBtn.classList.remove('enabled');
    checkoutBtn.setAttribute('aria-disabled', 'true');
  }
}

cartItems.addEventListener('click', e => {
  const target = e.target;
  const item = target.closest('.cart-item');

  if (target.classList.contains('plus')) {
    const qty = item.querySelector('.qty');
    qty.textContent = parseInt(qty.textContent) + 1;
  }

  if (target.classList.contains('minus')) {
    const qty = item.querySelector('.qty');
    if (parseInt(qty.textContent) > 1) {
      qty.textContent = parseInt(qty.textContent) - 1;
    }
  }

  if (target.classList.contains('remove')) {
    item.remove();
  }

  updateCart();
});

document.addEventListener('DOMContentLoaded', updateCart);
