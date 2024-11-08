function handleLogin() {
  const username = document.getElementById("username").value;
  sessionStorage.setItem("username", username);

  renderUserName();
}

function renderUserName() {
  const username = sessionStorage.getItem("username");
  if (!username) return;

  document.getElementById("login-form").style.display = "none";
  document.getElementById("trx_section").style.display = "block";

  const greeting = document.getElementById("greeting");
  greeting.textContent = `Welcome, ${username}!`;
  greeting.style.display = "block";
}

document.getElementById("login-btn").addEventListener("click", handleLogin);

// Task 2: Handle adding new transactions to localStorage
document
  .getElementById("add-transaction-btn")
  .addEventListener("click", function () {
    const amount = document.getElementById("amount").value;
    const transaction = {
      id: (JSON.parse(localStorage.getItem("transactions")) || []).length + 1,
      amount: amount,
      status: "pending",
    };
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    document.getElementById("amount").value = "";
    displayTransactions();
  });

// Task 3: Display the list of transactions from localStorage when the page is loaded
function displayTransactions() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = "";
  transactions.forEach(function (transaction) {
    const listItem = document.createElement("li");
    listItem.textContent = `ID: ${transaction.id}, Jumlah: ${transaction.amount}, Status: ${transaction.status}`;
    transactionList.appendChild(listItem);
  });
}

// Load transactions when the page is loaded
// document.addEventListener("DOMContentLoaded", displayTransactions);

// Task 4: Handle user logout, clear session storage, clear data, and reload the page
document.getElementById("logout-btn").addEventListener("click", function () {
  sessionStorage.clear();
  localStorage.removeItem("transactions");
  document.getElementById("login-form").style.display = "block";
  document.getElementById("trx_section").style.display = "none";
  location.reload();
});

renderUserName();
displayTransactions();
