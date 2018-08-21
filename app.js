// Listen for Submit
document.querySelector("#loan-form").addEventListener("submit", e => {
  // Hide Results
  document.querySelector("#results").style.display = "none";
  // Show Loader
  document.querySelector("#loading").style.display = "block";
  // Show Results
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  // UI Vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show Results
    document.querySelector("#results").style.display = "block";
    // Hide Loader
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// Show Error
function showError(err) {
  // Hide Results
  document.querySelector("#results").style.display = "none";
  // Hide Loader
  document.querySelector("#loading").style.display = "none";
  // Create a div
  const errorDiv = document.createElement("div");
  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Add class
  errorDiv.className = "alert alert-danger";
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(err));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear Errors after 3s
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
