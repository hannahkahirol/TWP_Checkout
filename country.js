document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  const countryStateMap = {
    "Malaysia": ["Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur"],
    "United States": ["California", "Colorado", "Texas", "New York", "Florida", "Illinois"],
    "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"]
  };

  const countries = Object.keys(countryStateMap);
  countries.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    countrySelect.appendChild(option);
  });

  countrySelect.addEventListener("change", function () {
    const states = countryStateMap[this.value] || [];
    stateSelect.innerHTML = '<option value="">Select State/Territory</option>';
    states.forEach(s => {
      const option = document.createElement("option");
      option.value = s;
      option.textContent = s;
      stateSelect.appendChild(option);
    });
  });
});

