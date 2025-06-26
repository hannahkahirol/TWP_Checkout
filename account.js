document.addEventListener("DOMContentLoaded", () => {
  const content = {
    profile: `
      <h2>My Profile</h2>
      <p>Manage and protect your account</p>
      <form class="profile-form" id="profileForm">
        <label>Username</label>
        <input type="text" value="tfh_maverick99" readonly />
        <label>Name</label>
        <input type="text" value="Marcus Lee" />
        <label>Email</label>
        <input type="email" value="ma********@mail.com" />
        <label>Phone Number</label>
        <input type="text" value="*******89" />
        <label>Gender</label>
        <div class="gender-options">
          <label><input type="radio" name="gender" checked /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
          <label><input type="radio" name="gender" /> Other</label>
        </div>
        <label>Date of Birth</label>
        <input type="date" value="2002-04-15" />
        <br />
        <button type="submit" class="save-btn">Save</button>
        <p id="profileMsg">Profile updated successfully.</p>
      </form>
    `,
    address: `
      <h2>Your Addresses</h2>
      <div id="addressList"></div>
      <button id="addAddressBtn" class="add-address">+ Add Address</button>
      <div id="addressFormContainer" style="display:none;">
        <h3 id="addressFormTitle">Add New Address</h3>
        <form id="addressForm">
          <label for="addressName">Name</label>
          <input type="text" id="addressName" required />
          <label for="addressText">Address</label>
          <textarea id="addressText" required></textarea>
          <label>
            <input type="checkbox" id="defaultAddressCheckbox" />
            Set as default address
          </label><br />
          <button type="submit">Save Address</button>
          <button type="button" id="cancelAddressBtn">Cancel</button>
        </form>
      </div>
    `,
    myPurchases: `
      <h2>My Purchases</h2>
      <div id="purchaseList"></div>
      <div id="rateModal">
        <h3>Rate Product</h3>
        <div id="starRating">☆☆☆☆☆</div>
        <button id="submitRating">Submit</button>
        <button id="closeRating">Cancel</button>
      </div>
      <div id="modalOverlay"></div>
    `
  };

  const mainContent = document.getElementById("mainContent");

  const purchases = [
    {
      id: 1,
      name: "MacBook Air",
      price: 3999.00,
      image: "images/MacBook",
      info: "Latest Apple M2 chip with 8-core CPU and 8-core GPU",
      rating: 0
    },
    {
      id: 2,
      name: "Canon PIXMA All-In-One Printer",
      price: 209.00,
      image: "images/printer.jpg",
      info: "A compact wireless All-in-One printer built for home or work needs",
      rating: 4
    }
  ];

  let addresses = [
    {
      id: 1,
      name: "Marcus Lee",
      address: "TFH HQ, MMU Cyberjaya, Persiaran Multimedia, 63100 Cyberjaya, Selangor",
      isDefault: true
    }
  ];

  let editAddressId = null;
  let selectedPurchaseId = null;
  let currentRating = 0;

  function renderAddresses() {
    const list = document.getElementById("addressList");
    if (!list) return;

    list.innerHTML = addresses.length === 0
      ? `<p>No addresses found.</p>`
      : addresses.map(addr => `
          <div class="card-box bg-blue-light">
            <strong>${addr.name}</strong> ${addr.isDefault ? '<span class="default-label">[Default]</span>' : ''}
            <p>${addr.address}</p>
            <div>
              <button class="btn-set-default" data-id="${addr.id}">🏠</button>
              <button class="btn-edit-address" data-id="${addr.id}">✏️</button>
              <button class="btn-delete-address" data-id="${addr.id}">🗑️</button>
            </div>
          </div>
        `).join('');

    list.querySelectorAll(".btn-set-default").forEach(btn =>
      btn.addEventListener("click", () => setDefaultAddress(+btn.dataset.id))
    );
    list.querySelectorAll(".btn-edit-address").forEach(btn =>
      btn.addEventListener("click", () => openEditAddressForm(+btn.dataset.id))
    );
    list.querySelectorAll(".btn-delete-address").forEach(btn =>
      btn.addEventListener("click", () => {
        if (confirm("Delete this address?")) deleteAddress(+btn.dataset.id);
      })
    );
  }

  function setDefaultAddress(id) {
    addresses = addresses.map(addr => ({ ...addr, isDefault: addr.id === id }));
    renderAddresses();
  }

  function openEditAddressForm(id) {
    const addr = addresses.find(a => a.id === id);
    if (!addr) return;
    editAddressId = id;
    document.getElementById("addressFormTitle").textContent = "Edit Address";
    document.getElementById("addressName").value = addr.name;
    document.getElementById("addressText").value = addr.address;
    document.getElementById("defaultAddressCheckbox").checked = addr.isDefault;
    document.getElementById("addressFormContainer").style.display = "block";
  }

  function deleteAddress(id) {
    addresses = addresses.filter(a => a.id !== id);
    if (!addresses.some(a => a.isDefault) && addresses.length)
      addresses[0].isDefault = true;
    renderAddresses();
  }

  function resetAddressForm() {
    editAddressId = null;
    document.getElementById("addressFormTitle").textContent = "Add New Address";
    document.getElementById("addressName").value = "";
    document.getElementById("addressText").value = "";
    document.getElementById("defaultAddressCheckbox").checked = false;
  }

  function saveAddress(event) {
    event.preventDefault();
    const name = document.getElementById("addressName").value.trim();
    const address = document.getElementById("addressText").value.trim();
    const isDefault = document.getElementById("defaultAddressCheckbox").checked;
    if (!name || !address) return alert("Please fill all fields.");

    if (editAddressId) {
      addresses = addresses.map(a => a.id === editAddressId ? { ...a, name, address, isDefault } : a);
    } else {
      const newId = addresses.length ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
      addresses.push({ id: newId, name, address, isDefault });
    }

    if (isDefault) {
      addresses = addresses.map(a => ({ ...a, isDefault: a.id === (editAddressId || newId) }));
    }

    resetAddressForm();
    document.getElementById("addressFormContainer").style.display = "none";
    renderAddresses();
  }

  function renderPurchases() {
    const container = document.getElementById("purchaseList");
    container.innerHTML = purchases.map(p => `
      <div class="card-box bg-blue-light" data-id="${p.id}" style="display:flex; gap:20px;">
        <img src="${p.image}" alt="${p.name}" style="width:100px;" />
        <div>
          <h3>${p.name}</h3>
          <p>${p.info}</p>
          <p><strong>Price: RM${p.price.toFixed(2)}</strong></p>
          <p>Rating: ${'⭐'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</p>
          <div>
            <button class="btn-rate">Rate</button>
            <button class="btn-return">Return/Refund</button>
            <button class="btn-contact">Contact Owner</button>
            <button class="btn-reorder">Reorder</button>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll(".btn-rate").forEach((btn, i) =>
      btn.addEventListener("click", () => openRatingModal(purchases[i].id))
    );
    container.querySelectorAll(".btn-return").forEach((btn, i) =>
      btn.addEventListener("click", () => alert(`Requested return for "${purchases[i].name}"`))
    );
    container.querySelectorAll(".btn-contact").forEach((btn, i) =>
      btn.addEventListener("click", () => alert(`Contacting owner of "${purchases[i].name}"`))
    );
    container.querySelectorAll(".btn-reorder").forEach((btn, i) =>
      btn.addEventListener("click", () => alert(`Reordered "${purchases[i].name}"`))
    );
  }

  function openRatingModal(id) {
    selectedPurchaseId = id;
    updateStarDisplay(0);
    document.getElementById("rateModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
  }

  function closeRatingModal() {
    selectedPurchaseId = null;
    document.getElementById("rateModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
  }

  function updateStarDisplay(rating) {
    currentRating = rating;
    document.getElementById("starRating").textContent = "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  const sectionHandlers = {
    profile: () => {
      const form = document.getElementById("profileForm");
      const msg = document.getElementById("profileMsg");
      form.addEventListener("submit", e => {
        e.preventDefault();
        msg.style.display = "block";
        setTimeout(() => (msg.style.display = "none"), 3000);
      });
    },
    address: () => {
      renderAddresses();
      document.getElementById("addAddressBtn").addEventListener("click", () => {
        resetAddressForm();
        document.getElementById("addressFormContainer").style.display = "block";
      });
      document.getElementById("cancelAddressBtn").addEventListener("click", () => {
        resetAddressForm();
        document.getElementById("addressFormContainer").style.display = "none";
      });
      document.getElementById("addressForm").addEventListener("submit", saveAddress);
    },
    myPurchases: () => {
      renderPurchases();
      document.getElementById("starRating").addEventListener("click", e => {
        const rect = e.target.getBoundingClientRect();
        const index = Math.ceil((e.clientX - rect.left) / (rect.width / 5));
        updateStarDisplay(Math.min(5, Math.max(1, index)));
      });
      document.getElementById("submitRating").addEventListener("click", () => {
        const p = purchases.find(p => p.id === selectedPurchaseId);
        if (p && currentRating) {
          p.rating = currentRating;
          renderPurchases();
          closeRatingModal();
          alert(`You rated "${p.name}" ${currentRating} star(s).`);
        } else {
          alert("Please select a rating.");
        }
      });
      document.getElementById("closeRating").addEventListener("click", closeRatingModal);
      document.getElementById("modalOverlay").addEventListener("click", closeRatingModal);
    }
  };

  document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", () => {
      const section = item.dataset.section;
      mainContent.innerHTML = content[section];
      sectionHandlers[section]?.();
    });
  });

  // Load default
  mainContent.innerHTML = content.profile;
  sectionHandlers.profile();
});
