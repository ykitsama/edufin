// Sections navigation
function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Daily tips
const tips = [
  "Save at least 20% of your gig income weekly.",
  "Join a SACCO to access cheaper loans.",
  "Diversify: Don’t put all money in one MMF.",
  "Track daily spending to avoid surprises."
];
document.getElementById("dailyTip").innerText = tips[Math.floor(Math.random() * tips.length)];

// Simulate returns
function simulateReturn(type) {
  let result = "";
  if (type === "SACCO") {
    const selected = document.getElementById("saccoSelect").value;
    if (selected === "Mwalimu") result = "Mwalimu SACCO: 5% dividend → Ksh 10,000 grows to ~Ksh 10,500 in a year.";
    if (selected === "Harambee") result = "Harambee SACCO: 6% dividend → Ksh 10,000 grows to ~Ksh 10,600 in a year.";
    if (selected === "Stima") result = "Stima SACCO: 6.5% dividend → Ksh 10,000 grows to ~Ksh 10,650 in a year.";
    if (selected === "Safaricom") result = "Safaricom (Kona) SACCO: 7% dividend → Ksh 10,000 grows to ~Ksh 10,700 in a year.";
    if (!selected) result = "Please select a SACCO.";
  }
  if (type === "MMF") {
    const selected = document.getElementById("mmfSelect").value;
    if (selected === "CIC") result = "CIC MMF: 9.5% return → Ksh 10,000 grows to ~Ksh 10,950 in a year.";
    if (selected === "Britam") result = "Britam MMF: 10% return → Ksh 10,000 grows to ~Ksh 11,000 in a year.";
    if (selected === "Sanlam") result = "Sanlam MMF: 10.5% return → Ksh 10,000 grows to ~Ksh 11,050 in a year.";
    if (selected === "Zidii") result = "Zidii MMF: 9.8% return → Ksh 10,000 grows to ~Ksh 10,980 in a year.";
    if (selected === "KCB") result = "KCB M-Pesa Investment: 9% return → Ksh 10,000 grows to ~Ksh 10,900 in a year.";
    if (!selected) result = "Please select a Money Market Fund.";
  }
  if (type === "Stocks") {
    result = "Stocks like Safaricom, Equity, KCB average ~12% annual growth. Ksh 20,000 → ~Ksh 22,400 in a year.";
  }
  document.getElementById("simulationResult").innerText = result;
}

// Planner
function calculatePlan() {
  const income = parseFloat(document.getElementById("income").value) || 0;
  const expenses = parseFloat(document.getElementById("expenses").value) || 0;
  const savings = income * 0.2;
  const invest = income * 0.15;
  const spend = income - savings - invest;

  document.getElementById("planOutput").innerText =
    `Plan: Save Ksh ${savings}, Invest Ksh ${invest}, Spend Ksh ${spend}`;

  new Chart(document.getElementById("planChart"), {
    type: 'pie',
    data: {
      labels: ['Savings', 'Investments', 'Spending'],
      datasets: [{
        data: [savings, invest, spend],
        backgroundColor: ['#004aad', '#ffcc00', '#66bb6a']
      }]
    }
  });
}

// Investment projection
function projectInvestment() {
  const amount = parseFloat(document.getElementById("invAmount").value) || 0;
  const years = parseInt(document.getElementById("invYears").value) || 1;
  const sacco = amount * Math.pow(1.05, years);  // 5% growth
  const mmf = amount * Math.pow(1.1, years);    // 10% growth
  const stocks = amount * Math.pow(1.12, years); // 12% growth

  new Chart(document.getElementById("invChart"), {
    type: 'bar',
    data: {
      labels: ['SACCO', 'MMF', 'Stocks'],
      datasets: [{
        label: `Projection after ${years} years`,
        data: [sacco, mmf, stocks],
        backgroundColor: ['#004aad', '#ffcc00', '#66bb6a']
      }]
    }
  });
}

// Profile
function saveProfile() {
  const name = document.getElementById("userName").value;
  const job = document.getElementById("userJob").value;
  localStorage.setItem("profile", JSON.stringify({ name, job }));
  document.getElementById("profileSummary").innerText =
    `Hi ${name}, Occupation: ${job}`;
}

// Load saved profile
window.onload = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    document.getElementById("userName").value = profile.name;
    document.getElementById("userJob").value = profile.job;
    document.getElementById("profileSummary").innerText =
      `Hi ${profile.name}, Occupation: ${profile.job}`;
  }
};
