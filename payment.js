document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[name="payment"]');
  const cardBox = document.querySelector('.credit-card-details');

  function toggleCardBox() {
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!selected) return;

    cardBox.style.display = selected.value === 'credit' ? 'flex' : 'none';
  }

  radios.forEach(radio => {
    radio.addEventListener('change', toggleCardBox);
  });

  toggleCardBox();
});
