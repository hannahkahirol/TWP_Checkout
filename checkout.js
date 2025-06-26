document.addEventListener("DOMContentLoaded", function () {
  console.log("checkout.js loaded");

  const discountInput = document.getElementById("discount-code");
  const applyBtn = document.getElementById("apply-discount");
  const errorMsg = document.querySelector(".discount-error");
  const loadingIcon = document.getElementById("loading-icon");

  discountInput.addEventListener("input", () => {
    if (discountInput.value.trim() !== "") {
      applyBtn.classList.add("active");
      applyBtn.disabled = false;
      errorMsg.style.display = "none";
    } else {
      applyBtn.classList.remove("active");
      applyBtn.disabled = true;
    }
  });

  applyBtn.addEventListener("click", () => {
    applyBtn.disabled = true;
    loadingIcon.classList.remove("hidden");

    setTimeout(() => {
      loadingIcon.classList.add("hidden");

      if (discountInput.value.trim().toLowerCase() !== "validcode") {
        discountInput.classList.add("invalid");
        errorMsg.style.display = "block";
        applyBtn.disabled = false;
      } else {
        alert("Discount applied!");
      }
    }, 1500);
  });

  // Render cart items
  const cart = JSON.parse(localStorage.getItem('tfhCart')) || [];
  const container = document.querySelector(".cart-items");
  const totals = document.querySelector(".summary-totals");
  const subtotalEl = totals.querySelector("p:nth-child(1) span");
  const totalEl = totals.querySelector(".total-amount");

  container.innerHTML = ""; // Clear existing items

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Your cart is empty.";
    emptyMsg.style.padding = "10px";
    container.appendChild(emptyMsg);
    subtotalEl.textContent = "RM 0.00";
    totalEl.textContent = "RM 0.00";
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.className = "item-box";
    itemBox.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-thumbnail">
      <div class="item-details">
        <p class="item-name">${item.name}</p>
        <p class="item-price">RM ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;
    container.appendChild(itemBox);
    subtotal += item.price * item.quantity;
  });

  subtotalEl.textContent = `RM ${subtotal.toFixed(2)}`;
  totalEl.textContent = `RM ${subtotal.toFixed(2)}`;
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  const cart = JSON.parse(localStorage.getItem("tfhCart")) || [];
  document.getElementById("cartData").value = JSON.stringify(cart);
});

function completeCheckout() {
  localStorage.removeItem('tfhCart');
  alert("Thank you! Your order has been placed.");
  window.location.href = "thankyou.html";
}

//localStorage.setItem('tfhCart', JSON.stringify([
  //{
    //name: "13-inch MacBook Air with M2 Chip",
    //price: 3999.00,
    //quantity: 1,
    //image: "images/MacBook"
  //}
//]));
